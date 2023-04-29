"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EkycFacade = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const ekyc_repository_1 = require("../repositories/ekyc.repository");
const app_user_facade_1 = require("./app-user.facade");
const account_facade_1 = require("./account.facade");
const moment_timezone_1 = (0, tslib_1.__importDefault)(require("moment-timezone"));
const child_process_1 = require("child_process");
const common_1 = require("common");
const consolidate_document_facade_1 = require("./consolidate-document.facade");
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
}
let EkycFacade = class EkycFacade {
    constructor(ekycRepository, appUserFacade, accountFacade, investorDetailsRepository, appUserRepository, accountRepository, consolidatedDocumentFacade) {
        this.ekycRepository = ekycRepository;
        this.appUserFacade = appUserFacade;
        this.accountFacade = accountFacade;
        this.investorDetailsRepository = investorDetailsRepository;
        this.appUserRepository = appUserRepository;
        this.accountRepository = accountRepository;
        this.consolidatedDocumentFacade = consolidatedDocumentFacade;
    }
    //FETCH KRA KYC
    async fetchKRAKYC(token, isTokenId = false, transactionId, options) {
        var _a;
        try {
            if (!token)
                throw new ValidationError('User Token Is Not Valid');
            let userDeatils;
            //id token is an user id
            if (isTokenId) {
                userDeatils = await this.appUserFacade.findOne({
                    where: {
                        id: parseInt(token)
                    },
                    include: [
                        {
                            relation: 'investorDetails'
                        },
                        {
                            relation: 'primaryAccounts'
                        }
                    ]
                });
            }
            else {
                userDeatils = await this.appUserFacade.fetchUserDetailsByToken(token);
            }
            if (!userDeatils)
                throw new ValidationError('userDetails Missing');
            if (!userDeatils.investorDetails.panCardNumber)
                throw new ValidationError('panCardNumber Missing');
            if (!userDeatils.investorDetails.birthDate)
                throw new ValidationError('birthDate Missing');
            const randomNumber = await this.generateUniqueNumber();
            const encrytionCmd = `java -jar ${__dirname}/../../utils/EncryptionUtil.jar E {###panNumber###:###${userDeatils.investorDetails.panCardNumber}###\\,###arn_code###:###${process.env.USR_MGMT_FCD_EKYC_ARN_CODE}###\\,###dob###:###${(0, moment_timezone_1.default)(userDeatils.investorDetails.birthDate).format('DD-MM-YYYY')}###\\,###source###:###${process.env.USR_MGMT_FCD_EKYC_SOURCE}###\\,###unique_id###:###${randomNumber}###} ${process.env.USR_MGMT_FCD_EKYC_CHECKSUM}`;
            // console.log(encrytionCmd);
            const encryptedData = await this.encryptRequest(encrytionCmd, randomNumber);
            const response = await this.ekycRepository.fetchKRAKYC(encryptedData.request, encryptedData.checksum, encryptedData.key, transactionId);
            //check response
            if (!response.request && !response.key)
                throw new Error('Verfiy Ekyc Response is not Valid');
            const decryptionCmd = `java -jar ${__dirname}/../../utils/EncryptionUtil.jar D ${response.request} ${response.key}`;
            //decrypt the request
            const decryptedData = await this.decryptRsponse(decryptionCmd);
            const investordetailObject = {};
            const appUserObject = {};
            const accountObject = {};
            const kycStatusMapping = {
                IN_PROGRESS: 'inProgress',
                INCOMPLETE: 'incomplete',
                VERIFIED: 'done',
                NOT_VERIFIED: 'pending',
                HOLD: 'hold',
                KYC_EXCEEDED: 'pending',
                SUSPENDED: 'failed'
            };
            //if kycVerifiedFlag true
            if (decryptedData.kycVerifiedFlag) {
                //update the investordetails table with the kyc status
                investordetailObject.kycStatus = common_1.Option.GLOBALOPTIONS.KYCSTATUS[kycStatusMapping[decryptedData.kycStatus]].value;
                const inverstorData = await this.investorDetailsRepository
                    .updateAll(investordetailObject, { id: (_a = userDeatils === null || userDeatils === void 0 ? void 0 : userDeatils.investorDetails) === null || _a === void 0 ? void 0 : _a.id })
                    .catch(error => {
                    throw new Error(error);
                });
                //update the user table with the pan holder name
                appUserObject.name = decryptedData.panHolderName;
                appUserObject.appUserStatus = common_1.Option.GLOBALOPTIONS.APPUSERSTATUS['userRegistered'].value;
                const userData = await this.appUserRepository.updateAll(appUserObject, { id: userDeatils.id }).catch(error => {
                    throw new Error(error);
                });
                //check the primary account exist
                accountObject.name = decryptedData.panHolderName;
                accountObject.accountStatus = common_1.Option.GLOBALOPTIONS.ACCOUNTSTATUS['active'].value;
                if (userDeatils.primaryAccounts[0].activationDate == null || userDeatils.primaryAccounts[0].activationDate == undefined) {
                    accountObject.activationDate = (0, moment_timezone_1.default)().toDate();
                }
                common_1.LoggingUtils.debug('Updating accountOpeningDate in Account', 'fetchKRAKYC');
                const accountData = await this.accountRepository.updateAll(accountObject, { primaryHolderId: userDeatils.id }).catch(error => {
                    throw new Error(error);
                });
                // LoggingUtils.debug(`Before Generating FATCA & AOF For user ${JSON.stringify(userDeatils)}`, 'fetchKRAKYC'); //@TODO remove this after testing
                if (userDeatils.primaryAccounts) {
                    await this.accountFacade.sendInvestorAccountCreationNotification(userDeatils.primaryAccounts[0].id, options);
                    // LoggingUtils.debug('Sending Queue message to generate FATCA', 'fetchKRAKYC');
                    // await this.accountFacade.fatcaGenerationByAccountId(userDeatils.primaryAccounts![0]!.id!).catch(err => LoggingUtils.error(err));
                    common_1.LoggingUtils.debug('Adding entry to consolidated documents ', 'fetchKRAKYC');
                    const consolidateDoc = await this.consolidatedDocumentFacade.createConsolidatedDocumentEntry(userDeatils.id, userDeatils.primaryAccounts[0].id);
                    common_1.LoggingUtils.debug(`Consolidated Documents entry done `, 'fetchKRAKYC');
                    common_1.LoggingUtils.debug('Generating AOF For user', 'fetchKRAKYC');
                    await this.accountFacade.generateAOF(userDeatils.primaryAccounts[0].id, 'ria', {}, options).catch(err => common_1.LoggingUtils.error(err));
                    common_1.LoggingUtils.debug('Generating AOF method execution started', 'fetchKRAKYC');
                }
                return common_1.Option.GLOBALOPTIONS.KYCSTATUS[kycStatusMapping[decryptedData.kycStatus]];
            }
            else {
                //if kycVerifiedFlag is false
                const userData = await this.appUserRepository.updateAll(appUserObject, { id: userDeatils.id }).catch(error => {
                    throw new Error(error);
                });
                investordetailObject.kycStatus = common_1.Option.GLOBALOPTIONS.KYCSTATUS[kycStatusMapping[decryptedData.kycStatus]].value;
                const inverstorData = await this.investorDetailsRepository
                    .updateAll(investordetailObject, { appUserId: userDeatils.id })
                    .catch(error => {
                    throw new Error(error);
                });
                return common_1.Option.GLOBALOPTIONS.KYCSTATUS[kycStatusMapping[decryptedData.kycStatus]];
            }
        }
        catch (err) {
            let activityObj = {
                executionDate: new Date(),
                apiName: 'checkEkycStatus ->fetchKRAKYC',
                errorCode: JSON.stringify(err),
                details: JSON.stringify(err),
                status: 'failed'
            };
            (0, common_1.applicationLog)(activityObj);
            common_1.LoggingUtils.error(err);
            //catch validation error
            if (err instanceof ValidationError) {
                return Promise.reject(new common_1.RestError(400, err.message));
                //catch rest error
            }
            else if (err instanceof common_1.RestError) {
                return Promise.reject(new common_1.RestError(err.status, err.message));
            }
            //unknown error
            return Promise.reject(new common_1.RestError(465, JSON.parse(err.message).message ? JSON.parse(err.message).message : err.message, { systemcode: 1038 }));
        }
    }
    //UDATE KRA KYC
    async updateKRAKYC(appUserId, transactionId) {
        try {
            //validate user token
            if (!appUserId)
                throw new ValidationError('User Token Is Not Valid');
            // const userDeatils: AppUser = await this.appUserFacade.fetchUserDetailsByToken(token);
            const userDeatils = await this.appUserFacade.findOne({
                where: {
                    id: parseInt(appUserId)
                },
                include: [
                    {
                        relation: 'investorDetails'
                    },
                    {
                        relation: 'primaryAccounts',
                        scope: {
                            where: {
                                isActive: true
                            }
                        }
                    }
                ]
            });
            if (!userDeatils)
                throw new ValidationError('userDetails Missing');
            if (!userDeatils.investorDetails.panCardNumber)
                throw new ValidationError('panCardNumber Missing');
            if (!userDeatils.email || !userDeatils.contactNumber)
                throw new ValidationError('contactNumber Missing');
            const randomNumber = await this.generateUniqueNumber();
            let encrytionCmd = `java -jar ${__dirname}/../../utils/EncryptionUtil.jar E {###panNumber###:###${userDeatils.investorDetails.panCardNumber}###\\,###arn_code###:###${process.env.USR_MGMT_FCD_EKYC_ARN_CODE}###\\,###source###:###${process.env.USR_MGMT_FCD_EKYC_SOURCE}###\\,###unique_id###:###${randomNumber}###\\,###emailId###:###${userDeatils.email}###\\,###mobile###:###${userDeatils.contactNumber}###} ${process.env.USR_MGMT_FCD_EKYC_CHECKSUM}`;
            // console.log(encrytionCmd);
            const encryptedData = await this.encryptRequest(encrytionCmd, randomNumber);
            const response = await this.ekycRepository.updateKRAKYC(encryptedData.request, encryptedData.checksum, encryptedData.key, transactionId);
            //check response
            if (!response.request && !response.key)
                throw new Error('Verfiy Ekyc Response is not Valid');
            const decryptionCmd = `java -jar ${__dirname}/../../utils/EncryptionUtil.jar D ${response.request} ${response.key}`;
            //decrypt the request
            const decryptedData = await this.decryptRsponse(decryptionCmd);
            return decryptedData;
        }
        catch (err) {
            let activityObj = {
                executionDate: new Date(),
                apiName: 'verifyPan ->updateKRAKYC',
                errorCode: JSON.stringify(err),
                details: JSON.stringify(err),
                status: 'failed'
            };
            (0, common_1.applicationLog)(activityObj);
            common_1.LoggingUtils.error(err);
            if (err instanceof ValidationError) {
                return Promise.reject(new common_1.RestError(400, err.message));
            }
            else if (err instanceof common_1.RestError) {
                return Promise.reject(new common_1.RestError(err.status, err.message));
            }
            return Promise.reject(new common_1.RestError(465, JSON.parse(err.message).message ? JSON.parse(err.message).message : err.message, { systemcode: 1038 }));
        }
    }
    async encryptRequest(cmd, randomNumber) {
        return new Promise((resolve, reject) => {
            (0, child_process_1.exec)(cmd, function (err, stdout, stderr) {
                if (err || stderr)
                    reject('ENCRYPTION ERROR');
                // console.log(stdout)
                resolve(JSON.parse(stdout));
            });
        });
    }
    //decrypt request
    async decryptRsponse(cmd) {
        return new Promise((resolve, reject) => {
            (0, child_process_1.exec)(cmd, function (err, stdout, stderr) {
                if (err || stderr)
                    reject('ENCRYPTION ERROR');
                // console.log(stdout)
                resolve(JSON.parse(stdout));
            });
        });
    }
    //generates the unique number
    async generateUniqueNumber() {
        return Math.floor(Date.now() * Math.random());
    }
    async kycCompleted(id) {
        try {
            let investorDetail = await this.investorDetailsRepository
                .find({
                where: {
                    appUserId: id,
                    isActive: true
                }
            })
                .catch((err) => {
                throw new Error(err);
            });
            if (!investorDetail) {
                return Promise.reject(new common_1.RestError(400, 'User not found', { systemcode: 1030 }));
            }
            let updatedInvestorDetails = await this.investorDetailsRepository
                .updateAll({ isKYCDone: true }, { appUserId: id, isActive: true })
                .catch((err) => {
                throw new Error(err);
            });
            return updatedInvestorDetails;
        }
        catch (error) {
            common_1.LoggingUtils.error(error);
            throw error;
        }
    }
};
EkycFacade = (0, tslib_1.__decorate)([
    (0, core_1.injectable)({ scope: core_1.BindingScope.APPLICATION }),
    (0, tslib_1.__param)(0, (0, repository_1.repository)(ekyc_repository_1.EkycRepository)),
    (0, tslib_1.__param)(1, (0, core_1.service)(app_user_facade_1.AppUserFacade)),
    (0, tslib_1.__param)(2, (0, core_1.service)(account_facade_1.AccountFacade)),
    (0, tslib_1.__param)(3, (0, repository_1.repository)(common_1.InvestorDetailsRepository)),
    (0, tslib_1.__param)(4, (0, repository_1.repository)(common_1.AppUserRepository)),
    (0, tslib_1.__param)(5, (0, repository_1.repository)(common_1.AccountRepository)),
    (0, tslib_1.__param)(6, (0, core_1.service)(consolidate_document_facade_1.ConsolidatedDocumentFacade)),
    (0, tslib_1.__metadata)("design:paramtypes", [ekyc_repository_1.EkycRepository,
        app_user_facade_1.AppUserFacade,
        account_facade_1.AccountFacade,
        common_1.InvestorDetailsRepository,
        common_1.AppUserRepository,
        common_1.AccountRepository,
        consolidate_document_facade_1.ConsolidatedDocumentFacade])
], EkycFacade);
exports.EkycFacade = EkycFacade;
//# sourceMappingURL=ekyc.facade.js.map