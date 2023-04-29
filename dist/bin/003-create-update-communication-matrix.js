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
    const API_KEY = process.env.COMMON_API_KEY;
    const app = new application_1.UserManagementService();
    await app.boot();
    await datasource_initialization_1.DatasourceInitialization.init(app);
    repository_initiliazation_1.RepositoryInitialization.init(app);
    const options = {
        headers: {
            Authorization: API_KEY,
            TrxId: Date.now() + '-seeders-create-update-communication-matrix',
            source: 'external-system'
        }
    };
    try {
        const accountRepositry = await app.getRepository(common_1.AccountRepository);
        const communicationMatrixRepository = await app.getRepository(common_1.CommunicationMatrixRepository);
        const communicationTopicRepository = await app.getRepository(common_1.CommunicationTopicRepository);
        const communicationTopics = await communicationTopicRepository.find({ where: { isActive: true } }, options);
        const account = await accountRepositry.find({
            where: {
                isActive: true
            },
            fields: { id: true }
        });
        const accountIds = account.map(ele => ele.id);
        for (const accId of accountIds) {
            const communicationTopicMap = communicationTopics.map(data => {
                return {
                    accountId: accId,
                    communicationTopicId: data.id,
                    modeEmail: data.modeEmail,
                    modeSms: data.modeSms,
                    modePush: data.modePush,
                    toggleNotification: data.toggleNotification
                };
            });
            for (const matrix of communicationTopicMap) {
                const dataExist = await communicationMatrixRepository.findOne({
                    where: {
                        isActive: true,
                        accountId: accId,
                        communicationTopicId: matrix.communicationTopicId
                    }
                });
                if (dataExist) {
                    await communicationMatrixRepository.updateById(dataExist.id, matrix);
                }
                else {
                    await communicationMatrixRepository.create(matrix);
                }
            }
        }
        await common_2.ValidateSequence.checkIfSequenceIsCorrect(communicationMatrixRepository, common_2.AppRole.definition.settings.postgresql.tableName, 'id');
        common_1.LoggingUtils.info('base data created successfully');
        //exit the process when everything is done
        process.exit(0);
    }
    catch (error) {
        common_1.LoggingUtils.error(error);
    }
}
exports.createBaseData = createBaseData;
createBaseData().catch(err => {
    common_1.LoggingUtils.error('Could not create base data- ' + err);
    process.exit(1);
});
//# sourceMappingURL=003-create-update-communication-matrix.js.map