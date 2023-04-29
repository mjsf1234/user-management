"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrate = void 0;
const tslib_1 = require("tslib");
const dotenv = (0, tslib_1.__importStar)(require("dotenv"));
const core_1 = require("@loopback/core");
const common_1 = require("common");
const application_1 = require("./application");
const datasource_initialization_1 = require("./datasource-initialization");
const repository_initiliazation_1 = require("./repository-initiliazation");
const repository_1 = require("@loopback/repository");
dotenv.config();
async function migrate(args) {
    const existingSchema = args.includes('--rebuild') ? 'drop' : 'alter';
    common_1.LoggingUtils.info('Migrating schemas (%s existing schema)  ' + existingSchema);
    const app = new application_1.UserManagementService();
    await app.boot();
    await datasource_initialization_1.DatasourceInitialization.init(app);
    repository_initiliazation_1.RepositoryInitialization.init(app);
    await app.migrateSchema({ existingSchema });
    if (common_1.Option.GLOBALOPTIONS.BOOLEANVARS[process.env.GLOBAL_MIGRATION_CREATE_FOREIGN_KEYS]) {
        await createForeignKeys(app);
    }
    else {
        process.exit(0);
    }
    // Connectors usually keep a pool of opened connections,
    // this keeps the process running even after all work is done.
    // We need to exit explicitly.
    // process.exit(0);
}
exports.migrate = migrate;
//this function is really useless
//@todo - ketan to check why removing this function makes everything break
//DO NOT DELETE
async function init(app) {
    common_1.LoggingUtils.info('init called');
    (0, core_1.inject)('datasources.local')(common_1.AppUserRepository, undefined, 0);
    app.repository(common_1.AppUserRepository);
}
migrate(process.argv).catch(err => {
    common_1.LoggingUtils.error('Cannot migrate database schema -- ' + err);
    process.exit(1);
});
async function createForeignKeys(app) {
    var _a;
    const dsBindings = app.findByTag(repository_1.RepositoryTags.DATASOURCE);
    const operation = 'createForeignKeys';
    const localDatasources = dsBindings.filter((datasource) => {
        return datasource.key === 'datasources.local';
    });
    //There is only one local data source atm
    const ds = await app.get(localDatasources[0].key);
    const disableMigration = (_a = ds.settings.disableMigration) !== null && _a !== void 0 ? _a : false;
    if (operation in ds.connector && typeof ds.connector[operation] === 'function' && !disableMigration) {
        common_1.LoggingUtils.info('Creating foreign keys for dataSource - ' + ds.name);
        let models = Object.keys(ds.connector._models);
        ds.connector[operation](models, function (err) {
            if (err) {
                common_1.LoggingUtils.error(err);
                common_1.LoggingUtils.error('Foreign Keys could not be created for datasource -' + ds.name);
                process.exit(1);
            }
            else {
                common_1.LoggingUtils.info('Foreign keys created for datasource -' + ds.name);
                process.exit(0);
            }
        });
    }
    else {
        common_1.LoggingUtils.info('Skipping creation of dataSource %s' + ds.key);
    }
}
//# sourceMappingURL=migrate.js.map