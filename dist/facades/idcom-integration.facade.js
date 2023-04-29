"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdcomIntegrationFacade = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const common_1 = require("common");
const underscore_1 = require("underscore");
const repositories_1 = require("../repositories");
const repository_1 = require("@loopback/repository");
const moment_timezone_1 = (0, tslib_1.__importDefault)(require("moment-timezone"));
const url_1 = require("url");
const SCOPE = process.env.USR_MGMT_IDCOM_FCD_SCOPE; //@todo need to replace with actual value
//reading public key of hdfc bank sll certificate
const publicHDFCKey = Buffer.from(process.env.USR_MGMT_IDCOM_FCD_HDFC_PUB_KEY, 'base64');
//reding private key of valuefy ssl certificate.
const privateValuefyKey = Buffer.from(process.env.USR_MGMT_IDCOM_DS_PRIVATE_KEY, 'base64');
let IdcomIntegrationFacade = class IdcomIntegrationFacade {
    constructor(appUserRepository, idcomRepository, idcomInternalRepository, idcomDetailsRepository) {
        this.appUserRepository = appUserRepository;
        this.idcomRepository = idcomRepository;
        this.idcomInternalRepository = idcomInternalRepository;
        this.idcomDetailsRepository = idcomDetailsRepository;
    }
    /**
     *
     * @param userId
     * @param idcomProps
     * @returns
     */
    async getAuthCodeExternal(userId, deviceId, transactionId) {
        var _a;
        const methodName = 'getAuthCode';
        try {
            common_1.LoggingUtils.debug('Step 1 Idcom getAuth method ', methodName);
            if ((0, underscore_1.isEmpty)(process.env.USR_MGMT_FCD_IDCOM_CLIENT_KEY) || (0, underscore_1.isEmpty)(process.env.USR_MGMT_FCD_IDCOM_CLIENT_SECRET)) {
                throw new Error('Environment Variable not set');
            }
            const key = String(process.env.USR_MGMT_FCD_IDCOM_CLIENT_KEY);
            const secret = String(process.env.USR_MGMT_FCD_IDCOM_CLIENT_SECRET);
            //generating iv and AES key
            const iv = common_1.CryptoUtils.generateSymmetricKeyOrIV(16);
            const AESkey = common_1.CryptoUtils.generateSymmetricKeyOrIV(32);
            const appUser = await this.appUserRepository
                .findOne({
                where: {
                    id: userId
                },
                include: [{ relation: 'investorDetails' }]
            })
                .catch(err => {
                throw new Error(err);
            });
            if ((0, underscore_1.isEmpty)(appUser)) {
                throw new Error('User not found');
            }
            //appending country code
            let mobileNumber = appUser.contactNumber;
            const countryCodeSplit = (appUser === null || appUser === void 0 ? void 0 : appUser.contactNumberCountryCode) ? (_a = appUser === null || appUser === void 0 ? void 0 : appUser.contactNumberCountryCode) === null || _a === void 0 ? void 0 : _a.split('+') : [];
            switch (countryCodeSplit === null || countryCodeSplit === void 0 ? void 0 : countryCodeSplit.length) {
                case 2:
                    mobileNumber = `${countryCodeSplit[1]}${mobileNumber}`;
                    break;
                case 1:
                    mobileNumber = `${countryCodeSplit[0]}${mobileNumber}`;
                    break;
                default:
                    break;
            }
            // Setting identifier
            const identifiers = [
                {
                    TypeName: 'MobileNo',
                    TypeValue: mobileNumber
                }
            ];
            if (appUser.investorDetails.birthDate) {
                identifiers.push({
                    TypeName: 'DOB',
                    TypeValue: (0, moment_timezone_1.default)(appUser.investorDetails.birthDate).format('YYYY-MM-DD')
                });
            }
            else if (appUser.investorDetails.panCardNumber) {
                identifiers.push({
                    TypeName: 'PANNo',
                    TypeValue: appUser.investorDetails.panCardNumber
                });
            }
            //Actual Payload
            const requestBody = {
                FintechID: process.env.USR_MGMT_IDCOM_FCD_FINTECH_ID,
                Identifiers: identifiers,
                ProductCode: process.env.USR_MGMT_IDCOM_FCD_PRODUCT_CODE,
                ClientSecret: secret,
                ClientID: key
            };
            common_1.LoggingUtils.debug(`Step 2 get auth req body ---> `, methodName);
            //Create Encrypt request payload
            const ivPayload = iv + JSON.stringify(requestBody); //concating IV with RequestBody
            const RequestEncryptedValue = await common_1.CryptoUtils.encrypt(ivPayload, 'aes-256-cbc', AESkey, iv); // Encrypt request payload
            const SymmetricKeyEncryptedValue = await common_1.CryptoUtils.encryptRSA(AESkey, publicHDFCKey); //Encrypt Encryption KEY
            const Scope = process.env.USR_MGMT_IDCOM_FCD_SCOPE;
            const TransactionId = await common_1.OrderUtils.getRandomNumber(14);
            common_1.LoggingUtils.debug(`Step 3 get auth req body encrypted --> ${JSON.stringify({
                RequestEncryptedValue: RequestEncryptedValue,
                SymmetricKeyEncryptedValue: SymmetricKeyEncryptedValue,
                Scope: Scope,
                TransactionId: TransactionId,
                OAuthTokenValue: ''
            })}`, methodName); // @todo need to remove this after testing
            common_1.LoggingUtils.debug('Step 4 Invoking fetchAuthCodeWithRedirectUrl ', methodName);
            //Sending encrypted request to idcom
            const response = await this.idcomRepository
                .fetchAuthCodeWithRedirectUrl(RequestEncryptedValue, SymmetricKeyEncryptedValue, Scope, TransactionId, transactionId)
                .catch(error => {
                let errorObj = JSON.parse(error.message);
                let errorMessage = 'Something went wrong';
                if (errorObj.Status) {
                    errorMessage = errorObj.Status;
                }
                let activityObj = {
                    executionDate: new Date(),
                    apiName: 'IDCOM/getAuthCode',
                    errorCode: JSON.stringify(error),
                    details: JSON.stringify(error),
                    status: 'failed'
                };
                (0, common_1.applicationLog)(activityObj);
                throw new Error(errorMessage);
            });
            // handling gateway error
            if (response && response.Status && response.Status !== 'SUCCESS') {
                let activityObj = {
                    executionDate: new Date(),
                    apiName: 'IDCOM/getAuthCode',
                    errorCode: JSON.stringify(response),
                    details: JSON.stringify(response),
                    status: response.Status
                };
                (0, common_1.applicationLog)(activityObj);
                common_1.LoggingUtils.error(response, methodName);
                common_1.LoggingUtils.debug('Step 5 get auth response failure', methodName);
                return new common_1.RestError(400, response.Status, {});
            }
            //Perform decryption of response
            const decryptionSymmetricKey = await common_1.CryptoUtils.decryptRSA(response.GWSymmetricKeyEncryptedValue, privateValuefyKey); //decrypting decryption key
            const decryptResponse = await common_1.CryptoUtils.decrypt(response.ResponseEncryptedValue, 'aes-256-cbc', decryptionSymmetricKey, iv); //decrypting response
            const resp = JSON.parse(decryptResponse.substring(16)); //fetching actual response
            common_1.LoggingUtils.debug(`Step 6 get auth response decryption --> `, methodName);
            if (resp.errorCode != null) {
                common_1.LoggingUtils.error({ errorCode: response.errorCode, errorMessage: response.errorMessage }, methodName);
                return new common_1.RestError(400, response.errorMessage, {});
            }
            else {
                common_1.LoggingUtils.debug('Step 7 get auth non error response ', methodName);
                const url = new url_1.URL(resp.redirectUrl);
                const idcomObject = {
                    redirectUrl: url.pathname,
                    authCode: Buffer.from(resp.authCode, 'utf8').toString('base64'),
                    appUserId: userId,
                    deviceId: deviceId
                };
                common_1.LoggingUtils.debug('Step 8 creating record for idcom detail table', methodName);
                const idcomResult = await this.idcomDetailsRepository.create(idcomObject).catch(error => {
                    throw new Error(error);
                });
                if (!idcomResult) {
                    return { success: false, message: 'Error occurred unable to store idcom data' };
                }
                common_1.LoggingUtils.debug('Step 9 returning get auth success response', methodName);
                return { redirectURL: `${resp.redirectUrl}`, authCode: resp.authCode, success: true };
            }
        }
        catch (error) {
            common_1.LoggingUtils.error(error, methodName);
            //return new RestError(400, error.message);
            throw error;
        }
    }
    /**
     *
     * @param idcomProps
     * @returns
     */
    async getIdTokenExternal(idcomProps, transactionId) {
        const methodName = 'getIdToken';
        try {
            common_1.LoggingUtils.debug('Step 1 Idcom getIdToken menthod', methodName);
            //generating iv and AES key
            const iv = common_1.CryptoUtils.generateSymmetricKeyOrIV(16);
            const AESkey = common_1.CryptoUtils.generateSymmetricKeyOrIV(32);
            //Actual Payload
            const requestBody = {
                authCode: idcomProps.authCode
            };
            common_1.LoggingUtils.debug('Step 2 req body for get Id token ', methodName);
            //Create Encrypt request payload
            const ivPayload = iv + JSON.stringify(requestBody); //concating IV with RequestBody
            const RequestEncryptedValue = await common_1.CryptoUtils.encrypt(ivPayload, 'aes-256-cbc', AESkey, iv); // Encrypt request payload
            const SymmetricKeyEncryptedValue = await common_1.CryptoUtils.encryptRSA(AESkey, publicHDFCKey); //Encrypt Encryption KEY
            const Scope = SCOPE;
            const TransactionId = await common_1.OrderUtils.getRandomNumber(14);
            common_1.LoggingUtils.debug(`Step 3 req body encrypted for get Id token ${JSON.stringify({
                RequestEncryptedValue: RequestEncryptedValue,
                SymmetricKeyEncryptedValue: SymmetricKeyEncryptedValue,
                Scope: Scope,
                TransactionId: TransactionId,
                OAuthTokenValue: ''
            })}`, methodName); // @todo need to remove this after testing
            common_1.LoggingUtils.debug('Step 4 invoking fetchIdToken repo method', methodName);
            const response = await this.idcomRepository
                .fetchIdToken(RequestEncryptedValue, SymmetricKeyEncryptedValue, Scope, TransactionId, transactionId)
                .catch(error => {
                let activityObj = {
                    executionDate: new Date(),
                    apiName: 'IDCOM/getIdToken',
                    errorCode: JSON.stringify(error),
                    details: JSON.stringify(error),
                    status: 'failed'
                };
                (0, common_1.applicationLog)(activityObj);
                throw new Error(error);
            });
            // handling gateway error
            if (response && response.Status && response.Status !== 'SUCCESS') {
                let activityObj = {
                    executionDate: new Date(),
                    apiName: 'IDCOM/getIdToken',
                    errorCode: JSON.stringify(response),
                    details: JSON.stringify(response),
                    status: response.Status
                };
                (0, common_1.applicationLog)(activityObj);
                common_1.LoggingUtils.debug('Step 5 error response from get Id token', methodName);
                return new common_1.RestError(400, response.Status, {});
            }
            //Perform decryption of response
            const decryptIV = await common_1.CryptoUtils.generateSymmetricKeyOrIV(16); //Decryption IV
            const decryptionAesKey = await common_1.CryptoUtils.decryptRSA(response.GWSymmetricKeyEncryptedValue, privateValuefyKey); //decrypting decryption key
            const decryptResponse = await common_1.CryptoUtils.decrypt(response.ResponseEncryptedValue, 'aes-256-cbc', decryptionAesKey, decryptIV); //decrypting response
            const resp = JSON.parse(decryptResponse.substring(16)); //fetching actual response
            common_1.LoggingUtils.debug(`Step 6 decrypting Id token response --> `, methodName);
            if (resp.authStatus !== 'Y') {
                common_1.LoggingUtils.error({ authStatus: resp.authStatus }, methodName);
                return new common_1.RestError(400, 'Authentication Failed', { systemcode: 1028 });
            }
            else {
                common_1.LoggingUtils.debug('Step 7 Id token success response', methodName);
                return { ...resp, success: true };
            }
        }
        catch (error) {
            common_1.LoggingUtils.error(error, methodName);
            //return new RestError(400, 'Error while fetching Id Token');
            throw error;
        }
    }
    async decryptIdTokenExternal(idcomProps, transactionId) {
        const methodName = 'decryptIdToken';
        try {
            //Actual Payload
            common_1.LoggingUtils.debug('Step 1 decrypt Id token method', methodName);
            const requestBody = {
                RequestEncryptedValue: '',
                SymmetricKeyEncryptedValue: '',
                OAuthTokenValue: '',
                idToken: idcomProps.idToken,
                scope: idcomProps.scope,
                transcationId: common_1.OrderUtils.getRandomNumber(14)
            };
            common_1.LoggingUtils.debug(`Step 2 req body of decrypt Id token --> `, methodName);
            common_1.LoggingUtils.debug('Step 3 invoking decryptIdToken repo method', methodName);
            const response = await this.idcomRepository
                .decryptIdToken(requestBody.RequestEncryptedValue, requestBody.SymmetricKeyEncryptedValue, requestBody.scope, requestBody.transcationId, requestBody.idToken, transactionId)
                .catch(error => {
                let activityObj = {
                    executionDate: new Date(),
                    apiName: 'IDCOM/decryptIdToken',
                    errorCode: JSON.stringify(error),
                    details: JSON.stringify(error),
                    status: 'failed'
                };
                (0, common_1.applicationLog)(activityObj);
                throw new Error(error);
            });
            // handling gateway error
            if (response && response.Status && response.Status !== 'SUCCESS') {
                let activityObj = {
                    executionDate: new Date(),
                    apiName: 'IDCOM/decryptIdToken',
                    errorCode: JSON.stringify(response),
                    details: JSON.stringify(response),
                    status: response.Status
                };
                (0, common_1.applicationLog)(activityObj);
                common_1.LoggingUtils.error(response, methodName);
                common_1.LoggingUtils.debug('Step 4 error response in decryptIdToken', methodName);
                return new common_1.RestError(400, response.Status, { response });
            }
            const result = {
                customerID: response.custID,
                fintechID: response.aud,
                mobileNo: response.sub || response.mobileNo,
                panNo: response.pan
            };
            common_1.LoggingUtils.debug(`Step 5 flow end with success response  `, methodName);
            return { ...result, success: true };
        }
        catch (error) {
            common_1.LoggingUtils.error(error, methodName);
            //return new RestError(400, 'Error while fetching Id Token');
            throw error;
        }
    }
    /**
     *
     * @param userId
     * @param idcomProps
     * @returns
     */
    async getAuthCodeInternal(userId, deviceId, transactionId) {
        var _a;
        const methodName = 'getAuthCodeInternal';
        try {
            common_1.LoggingUtils.debug('Step 1 Idcom getAuth method ', methodName);
            if ((0, underscore_1.isEmpty)(process.env.USR_MGMT_FCD_IDCOM_CLIENT_KEY) || (0, underscore_1.isEmpty)(process.env.USR_MGMT_FCD_IDCOM_CLIENT_SECRET)) {
                throw new Error('Environment Variable not set');
            }
            const key = String(process.env.USR_MGMT_FCD_IDCOM_CLIENT_KEY);
            const secret = String(process.env.USR_MGMT_FCD_IDCOM_CLIENT_SECRET);
            const appUser = await this.appUserRepository
                .findOne({
                where: {
                    id: userId
                },
                include: [{ relation: 'investorDetails' }]
            })
                .catch(err => {
                throw new Error(err);
            });
            if ((0, underscore_1.isEmpty)(appUser)) {
                throw new Error('User not found');
            }
            //appending country code
            let mobileNumber = appUser.contactNumber;
            const countryCodeSplit = (appUser === null || appUser === void 0 ? void 0 : appUser.contactNumberCountryCode) ? (_a = appUser === null || appUser === void 0 ? void 0 : appUser.contactNumberCountryCode) === null || _a === void 0 ? void 0 : _a.split('+') : [];
            switch (countryCodeSplit === null || countryCodeSplit === void 0 ? void 0 : countryCodeSplit.length) {
                case 2:
                    mobileNumber = `${countryCodeSplit[1]}${mobileNumber}`;
                    break;
                case 1:
                    mobileNumber = `${countryCodeSplit[0]}${mobileNumber}`;
                    break;
                default:
                    break;
            }
            // Setting identifier
            const identifiers = [
                {
                    TypeName: 'MobileNo',
                    TypeValue: mobileNumber
                }
            ];
            if (appUser.investorDetails.birthDate) {
                identifiers.push({
                    TypeName: 'DOB',
                    TypeValue: (0, moment_timezone_1.default)(appUser.investorDetails.birthDate).format('YYYY-MM-DD')
                });
            }
            else if (appUser.investorDetails.panCardNumber) {
                identifiers.push({
                    TypeName: 'PANNo',
                    TypeValue: appUser.investorDetails.panCardNumber
                });
            }
            //Actual Payload
            const requestBody = {
                FintechID: process.env.USR_MGMT_IDCOM_FCD_FINTECH_ID,
                Identifiers: identifiers,
                ProductCode: process.env.USR_MGMT_IDCOM_FCD_PRODUCT_CODE,
                ClientSecret: secret,
                ClientID: key
            };
            common_1.LoggingUtils.debug(`Step 2 get auth req body ---> `, methodName);
            const response = await this.idcomInternalRepository
                .fetchAuthCodeWithRedirectUrl(requestBody.FintechID, requestBody.Identifiers, requestBody.ProductCode, requestBody.ClientSecret, requestBody.ClientID, transactionId)
                .catch(error => {
                throw new Error(error.message);
            });
            common_1.LoggingUtils.debug(`Step 3 get auth response  --> `, methodName);
            if (response.errorCode != null) {
                common_1.LoggingUtils.error({ errorCode: response.errorCode, errorMessage: response.errorMessage }, methodName);
                return new common_1.RestError(400, response.errorMessage, {});
            }
            else {
                common_1.LoggingUtils.debug('Step 4 get auth non error response ', methodName);
                const url = new url_1.URL(response.redirectUrl);
                const idcomObject = {
                    redirectUrl: url.pathname,
                    authCode: Buffer.from(response.authCode, 'utf8').toString('base64'),
                    appUserId: userId,
                    deviceId: deviceId
                };
                common_1.LoggingUtils.debug('Step 5 creating record for idcom detail table', methodName);
                const idcomResult = await this.idcomDetailsRepository.create(idcomObject).catch(error => {
                    throw new Error(error);
                });
                if (!idcomResult) {
                    return { success: false, message: 'Error occurred unable to store idcom data' };
                }
                common_1.LoggingUtils.debug('Step 6 returning get auth success response', methodName);
                return { redirectURL: `${response.redirectUrl}`, authCode: response.authCode, success: true };
            }
        }
        catch (error) {
            common_1.LoggingUtils.error(error, methodName);
            throw error;
        }
    }
    /**
     *
     * @param idcomProps
     * @returns
     */
    async getIdTokenInternal(idcomProps, transactionId) {
        const methodName = 'getIdToken';
        try {
            common_1.LoggingUtils.debug('Step 1 Idcom getIdToken menthod', methodName);
            //Actual Payload
            const requestBody = {
                authCode: idcomProps.authCode
            };
            common_1.LoggingUtils.debug('Step 2 req body for get Id token ', methodName);
            common_1.LoggingUtils.debug('Step 3 invoking fetchIdToken repo method', methodName);
            const response = await this.idcomInternalRepository.fetchIdToken(requestBody.authCode, transactionId).catch(error => {
                throw new Error(error);
            });
            common_1.LoggingUtils.debug(`Step 4  Id token response --> `, methodName);
            if (response.authStatus !== 'Y') {
                common_1.LoggingUtils.error({ authStatus: response.authStatus }, methodName);
                return new common_1.RestError(400, 'Authentication Failed', { systemcode: 1028 });
            }
            else {
                common_1.LoggingUtils.debug('Step 5 Id token success response', methodName);
                return { ...response, success: true };
            }
        }
        catch (error) {
            common_1.LoggingUtils.error(error, methodName);
            throw error;
        }
    }
    async decryptIdTokenInternal(idcomProps, transactionId) {
        const methodName = 'decryptIdToken';
        try {
            //Actual Payload
            common_1.LoggingUtils.debug('Step 1 decrypt Id token method', methodName);
            const requestBody = {
                idToken: idcomProps.idToken
            };
            common_1.LoggingUtils.debug(`Step 2 req body of decrypt Id token --> `, methodName);
            common_1.LoggingUtils.debug('Step 3 invoking decryptIdToken repo method', methodName);
            const response = await this.idcomInternalRepository.decryptIdToken(requestBody.idToken, transactionId).catch(error => {
                throw new Error(error);
            });
            // handling gateway error
            if (response && response.Status && response.Status !== 'SUCCESS') {
                common_1.LoggingUtils.error(response, methodName);
                common_1.LoggingUtils.debug('Step 4 error response in decryptIdToken', methodName);
                return new common_1.RestError(400, response.Status, { response });
            }
            const result = {
                customerID: response.custID,
                fintechID: response.aud,
                mobileNo: response.sub || response.mobileNo,
                panNo: response.pan
            };
            common_1.LoggingUtils.debug(`Step 5 flow end with success response  `, methodName);
            return { ...result, success: true };
        }
        catch (error) {
            common_1.LoggingUtils.error(error, methodName);
            throw error;
        }
    }
    async getAuthCode(userId, deviceId, transactionId) {
        if (process.env.IDCOM_ENV && process.env.IDCOM_ENV == 'HDFC') {
            return this.getAuthCodeInternal(userId, deviceId, transactionId);
        }
        else {
            return this.getAuthCodeExternal(userId, deviceId, transactionId);
        }
    }
    async getIdToken(idcomProps, transactionId) {
        if (process.env.IDCOM_ENV && process.env.IDCOM_ENV == 'HDFC') {
            return this.getIdTokenInternal(idcomProps, transactionId);
        }
        else {
            return this.getIdTokenExternal(idcomProps, transactionId);
        }
    }
    async decryptIdToken(idcomProps, transactionId) {
        if (process.env.IDCOM_ENV && process.env.IDCOM_ENV == 'HDFC') {
            return this.decryptIdTokenInternal(idcomProps, transactionId);
        }
        else {
            return this.decryptIdTokenExternal(idcomProps, transactionId);
        }
    }
};
IdcomIntegrationFacade = (0, tslib_1.__decorate)([
    (0, core_1.injectable)({ scope: core_1.BindingScope.APPLICATION }),
    (0, tslib_1.__param)(0, (0, repository_1.repository)(common_1.AppUserRepository)),
    (0, tslib_1.__param)(1, (0, repository_1.repository)(repositories_1.IdcomRepository)),
    (0, tslib_1.__param)(2, (0, repository_1.repository)(repositories_1.IdcomInternalRepository)),
    (0, tslib_1.__param)(3, (0, repository_1.repository)(common_1.IdcomDetailsRepository)),
    (0, tslib_1.__metadata)("design:paramtypes", [common_1.AppUserRepository,
        repositories_1.IdcomRepository,
        repositories_1.IdcomInternalRepository,
        common_1.IdcomDetailsRepository])
], IdcomIntegrationFacade);
exports.IdcomIntegrationFacade = IdcomIntegrationFacade;
//# sourceMappingURL=idcom-integration.facade.js.map