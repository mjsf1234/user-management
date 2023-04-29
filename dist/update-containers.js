"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFileContainers = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const common_1 = require("common");
const application_1 = require("./application");
const datasource_initialization_1 = require("./datasource-initialization");
const repository_initiliazation_1 = require("./repository-initiliazation");
const common_2 = require("common");
const underscore_1 = (0, tslib_1.__importDefault)(require("underscore"));
async function updateFileContainers() {
    let fileStorageService;
    return new Promise((resolve, reject) => {
        const app = new application_1.UserManagementService();
        app
            .boot()
            .then(() => {
            return datasource_initialization_1.DatasourceInitialization.init(app);
        })
            .then(() => {
            repository_initiliazation_1.RepositoryInitialization.init(app);
            const fileStorageServiceInterface = Symbol('fileStorage');
            const binding = app.service(common_1.FileStorageComponent, { interface: fileStorageServiceInterface });
            var ctx = new core_1.Context();
            return binding.getValue(ctx);
        })
            .then((bindValue) => {
            fileStorageService = bindValue;
            return new Promise((resolve, reject) => {
                fileStorageService.getContainers(function (err, containers) {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(containers);
                });
            });
        })
            .then((containers) => {
            const existingContainers = underscore_1.default.pluck(containers, 'name');
            let promises = [];
            const containersToMigrate = [];
            if (common_1.StorageDataSource.defaultConfig.provider === 'amazon' && common_1.StorageDataSource.defaultConfig.mainBucket) {
                if (existingContainers.indexOf(common_1.StorageDataSource.defaultConfig.mainBucket) == -1 && common_1.StorageDataSource.defaultConfig.mainBucket) {
                    containersToMigrate.push(common_1.StorageDataSource.defaultConfig.mainBucket);
                }
            }
            else {
                underscore_1.default.each(common_2.FileStorageContainerConfig.containers, function (containerDefinition) {
                    if (existingContainers.indexOf(common_2.FileStorageContainerConfig.getGcpContainerName(containerDefinition.name)) == -1) {
                        containersToMigrate.push(common_2.FileStorageContainerConfig.getGcpContainerName(containerDefinition.name));
                    }
                });
            }
            underscore_1.default.each(containersToMigrate, (container) => {
                promises.push(new Promise(function (resolve, reject) {
                    fileStorageService.createContainer({ name: container }, function (err) {
                        if (err) {
                            return reject(err);
                        }
                        return resolve();
                    });
                }));
            });
            return Promise.all(promises);
        })
            .then(() => {
            common_1.LoggingUtils.info('File containers migrated successfully');
            return resolve();
        })
            .catch(reject);
    });
}
exports.updateFileContainers = updateFileContainers;
updateFileContainers()
    .then(() => {
    process.exit(0);
})
    .catch(err => {
    common_1.LoggingUtils.error(err);
    process.exit(1);
});
//# sourceMappingURL=update-containers.js.map