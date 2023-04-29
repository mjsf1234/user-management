"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WealthfyDomesticFCPBDataSource = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const config = {
    name: 'wealthfy_domestic_FCPB',
    connector: 'rest',
    baseUrl: process.env.USR_MGMT_DS_WDF_URL,
    crud: false,
    options: {
        strictSSL: false,
        timeout: 1200000,
        proxy: ''
    },
    operations: [
        {
            template: {
                method: 'GET',
                url: `/fetchUserSegmentDetails`,
                query: {
                    userCode: '{userCode}'
                },
                headers: {
                    accepts: 'application/json',
                    'content-type': 'application/json',
                    'api-key': process.env.USR_MGMT_DS_WDF_API_KEY,
                    source: 'external-system',
                    version: '1.1.0'
                }
            },
            functions: {
                fetchUserSegmentDetailsFCPB: ['userCode']
            }
        }
    ]
};
// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
let WealthfyDomesticFCPBDataSource = class WealthfyDomesticFCPBDataSource extends repository_1.juggler.DataSource {
    constructor(dsConfig = config) {
        super(dsConfig);
    }
};
WealthfyDomesticFCPBDataSource.dataSourceName = 'wealthfy_domestic_FCPB';
WealthfyDomesticFCPBDataSource.defaultConfig = config;
WealthfyDomesticFCPBDataSource = (0, tslib_1.__decorate)([
    (0, core_1.lifeCycleObserver)('datasource'),
    (0, tslib_1.__param)(0, (0, core_1.inject)('datasources.config.wealthfy_domestic_FCPB', { optional: true })),
    (0, tslib_1.__metadata)("design:paramtypes", [Object])
], WealthfyDomesticFCPBDataSource);
exports.WealthfyDomesticFCPBDataSource = WealthfyDomesticFCPBDataSource;
//# sourceMappingURL=wealthfy-domestic-FCPB.datasource.js.map