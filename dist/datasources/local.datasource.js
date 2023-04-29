"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalDataSource = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const common_1 = require("common");
const fs = require('fs');
const prepareConfig = () => {
    const config = {
        name: process.env.USR_MGMT_DS_LOCAL_POSTGRES_NAME,
        connector: 'postgresql',
        host: process.env.USR_MGMT_DS_LOCAL_POSTGRES_HOST,
        port: process.env.USR_MGMT_DS_LOCAL_POSTGRES_PORT,
        user: process.env.USR_MGMT_DS_LOCAL_POSTGRES_USER,
        password: process.env.USR_MGMT_DS_LOCAL_POSTGRES_PASS,
        database: process.env.USR_MGMT_DS_LOCAL_POSTGRES_DBS,
        min: process.env.USR_MGMT_DS_LOCAL_POSTGRES_MIN,
        max: process.env.USR_MGMT_DS_LOCAL_POSTGRES_MAX,
        idleTimeoutMillis: 60000,
        connectionTimeoutMillis: 20000,
        ssl: common_1.Option.GLOBALOPTIONS.BOOLEANVARS[process.env.GLOBAL_DS_LOCAL_POSTGRES_SSL],
        debug: common_1.Option.GLOBALOPTIONS.BOOLEANVARS[process.env.GLOBAL_DS_LOCAL_POSTGRES_DEBUG],
        // normalizeUndefinedInQuery: "throw"
    };
    if (common_1.Option.GLOBALOPTIONS.BOOLEANVARS[process.env.GLOBAL_DS_LOCAL_POSTGRES_SSL] && common_1.Option.GLOBALOPTIONS.BOOLEANVARS[process.env.GLOBAL_DS_LOCAL_POSTGRES_SSL] === true) {
        if (process.env.COMMON_POSTGRES_SERVER_CERT && process.env.COMMON_POSTGRES_CLIENT_CERT && process.env.COMMON_POSTGRES_CLIENT_KEY) {
            config.ssl = {
                rejectUnauthorized: false,
                ca: fs.readFileSync(process.env.COMMON_POSTGRES_SERVER_CERT).toString(),
                key: fs.readFileSync(process.env.COMMON_POSTGRES_CLIENT_KEY).toString(),
                cert: fs.readFileSync(process.env.COMMON_POSTGRES_CLIENT_CERT).toString()
            };
            common_1.LoggingUtils.info({ message: 'ssl is set to true for postgres connection' }, 'prepareConfig');
        }
        else {
            common_1.LoggingUtils.fatal({ message: `ssl was set to true but not all env variables were populated.` }, 'prepareConfig');
            throw new Error('ssl was set to true but not all env variables were populated');
        }
    }
    return config;
};
// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
let LocalDataSource = class LocalDataSource extends repository_1.juggler.DataSource {
    constructor(dsConfig = prepareConfig()) {
        super(dsConfig);
    }
};
LocalDataSource.dataSourceName = 'local';
LocalDataSource.defaultConfig = prepareConfig();
LocalDataSource = (0, tslib_1.__decorate)([
    (0, core_1.lifeCycleObserver)('datasource'),
    (0, tslib_1.__param)(0, (0, core_1.inject)('datasources.config.local', { optional: true })),
    (0, tslib_1.__metadata)("design:paramtypes", [Object])
], LocalDataSource);
exports.LocalDataSource = LocalDataSource;
//# sourceMappingURL=local.datasource.js.map