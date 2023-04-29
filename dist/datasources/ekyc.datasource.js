"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EkycDataSource = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const config = {
    name: 'ekcy',
    connector: 'rest',
    baseUrl: process.env.USR_MGMT_DS_KRA_KCY_BASE_URL,
    crud: false,
    options: {
        headers: {
            accepts: 'application/json',
            'Content-Type': 'application/json'
        },
        strictSSL: false,
        timeout: 1200000,
        proxy: (_a = process.env.PROXY_SERVER) !== null && _a !== void 0 ? _a : ''
    },
    operations: [
        {
            template: {
                method: 'POST',
                url: `/verifyKyc`,
                headers: {
                    token: '{token}'
                },
                query: {},
                body: {
                    request: '{request}',
                    checksum: '{checksum}'
                }
            },
            functions: {
                verifyKycFunction: ['request', 'checksum', 'token']
            }
        },
        {
            template: {
                method: 'POST',
                url: `/eKyc`,
                headers: {
                    token: '{token}'
                },
                query: {},
                body: {
                    request: '{request}',
                    checksum: '{checksum}'
                }
            },
            functions: {
                getPanEkycFunction: ['request', 'checksum', 'token']
            }
        }
    ]
};
// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
let EkycDataSource = class EkycDataSource extends repository_1.juggler.DataSource {
    constructor(dsConfig = config) {
        super(dsConfig);
    }
};
EkycDataSource.dataSourceName = 'ekyc';
EkycDataSource.defaultConfig = config;
EkycDataSource = (0, tslib_1.__decorate)([
    (0, core_1.lifeCycleObserver)('datasource'),
    (0, tslib_1.__param)(0, (0, core_1.inject)('datasources.config.ekyc', { optional: true })),
    (0, tslib_1.__metadata)("design:paramtypes", [Object])
], EkycDataSource);
exports.EkycDataSource = EkycDataSource;
//# sourceMappingURL=ekyc.datasource.js.map