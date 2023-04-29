"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.KarvyDataSource = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const config = {
    name: 'kravy',
    connector: 'rest',
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
                url: process.env.USR_MGMT_DS_KRA_FETCH_MOBILE_EMAIL_BASE_URL,
                headers: {},
                query: {},
                body: {
                    Appid: '{Appid}',
                    Apppwd: '{Apppwd}',
                    AppIden: '{AppIden}',
                    AgentCode: '{AgentCode}',
                    BranchCode: '{BranchCode}',
                    AMC_Code: '{AMC_Code}',
                    Folio_No: '{Folio_No}'
                }
            },
            functions: {
                KarvyGetMobileAndEmailBasedOnFolio: ['Appid', 'Apppwd', 'AppIden', 'AgentCode', 'BranchCode', 'AMC_Code', 'Folio_No']
            }
        },
        {
            template: {
                method: 'POST',
                url: process.env.USR_MGMT_DS_CAMS_FETCH_MOBILE_EMAIL_BASE_URL,
                headers: {},
                query: {},
                body: {
                    Contact_Details_Request: {
                        AMCCode: '{AMCCode}',
                        ApplicationID: '{ApplicationID}',
                        Password: '{Password}',
                        FolioNo: '{FolioNo}',
                        PAN: '{PAN}'
                    }
                }
            },
            functions: {
                CamsGetMobileAndEmailBasedOnFolio: ['AMCCode', 'ApplicationID', 'Password', 'FolioNo', 'PAN']
            }
        }
    ]
};
// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
let KarvyDataSource = class KarvyDataSource extends repository_1.juggler.DataSource {
    constructor(dsConfig = config) {
        super(dsConfig);
    }
};
KarvyDataSource.dataSourceName = 'karvy';
KarvyDataSource.defaultConfig = config;
KarvyDataSource = (0, tslib_1.__decorate)([
    (0, core_1.lifeCycleObserver)('datasource'),
    (0, tslib_1.__param)(0, (0, core_1.inject)('datasources.config.karvy', { optional: true })),
    (0, tslib_1.__metadata)("design:paramtypes", [Object])
], KarvyDataSource);
exports.KarvyDataSource = KarvyDataSource;
//# sourceMappingURL=karvyFetchMobileEmail.datasource.js.map