"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdcomRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const common_1 = require("common");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let IdcomRepository = class IdcomRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource) {
        super(models_1.Idcom, dataSource);
    }
    async fetchAuthCodeWithRedirectUrl(RequestEncryptedValue, SymmetricKeyEncryptedValue, Scope, TransactionId, transactionId) {
        let response;
        const urls = this.dataSource.settings.operations.filter((temp) => Object.keys(temp.functions)[0] == 'fetchAuthCodeWithRedirectUrl')[0];
        try {
            response = await this.dataSource.DataAccessObject.fetchAuthCodeWithRedirectUrl(RequestEncryptedValue, SymmetricKeyEncryptedValue, Scope, TransactionId);
            common_1.LogApiCallUtils.sendMessageOutgoingApiCall({
                url: `${process.env.USR_MGMT_IDCOM_DS_BASE_URL}${urls.template.url}`,
                request: {
                    RequestEncryptedValue: RequestEncryptedValue,
                    SymmetricKeyEncryptedValue: SymmetricKeyEncryptedValue,
                    Scope: Scope,
                    TransactionId: TransactionId
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
                    RequestEncryptedValue: RequestEncryptedValue,
                    SymmetricKeyEncryptedValue: SymmetricKeyEncryptedValue,
                    Scope: Scope,
                    TransactionId: TransactionId
                },
                response: error.message,
                success: false,
                transactionId: transactionId,
                externalSystemName: common_1.Option.GLOBALOPTIONS.EXTERNALAPISYSTEMNAME.IDCOM
            });
            throw error;
        }
    }
    async fetchIdToken(RequestEncryptedValue, SymmetricKeyEncryptedValue, Scope, TransactionId, transactionId) {
        let response;
        const urls = this.dataSource.settings.operations.filter((temp) => Object.keys(temp.functions)[0] == 'fetchIdToken')[0];
        try {
            response = await this.dataSource.DataAccessObject.fetchIdToken(RequestEncryptedValue, SymmetricKeyEncryptedValue, Scope, TransactionId);
            common_1.LogApiCallUtils.sendMessageOutgoingApiCall({
                url: `${process.env.USR_MGMT_IDCOM_DS_BASE_URL}${urls.template.url}`,
                request: {
                    RequestEncryptedValue: RequestEncryptedValue,
                    SymmetricKeyEncryptedValue: SymmetricKeyEncryptedValue,
                    Scope: Scope,
                    TransactionId: TransactionId
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
                    RequestEncryptedValue: RequestEncryptedValue,
                    SymmetricKeyEncryptedValue: SymmetricKeyEncryptedValue,
                    Scope: Scope,
                    TransactionId: TransactionId
                },
                response: error.message,
                success: false,
                transactionId: transactionId,
                externalSystemName: common_1.Option.GLOBALOPTIONS.EXTERNALAPISYSTEMNAME.IDCOM
            });
            throw error;
        }
    }
    async decryptIdToken(RequestEncryptedValue, SymmetricKeyEncryptedValue, Scope, TransactionId, IDCOM_Token, transactionId) {
        let response;
        const urls = this.dataSource.settings.operations.filter((temp) => Object.keys(temp.functions)[0] == 'decryptIdToken')[0];
        try {
            //
            //  response = await this.dataSource.DataAccessObject.decryptIdToken(
            //   RequestEncryptedValue,
            //   SymmetricKeyEncryptedValue,
            //   Scope,
            //   TransactionId,
            //   IDCOM_Token
            // );
            response = await this.dataSource.DataAccessObject.decryptIdToken(IDCOM_Token);
            common_1.LogApiCallUtils.sendMessageOutgoingApiCall({
                url: `${process.env.USR_MGMT_IDCOM_DS_BASE_URL}${urls.template.url}`,
                // request: { RequestEncryptedValue : RequestEncryptedValue,
                //   SymmetricKeyEncryptedValue : SymmetricKeyEncryptedValue,
                //   Scope : Scope,
                //   TransactionId : TransactionId,
                //   IDCOM_Token : IDCOM_Token},
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
                    // RequestEncryptedValue: RequestEncryptedValue,
                    // SymmetricKeyEncryptedValue: SymmetricKeyEncryptedValue,
                    // Scope: Scope,
                    // TransactionId: TransactionId,
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
IdcomRepository = (0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, core_1.inject)('datasources.idcom')),
    (0, tslib_1.__metadata)("design:paramtypes", [datasources_1.IdcomDataSource])
], IdcomRepository);
exports.IdcomRepository = IdcomRepository;
//# sourceMappingURL=idcom.repository.js.map