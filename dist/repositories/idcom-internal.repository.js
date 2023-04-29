"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdcomInternalRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const common_1 = require("common");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let IdcomInternalRepository = class IdcomInternalRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource) {
        super(models_1.Idcom, dataSource);
    }
    async fetchAuthCodeWithRedirectUrl(FintechID, Identifiers, ProductCode, ClientSecret, ClientID, transactionId) {
        let response;
        const urls = this.dataSource.settings.operations.filter((temp) => Object.keys(temp.functions)[0] == 'fetchAuthCodeWithRedirectUrl')[0];
        try {
            response = await this.dataSource.DataAccessObject.fetchAuthCodeWithRedirectUrl(FintechID, Identifiers, ProductCode, ClientSecret, ClientID);
            common_1.LogApiCallUtils.sendMessageOutgoingApiCall({
                url: `${process.env.USR_MGMT_IDCOM_DS_BASE_URL}${urls.template.url}`,
                request: {
                    FintechID,
                    Identifiers,
                    ProductCode,
                    ClientSecret,
                    ClientID
                },
                response: response,
                success: true,
                transactionId: transactionId,
                externalSystemName: common_1.Option.GLOBALOPTIONS.EXTERNALAPISYSTEMNAME.IDCOM
            });
            return response;
        }
        catch (error) {
            common_1.LogApiCallUtils.sendMessageOutgoingApiCall({
                url: `${process.env.USR_MGMT_IDCOM_DS_BASE_URL}${urls.template.url}`,
                request: {
                    FintechID,
                    Identifiers,
                    ProductCode,
                    ClientSecret,
                    ClientID
                },
                response: error.message,
                success: false,
                transactionId: transactionId,
                externalSystemName: common_1.Option.GLOBALOPTIONS.EXTERNALAPISYSTEMNAME.IDCOM
            });
            throw error;
        }
    }
    async fetchIdToken(authCode, transactionId) {
        let response;
        const urls = this.dataSource.settings.operations.filter((temp) => Object.keys(temp.functions)[0] == 'fetchIdToken')[0];
        try {
            response = await this.dataSource.DataAccessObject.fetchIdToken(authCode);
            common_1.LogApiCallUtils.sendMessageOutgoingApiCall({
                url: `${process.env.USR_MGMT_IDCOM_DS_BASE_URL}${urls.template.url}`,
                request: {
                    authCode
                },
                response: response,
                success: true,
                transactionId: transactionId,
                externalSystemName: common_1.Option.GLOBALOPTIONS.EXTERNALAPISYSTEMNAME.IDCOM
            });
            return response;
        }
        catch (error) {
            common_1.LogApiCallUtils.sendMessageOutgoingApiCall({
                url: `${process.env.USR_MGMT_IDCOM_DS_BASE_URL}${urls.template.url}`,
                request: {
                    authCode
                },
                response: error.message,
                success: false,
                transactionId: transactionId,
                externalSystemName: common_1.Option.GLOBALOPTIONS.EXTERNALAPISYSTEMNAME.IDCOM
            });
            throw error;
        }
    }
    async decryptIdToken(IDCOM_Token, transactionId) {
        let response;
        const urls = this.dataSource.settings.operations.filter((temp) => Object.keys(temp.functions)[0] == 'decryptIdToken')[0];
        try {
            response = await this.dataSource.DataAccessObject.decryptIdToken(IDCOM_Token);
            common_1.LogApiCallUtils.sendMessageOutgoingApiCall({
                url: `${process.env.USR_MGMT_IDCOM_DS_BASE_URL}${urls.template.url}`,
                request: {
                    IDCOM_Token: IDCOM_Token
                },
                response: response,
                success: true,
                transactionId: transactionId,
                externalSystemName: common_1.Option.GLOBALOPTIONS.EXTERNALAPISYSTEMNAME.IDCOM
            });
            return response;
        }
        catch (error) {
            common_1.LogApiCallUtils.sendMessageOutgoingApiCall({
                url: `${process.env.USR_MGMT_IDCOM_DS_BASE_URL}${urls.template.url}`,
                request: {
                    IDCOM_Token: IDCOM_Token
                },
                response: error.message,
                success: false,
                transactionId: transactionId,
                externalSystemName: common_1.Option.GLOBALOPTIONS.EXTERNALAPISYSTEMNAME.IDCOM
            });
            throw error;
        }
    }
};
IdcomInternalRepository = (0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, core_1.inject)('datasources.idcom_internal')),
    (0, tslib_1.__metadata)("design:paramtypes", [datasources_1.IdcomInternalDataSource])
], IdcomInternalRepository);
exports.IdcomInternalRepository = IdcomInternalRepository;
//# sourceMappingURL=idcom-internal.repository.js.map