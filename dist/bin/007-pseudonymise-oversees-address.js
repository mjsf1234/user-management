"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pseudonymisation = void 0;
const tslib_1 = require("tslib");
const common_1 = require("common");
const dotenv = (0, tslib_1.__importStar)(require("dotenv"));
const application_1 = require("../application");
const datasource_initialization_1 = require("../datasource-initialization");
const repository_initiliazation_1 = require("../repository-initiliazation");
const path = (0, tslib_1.__importStar)(require("path"));
const bluebird_1 = (0, tslib_1.__importDefault)(require("bluebird"));
try {
    dotenv.config({ path: path.resolve(__dirname, '../../.env') });
}
catch (error) { }
async function pseudonymisation() {
    const app = new application_1.UserManagementService();
    await app.boot();
    await datasource_initialization_1.DatasourceInitialization.init(app);
    repository_initiliazation_1.RepositoryInitialization.init(app);
    const overseesAddressRepository = await app.getRepository(common_1.OverseesAddressRepository);
    let batchSize = 1000;
    const numberOfRecords = await overseesAddressRepository.count();
    let batches = [];
    let offset = 0;
    let count = numberOfRecords.count;
    while (count > 0) {
        const currentOffset = offset;
        batches.push({
            limit: Number(batchSize),
            offset: Number(currentOffset),
        });
        count = count - batchSize;
        offset = offset + batchSize;
    }
    return bluebird_1.default.map(batches, async (batchObject) => {
        return processBatch(batchObject);
    }).then(data => {
        common_1.LoggingUtils.info('data pseudonymised successfully');
        //exit the process when everything is done
        process.exit(0);
    });
    async function processBatch(batchObject) {
        let limit = batchObject.limit;
        let offset = batchObject.offset;
        let overseesAddressArray = await overseesAddressRepository.find({
            limit: limit,
            offset: offset,
        });
        const keysToEncode = [
            { addressLine1: common_1.OverseesAddress.definition.properties.addressLine1 },
            { addressLine2: common_1.OverseesAddress.definition.properties.addressLine2 },
            { addressLine3: common_1.OverseesAddress.definition.properties.addressLine3 },
        ];
        const encodedData = common_1.CryptoUtils.encodeDataObjectPseudonym(overseesAddressArray, keysToEncode);
        let iterableEncodedData = [];
        let i = 0;
        while (encodedData[i]) {
            iterableEncodedData.push(encodedData[i]);
            i++;
        }
        for (let obj of iterableEncodedData) {
            await overseesAddressRepository.updateById(obj.id, obj);
        }
    }
    ;
}
exports.pseudonymisation = pseudonymisation;
pseudonymisation().catch(err => {
    common_1.LoggingUtils.error('Could not pseudonymise data- ' + err);
    process.exit(1);
});
//# sourceMappingURL=007-pseudonymise-oversees-address.js.map