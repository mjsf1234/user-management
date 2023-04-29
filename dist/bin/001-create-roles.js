"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBaseData = void 0;
const tslib_1 = require("tslib");
const common_1 = require("common");
const application_1 = require("../application");
const datasource_initialization_1 = require("../datasource-initialization");
const repository_initiliazation_1 = require("../repository-initiliazation");
const common_2 = require("common");
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
    const baseData = [
        {
            id: 1,
            name: 'CLIENT',
            createdDate: new Date(),
            lastModifiedDate: new Date()
        },
        // {
        //   id: 2,
        //   name: 'RELATIONSHIPMANAGER',
        //   createdDate: new Date(),
        //   lastModifiedDate: new Date()
        // },
        // {
        //   id: 3,
        //   name: 'BUSINESSPARTNER',
        //   createdDate: new Date(),
        //   lastModifiedDate: new Date()
        // },
        {
            id: 4,
            name: 'OPERATIONS',
            createdDate: new Date(),
            lastModifiedDate: new Date()
        },
        {
            id: 5,
            name: 'SYSTEMADMIN',
            createdDate: new Date(),
            lastModifiedDate: new Date()
        },
        {
            id: 6,
            name: 'BUSINESS',
            createdDate: new Date(),
            lastModifiedDate: new Date()
        },
        {
            id: 7,
            name: 'UAMMAKER',
            createdDate: new Date(),
            lastModifiedDate: new Date()
        },
        // {
        //   id: 7,
        //   name: 'VALUEFYADMIN',
        //   createdDate: new Date(),
        //   lastModifiedDate: new Date()
        // }
        {
            id: 8,
            name: 'CALLCENTER',
            createdDate: new Date(),
            lastModifiedDate: new Date()
        },
        {
            id: 9,
            name: 'BSG',
            createdDate: new Date(),
            lastModifiedDate: new Date()
        },
        {
            id: 10,
            name: 'PRODUCT',
            createdDate: new Date(),
            lastModifiedDate: new Date()
        },
        {
            id: 11,
            name: 'UAMREVIEWER',
            createdDate: new Date(),
            lastModifiedDate: new Date()
        }
    ];
    const repository = await app.getRepository(common_1.AppRoleRepository);
    //await repository.createAll(baseData);
    for (const record of baseData) {
        try {
            let dataExists = await repository.findOne({ where: { or: [{ id: record.id }, { name: record.name }] } });
            if (dataExists) {
                await repository.updateById(record.id, record);
            }
            else {
                await repository.create(record);
            }
        }
        catch (error) {
            common_1.LoggingUtils.error(error.message);
        }
    }
    await common_2.ValidateSequence.checkIfSequenceIsCorrect(repository, common_2.AppRole.definition.settings.postgresql.tableName, 'id');
    common_1.LoggingUtils.info('base data created successfully');
    //exit the process when everything is done
    process.exit(0);
}
exports.createBaseData = createBaseData;
createBaseData().catch(err => {
    common_1.LoggingUtils.error('Could not create base data- ' + err);
    process.exit(1);
});
//# sourceMappingURL=001-create-roles.js.map