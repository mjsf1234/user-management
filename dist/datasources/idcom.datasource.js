"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdcomDataSource = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const certificate = Buffer.from(process.env.USR_MGMT_IDCOM_DS_CERTIFICATE, 'base64').toString('utf8');
const privateKey = Buffer.from(process.env.USR_MGMT_IDCOM_DS_PRIVATE_KEY, 'base64').toString('utf8');
const apiKey = Buffer.from(process.env.USR_MGMT_IDCOM_FCD_CLIENT_KEY, 'base64').toString('utf8');
const config = {
    name: 'idcom',
    connector: 'rest',
    baseUrl: process.env.USR_MGMT_IDCOM_DS_BASE_URL,
    crud: false,
    options: {
        strictSSL: false,
        timeout: 1200000,
        proxy: (_a = process.env.PROXY_SERVER) !== null && _a !== void 0 ? _a : ''
    },
    operations: [
        {
            template: {
                method: 'POST',
                url: `/idcom/Fetch_AuthCode`,
                query: {},
                headers: {
                    accepts: 'application/json',
                    'content-type': 'application/json',
                    apikey: apiKey,
                    scope: process.env.USR_MGMT_IDCOM_FCD_SCOPE
                },
                options: {
                    // agentOptions: {
                    cert: certificate,
                    key: privateKey
                    // }
                },
                body: {
                    RequestEncryptedValue: '{RequestEncryptedValue}',
                    SymmetricKeyEncryptedValue: '{SymmetricKeyEncryptedValue}',
                    Scope: '{Scope}',
                    TransactionId: '{TransactionId}',
                    OAuthTokenValue: ''
                }
            },
            functions: {
                fetchAuthCodeWithRedirectUrl: ['RequestEncryptedValue', 'SymmetricKeyEncryptedValue', 'Scope', 'TransactionId']
            }
        },
        {
            template: {
                method: 'POST',
                url: `/idcom/Fetch_IDToken`,
                query: {},
                headers: {
                    accepts: 'application/json',
                    'content-type': 'application/json',
                    apikey: apiKey,
                    scope: process.env.USR_MGMT_IDCOM_FCD_SCOPE
                },
                options: {
                    // agentOptions: {
                    cert: certificate,
                    key: privateKey
                    // }
                },
                body: {
                    RequestEncryptedValue: '{RequestEncryptedValue}',
                    SymmetricKeyEncryptedValue: '{SymmetricKeyEncryptedValue}',
                    Scope: '{Scope}',
                    TransactionId: '{TransactionId}',
                    OAuthTokenValue: ''
                }
            },
            functions: {
                fetchIdToken: ['RequestEncryptedValue', 'SymmetricKeyEncryptedValue', 'Scope', 'TransactionId']
            }
        },
        {
            template: {
                method: 'POST',
                url: `/IDCOM_getDecryptedToken`,
                query: {},
                headers: {
                    accepts: 'application/json',
                    'content-type': 'application/json',
                    apikey: apiKey,
                    scope: process.env.USR_MGMT_IDCOM_FCD_SCOPE
                },
                options: {
                    // agentOptions: {
                    cert: certificate,
                    key: privateKey
                    // }
                },
                body: {
                    // RequestEncryptedValue: '{RequestEncryptedValue}',
                    // SymmetricKeyEncryptedValue: '{SymmetricKeyEncryptedValue}',
                    // Scope: '{Scope}',
                    // TransactionId: '{TransactionId}',
                    // 'Id-token-jwt': '',
                    // OAuthTokenValue: '',
                    IDCOM_Token: '{IDCOM_Token}'
                }
            },
            functions: {
                //decryptIdToken: ['RequestEncryptedValue', 'SymmetricKeyEncryptedValue', 'Scope', 'TransactionId', 'IDCOM_Token']
                decryptIdToken: ['IDCOM_Token']
            }
        }
    ]
};
// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
let IdcomDataSource = class IdcomDataSource extends repository_1.juggler.DataSource {
    constructor(dsConfig = config) {
        super(dsConfig);
    }
};
IdcomDataSource.dataSourceName = 'idcom';
IdcomDataSource.defaultConfig = config;
IdcomDataSource = (0, tslib_1.__decorate)([
    (0, core_1.lifeCycleObserver)('datasource'),
    (0, tslib_1.__param)(0, (0, core_1.inject)('datasources.config.idcom', { optional: true })),
    (0, tslib_1.__metadata)("design:paramtypes", [Object])
], IdcomDataSource);
exports.IdcomDataSource = IdcomDataSource;
//# sourceMappingURL=idcom.datasource.js.map