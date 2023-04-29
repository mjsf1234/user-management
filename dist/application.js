"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserManagementService = void 0;
const tslib_1 = require("tslib");
const boot_1 = require("@loopback/boot");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const rest_explorer_1 = require("@loopback/rest-explorer");
const service_proxy_1 = require("@loopback/service-proxy");
const path_1 = (0, tslib_1.__importDefault)(require("path"));
const sequence_1 = require("./sequence");
const common_1 = require("common");
const authorization_1 = require("@loopback/authorization");
const common_2 = require("common");
class UserManagementService extends (0, boot_1.BootMixin)((0, service_proxy_1.ServiceMixin)((0, repository_1.RepositoryMixin)(rest_1.RestApplication))) {
    constructor(options = {}) {
        var _a;
        super(options);
        // Allows modification of response
        this.bind(rest_1.RestBindings.SequenceActions.SEND).toProvider(common_2.ModifyResponseProvider);
        this.expressMiddleware('compression', common_2.Compression.Compress());
        // Set up the custom sequence
        this.sequence(sequence_1.MySequence);
        this.add((0, core_1.createBindingFromClass)(common_1.AuthorizationHeaderOASEnhancer));
        this.middleware(common_1.authenticateRequest.bind(this));
        this.middleware(common_1.rateLimiter.bind(this));
        this.bodyParser(common_1.DecryptBodyJsonParser, rest_1.RestBindings.REQUEST_BODY_PARSER_JSON);
        // Customize @loopback/rest-explorer configuration here
        if (((_a = process.env.NODE_ENV) === null || _a === void 0 ? void 0 : _a.toLowerCase()) != 'production' && !process.env.HIDE_SWAGGER) {
            // Set up default home page
            this.static('/', path_1.default.join(__dirname, '../public'));
            this.configure(rest_explorer_1.RestExplorerBindings.COMPONENT).to({
                path: '/explorer'
            });
            this.component(rest_explorer_1.RestExplorerComponent);
        }
        this.middleware(common_1.httpLogging.bind(this));
        this.middleware(common_1.authenticateAppUserState.bind(this));
        this.component(authorization_1.AuthorizationComponent);
        this.component(common_1.CasbinAuthorizationComponent);
        this.component(common_1.GCSchedulerComponent);
        this.projectRoot = __dirname;
        // Customize @loopback/boot Booter Conventions here
        this.bootOptions = {
            controllers: {
                // Customize ControllerBooter Conventions here
                dirs: ['controllers'],
                extensions: ['.controller.js'],
                nested: true
            },
            models: {
                // Customize ModelBooter Conventions here
                dirs: ['models', path_1.default.join(__dirname, '../node_modules/common/dist/models')],
                extensions: ['.model.js'],
                nested: true
            },
            repositories: {
                // Customize RepositoryBooter Conventions here
                dirs: ['repositories'],
                extensions: ['.repository.js'],
                nested: true
            },
            datasources: {
                // Customize RepositoryBooter Conventions here
                dirs: ['datasources'],
                extensions: ['.datasource.js'],
                nested: true
            },
            services: {
                // Customize ServiceBooter Conventions here
                dirs: ['services', 'facades', 'engines'],
                extensions: ['.service.js', '.facade.js', '.engine.js'],
                nested: true
            }
        };
    }
}
exports.UserManagementService = UserManagementService;
//# sourceMappingURL=application.js.map