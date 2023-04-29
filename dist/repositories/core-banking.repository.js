"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreBankingRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const common_1 = require("common");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
const common_2 = require("common");
const common_3 = require("common");
const crypto = (0, tslib_1.__importStar)(require("crypto"));
let CoreBankingRepository = class CoreBankingRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource) {
        super(models_1.CoreBanking, dataSource);
    }
    async doDemographicDetailsInquiry(customerId) {
        const urls = this.dataSource.settings.operations.filter((temp) => Object.keys(temp.functions)[0] == 'doDemographicDetailsInquiry')[0];
        const externalReferenceNo = common_1.OrderUtils.getRandomNumber(14);
        try {
            const response = await this.dataSource.DataAccessObject.doDemographicDetailsInquiry(customerId, externalReferenceNo);
            common_2.LogApiCallUtils.sendMessageOutgoingApiCall({
                url: `${process.env.USR_MGMT_CRBNK_DS_BASE_URL}${urls.template.url}`,
                request: {
                    customerID: customerId,
                    externalReferenceNumber: externalReferenceNo
                },
                response: response,
                success: true,
                extraInfo: {
                    channel: process.env.COMMON_API_CHANNEL,
                    user_id: process.env.COMMON_API_CHANNEL_USER_ID
                },
                externalSystemName: common_3.Option.GLOBALOPTIONS.EXTERNALAPISYSTEMNAME.FATCA
            });
            return response;
        }
        catch (err) {
            common_2.LogApiCallUtils.sendMessageOutgoingApiCall({
                url: `${process.env.USR_MGMT_CRBNK_DS_BASE_URL}${urls.template.url}`,
                request: {
                    customerID: customerId,
                    externalReferenceNumber: externalReferenceNo
                },
                response: err.message,
                success: false,
                extraInfo: {
                    channel: process.env.COMMON_API_CHANNEL,
                    user_id: process.env.COMMON_API_CHANNEL_USER_ID
                },
                externalSystemName: common_3.Option.GLOBALOPTIONS.EXTERNALAPISYSTEMNAME.FATCA
            });
            throw err;
        }
    }
    async fetchCustomerAccountAmlFatcaDetails(mobileNumber, pan, dob, customerID, transactionId) {
        // let returnString: any = fs.readFileSync(
        //   '/Users/divyanshu/Desktop/Delta/Backend/services/user-management/src/repositories/sample-response.json'
        // );
        // return JSON.parse(returnString as string);
        let response;
        const urls = this.dataSource.settings.operations.filter((temp) => Object.keys(temp.functions)[0] == 'fetchCustomerAccountAmlFatcaDetails')[0];
        let externalReferenceNumber = common_1.OrderUtils.getRandomNumber(14);
        try {
            response = await this.dataSource.DataAccessObject.fetchCustomerAccountAmlFatcaDetails(mobileNumber, pan, customerID, dob, externalReferenceNumber);
            common_2.LogApiCallUtils.sendMessageOutgoingApiCall({
                url: `${process.env.USR_MGMT_CRBNK_DS_BASE_URL}${urls.template.url}`,
                request: {
                    mobileNumber: mobileNumber,
                    pan: pan,
                    customerID: customerID,
                    dob: dob,
                    externalReferenceNumber: externalReferenceNumber
                },
                response: response,
                success: true,
                transactionId: transactionId,
                extraInfo: {
                    channel: process.env.COMMON_API_CHANNEL,
                    user_id: process.env.COMMON_API_CHANNEL_USER_ID
                },
                externalSystemName: common_3.Option.GLOBALOPTIONS.EXTERNALAPISYSTEMNAME.FATCA
            });
            return response;
        }
        catch (error) {
            common_2.LogApiCallUtils.sendMessageOutgoingApiCall({
                url: `${process.env.USR_MGMT_CRBNK_DS_BASE_URL}${urls.template.url}`,
                request: {
                    mobileNumber: mobileNumber,
                    pan: pan,
                    customerID: customerID,
                    dob: dob,
                    externalReferenceNumber: externalReferenceNumber
                },
                response: error.message,
                success: false,
                transactionId: transactionId,
                extraInfo: {
                    channel: process.env.COMMON_API_CHANNEL,
                    user_id: process.env.COMMON_API_CHANNEL_USER_ID
                },
                externalSystemName: common_3.Option.GLOBALOPTIONS.EXTERNALAPISYSTEMNAME.FATCA
            });
            throw error;
        }
    }
    async fetchCASADetailBalanceInquiry(accountNo, transactionId) {
        let response;
        const randomNumber = common_1.OrderUtils.getRandomNumber(14);
        const urls = this.dataSource.settings.operations.filter((temp) => Object.keys(temp.functions)[0] == 'fetchCASADetailBalanceInquiry')[0];
        try {
            response = await this.dataSource.DataAccessObject.fetchCASADetailBalanceInquiry(accountNo, randomNumber);
            common_2.LogApiCallUtils.sendMessageOutgoingApiCall({
                url: `${process.env.USR_MGMT_CRBNK_DS_BASE_URL}${urls.template.url}`,
                request: {
                    accountNo: accountNo,
                    randomNumber: randomNumber
                },
                response: response,
                success: true,
                transactionId: transactionId,
                extraInfo: {
                    channel: process.env.COMMON_API_CHANNEL,
                    user_id: process.env.COMMON_API_CHANNEL_USER_ID
                },
                externalSystemName: common_3.Option.GLOBALOPTIONS.EXTERNALAPISYSTEMNAME.CASA
            });
            return response;
        }
        catch (error) {
            common_2.LogApiCallUtils.sendMessageOutgoingApiCall({
                url: `${process.env.USR_MGMT_CRBNK_DS_BASE_URL}${urls.template.url}`,
                request: {
                    accountNo: accountNo,
                    randomNumber: randomNumber
                },
                response: error.message,
                success: false,
                transactionId: transactionId,
                extraInfo: {
                    channel: process.env.COMMON_API_CHANNEL,
                    user_id: process.env.COMMON_API_CHANNEL_USER_ID
                },
                externalSystemName: common_3.Option.GLOBALOPTIONS.EXTERNALAPISYSTEMNAME.CASA
            });
            throw error;
        }
    }
    sha1HashGenerator(key) {
        const sha1MessageHash = crypto.createHash('sha1');
        sha1MessageHash.update(key);
        return sha1MessageHash.digest('base64');
    }
    async doGenerateOTP(transactionId, linkData) {
        let response;
        const randomNumber = common_1.OrderUtils.getRandomNumber(14);
        const urls = this.dataSource.settings.operations.filter((temp) => Object.keys(temp.functions)[0] == 'doGenerateOTPRest')[0];
        const instanceId = process.env.GENERATE_OTP_INSTANCE_ID;
        const apiUser = process.env.GENERATE_OTP_API_USER;
        const forceNew = process.env.GENERATE_OTP_FORCE_NEW;
        const refNo = Date.now() + common_1.RandomizationUtils.generateUniqueId(16);
        const callerId = process.env.GENERATE_OTP_CALLER_ID;
        const hashKey = process.env.GENERATE_OTP_HASH_KEY;
        if (!instanceId || !callerId || !linkData || !refNo || !forceNew || !hashKey) {
            throw 'One of the config parameters is not correctly set for generate otp';
        }
        const messageHash = this.sha1HashGenerator(`${instanceId}|${callerId}|${linkData}|${refNo}|${forceNew}|${hashKey}`);
        try {
            response = await this.dataSource.DataAccessObject.doGenerateOTPRest(randomNumber, refNo, messageHash, linkData);
            common_2.LogApiCallUtils.sendMessageOutgoingApiCall({
                url: `${process.env.USR_MGMT_CRBNK_DS_BASE_URL}${urls.template.url}`,
                request: { randomNumber: randomNumber, refNo: refNo, messageHash: messageHash, linkData: linkData },
                response: response,
                success: true,
                transactionId: transactionId,
                extraInfo: {
                    channel: process.env.COMMON_API_CHANNEL,
                    user_id: process.env.COMMON_API_CHANNEL_USER_ID
                },
                externalSystemName: common_3.Option.GLOBALOPTIONS.EXTERNALAPISYSTEMNAME.COREBANKING
            });
            const responseString = response.responseString;
            if (responseString.statusCode && responseString.refNo && responseString.passwordValue && responseString.datatimeGen && responseString.datetimeExpire && responseString.errorDetail && hashKey) {
                const messageHash = "static:genpwdres:07:" + this.sha1HashGenerator(`${responseString.statusCode}|${responseString.refNo}|${responseString.passwordValue}|${responseString.datatimeGen}|${responseString.datetimeExpire}|${responseString.errorDetail}|${hashKey}`);
                if (messageHash != responseString.messageHash) {
                    throw 'The response message hash from generateOTP did not match.';
                }
            }
            return response;
        }
        catch (error) {
            common_2.LogApiCallUtils.sendMessageOutgoingApiCall({
                url: `${process.env.USR_MGMT_CRBNK_DS_BASE_URL}${urls.template.url}`,
                request: { randomNumber: randomNumber, refNo: refNo, messageHash: messageHash, linkData: linkData },
                response: error.message,
                success: false,
                transactionId: transactionId,
                extraInfo: {
                    channel: process.env.COMMON_API_CHANNEL,
                    user_id: process.env.COMMON_API_CHANNEL_USER_ID
                },
                externalSystemName: common_3.Option.GLOBALOPTIONS.EXTERNALAPISYSTEMNAME.COREBANKING
            });
            throw error;
        }
    }
    async doVerifyOTP(otp, refNo, transactionId, linkData) {
        let response;
        const randomNumber = common_1.OrderUtils.getRandomNumber(14);
        const urls = this.dataSource.settings.operations.filter((temp) => Object.keys(temp.functions)[0] == 'doVerifyOTPRest')[0];
        const instanceId = process.env.GENERATE_OTP_INSTANCE_ID;
        const callerId = process.env.GENERATE_OTP_CALLER_ID;
        const hashKey = process.env.GENERATE_OTP_HASH_KEY;
        if (!instanceId || !callerId || !linkData || !refNo || !otp || !hashKey) {
            throw 'One of the config parameters is not correctly set for verify otp';
        }
        const messageHash = this.sha1HashGenerator(`${instanceId}|${callerId}|${linkData}|${refNo}|${otp}|${hashKey}`);
        try {
            response = await this.dataSource.DataAccessObject.doVerifyOTPRest(otp, randomNumber, refNo, messageHash, linkData);
            common_2.LogApiCallUtils.sendMessageOutgoingApiCall({
                url: `${process.env.USR_MGMT_CRBNK_DS_BASE_URL}${urls.template.url}`,
                request: { randomNumber: randomNumber, otp: otp, refNo: refNo, messageHash: messageHash, linkData: linkData },
                response: response,
                success: true,
                transactionId: transactionId,
                extraInfo: {
                    channel: process.env.COMMON_API_CHANNEL,
                    user_id: process.env.COMMON_API_CHANNEL_USER_ID
                },
                externalSystemName: common_3.Option.GLOBALOPTIONS.EXTERNALAPISYSTEMNAME.COREBANKING
            });
            const responseString = response.responseString;
            if (responseString.statusCode && responseString.refNo && responseString.passwordValue && responseString.datatimeGen && responseString.datetimeExpire && responseString.errorDetail && hashKey) {
                const messageHash = "static:verpwdres:04:Base64" + this.sha1HashGenerator(`${responseString.statusCode}|${responseString.refNo}|${responseString.errorDetail}|${hashKey}`);
                if (messageHash != responseString.messageHash) {
                    throw 'The response message hash from verifyOTP did not match.';
                }
            }
            return response;
        }
        catch (error) {
            common_2.LogApiCallUtils.sendMessageOutgoingApiCall({
                url: `${process.env.USR_MGMT_CRBNK_DS_BASE_URL}${urls.template.url}`,
                request: { randomNumber: randomNumber, otp: otp, refNo: refNo, messageHash: messageHash, linkData: linkData },
                response: error.message,
                success: false,
                transactionId: transactionId,
                extraInfo: {
                    channel: process.env.COMMON_API_CHANNEL,
                    user_id: process.env.COMMON_API_CHANNEL_USER_ID
                },
                externalSystemName: common_3.Option.GLOBALOPTIONS.EXTERNALAPISYSTEMNAME.COREBANKING
            });
            throw error;
        }
    }
    async doPublishOTP(contactNumber, otp, transactionId, msgType) {
        var _a;
        let response, contact = contactNumber;
        let emailSubject = '';
        if (msgType != 'E') {
            msgType = 'S';
            contact = contactNumber.length > 10 ? `${contactNumber}` : `91${contactNumber}`;
            emailSubject = '';
        }
        else {
            emailSubject = ((_a = otp.emailSubject) !== null && _a !== void 0 ? _a : '');
        }
        const refNumber = common_1.OrderUtils.getRandomNumber(14);
        const urls = this.dataSource.settings.operations.filter((temp) => Object.keys(temp.functions)[0] == 'doPublishExternalAlertV2')[0];
        try {
            const msgId = Date.now() + common_1.RandomizationUtils.generateUniqueId(5);
            response = await this.dataSource.DataAccessObject.doPublishExternalAlertV2(contact, refNumber, otp.message, msgType, msgId, otp.tempId, emailSubject);
            common_2.LogApiCallUtils.sendMessageOutgoingApiCall({
                url: `${process.env.USR_MGMT_CRBNK_DS_BASE_URL}${urls.template.url}`,
                request: { pno: contactNumber, otp: otp.message, externalReferenceNo: refNumber, msgType: msgType, msgId: msgId, tempId: otp.tempId, subject: emailSubject },
                response: response,
                success: true,
                transactionId: transactionId,
                extraInfo: {
                    channel: process.env.COMMON_API_CHANNEL,
                    user_id: process.env.COMMON_API_CHANNEL_USER_ID
                },
                externalSystemName: common_3.Option.GLOBALOPTIONS.EXTERNALAPISYSTEMNAME.OTP_NOTIFICATION
            });
            return response;
        }
        catch (error) {
            common_2.LogApiCallUtils.sendMessageOutgoingApiCall({
                url: `${process.env.USR_MGMT_CRBNK_DS_BASE_URL}${urls.template.url}`,
                request: { pno: contactNumber, otp: otp.message, externalReferenceNo: refNumber, msgType: msgType, tempId: otp.tempId, subject: emailSubject },
                response: error.message,
                success: false,
                transactionId: transactionId,
                extraInfo: {
                    channel: process.env.COMMON_API_CHANNEL,
                    user_id: process.env.COMMON_API_CHANNEL_USER_ID
                },
                externalSystemName: common_3.Option.GLOBALOPTIONS.EXTERNALAPISYSTEMNAME.NOTIFICATION
            });
            throw error;
        }
    }
};
CoreBankingRepository = (0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, core_1.inject)('datasources.core_banking')),
    (0, tslib_1.__metadata)("design:paramtypes", [datasources_1.CoreBankingDataSource])
], CoreBankingRepository);
exports.CoreBankingRepository = CoreBankingRepository;
//# sourceMappingURL=core-banking.repository.js.map