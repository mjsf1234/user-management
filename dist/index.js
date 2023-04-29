"use strict";
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const tslib_1 = require("tslib");
const dotenv = (0, tslib_1.__importStar)(require("dotenv"));
const core_1 = require("@loopback/core");
const common_1 = require("common");
const application_1 = require("./application");
const datasource_initialization_1 = require("./datasource-initialization");
const repository_initiliazation_1 = require("./repository-initiliazation");
const service_initiliazation_1 = require("./service-initiliazation");
const rest_1 = require("@loopback/rest");
(0, tslib_1.__exportStar)(require("./application"), exports);
dotenv.config();
async function main(options = {}) {
    const app = new application_1.UserManagementService(options);
    if (process.env.LNPTESTING == "true") {
        app.restServer.basePath('/LNP/API/UserManagement');
    }
    else {
        app.restServer.basePath('/API/UserManagement');
    }
    await app.boot();
    await app.start();
    app.bind(rest_1.RestBindings.ERROR_WRITER_OPTIONS).to({ safeFields: ['extra'] });
    await datasource_initialization_1.DatasourceInitialization.init(app);
    repository_initiliazation_1.RepositoryInitialization.init(app);
    service_initiliazation_1.ServiceInitialization.init(app);
    const url = app.restServer.url;
    common_1.LoggingUtils.info(`Server is running at ${url}`);
    common_1.LoggingUtils.info(`Try ${url}/ping`);
    return app;
}
exports.main = main;
//this function is really useless
//@todo - ketan to check why removing this function makes everything break
//DO NOT DELETE
async function init(app) {
    common_1.LoggingUtils.info('init called');
    (0, core_1.inject)('datasources.local')(common_1.AppUserRepository, undefined, 0);
    app.repository(common_1.AppUserRepository);
}
if (require.main === module) {
    // Run the application
    const config = {
        rest: {
            port: (_a = process.env.USR_MGMT_SRVC_PORT) !== null && _a !== void 0 ? _a : 3018,
            host: process.env.HOST,
            cors: {
                "origin": ((_c = (_b = process.env) === null || _b === void 0 ? void 0 : _b.NODE_ENV) === null || _c === void 0 ? void 0 : _c.toLowerCase()) == 'production' ? common_1.CorsHeaders.ENV.PROD : [...common_1.CorsHeaders.ENV.UAT, "http://localhost:3018"],
                "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
                "preflightContinue": false,
                "optionsSuccessStatus": 204
            },
            // The `gracePeriodForClose` provides a graceful close for http/https
            // servers with keep-alive clients. The default value is `Infinity`
            // (don't force-close). If you want to immediately destroy all sockets
            // upon stop, set its value to `0`.
            // See https://www.npmjs.com/package/stoppable
            gracePeriodForClose: 5000,
            openApiSpec: {
                // useful when used with OpenAPI-to-GraphQL to locate your application
                setServersFromRequest: false,
                servers: [
                    //@todo - have a better way to do this
                    {
                        url: 'https://delta-dev.finzipp.com/API/UserManagement'
                    },
                    {
                        url: 'https://delta-test.finzipp.com/API/UserManagement'
                    },
                    {
                        url: 'https://delta-uat.finzipp.com/API/UserManagement'
                    },
                    {
                        url: 'http://127.0.0.1:3018/API/UserManagement'
                    }
                ],
                expressSettings: {
                    'trust proxy': true,
                }
            }
        }
    };
    main(config).catch(err => {
        common_1.LoggingUtils.error('Cannot start the application.- ' + err);
        process.exit(1);
    });
}
//# sourceMappingURL=index.js.map