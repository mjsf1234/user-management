"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBaseData = void 0;
const tslib_1 = require("tslib");
const common_1 = require("common");
const application_1 = require("../application");
const datasource_initialization_1 = require("../datasource-initialization");
const repository_initiliazation_1 = require("../repository-initiliazation");
const dotenv = (0, tslib_1.__importStar)(require("dotenv"));
const path = (0, tslib_1.__importStar)(require("path"));
try {
    dotenv.config({ path: path.resolve(__dirname, '../../.env') });
}
catch (error) { }
async function createBaseData() {
    const app = new application_1.UserManagementService();
    await app.boot();
    await datasource_initialization_1.DatasourceInitialization.init(app);
    repository_initiliazation_1.RepositoryInitialization.init(app);
    const baseData = {
        // id: 1,
        maxLoginAttempts: 5,
        maxDormancyDays: 90,
        maxDormancyDaysBeforeFirstLogin: 30,
        createdDate: new Date(),
        lastModifiedDate: new Date()
    };
    const repository = await app.getRepository(common_1.UamLoginAttemptsConfigRepository);
    const existingId = await repository.findOne({ where: { id: 1 } });
    if (existingId) {
        await repository.updateById(1, baseData);
    }
    else {
        await repository.create(baseData);
    }
    common_1.LoggingUtils.info('base data created successfully');
    //exit the process when everything is done
    process.exit(0);
}
exports.createBaseData = createBaseData;
createBaseData().catch(err => {
    common_1.LoggingUtils.error('Could not create base data- ' + err);
    process.exit(1);
});
//# sourceMappingURL=002-create-max-login-attempts.js.map