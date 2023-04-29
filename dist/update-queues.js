"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateQueues = void 0;
const tslib_1 = require("tslib");
const common_1 = require("common");
const application_1 = require("./application");
const underscore_1 = (0, tslib_1.__importDefault)(require("underscore"));
const queue_configuration_1 = (0, tslib_1.__importDefault)(require("common/dist/queues/queue-configuration"));
const dotenv = (0, tslib_1.__importStar)(require("dotenv"));
dotenv.config();
async function updateQueues(args) {
    common_1.LoggingUtils.info('Updating messaging queues');
    const app = new application_1.UserManagementService();
    await app.boot();
    common_1.QueueUtils.listQueues()
        .then((existingQueues) => {
        let promises = [];
        underscore_1.default.each(Object.keys(queue_configuration_1.default.queues), function (key) {
            if (existingQueues.indexOf(queue_configuration_1.default.queues[key].queueName) == -1) {
                common_1.LoggingUtils.info('Creating queue ' + queue_configuration_1.default.queues[key].queueName);
                promises.push(common_1.QueueUtils.createQueue(queue_configuration_1.default.queues[key].queueName));
            }
        });
        return Promise.all(promises);
    })
        .then(() => {
        common_1.LoggingUtils.info('Queues updated!');
        process.exit(0);
    });
}
exports.updateQueues = updateQueues;
updateQueues(process.argv).catch(err => {
    common_1.LoggingUtils.error('Cannot update queues' + err);
    process.exit(1);
});
//# sourceMappingURL=update-queues.js.map