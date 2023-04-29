"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountFacade = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const common_1 = require("common");
const core_banking_repository_1 = require("../repositories/core-banking.repository");
const consolidated_document_generation_engine_1 = require("../engines/consolidated-document-generation.engine");
const underscore_1 = (0, tslib_1.__importStar)(require("underscore"));
const moment_timezone_1 = (0, tslib_1.__importDefault)(require("moment-timezone"));
const path = (0, tslib_1.__importStar)(require("path"));
const fs = (0, tslib_1.__importStar)(require("fs"));
const lodash_1 = require("lodash");
const app_constant_1 = (0, tslib_1.__importDefault)(require("common/dist/constants/app-constant"));
// All business logic goes inside Facade layer
let AccountFacade = class AccountFacade {
    constructor(riskProfileRepository, riskProfileHistoryRepository, riskProfileQuestionSubmittedAnswerRepository, accountRepository, stateRepository, countryRepository, investorDetailsRepository, investorNomineeRepository, addressRepository, relationshipRepository, appUserRepository, serviceProviderAccountRepository, transactionRepository, coreBankingRepository, holdingRepository, instrumentRepository, fileStorageService, userManagementAppFileRepository, accountAppFileMappingRepository, documentUploadRepository, consolidatedDocumentGenerationEngine) {
        this.riskProfileRepository = riskProfileRepository;
        this.riskProfileHistoryRepository = riskProfileHistoryRepository;
        this.riskProfileQuestionSubmittedAnswerRepository = riskProfileQuestionSubmittedAnswerRepository;
        this.accountRepository = accountRepository;
        this.stateRepository = stateRepository;
        this.countryRepository = countryRepository;
        this.investorDetailsRepository = investorDetailsRepository;
        this.investorNomineeRepository = investorNomineeRepository;
        this.addressRepository = addressRepository;
        this.relationshipRepository = relationshipRepository;
        this.appUserRepository = appUserRepository;
        this.serviceProviderAccountRepository = serviceProviderAccountRepository;
        this.transactionRepository = transactionRepository;
        this.coreBankingRepository = coreBankingRepository;
        this.holdingRepository = holdingRepository;
        this.instrumentRepository = instrumentRepository;
        this.fileStorageService = fileStorageService;
        this.userManagementAppFileRepository = userManagementAppFileRepository;
        this.accountAppFileMappingRepository = accountAppFileMappingRepository;
        this.documentUploadRepository = documentUploadRepository;
        this.consolidatedDocumentGenerationEngine = consolidatedDocumentGenerationEngine;
    }
    getAge(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
    async create(entity, options) {
        return this.accountRepository.create(entity, options);
    }
    async generateAOF(id, aofType, callback, options) {
        var _a, _b, _c, _d, _e;
        if (!id) {
            return Promise.reject(new common_1.RestError(400, `AccountId is required !`, { systemcode: 1082 }));
        }
        if (!aofType || ['nrm', 'ria'].indexOf(aofType) === -1) {
            return Promise.reject(new common_1.RestError(400, 'Valid Type of Form Required!', { systemcode: 1084 }));
        }
        let account, fileName, createdFile, documents;
        let documentsTobeUploaded = [];
        try {
            let accountInstance = await this.accountRepository.findById(id, {
                include: [
                    {
                        relation: 'bankAccounts',
                        scope: {
                            where: {
                                isActive: true,
                                isDefault: true
                            },
                            include: [
                                {
                                    relation: 'bankBranch',
                                    scope: {
                                        include: [
                                            {
                                                relation: 'address'
                                            },
                                            {
                                                relation: 'bank'
                                            }
                                        ]
                                    }
                                },
                                {
                                    relation: 'bankAccountType'
                                },
                                {
                                    relation: 'mandates'
                                }
                            ]
                        }
                    },
                    {
                        relation: 'guardian',
                        scope: {
                            include: [
                                {
                                    relation: 'investorDetails',
                                    scope: {
                                        include: [
                                            {
                                                relation: 'permanentAddress',
                                                scope: {
                                                    include: [
                                                        {
                                                            relation: 'state',
                                                            scope: {
                                                                include: [
                                                                    {
                                                                        relation: 'country'
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                relation: 'correspondenceAddress',
                                                scope: {
                                                    include: [
                                                        {
                                                            relation: 'state',
                                                            scope: {
                                                                include: [
                                                                    {
                                                                        relation: 'country'
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                    ]
                                                }
                                            },
                                            'occupation',
                                            'wealthSource',
                                            'identificationType',
                                            'incomeSlab',
                                            'countryOfBirth',
                                            'taxResidentCountry',
                                            'politicallyExposureType'
                                            // 'kycImageFile',
                                            // 'panImageFile'
                                        ]
                                    }
                                }
                            ]
                        }
                    },
                    {
                        relation: 'primaryHolder',
                        scope: {
                            include: [
                                {
                                    relation: 'investorDetails',
                                    scope: {
                                        include: [
                                            {
                                                relation: 'permanentAddress',
                                                scope: {
                                                    include: [
                                                        {
                                                            relation: 'state',
                                                            scope: {
                                                                include: [
                                                                    {
                                                                        relation: 'country'
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                relation: 'correspondenceAddress',
                                                scope: {
                                                    include: [
                                                        {
                                                            relation: 'state',
                                                            scope: {
                                                                include: [
                                                                    {
                                                                        relation: 'country'
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                    ]
                                                }
                                            },
                                            'occupation',
                                            'wealthSource',
                                            'identificationType',
                                            'incomeSlab',
                                            'countryOfBirth',
                                            'taxResidentCountry',
                                            'politicallyExposureType',
                                            'signatureImageFile',
                                            // 'kycImageFile',
                                            // 'panImageFile',
                                            'investorType'
                                        ]
                                    }
                                }
                            ]
                        }
                    },
                    {
                        relation: 'primaryNominee',
                        scope: {
                            include: [
                                {
                                    relation: 'investorDetails',
                                    scope: {
                                        include: [
                                            {
                                                relation: 'permanentAddress',
                                                scope: {
                                                    include: [
                                                        {
                                                            relation: 'state',
                                                            scope: {
                                                                include: [
                                                                    {
                                                                        relation: 'country'
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                relation: 'correspondenceAddress',
                                                scope: {
                                                    include: [
                                                        {
                                                            relation: 'state',
                                                            scope: {
                                                                include: [
                                                                    {
                                                                        relation: 'country'
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                    ]
                                                }
                                            },
                                            'occupation',
                                            'wealthSource',
                                            'identificationType',
                                            'incomeSlab',
                                            'countryOfBirth',
                                            'taxResidentCountry',
                                            'politicallyExposureType'
                                            // 'kycImageFile',
                                            // 'panImageFile'
                                        ]
                                    }
                                }
                            ]
                        }
                    },
                    {
                        relation: 'secondaryHolder',
                        scope: {
                            include: [
                                {
                                    relation: 'investorDetails',
                                    scope: {
                                        include: [
                                            {
                                                relation: 'permanentAddress',
                                                scope: {
                                                    include: [
                                                        {
                                                            relation: 'state',
                                                            scope: {
                                                                include: [
                                                                    {
                                                                        relation: 'country'
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                relation: 'correspondenceAddress',
                                                scope: {
                                                    include: [
                                                        {
                                                            relation: 'state',
                                                            scope: {
                                                                include: [
                                                                    {
                                                                        relation: 'country'
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                    ]
                                                }
                                            },
                                            'occupation',
                                            'wealthSource',
                                            'identificationType',
                                            'incomeSlab',
                                            'countryOfBirth',
                                            'taxResidentCountry',
                                            'politicallyExposureType',
                                            'signatureImageFile'
                                            // 'kycImageFile',
                                            // 'panImageFile'
                                        ]
                                    }
                                }
                            ]
                        }
                    },
                    {
                        relation: 'tertiaryHolder',
                        scope: {
                            include: [
                                {
                                    relation: 'investorDetails',
                                    scope: {
                                        include: [
                                            {
                                                relation: 'permanentAddress',
                                                scope: {
                                                    include: [
                                                        {
                                                            relation: 'state',
                                                            scope: {
                                                                include: [
                                                                    {
                                                                        relation: 'country'
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                relation: 'correspondenceAddress',
                                                scope: {
                                                    include: [
                                                        {
                                                            relation: 'state',
                                                            scope: {
                                                                include: [
                                                                    {
                                                                        relation: 'country'
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                    ]
                                                }
                                            },
                                            'occupation',
                                            'wealthSource',
                                            'identificationType',
                                            'incomeSlab',
                                            'countryOfBirth',
                                            'taxResidentCountry',
                                            'politicallyExposureType',
                                            'signatureImageFile'
                                            // 'kycImageFile',
                                            // 'panImageFile'
                                        ]
                                    }
                                }
                            ]
                        }
                    },
                    {
                        relation: 'investorNominees',
                        scope: {
                            where: {
                                isActive: true,
                                isMfNominee: true
                            },
                            include: [
                                {
                                    relation: 'appUser',
                                    scope: {
                                        include: [
                                            {
                                                relation: 'investorDetails'
                                            }
                                        ]
                                    }
                                },
                                {
                                    relation: 'relationship'
                                },
                                {
                                    relation: 'address',
                                    scope: {
                                        include: [
                                            {
                                                relation: 'state',
                                                scope: {
                                                    include: [
                                                        {
                                                            relation: 'country'
                                                        }
                                                    ]
                                                }
                                            }
                                        ]
                                    }
                                }
                                // {
                                //   relation : 'account',
                                //   scope : {
                                //     include : [
                                //       {
                                //         relation : 'guardianRelationship'
                                //       },
                                //       {
                                //         relation : 'guardian'
                                //       }
                                //     ]
                                //   }
                                // },
                            ]
                        }
                    },
                    'primaryNomineeRelationship',
                    'holdingType',
                    'guardianRelationship'
                ]
            }, options);
            if (!accountInstance) {
                return Promise.reject(new common_1.RestError(400, `Account not found!`, { systemcode: 1086 }));
            }
            account = accountInstance.toJSON();
            // Only Onboarded user can generate AOF
            if (account.primaryHolder.appUserStatus !== common_1.Option.GLOBALOPTIONS.APPUSERSTATUS['userRegistered'].value) {
                return Promise.reject(new common_1.RestError(400, 'User Onboarding not completed', { systemcode: 1006 }));
            }
            //collecting all documents which are to be uploaded
            documentsTobeUploaded.push(account.primaryHolder.investorDetails.kycImageFile);
            documentsTobeUploaded.push(account.primaryHolder.investorDetails.panImageFile);
            underscore_1.default.each(account.bankAccounts, bankAccount => {
                documentsTobeUploaded.push(bankAccount.chequeImageFile);
            });
            if (account.secondaryHolder) {
                documentsTobeUploaded.push(account.secondaryHolder.investorDetails.kycImageFile);
                documentsTobeUploaded.push(account.secondaryHolder.investorDetails.panImageFile);
            }
            if (account.tertiaryHolder) {
                documentsTobeUploaded.push(account.secondaryHolder.investorDetails.kycImageFile);
                documentsTobeUploaded.push(account.secondaryHolder.investorDetails.panImageFile);
            }
            // signature
            let signaturePromises = [];
            if (account.primaryHolder && account.primaryHolder.investorDetails && account.primaryHolder.investorDetails.signatureImageFile) {
                signaturePromises.push(common_1.ContainerUtils.downloadFileToServer(this.fileStorageService, account.primaryHolder.investorDetails.signatureImageFile.containerName, account.primaryHolder.investorDetails.signatureImageFile.name, path.resolve(__dirname, '../../.tmp/', account.primaryHolder.investorDetails.signatureImageFile.name)));
            }
            if (account.secondaryHolder &&
                account.secondaryHolder.investorDetails &&
                account.secondaryHolder.investorDetails.signatureImageFile) {
                signaturePromises.push(common_1.ContainerUtils.downloadFileToServer(this.fileStorageService, account.secondaryHolder.investorDetails.signatureImageFile.containerName, account.secondaryHolder.investorDetails.signatureImageFile.name, path.resolve(__dirname, '../../.tmp/', account.secondaryHolder.investorDetails.signatureImageFile.name)));
            }
            if (account.tertiaryHolder && account.tertiaryHolder.investorDetails && account.tertiaryHolder.investorDetails.signatureImageFile) {
                signaturePromises.push(common_1.ContainerUtils.downloadFileToServer(this.fileStorageService, account.tertiaryHolder.investorDetails.signatureImageFile.containerName, account.tertiaryHolder.investorDetails.signatureImageFile.name, path.resolve(__dirname, '../../.tmp/', account.tertiaryHolder.investorDetails.signatureImageFile.name)));
            }
            let signaturesPaths = await Promise.all(signaturePromises);
            // console.log(">>>>>>>>",signaturesPaths)
            const resolvedPath = path.resolve(`${__dirname}/../../.tmp`);
            // signaturesPaths = signaturesPaths.map(async (element) => `data:image;base64,${await ContainerUtils.convertBitmapToJpg(fs.readFileSync(element, 'base64'),resolvedPath)}`);
            for (let i = 0; i < signaturesPaths.length; i++) {
                const bufferData = await common_1.ContainerUtils.convertBitmapToJpg(fs.readFileSync(signaturesPaths[i], 'base64'), resolvedPath);
                const stringData = Buffer.from(bufferData).toString('base64');
                signaturesPaths[i] = `data:image;base64,${stringData}`;
            }
            if (account.investorNominees && account.investorNominees.length) {
                for (let i = 0; i < account.investorNominees.length; i++) {
                    if ((_b = (_a = account.investorNominees[i].appUser) === null || _a === void 0 ? void 0 : _a.investorDetails) === null || _b === void 0 ? void 0 : _b.birthDate) {
                        account.investorNominees[i].appUser.investorDetails.birthDate = (0, moment_timezone_1.default)((_d = (_c = account.investorNominees[i].appUser) === null || _c === void 0 ? void 0 : _c.investorDetails) === null || _d === void 0 ? void 0 : _d.birthDate).format('Do MMM YYYY');
                    }
                    // if(account.investorNominees[i].account?.guardian?.investorDetails?.birthDate){
                    //   account.investorNominees[i].account.guardian.birthDate = moment(
                    //     account.investorNominees[i].account?.guardian?.investorDetails?.birthDate
                    //   ).format('Do MMM YYYY');
                    // }
                }
            }
            documents = [];
            var data = {
                Accounts: account,
                date: {
                    userDOB: (0, moment_timezone_1.default)(account.primaryHolder.investorDetails.birthDate).format('Do MMM YYYY'),
                    nomineeDOB: account.primaryNominee ? (0, moment_timezone_1.default)(account.primaryNominee.investorDetails.birthDate).format('Do MMM YYYY') : '',
                    secondHolderDOB: account.secondaryHolder ? (0, moment_timezone_1.default)(account.secondaryHolder.investorDetails.birthDate).format('Do MMM YYYY') : '',
                    thirdHolderDOB: account.tertiaryHolder ? (0, moment_timezone_1.default)(account.tertiaryHolder.investorDetails.birthDate).format('Do MMM YYYY') : '',
                    guardianDOB: account.guardian && account.guardian.investorDetails && account.guardian.investorDetails.birthDate
                        ? (0, moment_timezone_1.default)(account.guardian.investorDetails.birthDate).format('Do MMM YYYY')
                        : '',
                    today: (0, moment_timezone_1.default)().tz('Asia/Kolkata').format('DD-MM-YYYY'),
                    time: (0, moment_timezone_1.default)().tz('Asia/Kolkata').format('HH:mm')
                },
                // base: `${path.resolve(__dirname, '../../../')}/`,
                //currenty globle config file does not exits that its hard coded.
                config: { riaSebiNo: 'ARN-0005' },
                // config: require(`../../../server/global-config.${Account.app.NODE_ENV
                // }.json`),
                signatures: {
                    userSignature: signaturesPaths[0],
                    secondHolderSignature: account.secondaryHolder ? signaturesPaths[1] : '',
                    thirdHolderSignature: account.tertiaryHolder ? signaturesPaths[2] : ''
                },
                documents: documents
            };
            common_1.LoggingUtils.info(`aof data,${JSON.stringify(data)}`);
            // console.log("******",data,path.resolve(__dirname, `../../../../templates/account-opening-form-ria.html`));
            /*const pdfData = await PDFUtils.toPDF(
              ViewUtils.getCompiledHtml(path.resolve(__dirname, `../../views/templates/aof/account-opening-form-${aofType}.html`), data),
              {
                // phantomPath: path.resolve(__dirname,'../../node_modules/phantomjs/bin/phantomjs'),
                format: 'A4'
                // base: `file://${path.resolve(__dirname, '../../../')}/`
              },
              path.resolve(
                __dirname,
                // '../../../../templates',
                '../../.tmp/',
                `${account.uniqueId}-${aofType}.pdf`
              )
            );*/
            const pdfData = await common_1.PDFUtils.makePDF(data, {
                format: 'A4'
            }, path.resolve(__dirname, 
            // '../../../../templates',
            '../../.tmp/', `${account.uniqueId}-${aofType}.pdf`));
            // console.log(pdfData);
            // const pdfData = {filename: ''};
            fileName = `${account.uniqueId}-${aofType}-${Date.now()}.pdf`;
            const aofUploadRes = await common_1.ContainerUtils.uploadFileFromServer(this.fileStorageService, common_1.FileStorageContainerConfig.getGcpContainerName('aof'), fileName, pdfData);
            let fileData = await new Promise((resolve, reject) => {
                this.fileStorageService.getFile(common_1.FileStorageContainerConfig.getGcpContainerName('aof'), fileName, function (err, data) {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(data);
                });
            });
            //create an entry
            const userManagementAppFileData = await this.userManagementAppFileRepository.create({
                containerName: common_1.FileStorageContainerConfig.getGcpContainerName('aof'),
                // checksum: app.models.AppFile.getFileChecksum(file.name),
                path: fileData._metadata.name,
                originalFileName: fileData._metadata.name,
                name: fileData._metadata.name,
                size: fileData._metadata.size,
                extension: 'pdf',
                mimeType: 'application/pdf',
                checksum: aofUploadRes.checksum
            }, options);
            //update mapping
            const accountFileMapping = await this.accountAppFileMappingRepository.find({ where: { accountId: account.id } }, options);
            if (accountFileMapping.length > 0) {
                await this.accountAppFileMappingRepository.updateAll({
                    userManagementAppFileId: userManagementAppFileData.id
                }, {
                    accountId: account.id
                }, options);
            }
            else {
                await this.accountAppFileMappingRepository.create({
                    accountId: account.id,
                    userManagementAppFileId: userManagementAppFileData.id
                }, options);
            }
            //update entry in document upload
            const documentUpload = await this.documentUploadRepository.find({ where: { fk_id_account: account.id } });
            if (documentUpload.length > 0) {
                await this.documentUploadRepository.updateAll({
                    fk_id_file: userManagementAppFileData.id
                }, {
                    fk_id_account: account === null || account === void 0 ? void 0 : account.id
                }, options);
            }
            else {
                await this.documentUploadRepository.create({
                    fk_id_account: account.id,
                    documentType: common_1.Option.GLOBALOPTIONS.CUSTOMERDOCUMENTTYPE['aof'].value,
                    fk_id_user: account.primaryHolderId,
                    fk_id_bank_account: (_e = account === null || account === void 0 ? void 0 : account.bankAccounts[0]) === null || _e === void 0 ? void 0 : _e.id,
                    fk_id_file: userManagementAppFileData.id
                }, options);
            }
            // console.log("********",fileData,userManagementAppFileData,accountFileMapping);
            //remove the temp files of signature image  and temp pdf
            signaturesPaths.push(path.resolve(__dirname, `../../.tmp/${account.uniqueId}-${aofType}.pdf`));
            await Promise.all(signaturesPaths.map(file => new Promise((res, rej) => {
                fs.unlink(file, err => {
                    if (err)
                        res(0);
                    res(1);
                });
            })));
            return userManagementAppFileData;
        }
        catch (error) {
            common_1.LoggingUtils.error(error);
            throw error;
        }
    }
    async createAll(entities, options) {
        return this.accountRepository.createAll(entities, options);
    }
    async save(entity, options) {
        return this.accountRepository.save(entity, options);
    }
    async find(filter, options) {
        return this.accountRepository.find(filter, options);
    }
    async findOne(filter, options) {
        return this.accountRepository.findOne(filter, options);
    }
    async findById(id, filter, options) {
        return this.accountRepository.findById(id, filter, options);
    }
    async update(entity, options) {
        return this.accountRepository.update(entity, options);
    }
    async delete(entity, options) {
        return this.accountRepository.delete(entity, options);
    }
    async updateAll(data, where, options) {
        return this.accountRepository.updateAll(data, where, options);
    }
    async updateById(id, data, options) {
        return this.accountRepository.updateById(id, data, options);
    }
    async replaceById(id, data, options) {
        return this.accountRepository.replaceById(id, data, options);
    }
    async deleteAll(where, options) {
        return this.accountRepository.deleteAll(where, options);
    }
    async deleteById(id, options) {
        return this.accountRepository.deleteById(id, options);
    }
    async count(where, options) {
        return this.accountRepository.count(where, options);
    }
    async exists(id, options) {
        return this.accountRepository.exists(id, options);
    }
    async calculateRiskProfile(accountId, options) {
        return new Promise((resolve, reject) => {
            let accountData;
            let riskProfiles = [];
            let riskProfileData;
            // Flag to identify wether to send set risk profile  or modify risk profile
            let sendUpdateNotification = false;
            this.accountRepository
                .findById(accountId, {
                include: [
                    {
                        relation: 'riskProfileQuestionSubmittedAnswers',
                        scope: {
                            where: {
                                isActive: true
                            },
                            include: [
                                {
                                    relation: 'riskProfileQuestion',
                                    scope: {
                                        where: { isActive: true },
                                        include: [
                                            {
                                                relation: 'possibleAnswers',
                                                scope: {
                                                    where: { isActive: true }
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    },
                    { relation: 'riskProfile' },
                    { relation: 'primaryHolder' }
                ]
            }, options)
                .then(data => {
                if (!data) {
                    return Promise.reject(new common_1.RestError(404, 'Account not found', { systemcode: 1086 }));
                }
                accountData = data;
                // fetching new riskProfile ID.
                sendUpdateNotification = accountData.riskProfileId === null || accountData.riskProfileId === 0 ? false : true;
                return this.riskProfileRepository.find({
                    where: {
                        isActive: true
                    }
                }, options);
            })
                .then(data => {
                riskProfiles = data;
                let foundRiskProfile;
                let totalScore = 0;
                if (accountData &&
                    accountData.riskProfileQuestionSubmittedAnswers &&
                    accountData.riskProfileQuestionSubmittedAnswers &&
                    accountData.riskProfileQuestionSubmittedAnswers.length > 0) {
                    accountData.riskProfileQuestionSubmittedAnswers.forEach((submittedAnswer) => {
                        if (submittedAnswer &&
                            submittedAnswer.riskProfileQuestion &&
                            submittedAnswer.riskProfileQuestion &&
                            submittedAnswer.riskProfileQuestion.possibleAnswers &&
                            submittedAnswer.riskProfileQuestion.possibleAnswers &&
                            submittedAnswer.riskProfileQuestion.possibleAnswers.length > 0) {
                            let foundAnswer = submittedAnswer.riskProfileQuestion.possibleAnswers.filter((possibleAnswer) => {
                                return possibleAnswer.id === submittedAnswer.riskProfileQuestionPossibleAnswerId;
                            });
                            if (foundAnswer.length) {
                                totalScore += parseInt(foundAnswer[0].score);
                            }
                            totalScore = Number(totalScore.toFixed(2));
                        }
                    });
                }
                riskProfiles.forEach((riskProfile) => {
                    if (!foundRiskProfile && riskProfile.minScore <= totalScore && riskProfile.maxScore >= totalScore) {
                        foundRiskProfile = riskProfile;
                    }
                });
                if (foundRiskProfile) {
                    riskProfileData = foundRiskProfile;
                    accountData.riskProfileId = foundRiskProfile.id;
                    accountData.lastModifiedDate = new Date();
                    accountData.riskProfileUpdatedDate = new Date();
                    return this.accountRepository.save(accountData);
                }
                else {
                    return Promise.reject(new common_1.RestError(400, 'Risk profile could not be updated!', { systemcide: 1007 }));
                }
            })
                .then(async (data) => {
                if (sendUpdateNotification) {
                    //Modify riskProfile
                    await common_1.NotificationUtils.sendNotificationEvent({
                        accountId: accountId,
                        topicId: common_1.NotificationTopics.TOPICS.riskProfile.modify.value,
                        notificationType: common_1.NotificationTopics.TOPICS.riskProfile.modify.topic,
                        templateKeys: {
                            customerName: accountData.name,
                            date: (0, moment_timezone_1.default)().format('DD/MM/YY'),
                            emailId: 'mailto:smartwealth@hdfcbank.com',
                            fromRiskProfileName: accountData.riskProfile.name,
                            toRiskProfileName: riskProfileData.name
                        }
                    });
                }
                else {
                    //Set riskProfile
                    await common_1.NotificationUtils.sendNotificationEvent({
                        accountId: accountId,
                        topicId: common_1.NotificationTopics.TOPICS.riskProfile.set.value,
                        notificationType: common_1.NotificationTopics.TOPICS.riskProfile.set.topic,
                        templateKeys: {
                            riskProfileName: riskProfileData.name,
                            link: '',
                            customerName: accountData.name,
                            date: (0, moment_timezone_1.default)().format('DD/MM/YY'),
                            emailId: 'mailto:smartwealth@hdfcbank.com'
                        }
                    });
                }
                return resolve(data);
            })
                .catch(function (error) {
                common_1.LoggingUtils.error(error);
                return reject(error);
            });
        });
    }
    async submitRiskProfileAnswers(accountId, riskProfileAnswers, options) {
        return new Promise((resolve, reject) => {
            // need to find the account
            let account;
            this.accountRepository
                .findOne({
                where: {
                    id: accountId,
                    isActive: true
                }
            })
                .then((accountDetails) => {
                // need to find is entry of risk-profile data related to account already exist
                if (!accountDetails) {
                    return Promise.reject(new common_1.RestError(400, 'Account not found', { systemcode: 1086 }));
                }
                account = accountDetails;
                return this.riskProfileQuestionSubmittedAnswerRepository.find({
                    where: {
                        accountId: account.id,
                        isActive: true
                    }
                });
            })
                .then(riskProfileSubmittedAnswerDetails => {
                let promises = [];
                if (riskProfileSubmittedAnswerDetails.length > 0) {
                    // delete and move to history table
                    let jsonData = riskProfileSubmittedAnswerDetails.map((element) => {
                        return {
                            riskProfileQuestionId: element.riskProfileQuestionId,
                            riskProfilePossibleAnswerId: element.riskProfileQuestionPossibleAnswer
                        };
                    });
                    jsonData = JSON.stringify(jsonData);
                    promises = [
                        this.riskProfileQuestionSubmittedAnswerRepository.deleteAll({
                            where: {
                                accountId: account.id,
                                isActive: true
                            }
                        }),
                        this.riskProfileHistoryRepository.create({
                            isSubmitted: true,
                            effectiveDate: new Date(),
                            riskProfileData: jsonData,
                            accountId: account.id,
                            riskProfileId: account.riskProfileId
                        })
                    ];
                }
                else if (account.riskProfileId) {
                    // for users who have already selected the risk profile without evaluating and came back to evaluate again
                    promises = [
                        this.riskProfileHistoryRepository.create({
                            isSubmitted: true,
                            effectiveDate: new Date(),
                            riskProfileData: '{}',
                            accountId: account.id,
                            riskProfileId: account.riskProfileId
                        })
                    ];
                }
                else {
                    return Promise.resolve({});
                }
                return Promise.all(promises);
            })
                .then(() => {
                // creating new values in risk-profile table
                let createData = [];
                riskProfileAnswers.forEach(element => {
                    let object = {
                        submitted: true,
                        riskProfileQuestionId: element.riskProfileQuestionId,
                        riskProfileQuestionPossibleAnswerId: element.riskProfileQuestionPossibleAnswerId,
                        accountId: accountId
                    };
                    createData.push(object);
                });
                return this.riskProfileQuestionSubmittedAnswerRepository.createAll(createData);
            })
                .then(() => {
                // calculate all the answers
                return this.calculateRiskProfile(accountId, options);
            })
                .then(async (account) => {
                await this.dataRefreshByAccountId(account.id);
                return resolve(account);
            })
                .catch((err) => {
                common_1.LoggingUtils.error(err);
                return reject(err);
            });
        });
    }
    async fetchNomineeDetailsById(id, isOnboardedNominee, options) {
        let metaData = { accountOpening: [], mfRTA: [] };
        let nomineeData = [];
        return new Promise((resolve, reject) => {
            this.accountRepository
                .findOne({
                where: {
                    id: id,
                    isActive: true
                },
                include: [
                    {
                        relation: 'investorNominees',
                        scope: {
                            include: [
                                {
                                    relation: 'appUser',
                                    scope: {
                                        include: [
                                            {
                                                relation: 'investorDetails'
                                            }
                                        ]
                                    }
                                },
                                {
                                    relation: 'relationship'
                                },
                                {
                                    relation: 'address',
                                    scope: {
                                        include: [
                                            {
                                                relation: 'state',
                                                scope: {
                                                    include: [
                                                        {
                                                            relation: 'country'
                                                        }
                                                    ]
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                ]
            }, options)
                .then(account => {
                if (!account) {
                    return Promise.reject(new common_1.RestError(404, 'Account not found', { systemcode: 1086 }));
                }
                if (account.investorNominees && account.investorNominees.length > 0) {
                    account.investorNominees.forEach((element) => {
                        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44, _45, _46, _47, _48;
                        let nomineeObject = { address: {} };
                        let accountOpeningObj = { address: {} };
                        let mfRTAObj = {};
                        if (element) {
                            nomineeObject.nomineeId = element.id ? element.id : null;
                            nomineeObject.name = element.appUser && ((_a = element.appUser) === null || _a === void 0 ? void 0 : _a.name) ? (_b = element.appUser) === null || _b === void 0 ? void 0 : _b.name : '';
                            nomineeObject.nomineeAppUserId = element.appUser && ((_c = element.appUser) === null || _c === void 0 ? void 0 : _c.id) ? (_d = element.appUser) === null || _d === void 0 ? void 0 : _d.id : null;
                            nomineeObject.relationshipName = element.relationship && ((_e = element.relationship) === null || _e === void 0 ? void 0 : _e.name) ? (_f = element.relationship) === null || _f === void 0 ? void 0 : _f.name : '';
                            nomineeObject.relationshipId = element.relationship && ((_g = element.relationship) === null || _g === void 0 ? void 0 : _g.id) ? (_h = element.relationship) === null || _h === void 0 ? void 0 : _h.id : null;
                            nomineeObject.percentage = (element === null || element === void 0 ? void 0 : element.nomineePercentage) ? element === null || element === void 0 ? void 0 : element.nomineePercentage : null;
                            nomineeObject.dateOfBirth =
                                (element === null || element === void 0 ? void 0 : element.appUser) && (element === null || element === void 0 ? void 0 : element.appUser.investorDetails) && ((_j = element === null || element === void 0 ? void 0 : element.appUser.investorDetails) === null || _j === void 0 ? void 0 : _j.birthDate)
                                    ? (_k = element === null || element === void 0 ? void 0 : element.appUser.investorDetails) === null || _k === void 0 ? void 0 : _k.birthDate
                                    : null;
                            nomineeObject.address.addressId = (element === null || element === void 0 ? void 0 : element.address) && ((_l = element === null || element === void 0 ? void 0 : element.address) === null || _l === void 0 ? void 0 : _l.id) ? (_m = element === null || element === void 0 ? void 0 : element.address) === null || _m === void 0 ? void 0 : _m.id : null;
                            nomineeObject.address.addressLine1 =
                                (element === null || element === void 0 ? void 0 : element.address) && ((_o = element === null || element === void 0 ? void 0 : element.address) === null || _o === void 0 ? void 0 : _o.addressLine1) ? (_p = element === null || element === void 0 ? void 0 : element.address) === null || _p === void 0 ? void 0 : _p.addressLine1 : '';
                            nomineeObject.address.addressLine2 =
                                (element === null || element === void 0 ? void 0 : element.address) && ((_q = element === null || element === void 0 ? void 0 : element.address) === null || _q === void 0 ? void 0 : _q.addressLine2) ? (_r = element === null || element === void 0 ? void 0 : element.address) === null || _r === void 0 ? void 0 : _r.addressLine2 : '';
                            nomineeObject.address.landmark = (element === null || element === void 0 ? void 0 : element.address) && ((_s = element === null || element === void 0 ? void 0 : element.address) === null || _s === void 0 ? void 0 : _s.landmark) ? (_t = element === null || element === void 0 ? void 0 : element.address) === null || _t === void 0 ? void 0 : _t.landmark : '';
                            nomineeObject.address.pincode = (element === null || element === void 0 ? void 0 : element.address) && ((_u = element === null || element === void 0 ? void 0 : element.address) === null || _u === void 0 ? void 0 : _u.pincode) ? (_v = element === null || element === void 0 ? void 0 : element.address) === null || _v === void 0 ? void 0 : _v.pincode : '';
                            nomineeObject.address.city = (element === null || element === void 0 ? void 0 : element.address) && ((_w = element === null || element === void 0 ? void 0 : element.address) === null || _w === void 0 ? void 0 : _w.city) ? (_x = element === null || element === void 0 ? void 0 : element.address) === null || _x === void 0 ? void 0 : _x.city : '';
                            nomineeObject.address.state =
                                (element === null || element === void 0 ? void 0 : element.address) && ((_y = element === null || element === void 0 ? void 0 : element.address) === null || _y === void 0 ? void 0 : _y.state) && ((_0 = (_z = element === null || element === void 0 ? void 0 : element.address) === null || _z === void 0 ? void 0 : _z.state) === null || _0 === void 0 ? void 0 : _0.name) ? (_2 = (_1 = element === null || element === void 0 ? void 0 : element.address) === null || _1 === void 0 ? void 0 : _1.state) === null || _2 === void 0 ? void 0 : _2.name : '';
                            nomineeObject.address.stateId =
                                (element === null || element === void 0 ? void 0 : element.address) && ((_3 = element === null || element === void 0 ? void 0 : element.address) === null || _3 === void 0 ? void 0 : _3.state) && ((_5 = (_4 = element === null || element === void 0 ? void 0 : element.address) === null || _4 === void 0 ? void 0 : _4.state) === null || _5 === void 0 ? void 0 : _5.id) ? (_7 = (_6 = element === null || element === void 0 ? void 0 : element.address) === null || _6 === void 0 ? void 0 : _6.state) === null || _7 === void 0 ? void 0 : _7.id : null;
                            nomineeObject.address.country =
                                (element === null || element === void 0 ? void 0 : element.address) && ((_8 = element === null || element === void 0 ? void 0 : element.address) === null || _8 === void 0 ? void 0 : _8.country) && ((_10 = (_9 = element === null || element === void 0 ? void 0 : element.address) === null || _9 === void 0 ? void 0 : _9.country) === null || _10 === void 0 ? void 0 : _10.name) ? (_12 = (_11 = element === null || element === void 0 ? void 0 : element.address) === null || _11 === void 0 ? void 0 : _11.country) === null || _12 === void 0 ? void 0 : _12.name : '';
                            nomineeObject.address.countryId =
                                (element === null || element === void 0 ? void 0 : element.address) && ((_13 = element === null || element === void 0 ? void 0 : element.address) === null || _13 === void 0 ? void 0 : _13.country) && ((_15 = (_14 = element === null || element === void 0 ? void 0 : element.address) === null || _14 === void 0 ? void 0 : _14.country) === null || _15 === void 0 ? void 0 : _15.id) ? (_17 = (_16 = element === null || element === void 0 ? void 0 : element.address) === null || _16 === void 0 ? void 0 : _16.country) === null || _17 === void 0 ? void 0 : _17.id : null;
                            nomineeObject.guardianRelationship = element.guardianRelationship;
                            nomineeObject.guardianName = element.guardianName;
                            accountOpeningObj.address.addressLine1 =
                                element.address && ((_18 = element.address) === null || _18 === void 0 ? void 0 : _18.addressLine1) ? (_19 = element === null || element === void 0 ? void 0 : element.address) === null || _19 === void 0 ? void 0 : _19.addressLine1 : '';
                            accountOpeningObj.address.pincode = element.address && ((_20 = element.address) === null || _20 === void 0 ? void 0 : _20.pincode) ? (_21 = element.address) === null || _21 === void 0 ? void 0 : _21.pincode : '';
                            accountOpeningObj.address.city = element.address && ((_22 = element.address) === null || _22 === void 0 ? void 0 : _22.city) ? (_23 = element === null || element === void 0 ? void 0 : element.address) === null || _23 === void 0 ? void 0 : _23.city : '';
                            accountOpeningObj.address.state =
                                element.address && element.address.state && ((_24 = element.address.state) === null || _24 === void 0 ? void 0 : _24.name) ? (_26 = (_25 = element === null || element === void 0 ? void 0 : element.address) === null || _25 === void 0 ? void 0 : _25.state) === null || _26 === void 0 ? void 0 : _26.name : '';
                            accountOpeningObj.name = element.appUser && ((_27 = element.appUser) === null || _27 === void 0 ? void 0 : _27.name) ? (_28 = element.appUser) === null || _28 === void 0 ? void 0 : _28.name : '';
                            accountOpeningObj.nomineeAppUserId = element.appUser && ((_29 = element.appUser) === null || _29 === void 0 ? void 0 : _29.id) ? (_30 = element.appUser) === null || _30 === void 0 ? void 0 : _30.id : null;
                            accountOpeningObj.relationshipName = element.relationship && ((_31 = element.relationship) === null || _31 === void 0 ? void 0 : _31.name) ? (_32 = element.relationship) === null || _32 === void 0 ? void 0 : _32.name : '';
                            accountOpeningObj.relationshipId = element.relationship && ((_33 = element.relationship) === null || _33 === void 0 ? void 0 : _33.id) ? (_34 = element.relationship) === null || _34 === void 0 ? void 0 : _34.id : null;
                            accountOpeningObj.dateOfBirth =
                                (element === null || element === void 0 ? void 0 : element.appUser) && (element === null || element === void 0 ? void 0 : element.appUser.investorDetails) && ((_35 = element === null || element === void 0 ? void 0 : element.appUser.investorDetails) === null || _35 === void 0 ? void 0 : _35.birthDate)
                                    ? (_36 = element === null || element === void 0 ? void 0 : element.appUser.investorDetails) === null || _36 === void 0 ? void 0 : _36.birthDate
                                    : null;
                            accountOpeningObj.nomineeId = element.id ? element.id : null;
                            accountOpeningObj.address.addressId = (element === null || element === void 0 ? void 0 : element.address) && ((_37 = element === null || element === void 0 ? void 0 : element.address) === null || _37 === void 0 ? void 0 : _37.id) ? (_38 = element === null || element === void 0 ? void 0 : element.address) === null || _38 === void 0 ? void 0 : _38.id : null;
                            mfRTAObj.nomineeId = element.id ? element.id : null;
                            mfRTAObj.name = element.appUser && ((_39 = element.appUser) === null || _39 === void 0 ? void 0 : _39.name) ? (_40 = element.appUser) === null || _40 === void 0 ? void 0 : _40.name : '';
                            mfRTAObj.nomineeAppUserId = element.appUser && ((_41 = element.appUser) === null || _41 === void 0 ? void 0 : _41.id) ? (_42 = element.appUser) === null || _42 === void 0 ? void 0 : _42.id : null;
                            mfRTAObj.relationshipName = element.relationship && ((_43 = element.relationship) === null || _43 === void 0 ? void 0 : _43.name) ? (_44 = element.relationship) === null || _44 === void 0 ? void 0 : _44.name : '';
                            mfRTAObj.relationshipId = element.relationship && ((_45 = element.relationship) === null || _45 === void 0 ? void 0 : _45.id) ? (_46 = element.relationship) === null || _46 === void 0 ? void 0 : _46.id : null;
                            mfRTAObj.percentage = (element === null || element === void 0 ? void 0 : element.nomineePercentage) ? element === null || element === void 0 ? void 0 : element.nomineePercentage : null;
                            mfRTAObj.dateOfBirth =
                                (element === null || element === void 0 ? void 0 : element.appUser) && (element === null || element === void 0 ? void 0 : element.appUser.investorDetails) && ((_47 = element === null || element === void 0 ? void 0 : element.appUser.investorDetails) === null || _47 === void 0 ? void 0 : _47.birthDate)
                                    ? (_48 = element === null || element === void 0 ? void 0 : element.appUser.investorDetails) === null || _48 === void 0 ? void 0 : _48.birthDate
                                    : null;
                            if (isOnboardedNominee) {
                                nomineeData.push(nomineeObject);
                                metaData.accountOpening.push(accountOpeningObj);
                                metaData.mfRTA.push(mfRTAObj);
                            }
                            else {
                                if (!(nomineeObject.name == '' ||
                                    nomineeObject.relationshipName == '' ||
                                    nomineeObject.dateOfBirth == null ||
                                    nomineeObject.relationshipId == null)) {
                                    nomineeData.push(nomineeObject);
                                }
                                if (!(accountOpeningObj.name == '' ||
                                    accountOpeningObj.relationshipName == '' ||
                                    accountOpeningObj.dateOfBirth == null ||
                                    accountOpeningObj.relationshipId == null)) {
                                    metaData.accountOpening.push(accountOpeningObj);
                                }
                                if (!(mfRTAObj.name == '' ||
                                    mfRTAObj.relationshipName == '' ||
                                    mfRTAObj.dateOfBirth == null ||
                                    mfRTAObj.relationshipId == null)) {
                                    metaData.mfRTA.push(mfRTAObj);
                                }
                            }
                        }
                    });
                }
                return resolve({ data: nomineeData, metaData: metaData });
            })
                .catch(reject);
        });
    }
    async fetchNomineeByAccountIdNew(accountId, isOnboardedNominee, options) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25;
        try {
            let nomineeData = [];
            let account;
            if (isOnboardedNominee) {
                account = await this.accountRepository.findOne({
                    where: {
                        id: accountId,
                        isActive: true
                    },
                    include: [
                        {
                            relation: 'investorNominees',
                            scope: {
                                include: [
                                    {
                                        relation: 'appUser',
                                        scope: {
                                            include: [
                                                {
                                                    relation: 'investorDetails'
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        relation: 'relationship'
                                    },
                                    {
                                        relation: 'address',
                                        scope: {
                                            include: [
                                                {
                                                    relation: 'state',
                                                    scope: {
                                                        include: [
                                                            {
                                                                relation: 'country'
                                                            }
                                                        ]
                                                    }
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        relation: 'guardianAddress',
                                        scope: {
                                            include: [
                                                {
                                                    relation: 'state',
                                                    scope: {
                                                        include: [
                                                            {
                                                                relation: 'country'
                                                            }
                                                        ]
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                ],
                                where: {
                                    isActive: true
                                }
                            }
                        }
                    ]
                }, options);
            }
            else {
                account = await this.accountRepository.findOne({
                    where: {
                        id: accountId,
                        isActive: true
                    },
                    include: [
                        {
                            relation: 'investorNominees',
                            scope: {
                                include: [
                                    {
                                        relation: 'appUser',
                                        scope: {
                                            include: [
                                                {
                                                    relation: 'investorDetails'
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        relation: 'relationship'
                                    },
                                    {
                                        relation: 'address',
                                        scope: {
                                            include: [
                                                {
                                                    relation: 'state',
                                                    scope: {
                                                        include: [
                                                            {
                                                                relation: 'country'
                                                            }
                                                        ]
                                                    }
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        relation: 'guardianAddress',
                                        scope: {
                                            include: [
                                                {
                                                    relation: 'state',
                                                    scope: {
                                                        include: [
                                                            {
                                                                relation: 'country'
                                                            }
                                                        ]
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                ],
                                where: {
                                    isActive: true,
                                    isMfNominee: false
                                }
                            }
                        }
                    ]
                }, options);
            }
            if (!account) {
                return Promise.reject(new common_1.RestError(404, 'Account not found', { systemcode: 1086 }));
            }
            if (account.investorNominees && account.investorNominees.length > 0) {
                for (let element of account.investorNominees) {
                    let nomineeObject = { nomineeAddress: {}, guardianAddress: {} };
                    nomineeObject.nomineeId = element.id ? element.id : null;
                    nomineeObject.name = element.appUser && ((_a = element.appUser) === null || _a === void 0 ? void 0 : _a.name) ? (_b = element.appUser) === null || _b === void 0 ? void 0 : _b.name : '';
                    nomineeObject.nomineeAppUserId = element.appUser && ((_c = element.appUser) === null || _c === void 0 ? void 0 : _c.id) ? (_d = element.appUser) === null || _d === void 0 ? void 0 : _d.id : null;
                    nomineeObject.relationshipId = element.relationship && ((_e = element.relationship) === null || _e === void 0 ? void 0 : _e.id) ? (_f = element.relationship) === null || _f === void 0 ? void 0 : _f.id : null;
                    nomineeObject.relationshipName = element.relationship && ((_g = element.relationship) === null || _g === void 0 ? void 0 : _g.name) ? (_h = element.relationship) === null || _h === void 0 ? void 0 : _h.name : '';
                    nomineeObject.percentage = (element === null || element === void 0 ? void 0 : element.nomineePercentage) ? element === null || element === void 0 ? void 0 : element.nomineePercentage : null;
                    nomineeObject.isMfNominee = element.isMfNominee;
                    nomineeObject.isSyncedViaBank = element.isSyncedViaBank;
                    nomineeObject.dateOfBirth =
                        (element === null || element === void 0 ? void 0 : element.appUser) && (element === null || element === void 0 ? void 0 : element.appUser.investorDetails) && ((_j = element === null || element === void 0 ? void 0 : element.appUser.investorDetails) === null || _j === void 0 ? void 0 : _j.birthDate)
                            ? (_k = element === null || element === void 0 ? void 0 : element.appUser.investorDetails) === null || _k === void 0 ? void 0 : _k.birthDate
                            : null;
                    nomineeObject.investorTypeId =
                        (element === null || element === void 0 ? void 0 : element.appUser) && (element === null || element === void 0 ? void 0 : element.appUser.investorDetails) && ((_l = element === null || element === void 0 ? void 0 : element.appUser.investorDetails) === null || _l === void 0 ? void 0 : _l.investorTypeId)
                            ? (_m = element === null || element === void 0 ? void 0 : element.appUser.investorDetails) === null || _m === void 0 ? void 0 : _m.investorTypeId
                            : null;
                    nomineeObject.nomineeAddress.addressId = element.address && element.address.id ? element.address.id : null;
                    nomineeObject.nomineeAddress.addressLine1 =
                        (element === null || element === void 0 ? void 0 : element.address) && ((_o = element === null || element === void 0 ? void 0 : element.address) === null || _o === void 0 ? void 0 : _o.addressLine1) ? (_p = element === null || element === void 0 ? void 0 : element.address) === null || _p === void 0 ? void 0 : _p.addressLine1 : '';
                    nomineeObject.nomineeAddress.addressLine2 =
                        (element === null || element === void 0 ? void 0 : element.address) && ((_q = element === null || element === void 0 ? void 0 : element.address) === null || _q === void 0 ? void 0 : _q.addressLine2) ? (_r = element === null || element === void 0 ? void 0 : element.address) === null || _r === void 0 ? void 0 : _r.addressLine2 : '';
                    nomineeObject.nomineeAddress.addressLine3 =
                        (element === null || element === void 0 ? void 0 : element.address) && ((_s = element === null || element === void 0 ? void 0 : element.address) === null || _s === void 0 ? void 0 : _s.addressLine3) ? (_t = element === null || element === void 0 ? void 0 : element.address) === null || _t === void 0 ? void 0 : _t.addressLine3 : '';
                    nomineeObject.nomineeAddress.landmark = (element === null || element === void 0 ? void 0 : element.address) && ((_u = element === null || element === void 0 ? void 0 : element.address) === null || _u === void 0 ? void 0 : _u.landmark) ? (_v = element === null || element === void 0 ? void 0 : element.address) === null || _v === void 0 ? void 0 : _v.landmark : '';
                    nomineeObject.nomineeAddress.city = (element === null || element === void 0 ? void 0 : element.address) && ((_w = element === null || element === void 0 ? void 0 : element.address) === null || _w === void 0 ? void 0 : _w.city) ? (_x = element === null || element === void 0 ? void 0 : element.address) === null || _x === void 0 ? void 0 : _x.city : '';
                    nomineeObject.nomineeAddress.pincode = (element === null || element === void 0 ? void 0 : element.address) && ((_y = element === null || element === void 0 ? void 0 : element.address) === null || _y === void 0 ? void 0 : _y.pincode) ? (_z = element === null || element === void 0 ? void 0 : element.address) === null || _z === void 0 ? void 0 : _z.pincode : '';
                    nomineeObject.nomineeAddress.state =
                        (element === null || element === void 0 ? void 0 : element.address) && ((_0 = element === null || element === void 0 ? void 0 : element.address) === null || _0 === void 0 ? void 0 : _0.state) && ((_2 = (_1 = element === null || element === void 0 ? void 0 : element.address) === null || _1 === void 0 ? void 0 : _1.state) === null || _2 === void 0 ? void 0 : _2.name) ? (_4 = (_3 = element === null || element === void 0 ? void 0 : element.address) === null || _3 === void 0 ? void 0 : _3.state) === null || _4 === void 0 ? void 0 : _4.name : '';
                    nomineeObject.nomineeAddress.stateId =
                        (element === null || element === void 0 ? void 0 : element.address) && ((_5 = element === null || element === void 0 ? void 0 : element.address) === null || _5 === void 0 ? void 0 : _5.state) && ((_7 = (_6 = element === null || element === void 0 ? void 0 : element.address) === null || _6 === void 0 ? void 0 : _6.state) === null || _7 === void 0 ? void 0 : _7.id) ? (_9 = (_8 = element === null || element === void 0 ? void 0 : element.address) === null || _8 === void 0 ? void 0 : _8.state) === null || _9 === void 0 ? void 0 : _9.id : null;
                    nomineeObject.nomineeAddress.countryId =
                        (element === null || element === void 0 ? void 0 : element.address) && ((_11 = (_10 = element === null || element === void 0 ? void 0 : element.address) === null || _10 === void 0 ? void 0 : _10.state) === null || _11 === void 0 ? void 0 : _11.country) && ((_14 = (_13 = (_12 = element === null || element === void 0 ? void 0 : element.address) === null || _12 === void 0 ? void 0 : _12.state) === null || _13 === void 0 ? void 0 : _13.country) === null || _14 === void 0 ? void 0 : _14.id)
                            ? (_17 = (_16 = (_15 = element === null || element === void 0 ? void 0 : element.address) === null || _15 === void 0 ? void 0 : _15.state) === null || _16 === void 0 ? void 0 : _16.country) === null || _17 === void 0 ? void 0 : _17.id
                            : null;
                    nomineeObject.nomineeAddress.country =
                        (element === null || element === void 0 ? void 0 : element.address) && ((_19 = (_18 = element === null || element === void 0 ? void 0 : element.address) === null || _18 === void 0 ? void 0 : _18.state) === null || _19 === void 0 ? void 0 : _19.country) && ((_22 = (_21 = (_20 = element === null || element === void 0 ? void 0 : element.address) === null || _20 === void 0 ? void 0 : _20.state) === null || _21 === void 0 ? void 0 : _21.country) === null || _22 === void 0 ? void 0 : _22.name)
                            ? (_25 = (_24 = (_23 = element === null || element === void 0 ? void 0 : element.address) === null || _23 === void 0 ? void 0 : _23.state) === null || _24 === void 0 ? void 0 : _24.country) === null || _25 === void 0 ? void 0 : _25.name
                            : '';
                    nomineeObject.guardianRelationship = element.guardianRelationship;
                    nomineeObject.guardianName = element.guardianName;
                    nomineeObject.guardianPanCardNumber = element.guardianPanCardNumber ? element.guardianPanCardNumber : '';
                    nomineeObject.guardianAddress.guardianAddressId =
                        element.guardianAddress && element.guardianAddress.id ? element.guardianAddress.id : null;
                    nomineeObject.guardianAddress.addressLine1 =
                        element.guardianAddress && element.guardianAddress.addressLine1 ? element.guardianAddress.addressLine1 : '';
                    nomineeObject.guardianAddress.addressLine2 =
                        element.guardianAddress && element.guardianAddress.addressLine2 ? element.guardianAddress.addressLine2 : '';
                    nomineeObject.guardianAddress.addressLine3 =
                        element.guardianAddress && element.guardianAddress.addressLine3 ? element.guardianAddress.addressLine3 : '';
                    nomineeObject.guardianAddress.landmark =
                        element.guardianAddress && element.guardianAddress.landmark ? element.guardianAddress.landmark : '';
                    nomineeObject.guardianAddress.city = element.guardianAddress && element.guardianAddress.city ? element.guardianAddress.city : '';
                    nomineeObject.guardianAddress.pincode =
                        element.guardianAddress && element.guardianAddress.pincode ? element.guardianAddress.pincode : '';
                    nomineeObject.guardianAddress.stateId =
                        element.guardianAddress && element.guardianAddress.state && element.guardianAddress.state.id
                            ? element.guardianAddress.state.id
                            : null;
                    nomineeObject.guardianAddress.state =
                        element.guardianAddress && element.guardianAddress.state && element.guardianAddress.state.name
                            ? element.guardianAddress.state.name
                            : '';
                    nomineeObject.guardianAddress.countryId =
                        element.guardianAddress &&
                            element.guardianAddress.state &&
                            element.guardianAddress.state.country &&
                            element.guardianAddress.state.country.id
                            ? element.guardianAddress.state.country.id
                            : null;
                    nomineeObject.guardianAddress.country =
                        element.guardianAddress &&
                            element.guardianAddress.state &&
                            element.guardianAddress.state.country &&
                            element.guardianAddress.state.country.name
                            ? element.guardianAddress.state.country.name
                            : '';
                    nomineeData.push(nomineeObject);
                }
            }
            const uniqueNomineeData = (0, lodash_1.uniqBy)(nomineeData, 'nomineeAppUserId');
            return uniqueNomineeData;
        }
        catch (error) {
            common_1.LoggingUtils.error(error);
            throw error;
        }
    }
    async updateNomineeDetailsById(id, nomineeAppUserId, nominee) {
        try {
            if (!nominee) {
                return Promise.reject(new common_1.RestError(400, 'Nominee Details required!', { systemcode: 1090 }));
            }
            let collectiveResponses = await Promise.all([
                this.accountRepository.findOne({
                    where: {
                        id: id,
                        isActive: true
                    }
                }),
                this.investorNomineeRepository.findOne({
                    where: {
                        accountId: id,
                        id: nominee.id,
                        isActive: true
                    },
                    include: [
                        {
                            relation: 'address'
                        },
                        {
                            relation: 'guardianAddress'
                        }
                    ]
                }),
                this.appUserRepository.findOne({
                    where: {
                        id: nomineeAppUserId,
                        isActive: true
                    }
                }),
                this.investorDetailsRepository.findOne({
                    where: {
                        appUserId: nomineeAppUserId,
                        isActive: true
                    }
                })
            ]).catch(err => {
                throw new Error(err);
            });
            const account = collectiveResponses[0];
            const investorNominee = collectiveResponses[1];
            const user = collectiveResponses[2];
            const investorDetails = collectiveResponses[3];
            //**** All the validations goes below */
            if (!account) {
                return Promise.reject(new common_1.RestError(404, 'Account not found', { systemcode: 1086 }));
            }
            if (nominee.nomineePercentage && nominee.nomineePercentage > 100) {
                return Promise.reject(new common_1.RestError(465, 'Nominee percentage can\t be more than 100%', { systemcode: 1377 }));
            }
            if (!investorNominee) {
                return Promise.reject(new common_1.RestError(404, 'Nominee details not found', { systemcode: 1378 }));
            }
            if (!user) {
                return Promise.reject(new common_1.RestError(404, 'User not found', { systemcode: 1030 }));
            }
            if (!investorDetails) {
                return Promise.reject(new common_1.RestError(404, 'Investor details not found', { systemcode: 1379 }));
            }
            if (nominee.dateOfBirth &&
                (0, moment_timezone_1.default)(nominee.dateOfBirth).isValid() &&
                (0, moment_timezone_1.default)((0, moment_timezone_1.default)().format('YYYY-MM-DD')).isSameOrBefore((0, moment_timezone_1.default)(nominee.dateOfBirth).format('YYYY-MM-DD'))) {
                return Promise.reject(new common_1.RestError(404, "Dob should be less than today's date", { systemcode: 1389 }));
            }
            let ageInYear = this.getAge(nominee.dateOfBirth);
            if (nominee.name && !app_constant_1.default.REGEX_ALPHABETS_WITH_SPACE.test(nominee.name)) {
                return Promise.reject(new common_1.RestError(404, "Nominee name shouldn't contains any special characters or numbers. Please update!!", { systemcode: 1390 }));
            }
            if (nominee.guardianName && !app_constant_1.default.REGEX_ALPHABETS_WITH_SPACE.test(nominee.guardianName) && ageInYear < 18) {
                return Promise.reject(new common_1.RestError(404, "Guardian name shouldn't contains any special characters or numbers. Please update!!", { systemcode: 1391 }));
            }
            //**** Validations end */
            const nomineeInvestorDetailID = investorDetails && (investorDetails === null || investorDetails === void 0 ? void 0 : investorDetails.id);
            let investorNomineeObj = {};
            let nomineeId = investorNominee && (investorNominee === null || investorNominee === void 0 ? void 0 : investorNominee.id);
            let isSyncedViaBank = investorNominee && (investorNominee === null || investorNominee === void 0 ? void 0 : investorNominee.isSyncedViaBank);
            //** updating investor details */
            await this.investorDetailsRepository
                .updateById(nomineeInvestorDetailID, {
                birthDate: (0, moment_timezone_1.default)(new Date(nominee.dateOfBirth)).utcOffset('+05:30').format('YYYY-MM-DD'),
                investorTypeId: nominee.investorTypeId
            })
                .catch(err => {
                throw new Error(err);
            });
            //***** update name in appuser and address defatils only if nominee is not sync from bank ****/
            let createdGuardianAddressDetails = {};
            let createdAddressDetails = {};
            //** updating name in user */
            await this.appUserRepository.updateById(nomineeAppUserId, { name: nominee.name }).catch(err => {
                throw new Error(err);
            });
            let nomineeAddressId = investorNominee === null || investorNominee === void 0 ? void 0 : investorNominee.addressId;
            let guardianAddressId = investorNominee === null || investorNominee === void 0 ? void 0 : investorNominee.guardianAddressId;
            //** updating nominee address details */
            if (nominee && nominee.nomineeAddress && nomineeAddressId) {
                let nomineeAddress = {};
                nomineeAddress.addressLine1 =
                    (nominee.nomineeAddress && nominee.nomineeAddress.addressLine1) || investorNominee.nomineeAddress.addressLine1 || '';
                nomineeAddress.addressLine2 = nominee.nomineeAddress.addressLine2;
                nomineeAddress.addressLine3 = nominee.nomineeAddress.addressLine3;
                // nomineeAddress.landmark =
                //   (nominee.nomineeAddress && nominee.nomineeAddress.landmark) || investorNominee.nomineeAddress.landmark || '';
                nomineeAddress.pincode = (nominee.nomineeAddress && nominee.nomineeAddress.pincode) || investorNominee.nomineeAddress.pincode || '';
                nomineeAddress.city = (nominee.nomineeAddress && nominee.nomineeAddress.city) || investorNominee.nomineeAddress.city || '';
                // nomineeAddress.district =
                //   (nominee.nomineeAddress && nominee.nomineeAddress.district) || investorNominee.nomineeAddress.district || '';
                nomineeAddress.stateId =
                    (nominee.nomineeAddress && nominee.nomineeAddress.stateId) || investorNominee.nomineeAddress.stateId || null;
                await this.addressRepository.updateById(nomineeAddressId, nomineeAddress).catch(err => {
                    throw new Error(err);
                });
            }
            else {
                createdAddressDetails = await this.addressRepository.create(nominee.nomineeAddress).catch(err => {
                    throw new Error(err);
                });
            }
            //** updating guardian address details if user is minor */
            if (nominee && nominee.guardianAddress && guardianAddressId && ageInYear <= 18) {
                let guardianAddress = {};
                guardianAddress.addressLine1 =
                    (nominee.guardianAddress && nominee.guardianAddress.addressLine1) || investorNominee.guardianAddress.addressLine1 || '';
                guardianAddress.addressLine2 = nominee.guardianAddress.addressLine2;
                guardianAddress.addressLine3 = nominee.guardianAddress.addressLine3;
                // guardianAddress.landmark =
                //   (nominee.guardianAddress && nominee.guardianAddress.landmark) || investorNominee.guardianAddress.landmark || '';
                guardianAddress.pincode =
                    (nominee.guardianAddress && nominee.guardianAddress.pincode) || investorNominee.guardianAddress.pincode || '';
                guardianAddress.city = (nominee.guardianAddress && nominee.guardianAddress.city) || investorNominee.guardianAddress.city || '';
                // guardianAddress.district =
                //   (nominee.guardianAddress && nominee.guardianAddress.district) || investorNominee.guardianAddress.district || '';
                guardianAddress.stateId =
                    (nominee.guardianAddress && nominee.guardianAddress.stateId) || investorNominee.guardianAddress.stateId || null;
                await this.addressRepository.updateById(guardianAddressId, guardianAddress).catch(err => {
                    throw new Error(err);
                });
            }
            else if (nominee.guardianAddress && !guardianAddressId && ageInYear <= 18) {
                createdGuardianAddressDetails = await this.addressRepository.create(nominee.guardianAddress).catch(err => {
                    throw new Error(err);
                });
            }
            // }
            //** creating investor nominee object with all updation values by default */
            investorNomineeObj = {
                relationshipId: (nominee === null || nominee === void 0 ? void 0 : nominee.relationshipId) || (investorNominee === null || investorNominee === void 0 ? void 0 : investorNominee.relationshipId),
                nomineePercentage: (nominee === null || nominee === void 0 ? void 0 : nominee.nomineePercentage) || (investorNominee === null || investorNominee === void 0 ? void 0 : investorNominee.nomineePercentage)
            };
            if (ageInYear < 18) {
                investorNomineeObj.guardianRelationship = nominee.guardianRelationship;
                investorNomineeObj.guardianName = nominee.guardianName;
                investorNomineeObj.guardianPanCardNumber = nominee.guardianPanCardNumber;
            }
            else {
                investorNomineeObj.guardianRelationship = null;
                investorNomineeObj.guardianName = null;
                investorNomineeObj.guardianPanCardNumber = null;
                investorNomineeObj.guardianAddressId = null;
            }
            if (createdGuardianAddressDetails && createdGuardianAddressDetails.id && ageInYear < 18) {
                investorNomineeObj.guardianAddressId = createdGuardianAddressDetails.id;
            }
            //creating address if not present.
            if (createdAddressDetails && createdAddressDetails.id) {
                investorNomineeObj.addressId = createdAddressDetails.id;
            }
            //** removing relationshipId in case of bank nominees */
            // if (isSyncedViaBank) {
            //   delete investorNomineeObj.relationshipId;
            // }
            //** updating investor nominee details */
            await this.investorNomineeRepository.updateById(nomineeId, investorNomineeObj).catch(err => {
                throw new Error(err);
            });
            return Promise.resolve({ success: true });
        }
        catch (err) {
            common_1.LoggingUtils.error(err.message);
            throw err;
        }
    }
    async getBankDetailsById(id, options) {
        let metaData = { accountOpening: [], mfRTA: [] };
        let data = [];
        return new Promise((resolve, reject) => {
            this.accountRepository
                .findOne({
                where: {
                    id: id,
                    isActive: true
                },
                include: [
                    'holdingType',
                    {
                        relation: 'bankAccounts',
                        scope: {
                            include: ['bankAccountType', 'bankBranch'],
                            where: {
                                isActive: true,
                                isDefault: true
                            }
                        }
                    }
                ]
            }, options)
                .then((account) => {
                if (!account) {
                    return Promise.reject(new common_1.RestError(404, 'Account not found', { systemcode: 1086 }));
                }
                if (account.bankAccounts && account.bankAccounts.length > 0) {
                    account.bankAccounts.forEach((bankAccount) => {
                        let object = {
                            accountNumber: '',
                            accountType: '',
                            ifscCode: '',
                            holdingPattern: ''
                        };
                        let accountOpeningObj = {
                            accountType: ''
                        };
                        object.accountNumber = bankAccount.accountNumber;
                        let type = bankAccount.bankAccountType && bankAccount.bankAccountType.name;
                        object.accountType = type;
                        object.ifscCode = bankAccount.bankBranch && bankAccount.bankBranch.ifscCode;
                        object.holdingPattern = account.holdingType && account.holdingType.name;
                        data.push(object);
                        accountOpeningObj.accountType = type;
                        metaData.mfRTA.push(object);
                        metaData.accountOpening.push(accountOpeningObj);
                    });
                }
                return resolve({ data: data, metaData: metaData });
            })
                .catch(reject);
        });
    }
    async getBankBalanceByAccountId(accountId, transactionId, options) {
        return new Promise((resolve, reject) => {
            this.accountRepository
                .findOne({
                where: {
                    id: accountId,
                    isActive: true
                },
                include: [
                    {
                        relation: 'bankAccounts',
                        scope: {
                            where: {
                                isDefault: true
                            }
                        }
                    }
                ]
            })
                .then((account) => {
                var _a;
                if (!account) {
                    return Promise.reject(new common_1.RestError(404, 'Account not found', { systemcode: 1086 }));
                }
                if (account.bankAccounts && account.bankAccounts.length > 0) {
                    let bankAccountNo = (_a = account === null || account === void 0 ? void 0 : account.bankAccounts[0]) === null || _a === void 0 ? void 0 : _a.accountNumber;
                    this.coreBankingRepository
                        .fetchCASADetailBalanceInquiry(bankAccountNo, transactionId)
                        .then((responseData) => {
                        if (responseData && responseData.responseString && responseData.responseString.casaBalanceInquiryDetailsDTO) {
                            return resolve({
                                bankBalance: responseData.responseString.casaBalanceInquiryDetailsDTO.amtNetAvailBal,
                                bankAccountNo: bankAccountNo
                            });
                        }
                        else {
                            return reject(new common_1.RestError(400, 'BankAccount details not available!', { systemcode: 1106 }));
                        }
                    })
                        .catch((err) => {
                        common_1.LoggingUtils.error(err);
                        return reject(err);
                    });
                }
            })
                .catch((err) => {
                common_1.LoggingUtils.error(err);
                return reject(err);
            });
        });
    }
    async getNomineesById(id, options) {
        let data = [];
        return new Promise((resolve, reject) => {
            this.investorNomineeRepository
                .find({
                where: {
                    accountId: id,
                    isActive: true
                },
                include: [
                    {
                        relation: 'appUser',
                        scope: {
                            include: ['investorDetails']
                        }
                    },
                    {
                        relation: 'bankAccount',
                        scope: {
                            where: {
                                accountId: id,
                                isActive: true
                            }
                        }
                    },
                    'relationship',
                    {
                        relation: 'serviceProviderAccount',
                        scope: {
                            where: {
                                accountId: id,
                                isActive: true
                            }
                        }
                    }
                ]
            }, options)
                .then(nominees => {
                if (!nominees) {
                    return Promise.reject(new common_1.RestError(404, 'Nominees are not found', { systemcode: 1108 }));
                }
                nominees.forEach((element) => {
                    var _a, _b;
                    let object = {};
                    object.name = element.appUser && element.appUser.name;
                    object.relationshipName = element.relationship && element.relationship.name;
                    object.nomineePercentage = element.nomineePercentage;
                    object.dateOfBirth =
                        element.appUser &&
                            element.appUser.investorDetails &&
                            (0, moment_timezone_1.default)((_b = (_a = element.appUser) === null || _a === void 0 ? void 0 : _a.investorDetails) === null || _b === void 0 ? void 0 : _b.birthDate).format('YYYY-MM-DD');
                    data.push(object);
                });
                return resolve(data);
            })
                .catch((err) => {
                common_1.LoggingUtils.error(err);
                return reject(err);
            });
        });
    }
    async getBankAccountsByAccountId(id, options) {
        let data = [];
        return new Promise((resolve, reject) => {
            this.accountRepository
                .findOne({
                where: {
                    id: id,
                    isActive: true
                },
                include: [
                    {
                        relation: 'bankAccounts',
                        scope: {
                            where: {
                                bankAccountStatus: 1,
                                isActive: true
                            },
                            include: ['bankAccountType', 'bankBranch', 'holdingType']
                        }
                    }
                ]
            }, options)
                .then((account) => {
                if (!account) {
                    return Promise.reject(new common_1.RestError(404, 'Account not found', { systemcode: 1086 }));
                }
                if (account.bankAccounts && account.bankAccounts.length > 0) {
                    account.bankAccounts.forEach((bankAccount) => {
                        if (bankAccount.holdingTypeId != 2) {
                            let object = {};
                            object.accountNumber = bankAccount.accountNumber;
                            let type = bankAccount.bankAccountType && bankAccount.bankAccountType.name;
                            object.id = bankAccount.id;
                            object.accountType = type;
                            object.accountName = bankAccount.accountName;
                            object.branchName = bankAccount.bankBranch && bankAccount.bankBranch.branchName;
                            object.holdingPattern = bankAccount.holdingType && bankAccount.holdingType.name;
                            object.holdingPatternId = bankAccount.holdingType && bankAccount.holdingType.id;
                            object.isDefault = bankAccount.isDefault;
                            object.isActive = bankAccount.isActive;
                            data.push(object);
                        }
                    });
                }
                return resolve(data);
            })
                .catch((err) => {
                common_1.LoggingUtils.error(err);
                return reject(err);
            });
        });
    }
    async fetchFolioByAccountId(accountId, instrumentId, options) {
        return new Promise((resolve, reject) => {
            let returnData = [];
            // check if holding exist
            this.holdingRepository
                .find({
                where: {
                    instrumentId: instrumentId,
                    isActive: true,
                    goalId: null
                },
                include: [
                    {
                        relation: 'serviceProviderAccount'
                    }
                ]
            }, options)
                .then((holdings) => {
                holdings.forEach(holding => {
                    if (holding.serviceProviderAccount && holding.serviceProviderAccount.accountId === accountId && holding.serviceProviderAccount.isHeldAway == false) {
                        returnData.push({
                            serviceProviderAccountNumber: holding.serviceProviderAccount.accountNumber,
                            serviceProviderAccountId: holding.serviceProviderAccount.id,
                            existingInvestment: 1,
                            isHeldAway: holding.serviceProviderAccount.isHeldAway
                        });
                    }
                });
                return this.instrumentRepository.findOne({
                    where: {
                        id: instrumentId,
                        isActive: true
                    }
                }, options);
            })
                .then((instrument) => {
                if (!instrument) {
                    return Promise.reject(new common_1.RestError(404, 'Instrument Not Found', { systemcode: 1110 }));
                }
                return this.serviceProviderAccountRepository.find({
                    where: {
                        accountId: accountId,
                        serviceProviderId: instrument.serviceProviderId,
                        isActive: true,
                        isHeldAway: false
                    }
                }, options);
            })
                .then((serviceProviderAccounts) => {
                if (serviceProviderAccounts.length) {
                    serviceProviderAccounts.forEach(serviceProviderAccount => {
                        let foundServiceProviderAccount = returnData.find((spAccount) => {
                            if (spAccount.serviceProviderAccountNumber === serviceProviderAccount.accountNumber) {
                                return spAccount;
                            }
                        });
                        if (!foundServiceProviderAccount) {
                            returnData.push({
                                serviceProviderAccountNumber: serviceProviderAccount.accountNumber,
                                serviceProviderAccountId: serviceProviderAccount.id,
                                existingInvestment: 0,
                                isHeldAway: serviceProviderAccount.isHeldAway
                            });
                        }
                    });
                }
                return resolve(returnData);
            })
                .catch(error => {
                common_1.LoggingUtils.error(error);
                return reject(error);
            });
        });
    }
    async updateRiskProfileByAccountId(accountId, riskProfileId, options) {
        return new Promise((resolve, reject) => {
            let accountData;
            let riskProfileData;
            // Flag to identify wether to send set risk profile  or modify risk profile
            let sendUpdateNotification = false;
            this.accountRepository
                .findOne({
                where: {
                    id: accountId,
                    isActive: true
                },
                include: ['riskProfile', 'primaryHolder']
            }, options)
                .then((account) => {
                if (!account) {
                    return Promise.reject(new common_1.RestError(404, 'Account Not Found', { systemcode: 1086 }));
                }
                accountData = account;
                // fetching new riskProfile ID.
                sendUpdateNotification = accountData.riskProfileId === null || accountData.riskProfileId === 0 ? false : true;
                return this.riskProfileRepository.findOne({
                    where: {
                        id: riskProfileId,
                        isActive: true
                    }
                }, options);
            })
                .then((riskProfile) => {
                if (!riskProfile) {
                    return Promise.reject(new common_1.RestError(404, 'Risk Profile Not Found', { systemcode: 1113 }));
                }
                riskProfileData = riskProfile;
                return this.accountRepository.updateAll({
                    riskProfileId: riskProfileId,
                    riskProfileUpdatedDate: new Date()
                }, {
                    id: accountData.id,
                    isActive: true
                });
            })
                .then(async () => {
                if (sendUpdateNotification) {
                    //Modify riskProfile
                    await common_1.NotificationUtils.sendNotificationEvent({
                        accountId: accountId,
                        topicId: common_1.NotificationTopics.TOPICS.riskProfile.modify.value,
                        notificationType: common_1.NotificationTopics.TOPICS.riskProfile.modify.topic,
                        templateKeys: {
                            customerName: accountData.name,
                            date: (0, moment_timezone_1.default)().format('DD/MM/YY'),
                            emailId: 'mailto:smartwealth@hdfcbank.com',
                            fromRiskProfileName: accountData.riskProfile.name,
                            toRiskProfileName: riskProfileData.name
                        }
                    });
                }
                else {
                    //Set riskProfile
                    await common_1.NotificationUtils.sendNotificationEvent({
                        accountId: accountId,
                        topicId: common_1.NotificationTopics.TOPICS.riskProfile.set.value,
                        notificationType: common_1.NotificationTopics.TOPICS.riskProfile.set.topic,
                        templateKeys: {
                            riskProfileName: riskProfileData.name,
                            link: '',
                            customerName: accountData.name,
                            date: (0, moment_timezone_1.default)().format('DD/MM/YY'),
                            emailId: 'mailto:smartwealth@hdfcbank.com'
                        }
                    });
                }
                return this.accountRepository.findOne({
                    where: {
                        id: accountId,
                        isActive: true
                    }
                }, options);
            })
                .then(async (account) => {
                if (!account) {
                    return Promise.reject(new common_1.RestError(404, 'Account Not Found'));
                }
                await this.dataRefreshByAccountId(account.id);
                return resolve(account);
            })
                /*.then(account => {
                  if (!account) {
                    return Promise.reject(new RestError(404, 'Account Not Found', {systemcode: 1086}));
                  }
                  return resolve(account);
                })*/
                .catch((err) => {
                common_1.LoggingUtils.error(err);
                return reject(err);
            });
        });
    }
    async updateSkippedNomineeById(id, skippedNomineeRequest, options) {
        //update the skipe nominee
        return new Promise(async (resolve, reject) => {
            await this.markNomineeDetailsAsUpdated(id, options);
            if (!skippedNomineeRequest || skippedNomineeRequest.skippedNominee == null)
                return Promise.reject(new common_1.RestError(400, 'Invalid request body', { systemcode: 1114 }));
            this.accountRepository
                .findOne({
                where: {
                    id: id,
                    isActive: true
                }
            })
                .then(account => {
                if (!account) {
                    return Promise.reject(new common_1.RestError(404, 'Account not found', { systemcode: 1086 }));
                }
                account.skippedNominee = skippedNomineeRequest.skippedNominee;
                return this.accountRepository.save(account);
            })
                .then(accountData => {
                // update primary user status
                return this.appUserRepository.updateAll({ appUserStatus: common_1.Option.GLOBALOPTIONS.APPUSERSTATUS['nomineeCompleted'].value }, { id: accountData.primaryHolderId, isActive: true });
            })
                .then(() => {
                resolve({ success: true });
            })
                .catch(err => {
                common_1.LoggingUtils.error(err);
                return reject(err);
            });
        });
    }
    /**
     * Method to send message to transcation refresher Queue
     * @param id
     * @returns
     */
    async dataRefreshByAccountId(id) {
        try {
            let message = new common_1.TransactionalDataRefreshingQueueMessage();
            message.eventType = common_1.TransactionalDataRefreshingQueueMessageEventType.DATA_REFRESH_BY_ACCOUNT_ID;
            message.accountId = id;
            await common_1.QueueProducer.sendMessageInTransactionalDataRefreshingQueue(message).catch(err => {
                throw new Error(err);
            });
            return { success: true };
        }
        catch (error) {
            common_1.LoggingUtils.error('Some Error Occured');
            return new common_1.RestError(400, 'Error occured while sending Message Queue', { systemcode: 1010 });
        }
    }
    /**
     * Method to send message to Fatca generation Queue
     * @param id
     * @returns
     */
    async fatcaGenerationByAccountId(id) {
        try {
            let message = new common_1.TransactionalDataRefreshingQueueMessage();
            message.eventType = common_1.TransactionalDataRefreshingQueueMessageEventType.FATCA_FILE_GENERATION_BY_ACCOUNT_ID;
            message.accountId = id;
            await common_1.QueueProducer.sendMessageInTransactionalDataRefreshingQueue(message).catch(err => {
                throw new Error(err);
            });
            return { success: true };
        }
        catch (error) {
            common_1.LoggingUtils.error('Some Error Occured');
            return new common_1.RestError(400, 'Error occured while sending Message Queue', { systemcode: 1010 });
        }
    }
    async exportInvestorMaster(filter, exportFormat, res, options) {
        try {
            let xlsHeaders = [
                { header: 'Investor ID', key: 'Investor ID', width: 32 },
                { header: 'Bank Customer ID', key: 'Primary Holder BosCode', width: 32 },
                { header: 'Registration Status', key: 'Registration Status', width: 32 },
                { header: 'AOF Status', key: 'AOF_STATUS', width: 32 },
                { header: 'Primary Holder Name', key: 'Primary Holder Name', width: 32 },
                { header: 'Primary Holder Contact', key: 'Primary Holder Contact', width: 32 },
                { header: 'Primary Holder Email', key: 'Primary Holder Email', width: 32 },
                { header: 'Primary Holder PAN', key: 'Primary Holder PAN', width: 32 },
                { header: 'Primary Holder DOB', key: 'Primary Holder DOB', width: 32 },
                { header: 'Primary Holder KYC Status', key: 'Primary Holder KYC Status', width: 32 },
                { header: 'Primary Holder FATCA Status', key: 'Primary Holder FATCA Status', width: 32 },
                { header: 'Primary Holder FATCA Gender', key: 'Primary Holder FATCA Gender', width: 32 },
                { header: 'Primary Holder Onboarding Date', key: 'Primary Holder Onboarding Date', width: 32 },
                { header: 'Primary Holder Place of Birth', key: 'Primary Holder Place of Birth', width: 32 },
                { header: 'Primary Holder Country of Birth ', key: 'Primary Holder Country of Birth', width: 32 },
                { header: 'Primary Holder Occupation', key: 'Primary Holder Occupation', width: 32 },
                { header: 'Primary Holder Politically Exposed', key: 'Primary Holder Politically Exposed', width: 32 },
                { header: 'Primary Holder Wealth Source', key: 'Primary Holder Wealth Source', width: 32 },
                { header: 'Primary Holder Income Slab', key: 'Primary Holder Income Slab', width: 32 },
                { header: 'Primary Holder Tax Resident Outside India', key: 'Primary Holder Tax Resident Outside India', width: 32 },
                { header: 'Primary Holder Tax Resident Country', key: 'Primary Holder Tax Resident Country', width: 32 },
                { header: 'Secondary Holder Name', key: 'Secondary Holder Name', width: 32 },
                { header: 'Secondary Holder Contact', key: 'Secondary Holder Contact', width: 32 },
                { header: 'Secondary Holder Email', key: 'Secondary Holder Email', width: 32 },
                { header: 'Secondary Holder PAN ', key: 'Secondary Holder PAN ', width: 32 },
                { header: 'Secondary Holder DOB', key: 'Secondary Holder DOB', width: 32 },
                { header: 'Secondary Holder KYC Status', key: 'Secondary Holder KYC Status', width: 32 },
                { header: 'Secondary Holder FATCA Status', key: 'Secondary Holder FATCA Status', width: 32 },
                { header: 'Secondary Holder FATCA Gender', key: 'Secondary Holder FATCA Gender', width: 32 },
                { header: 'Secondary Holder Onboarding Date', key: 'Secondary Holder Onboarding Date', width: 32 },
                { header: 'Secondary Holder Place of Birth', key: 'Secondary Holder Place of Birth', width: 32 },
                { header: 'Secondary Holder Country of Birth ', key: 'Secondary Holder Country of Birth ', width: 32 },
                { header: 'Secondary Holder Occupation', key: 'Secondary Holder Occupation', width: 32 },
                { header: 'Secondary Holder Politically Exposed', key: 'Secondary Holder Politically Exposed', width: 32 },
                { header: 'Secondary Holder Wealth Source', key: 'Secondary Holder Wealth Source', width: 32 },
                { header: 'Secondary Holder Income Slab', key: 'Secondary Holder Income Slab', width: 32 },
                { header: 'Secondary Holder Tax Resident Outside India', key: 'Secondary Holder Tax Resident Outside India', width: 32 },
                { header: 'Secondary Holder Tax Resident Country', key: 'Secondary Holder Tax Resident Country', width: 32 },
                { header: 'Tertiary Holder Name', key: 'Tertiary Holder Name', width: 32 },
                { header: 'Tertiary Holder Contact', key: 'Tertiary Holder Contact', width: 32 },
                { header: 'Tertiary Holder Email', key: 'Tertiary Holder Email', width: 32 },
                { header: 'Tertiary Holder PAN', key: 'Tertiary Holder PAN', width: 32 },
                { header: 'Tertiary Holder DOB', key: 'Tertiary Holder DOB', width: 32 },
                { header: 'Tertiary Holder KYC Status', key: 'Tertiary Holder KYC Status', width: 32 },
                { header: 'Tertiary Holder FATCA Status', key: 'Tertiary Holder FATCA Status', width: 32 },
                { header: 'Tertiary Holder FATCA Gender', key: 'Tertiary Holder FATCA Gender', width: 32 },
                { header: 'Tertiary Holder Onboarding Date', key: 'Tertiary Holder Onboarding Date', width: 32 },
                { header: 'Tertiary Holder Place of Birth', key: 'Tertiary Holder Place of Birth', width: 32 },
                { header: 'Tertiary Holder Country of Birth ', key: 'Tertiary Holder Country of Birth ', width: 32 },
                { header: 'Tertiary Holder Occupation', key: 'Tertiary Holder Occupation', width: 32 },
                { header: 'Tertiary Holder Politically Exposed', key: 'Tertiary Holder Politically Exposed', width: 32 },
                { header: 'Tertiary Holder Wealth Source', key: 'Tertiary Holder Wealth Source', width: 32 },
                { header: 'Tertiary Holder Income Slab', key: 'Tertiary Holder Income Slab', width: 32 },
                { header: 'Tertiary Holder Tax Resident Outside India', key: 'Tertiary Holder Tax Resident Outside India', width: 32 },
                { header: 'Tertiary Holder Tax Resident Country', key: 'Tertiary Holder Tax Resident Country', width: 32 },
                { header: 'Activation Date', key: 'Activation Date', width: 32 },
                { header: 'Date Of Onboarding', key: 'Date Of Onboarding', width: 32 },
                { header: 'Risk Profile', key: 'Risk Profile', width: 32 }
            ];
            const rawdata = await this.investorMasterDetails(filter, options);
            let nomineeHeaders = [];
            let bankAccountHeaders = [];
            let xls = (0, underscore_1.map)(rawdata.data, (data) => {
                var _a, _b;
                let xlsFormat = {};
                const primaryHolder = data.primaryHolder;
                const secondaryHolder = data.secondaryHolder;
                const tertiaryHolder = data.tertiaryHolder;
                const investorNominees = data.investorNominees ? data.investorNominees : null;
                const bankAccounts = data.bankAccounts ? (data.bankAccounts.length > 0 ? data.bankAccounts : null) : null;
                const riskProfile = data.riskProfile;
                // console.log(data)
                const accountAppFileMapping = data === null || data === void 0 ? void 0 : data.accountAppFileMapping;
                xlsFormat['Investor ID'] = data.uniqueId;
                xlsFormat['Primary Holder BosCode'] = primaryHolder ? (primaryHolder.bosCode ? primaryHolder.bosCode : '') : '';
                xlsFormat['Registration Status'] = primaryHolder ? (primaryHolder.appUserStatusLabel ? primaryHolder.appUserStatusLabel : '') : '';
                xlsFormat['Primary Holder Name'] = primaryHolder ? primaryHolder.name : '';
                xlsFormat['Primary Holder Contact'] = primaryHolder ? primaryHolder.contactNumber : '';
                xlsFormat['Primary Holder Email'] = primaryHolder ? primaryHolder.email : '';
                xlsFormat['Primary Holder PAN'] = primaryHolder
                    ? primaryHolder.investorDetails
                        ? primaryHolder.investorDetails.panCardNumber
                            ? primaryHolder.investorDetails.panCardNumber
                            : ''
                        : ''
                    : '';
                xlsFormat['Primary Holder DOB'] = primaryHolder
                    ? primaryHolder.investorDetails
                        ? primaryHolder.investorDetails.birthDate
                            ? (0, moment_timezone_1.default)(primaryHolder.investorDetails.birthDate).format('DD-MMM-YYYY')
                            : ''
                        : ''
                    : '';
                xlsFormat['Primary Holder KYC Status'] = primaryHolder
                    ? primaryHolder.investorDetails
                        ? primaryHolder.investorDetails.kycStatusLabel
                            ? primaryHolder.investorDetails.kycStatusLabel
                            : ''
                        : ''
                    : '';
                xlsFormat['Primary Holder FATCA Status'] = primaryHolder
                    ? primaryHolder.investorDetails
                        ? primaryHolder.investorDetails.fatcaRegistrationStatusLabel
                            ? primaryHolder.investorDetails.fatcaRegistrationStatusLabel
                            : ''
                        : ''
                    : '';
                xlsFormat['Primary Holder FATCA Gender'] = primaryHolder ? primaryHolder.genderLabel : '';
                xlsFormat['Primary Holder Onboarding Date'] = primaryHolder ? (0, moment_timezone_1.default)(primaryHolder.createdDate).format('DD-MMM-YYYY') : '';
                xlsFormat['Primary Holder Place of Birth'] = primaryHolder
                    ? primaryHolder.investorDetails
                        ? primaryHolder.investorDetails.birthCity
                            ? primaryHolder.investorDetails.birthCity
                            : ''
                        : ''
                    : '';
                xlsFormat['Primary Holder Country of Birth'] = primaryHolder
                    ? primaryHolder.investorDetails
                        ? primaryHolder.investorDetails.countryOfBirth
                            ? primaryHolder.investorDetails.countryOfBirth.name
                                ? primaryHolder.investorDetails.countryOfBirth.name
                                : ''
                            : ''
                        : ''
                    : '';
                xlsFormat['Primary Holder Occupation'] = primaryHolder
                    ? primaryHolder.investorDetails
                        ? primaryHolder.investorDetails.occupation
                            ? primaryHolder.investorDetails.occupation.name
                                ? primaryHolder.investorDetails.occupation.name
                                : ''
                            : ''
                        : ''
                    : '';
                xlsFormat['Primary Holder Politically Exposed'] = primaryHolder
                    ? primaryHolder.investorDetails
                        ? primaryHolder.investorDetails.politicallyExposureType
                            ? primaryHolder.investorDetails.politicallyExposureType.name
                                ? primaryHolder.investorDetails.politicallyExposureType.name
                                : ''
                            : ''
                        : ''
                    : '';
                xlsFormat['Primary Holder Wealth Source'] = primaryHolder
                    ? primaryHolder.investorDetails
                        ? primaryHolder.investorDetails.wealthSource
                            ? primaryHolder.investorDetails.wealthSource.name
                                ? primaryHolder.investorDetails.wealthSource.name
                                : ''
                            : ''
                        : ''
                    : '';
                xlsFormat['Primary Holder Income Slab'] = primaryHolder
                    ? primaryHolder.investorDetails
                        ? primaryHolder.investorDetails.incomeSlab
                            ? primaryHolder.investorDetails.incomeSlab.name
                                ? primaryHolder.investorDetails.incomeSlab.name
                                : ''
                            : ''
                        : ''
                    : '';
                xlsFormat['Primary Holder Tax Resident Outside India'] = primaryHolder
                    ? primaryHolder.investorDetails
                        ? primaryHolder.investorDetails.taxResidentCountryId
                            ? primaryHolder.investorDetails.taxResidentCountryId
                                ? primaryHolder.investorDetails.taxResidentCountryId !== 106
                                    ? 'Yes'
                                    : 'NO'
                                : ''
                            : ''
                        : ''
                    : '';
                xlsFormat['Primary Holder Tax Resident Country'] = primaryHolder
                    ? primaryHolder.investorDetails
                        ? primaryHolder.investorDetails.taxResidentCountry
                            ? primaryHolder.investorDetails.taxResidentCountry.name
                                ? primaryHolder.investorDetails.taxResidentCountry.name
                                : ''
                            : ''
                        : ''
                    : '';
                xlsFormat['Secondary Holder Name'] = secondaryHolder ? secondaryHolder.name : '';
                xlsFormat['Secondary Holder Contact'] = secondaryHolder ? secondaryHolder.contactNumber : '';
                xlsFormat['Secondary Holder Email'] = secondaryHolder ? secondaryHolder.email : '';
                xlsFormat['Secondary Holder PAN  '] = secondaryHolder
                    ? secondaryHolder.investorDetails
                        ? secondaryHolder.investorDetails.panCardNumber
                            ? secondaryHolder.investorDetails.panCardNumber
                            : ''
                        : ''
                    : '';
                xlsFormat['Secondary Holder DOB'] = secondaryHolder
                    ? secondaryHolder.investorDetails
                        ? secondaryHolder.investorDetails.birthDate
                            ? (0, moment_timezone_1.default)(secondaryHolder.investorDetails.birthDate).format('DD-MMM-YYYY')
                            : ''
                        : ''
                    : '';
                xlsFormat['Secondary Holder KYC Status'] = secondaryHolder
                    ? secondaryHolder.investorDetails
                        ? secondaryHolder.investorDetails.kycStatusLabel
                            ? secondaryHolder.investorDetails.kycStatusLabel
                            : ''
                        : ''
                    : '';
                xlsFormat['Secondary Holder FATCA Status'] = secondaryHolder
                    ? secondaryHolder.investorDetails
                        ? secondaryHolder.investorDetails.fatcaRegistrationStatusLabel
                            ? secondaryHolder.investorDetails.fatcaRegistrationStatusLabel
                            : ''
                        : ''
                    : '';
                xlsFormat['Secondary Holder FATCA Gender'] = secondaryHolder ? secondaryHolder.genderLabel : '';
                xlsFormat['Secondary Holder Onboarding Date'] = secondaryHolder ? (0, moment_timezone_1.default)(secondaryHolder.createdDate).format('DD-MMM-YYYY') : '';
                xlsFormat['Secondary Holder Place of Birth'] = secondaryHolder
                    ? secondaryHolder.investorDetails
                        ? secondaryHolder.investorDetails.stateOfBirth
                            ? secondaryHolder.investorDetails.stateOfBirth.name
                                ? secondaryHolder.investorDetails.stateOfBirth.name
                                : ''
                            : ''
                        : ''
                    : '';
                xlsFormat['Secondary Holder Country of Birth'] = secondaryHolder
                    ? secondaryHolder.investorDetails
                        ? secondaryHolder.investorDetails.countryOfBirth
                            ? secondaryHolder.investorDetails.countryOfBirth.name
                                ? secondaryHolder.investorDetails.countryOfBirth.name
                                : ''
                            : ''
                        : ''
                    : '';
                xlsFormat['Secondary Holder Occupation'] = secondaryHolder
                    ? secondaryHolder.investorDetails
                        ? secondaryHolder.investorDetails.occupation
                            ? secondaryHolder.investorDetails.occupation.name
                                ? secondaryHolder.investorDetails.occupation.name
                                : ''
                            : ''
                        : ''
                    : '';
                xlsFormat['Secondary Holder Politically Exposed'] = secondaryHolder
                    ? secondaryHolder.investorDetails
                        ? secondaryHolder.investorDetails.politicallyExposureType
                            ? secondaryHolder.investorDetails.politicallyExposureType.name
                                ? secondaryHolder.investorDetails.politicallyExposureType.name
                                : ''
                            : ''
                        : ''
                    : '';
                xlsFormat['Secondary Holder Wealth Source'] = secondaryHolder
                    ? secondaryHolder.investorDetails
                        ? secondaryHolder.investorDetails.wealthSource
                            ? secondaryHolder.investorDetails.wealthSource.name
                                ? secondaryHolder.investorDetails.wealthSource.name
                                : ''
                            : ''
                        : ''
                    : '';
                xlsFormat['Secondary Holder Income Slab'] = secondaryHolder
                    ? secondaryHolder.investorDetails
                        ? secondaryHolder.investorDetails.incomeSlab
                            ? secondaryHolder.investorDetails.incomeSlab.name
                                ? secondaryHolder.investorDetails.incomeSlab.name
                                : ''
                            : ''
                        : ''
                    : '';
                xlsFormat['Secondary Holder Tax Resident Outside India'] = secondaryHolder
                    ? secondaryHolder.investorDetails
                        ? secondaryHolder.investorDetails.taxResidentCountryId
                            ? secondaryHolder.investorDetails.taxResidentCountryId
                                ? secondaryHolder.investorDetails.taxResidentCountryId !== 106
                                    ? 'Yes'
                                    : 'NO'
                                : ''
                            : ''
                        : ''
                    : '';
                xlsFormat['Secondary Holder Tax Resident Country'] = secondaryHolder
                    ? secondaryHolder.investorDetails
                        ? secondaryHolder.investorDetails.taxResidentCountry
                            ? secondaryHolder.investorDetails.taxResidentCountry.name
                                ? secondaryHolder.investorDetails.taxResidentCountry.name
                                : ''
                            : ''
                        : ''
                    : '';
                xlsFormat['Tertiary Holder Name'] = tertiaryHolder ? tertiaryHolder.name : '';
                xlsFormat['Tertiary Holder Contact'] = tertiaryHolder ? tertiaryHolder.contactNumber : '';
                xlsFormat['Tertiary Holder Email'] = tertiaryHolder ? tertiaryHolder.email : '';
                xlsFormat['Tertiary Holder PAN'] = tertiaryHolder
                    ? tertiaryHolder.investorDetails
                        ? tertiaryHolder.investorDetails.panCardNumber
                            ? tertiaryHolder.investorDetails.panCardNumber
                            : ''
                        : ''
                    : '';
                xlsFormat['Tertiary Holder DOB'] = tertiaryHolder
                    ? tertiaryHolder.investorDetails
                        ? tertiaryHolder.investorDetails.birthDate
                            ? (0, moment_timezone_1.default)(tertiaryHolder.investorDetails.birthDate).format('DD-MMM-YYYY')
                            : ''
                        : ''
                    : '';
                xlsFormat['Tertiary Holder KYC Status'] = tertiaryHolder
                    ? tertiaryHolder.investorDetails
                        ? tertiaryHolder.investorDetails.kycStatusLabel
                            ? tertiaryHolder.investorDetails.kycStatusLabel
                            : ''
                        : ''
                    : '';
                xlsFormat['Tertiary Holder FATCA Status '] = tertiaryHolder
                    ? tertiaryHolder.investorDetails
                        ? tertiaryHolder.investorDetails.fatcaRegistrationStatusLabel
                            ? tertiaryHolder.investorDetails.fatcaRegistrationStatusLabel
                            : ''
                        : ''
                    : '';
                xlsFormat['Tertiary Holder FATCA Gender'] = tertiaryHolder ? tertiaryHolder.genderLabel : '';
                xlsFormat['Tertiary Holder Onboarding Date'] = tertiaryHolder ? (0, moment_timezone_1.default)(tertiaryHolder.createdDate).format('DD-MMM-YYYY') : '';
                xlsFormat['Tertiary Holder Place of Birth'] = tertiaryHolder
                    ? tertiaryHolder.investorDetails
                        ? tertiaryHolder.investorDetails.stateOfBirth
                            ? tertiaryHolder.investorDetails.stateOfBirth.name
                                ? tertiaryHolder.investorDetails.stateOfBirth.name
                                : ''
                            : ''
                        : ''
                    : '';
                xlsFormat['Tertiary Holder Country of Birth'] = tertiaryHolder
                    ? tertiaryHolder.investorDetails
                        ? tertiaryHolder.investorDetails.countryOfBirth
                            ? tertiaryHolder.investorDetails.countryOfBirth.name
                                ? tertiaryHolder.investorDetails.countryOfBirth.name
                                : ''
                            : ''
                        : ''
                    : '';
                xlsFormat['Tertiary Holder Occupation'] = tertiaryHolder
                    ? tertiaryHolder.investorDetails
                        ? tertiaryHolder.investorDetails.occupation
                            ? tertiaryHolder.investorDetails.occupation.name
                                ? tertiaryHolder.investorDetails.occupation.name
                                : ''
                            : ''
                        : ''
                    : '';
                xlsFormat['Tertiary Holder Politically Exposed'] = tertiaryHolder
                    ? tertiaryHolder.investorDetails
                        ? tertiaryHolder.investorDetails.politicallyExposureType
                            ? tertiaryHolder.investorDetails.politicallyExposureType.name
                                ? tertiaryHolder.investorDetails.politicallyExposureType.name
                                : ''
                            : ''
                        : ''
                    : '';
                xlsFormat['Tertiary Holder Wealth Source'] = tertiaryHolder
                    ? tertiaryHolder.investorDetails
                        ? tertiaryHolder.investorDetails.wealthSource
                            ? tertiaryHolder.investorDetails.wealthSource.name
                                ? tertiaryHolder.investorDetails.wealthSource.name
                                : ''
                            : ''
                        : ''
                    : '';
                xlsFormat['Tertiary Holder Income Slab'] = tertiaryHolder
                    ? tertiaryHolder.investorDetails
                        ? tertiaryHolder.investorDetails.incomeSlab
                            ? tertiaryHolder.investorDetails.incomeSlab.name
                                ? tertiaryHolder.investorDetails.incomeSlab.name
                                : ''
                            : ''
                        : ''
                    : '';
                xlsFormat['Tertiary Holder Tax Resident Outside India'] = tertiaryHolder
                    ? tertiaryHolder.investorDetails
                        ? tertiaryHolder.investorDetails.taxResidentCountryId
                            ? tertiaryHolder.investorDetails.taxResidentCountryId
                                ? tertiaryHolder.investorDetails.taxResidentCountryId !== 106
                                    ? 'Yes'
                                    : 'NO'
                                : ''
                            : ''
                        : ''
                    : '';
                xlsFormat['Tertiary Holder Tax Resident Country'] = tertiaryHolder
                    ? tertiaryHolder.investorDetails
                        ? tertiaryHolder.investorDetails.taxResidentCountry
                            ? tertiaryHolder.investorDetails.taxResidentCountry.name
                                ? tertiaryHolder.investorDetails.taxResidentCountry.name
                                : ''
                            : ''
                        : ''
                    : '';
                xlsFormat['AOF_STATUS'] = 'NO';
                if (accountAppFileMapping != undefined) {
                    for (let item of accountAppFileMapping)
                        if (((_a = item === null || item === void 0 ? void 0 : item.userManagementAppFile) === null || _a === void 0 ? void 0 : _a.isActive) == true &&
                            ((_b = item === null || item === void 0 ? void 0 : item.userManagementAppFile) === null || _b === void 0 ? void 0 : _b.containerName) == common_1.FileStorageContainerConfig.getGcpContainerName('aof')) {
                            xlsFormat['AOF_STATUS'] = 'YES';
                        }
                }
                // investor nominee check
                if (investorNominees !== null) {
                    investorNominees.forEach((investorNominee, key) => {
                        let xlsFormatn = {};
                        if (key < 3) {
                            xlsFormatn[`Nominee ${key + 1} Name`] = investorNominee.appUser ? investorNominee.appUser.name : '';
                            xlsFormatn[`Nominee ${key + 1} Relationship`] = investorNominee
                                ? investorNominee.relationship
                                    ? investorNominee.relationship.name
                                        ? investorNominee.relationship.name
                                        : ''
                                    : ''
                                : '';
                            xlsFormatn[`Nominee ${key + 1} Status`] = investorNominee
                                ? investorNominee.appUser
                                    ? investorNominee.appUser.appUserStatusLabel
                                        ? investorNominee.appUser.appUserStatusLabel
                                        : ''
                                    : ''
                                : '';
                            xlsFormatn[`Nominee ${key + 1} Percentage`] = investorNominee ? investorNominee.nomineePercentage : '';
                            xlsFormatn[`Nominee ${key + 1} Guardian Name`] = investorNominee ? investorNominee.guardianName : '';
                            xlsFormatn[`Nominee ${key + 1} Guardian Relationship`] = investorNominee ? investorNominee.guardianRelationshipLabel : '';
                            // Adding nominee data and headers
                            xlsFormat = { ...xlsFormat, ...xlsFormatn };
                            nomineeHeaders = [
                                ...nomineeHeaders,
                                { header: `Nominee ${key + 1} Name`, key: `Nominee ${key + 1} Name`, width: 32 },
                                { header: `Nominee ${key + 1} Relationship`, key: `Nominee ${key + 1} Relationship`, width: 32 },
                                { header: `Nominee ${key + 1} Status`, key: `Nominee ${key + 1} Status`, width: 32 },
                                { header: `Nominee ${key + 1} Percentage`, key: `Nominee ${key + 1} Percentage`, width: 32 },
                                { header: `Nominee ${key + 1} Guardian Name`, key: `Nominee ${key + 1} Guardian Name`, width: 32 },
                                { header: `Nominee ${key + 1} Guardian Relationship`, key: `Nominee ${key + 1} Guardian Relationship`, width: 32 }
                            ];
                        }
                    });
                }
                //Bank account check
                if (bankAccounts !== null) {
                    bankAccounts.forEach((bankAccount, key) => {
                        let xlsFormatb = {};
                        xlsFormatb[`Bank Account ${key + 1} Holder Name`] = bankAccount ? bankAccount.accountName : '';
                        xlsFormatb[`Bank Account ${key + 1} Name`] = bankAccount
                            ? bankAccount.bankBranch
                                ? bankAccount.bankBranch.bank
                                    ? bankAccount.bankBranch.bank.name
                                        ? bankAccount.bankBranch.bank.name
                                        : ''
                                    : ''
                                : ''
                            : '';
                        xlsFormatb[`Bank Account ${key + 1} Type`] = bankAccount
                            ? bankAccount.bankAccountType
                                ? bankAccount.bankAccountType.name
                                    ? bankAccount.bankAccountType.name
                                    : ''
                                : ''
                            : '';
                        xlsFormatb[`Bank Account ${key + 1} Branch Name`] = bankAccount.bankBranch ? bankAccount.bankBranch.branchName : '';
                        xlsFormatb[`Bank Account ${key + 1} Number`] = bankAccount ? bankAccount.accountNumber : '';
                        xlsFormatb[`Bank Account ${key + 1} IFSC Code`] = bankAccount.bankBranch ? bankAccount.bankBranch.ifscCode : '';
                        //Adding bankaccount data and headers
                        xlsFormat = { ...xlsFormat, ...xlsFormatb };
                        bankAccountHeaders = [
                            ...bankAccountHeaders,
                            { header: `Bank Account ${key + 1} Holder Name`, key: `Bank Account ${key + 1} Holder Name`, width: 32 },
                            { header: `Bank Account ${key + 1} Name`, key: `Bank Account ${key + 1} Name`, width: 32 },
                            { header: `Bank Account ${key + 1} Type`, key: `Bank Account ${key + 1} Type`, width: 32 },
                            { header: `Bank Account ${key + 1} Branch Name`, key: `Bank Account ${key + 1} Branch Name`, width: 32 },
                            { header: `Bank Account ${key + 1} Number`, key: `Bank Account ${key + 1} Number`, width: 32 },
                            { header: `Bank Account ${key + 1} IFSC Code`, key: `Bank Account ${key + 1} IFSC Code`, width: 32 }
                        ];
                    });
                }
                xlsFormat['Activation Date'] = data.activationDate ? (0, moment_timezone_1.default)(data.activationDate).format('DD-MMM-YYYY') : '';
                xlsFormat['Date Of Onboarding'] = data.createdDate ? (0, moment_timezone_1.default)(data.createdDate).format('DD-MMM-YYYY') : '';
                xlsFormat['Risk Profile'] = riskProfile ? riskProfile.name : '';
                return xlsFormat;
            });
            if (exportFormat === 'xlsx') {
                res.append('fileName', 'HoldingsReport.xlsx');
                xlsHeaders = [...xlsHeaders, ...nomineeHeaders, ...bankAccountHeaders];
                xlsHeaders = (0, lodash_1.uniqBy)(xlsHeaders, 'header');
                let excelSheet = common_1.ExcelUtils.createExcel(null, 'Investor Master', xlsHeaders, xls, null);
                const result = await excelSheet.xlsx.writeBuffer();
                return result;
            }
            else {
                return new common_1.RestError(400, 'Export format not supported', { systemcode: 1008 });
            }
        }
        catch (error) {
            common_1.LoggingUtils.error('Some Error Occurred');
            return new common_1.RestError(400, 'Error occurred while exporting Investor Master', { systemcode: 1009 });
        }
    }
    /**
     * Method to send message to transcation refresher Queue
     * @param id
     * @returns
     */
    async orderItemsRepotingReplicatorByAccountId(id) {
        try {
            let message = new common_1.TransactionalDataRefreshingQueueMessage();
            message.eventType = common_1.TransactionalDataRefreshingQueueMessageEventType.ORDER_ITEM_REPLICATION_BY_ACCOUNT_ID;
            message.accountId = id;
            await common_1.QueueProducer.sendMessageInTransactionalDataRefreshingQueue(message).catch(err => {
                throw new Error(err);
            });
            return { success: true };
        }
        catch (error) {
            common_1.LoggingUtils.error('Some Error Occured');
            return error;
        }
    }
    async generateZipForDocuments(AccountIDs, rtaId, options) {
        return new Promise(async (resolve, reject) => {
            return this.consolidatedDocumentGenerationEngine
                .generateZipForDocuments(AccountIDs, rtaId, options)
                .then(response => {
                return resolve(response);
            })
                .catch(err => {
                common_1.LoggingUtils.error(`Some Error Occured ${JSON.stringify(err)}`);
                return reject(err);
            });
        });
    }
    async investorMasterDetails(filterObject, options) {
        return new Promise(async (resolve, reject) => {
            let count;
            let response = {};
            let filter = {
                include: [
                    {
                        relation: 'primaryHolder',
                        scope: {
                            include: [
                                {
                                    relation: 'investorDetails',
                                    scope: {
                                        where: { isActive: true },
                                        include: [
                                            { relation: 'correspondenceAddress' },
                                            { relation: 'countryOfBirth' },
                                            { relation: 'stateOfBirth' },
                                            { relation: 'occupation' },
                                            { relation: 'politicallyExposureType' },
                                            { relation: 'wealthSource' },
                                            { relation: 'incomeSlab' },
                                            { relation: 'taxResidentCountry' }
                                        ]
                                    }
                                }
                            ]
                        }
                    },
                    {
                        relation: 'secondaryHolder',
                        scope: {
                            include: [
                                {
                                    relation: 'investorDetails',
                                    scope: {
                                        where: {},
                                        include: [
                                            { relation: 'correspondenceAddress' },
                                            { relation: 'countryOfBirth' },
                                            { relation: 'stateOfBirth' },
                                            { relation: 'occupation' },
                                            { relation: 'politicallyExposureType' },
                                            { relation: 'wealthSource' },
                                            { relation: 'incomeSlab' },
                                            { relation: 'taxResidentCountry' }
                                        ]
                                    }
                                }
                            ]
                        }
                    },
                    {
                        relation: 'tertiaryHolder',
                        scope: {
                            include: [
                                {
                                    relation: 'investorDetails',
                                    scope: {
                                        where: {},
                                        include: [
                                            { relation: 'correspondenceAddress' },
                                            { relation: 'countryOfBirth' },
                                            { relation: 'stateOfBirth' },
                                            { relation: 'occupation' },
                                            { relation: 'politicallyExposureType' },
                                            { relation: 'wealthSource' },
                                            { relation: 'incomeSlab' },
                                            { relation: 'taxResidentCountry' }
                                        ]
                                    }
                                }
                            ]
                        }
                    },
                    {
                        relation: 'guardian',
                        scope: {
                            include: [
                                {
                                    relation: 'investorDetails',
                                    scope: {
                                        where: {},
                                        include: [
                                            { relation: 'correspondenceAddress' },
                                            { relation: 'countryOfBirth' },
                                            { relation: 'stateOfBirth' },
                                            { relation: 'occupation' },
                                            { relation: 'politicallyExposureType' },
                                            { relation: 'wealthSource' },
                                            { relation: 'incomeSlab' },
                                            { relation: 'taxResidentCountry' }
                                        ]
                                    }
                                }
                            ]
                        }
                    },
                    {
                        relation: 'riskProfile'
                    },
                    {
                        relation: 'accountAppFileMapping',
                        scope: {
                            include: [
                                {
                                    relation: 'userManagementAppFile'
                                }
                            ]
                        }
                    },
                    {
                        relation: 'bankAccounts',
                        scope: {
                            where: {
                                isActive: true,
                                isDefault: true
                            },
                            include: [
                                {
                                    relation: 'bankBranch',
                                    scope: {
                                        include: [{ relation: 'bank' }]
                                    }
                                },
                                {
                                    relation: 'bankAccountType'
                                }
                            ]
                        }
                    },
                    {
                        relation: 'holdingType'
                    },
                    {
                        relation: 'investorNominees',
                        scope: {
                            where: {
                                isActive: true,
                                isMfNominee: true
                            },
                            include: [
                                {
                                    relation: 'relationship'
                                },
                                {
                                    relation: 'appUser'
                                }
                            ]
                        }
                    }
                ]
            };
            if (filterObject.order) {
                filter.order = [filterObject.order];
            }
            count = await this.accountRepository.count(filter, options);
            return this.accountRepository
                .find({ ...filter }, options)
                .then(async (result) => {
                result.forEach(account => {
                    if (account.primaryHolder) {
                        account.primaryHolderName = account.primaryHolder.name;
                    }
                    else {
                        account.primaryHolderName = null;
                    }
                    if (account.secondaryHolder) {
                        account.secondaryHolderName = account.secondaryHolder.name;
                    }
                    else {
                        account.secondaryHolderName = null;
                    }
                    if (account.tertiaryHolder) {
                        account.tertiaryHolderName = account.tertiaryHolder.name;
                    }
                    else {
                        account.tertiaryHolderName = null;
                    }
                    if (account.guardian) {
                        account.guardianName = account.guardian.name;
                    }
                    else {
                        account.guardianName = null;
                    }
                    if (account.primaryHolder && account.primaryHolder.bosCode) {
                        account.primaryHolderBosCode = account.primaryHolder.bosCode;
                    }
                    else {
                        account.primaryHolderBosCode = null;
                    }
                });
                let searchCriteria = new Map();
                let valueToSearch;
                filterObject.where.find((data) => {
                    searchCriteria.set(Object.keys(data)[0], Object.values(data)[0]);
                });
                let updatedArray = result.filter(data => {
                    if (searchCriteria.has('primaryHolderName')) {
                        if (data.primaryHolderName) {
                            valueToSearch = searchCriteria.get('primaryHolderName').toLowerCase();
                            if (!data.primaryHolderName.toLowerCase().includes(valueToSearch)) {
                                return false;
                            }
                        }
                        else
                            return false;
                    }
                    if (searchCriteria.has('secondaryHolderName')) {
                        if (data.secondaryHolderName) {
                            valueToSearch = searchCriteria.get('secondaryHolderName').toLowerCase();
                            if (!data.secondaryHolderName.toLowerCase().includes(valueToSearch)) {
                                return false;
                            }
                        }
                        else
                            return false;
                    }
                    if (searchCriteria.has('tertiaryHolderName')) {
                        if (data.tertiaryHolderName) {
                            valueToSearch = searchCriteria.get('tertiaryHolderName').toLowerCase();
                            if (!data.tertiaryHolderName.toLowerCase().includes(valueToSearch)) {
                                return false;
                            }
                        }
                        else
                            return false;
                    }
                    if (searchCriteria.has('guardianName')) {
                        if (data.guardianName) {
                            valueToSearch = searchCriteria.get('guardianName').toLowerCase();
                            if (!data.guardianName.toLowerCase().includes(valueToSearch)) {
                                return false;
                            }
                        }
                        else
                            return false;
                    }
                    if (searchCriteria.has('uniqueId')) {
                        if (data.uniqueId) {
                            valueToSearch = searchCriteria.get('uniqueId').toLowerCase();
                            if (!data.uniqueId.toLowerCase().includes(valueToSearch)) {
                                return false;
                            }
                        }
                        else
                            return false;
                    }
                    if (searchCriteria.has('primaryHolderBosCode')) {
                        if (data.primaryHolderBosCode) {
                            valueToSearch = searchCriteria.get('primaryHolderBosCode').toLowerCase();
                            if (!data.primaryHolderBosCode.toLowerCase().includes(valueToSearch)) {
                                return false;
                            }
                        }
                        else
                            return false;
                    }
                    return true;
                });
                if (filterObject.export) {
                    response = {
                        data: updatedArray,
                        count: updatedArray.length
                    };
                }
                else {
                    const data = updatedArray.slice(filterObject.offset, filterObject.limit + filterObject.offset);
                    response = {
                        data: data,
                        count: updatedArray.length
                    };
                }
                return resolve(response);
            })
                .catch((error) => {
                common_1.LoggingUtils.error(error);
                return reject(error);
            });
        });
    }
    // This method is only used for Mfrta check:
    async mfrtaGetBankDetailsById(id, options) {
        let metaData = { accountOpening: [], mfRTA: [] };
        let data = [];
        return new Promise((resolve, reject) => {
            this.accountRepository
                .findOne({
                where: {
                    id: id,
                    isActive: true
                },
                include: [
                    'holdingType',
                    {
                        relation: 'bankAccounts',
                        scope: {
                            include: ['bankAccountType', 'bankBranch'],
                            where: {
                                isActive: true
                            }
                        }
                    }
                ]
            }, options)
                .then((account) => {
                if (!account) {
                    return Promise.reject(new common_1.RestError(404, 'Account not found', { systemcode: 1086 }));
                }
                if (account.bankAccounts && account.bankAccounts.length > 0) {
                    account.bankAccounts.forEach((bankAccount) => {
                        let object = {
                            accountNumber: '',
                            accountType: '',
                            ifscCode: '',
                            holdingPattern: ''
                        };
                        let accountOpeningObj = {
                            accountType: ''
                        };
                        object.accountNumber = bankAccount.accountNumber;
                        let type = bankAccount.bankAccountType && bankAccount.bankAccountType.name;
                        object.accountType = type;
                        object.ifscCode = bankAccount.bankBranch && bankAccount.bankBranch.ifscCode;
                        object.holdingPattern = account.holdingType && account.holdingType.name;
                        data.push(object);
                        accountOpeningObj.accountType = type;
                        metaData.mfRTA.push(object);
                        metaData.accountOpening.push(accountOpeningObj);
                    });
                }
                return resolve({ data: data, metaData: metaData });
            })
                .catch(reject);
        });
    }
    async markNomineeDetailsAsUpdated(id, options) {
        try {
            await this.accountRepository.updateById(id, { isNomineeDetailsUpdated: true }, options);
            return { success: true };
        }
        catch (error) {
            common_1.LoggingUtils.error('Some Error Occured');
            return error;
        }
    }
    async sendInvestorAccountCreationNotification(id, options) {
        try {
            const accdata = await this.accountRepository.findOne({
                where: {
                    id: id,
                    isActive: true
                },
                include: [
                    {
                        relation: 'primaryHolder'
                    },
                    {
                        relation: 'bankAccounts',
                        scope: {
                            where: {
                                isActive: true,
                                isDefault: true
                            }
                        }
                    },
                    {
                        relation: 'investorNominees',
                        scope: {
                            include: [
                                {
                                    relation: 'appUser'
                                }
                            ]
                        }
                    }
                ]
            }, options);
            await common_1.NotificationUtils.sendNotificationEvent({
                accountId: id,
                topicId: common_1.NotificationTopics.TOPICS.investmentAccount.accountOpened.value,
                notificationType: common_1.NotificationTopics.TOPICS.investmentAccount.accountOpened.topic,
                templateKeys: {
                    customerName: accdata.name,
                    customerId: `XX${accdata.primaryHolder.userCode.slice(-4)}`,
                    wealthappTcUrl: '',
                    accountHolderName: accdata.name,
                    nomineeName: accdata.investorNominees[0].appUser.name,
                    emailId: 'mailto:smartwealth@hdfcbank.com',
                    investmentAccountNumber: `XX${accdata.uniqueId.slice(-4)}`,
                    bankAccountNumber: `XX${accdata.bankAccounts[0].accountNumber.slice(-4)}`
                }
            });
        }
        catch (error) {
            common_1.LoggingUtils.error('Some Error Occured');
            return error;
        }
    }
};
AccountFacade = (0, tslib_1.__decorate)([
    (0, core_1.injectable)({ scope: core_1.BindingScope.APPLICATION }),
    (0, tslib_1.__param)(0, (0, repository_1.repository)(common_1.RiskProfileRepository)),
    (0, tslib_1.__param)(1, (0, repository_1.repository)(common_1.RiskProfileHistoryRepository)),
    (0, tslib_1.__param)(2, (0, repository_1.repository)(common_1.RiskProfileQuestionSubmittedAnswerRepository)),
    (0, tslib_1.__param)(3, (0, repository_1.repository)(common_1.AccountRepository)),
    (0, tslib_1.__param)(4, (0, repository_1.repository)(common_1.StateRepository)),
    (0, tslib_1.__param)(5, (0, repository_1.repository)(common_1.CountryRepository)),
    (0, tslib_1.__param)(6, (0, repository_1.repository)(common_1.InvestorDetailsRepository)),
    (0, tslib_1.__param)(7, (0, repository_1.repository)(common_1.InvestorNomineeRepository)),
    (0, tslib_1.__param)(8, (0, repository_1.repository)(common_1.AddressRepository)),
    (0, tslib_1.__param)(9, (0, repository_1.repository)(common_1.RelationshipRepository)),
    (0, tslib_1.__param)(10, (0, repository_1.repository)(common_1.AppUserRepository)),
    (0, tslib_1.__param)(11, (0, repository_1.repository)(common_1.ServiceProviderAccountRepository)),
    (0, tslib_1.__param)(12, (0, repository_1.repository)(common_1.TransactionRepository)),
    (0, tslib_1.__param)(13, (0, repository_1.repository)(core_banking_repository_1.CoreBankingRepository)),
    (0, tslib_1.__param)(14, (0, repository_1.repository)(common_1.HoldingRepository)),
    (0, tslib_1.__param)(15, (0, repository_1.repository)(common_1.InstrumentRepository)),
    (0, tslib_1.__param)(16, (0, core_1.inject)('services.fileStorageComponent')),
    (0, tslib_1.__param)(17, (0, repository_1.repository)(common_1.UserManagementAppFileRepository)),
    (0, tslib_1.__param)(18, (0, repository_1.repository)(common_1.AccountAppFileMappingRepository)),
    (0, tslib_1.__param)(19, (0, repository_1.repository)(common_1.DocumentUploadRepository)),
    (0, tslib_1.__param)(20, (0, core_1.service)(consolidated_document_generation_engine_1.ConsolidatedDocumentGenerationEngine)),
    (0, tslib_1.__metadata)("design:paramtypes", [common_1.RiskProfileRepository,
        common_1.RiskProfileHistoryRepository,
        common_1.RiskProfileQuestionSubmittedAnswerRepository,
        common_1.AccountRepository,
        common_1.StateRepository,
        common_1.CountryRepository,
        common_1.InvestorDetailsRepository,
        common_1.InvestorNomineeRepository,
        common_1.AddressRepository,
        common_1.RelationshipRepository,
        common_1.AppUserRepository,
        common_1.ServiceProviderAccountRepository,
        common_1.TransactionRepository,
        core_banking_repository_1.CoreBankingRepository,
        common_1.HoldingRepository,
        common_1.InstrumentRepository, Object, common_1.UserManagementAppFileRepository,
        common_1.AccountAppFileMappingRepository,
        common_1.DocumentUploadRepository,
        consolidated_document_generation_engine_1.ConsolidatedDocumentGenerationEngine])
], AccountFacade);
exports.AccountFacade = AccountFacade;
//# sourceMappingURL=account.facade.js.map