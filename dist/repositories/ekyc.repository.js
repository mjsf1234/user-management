"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EkycRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const common_1 = require("common");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let EkycRepository = class EkycRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource) {
        super(models_1.Ekyc, dataSource);
    }
    //fetch kra kyc
    async fetchKRAKYC(request, checksum, token, transactionId) {
        let response;
        const urls = this.dataSource.settings.operations.filter((temp) => Object.keys(temp.functions)[0] == 'verifyKycFunction')[0];
        try {
            response = await this.dataSource.DataAccessObject.verifyKycFunction(request, checksum, token);
            common_1.LogApiCallUtils.sendMessageOutgoingApiCall({
                url: `${process.env.USR_MGMT_DS_KRA_KCY_BASE_URL}${urls.template.url}`,
                request: { request: request, checksum: checksum, token: token },
                response: response,
                success: true,
                transactionId: transactionId,
                externalSystemName: common_1.Option.GLOBALOPTIONS.EXTERNALAPISYSTEMNAME.EKYC,
            });
            return response;
        }
        catch (error) {
            common_1.LogApiCallUtils.sendMessageOutgoingApiCall({
                url: `${process.env.USR_MGMT_DS_KRA_KCY_BASE_URL}${urls.template.url}`,
                request: { request: request, checksum: checksum, token: token },
                response: error.message,
                success: false,
                transactionId: transactionId,
                externalSystemName: common_1.Option.GLOBALOPTIONS.EXTERNALAPISYSTEMNAME.EKYC,
            });
            throw error;
        }
    }
    //update kra ekyc
    async updateKRAKYC(request, checksum, token, transactionId) {
        let response;
        const urls = this.dataSource.settings.operations.filter((temp) => Object.keys(temp.functions)[0] == 'getPanEkycFunction')[0];
        try {
            response = await this.dataSource.DataAccessObject.getPanEkycFunction(request, checksum, token);
            common_1.LogApiCallUtils.sendMessageOutgoingApiCall({
                url: `${process.env.USR_MGMT_DS_KRA_KCY_BASE_URL}${urls.template.url}`,
                request: { request: request, checksum: checksum, token: token },
                response: response,
                success: false,
                transactionId: transactionId,
                externalSystemName: common_1.Option.GLOBALOPTIONS.EXTERNALAPISYSTEMNAME.EKYC,
            });
            return response;
        }
        catch (error) {
            common_1.LogApiCallUtils.sendMessageOutgoingApiCall({
                url: `${process.env.USR_MGMT_DS_KRA_KCY_BASE_URL}${urls.template.url}`,
                request: { request: request, checksum: checksum, token: token },
                response: error.message,
                success: false,
                transactionId: transactionId,
                externalSystemName: common_1.Option.GLOBALOPTIONS.EXTERNALAPISYSTEMNAME.EKYC,
            });
            throw error;
        }
    }
};
EkycRepository = (0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, core_1.inject)('datasources.ekyc')),
    (0, tslib_1.__metadata)("design:paramtypes", [datasources_1.EkycDataSource])
], EkycRepository);
exports.EkycRepository = EkycRepository;
//# sourceMappingURL=ekyc.repository.js.map