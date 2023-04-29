"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WealthfyDomesticFinacleRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const common_1 = require("common");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let WealthfyDomesticFinacleRepository = class WealthfyDomesticFinacleRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource) {
        super(models_1.WealthfyDomesticFinacle, dataSource);
    }
    async fetchUserSegmentDetailsFinacle(customerId, transactionId) {
        let response;
        const urls = this.dataSource.settings.operations.filter((temp) => Object.keys(temp.functions)[0] == 'fetchUserSegmentDetailsFinacle')[0];
        try {
            response = await this.dataSource.DataAccessObject.fetchUserSegmentDetailsFinacle(customerId);
            common_1.LoggingUtils.debug(`response from FINACLE ${response}`, 'fetchUserSegmentDetailsFinacle');
            common_1.LogApiCallUtils.sendMessageOutgoingApiCall({
                url: `${process.env.USR_MGMT_DS_WDF_URL}${urls.template.url}`,
                request: { customerId: customerId },
                response: response,
                success: true,
                transactionId: transactionId,
                externalSystemName: common_1.Option.GLOBALOPTIONS.EXTERNALAPISYSTEMNAME.FINACLE
            });
            return response;
        }
        catch (error) {
            common_1.LogApiCallUtils.sendMessageOutgoingApiCall({
                url: `${process.env.USR_MGMT_DS_WDF_URL}${urls.template.url}`,
                request: { customerId: customerId },
                response: error.message,
                success: false,
                transactionId: transactionId,
                externalSystemName: common_1.Option.GLOBALOPTIONS.EXTERNALAPISYSTEMNAME.FINACLE,
            });
            throw error;
        }
    }
};
WealthfyDomesticFinacleRepository = (0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, core_1.inject)('datasources.wealthfy_domestic_finacle')),
    (0, tslib_1.__metadata)("design:paramtypes", [datasources_1.WealthfyDomesticFinacleDataSource])
], WealthfyDomesticFinacleRepository);
exports.WealthfyDomesticFinacleRepository = WealthfyDomesticFinacleRepository;
//# sourceMappingURL=wealthfy-domestic-finacle.repository.js.map