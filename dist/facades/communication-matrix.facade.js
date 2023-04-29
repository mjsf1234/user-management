"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunicationMatrixFacade = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const common_1 = require("common");
const moment_1 = (0, tslib_1.__importDefault)(require("moment"));
// All business loigc goes inside Facade layer
let CommunicationMatrixFacade = class CommunicationMatrixFacade {
    constructor(communicationMatrixRepository, communicationTopicRepository) {
        this.communicationMatrixRepository = communicationMatrixRepository;
        this.communicationTopicRepository = communicationTopicRepository;
    }
    async create(entity, options) {
        return this.communicationMatrixRepository.create(entity, options);
    }
    async createAll(entities, options) {
        return this.communicationMatrixRepository.createAll(entities, options);
    }
    async save(entity, options) {
        return this.communicationMatrixRepository.save(entity, options);
    }
    async find(filter, options) {
        return this.communicationMatrixRepository.find(filter, options);
    }
    async findOne(filter, options) {
        return this.communicationMatrixRepository.findOne(filter, options);
    }
    async findById(id, filter, options) {
        return this.communicationMatrixRepository.findById(id, { include: [{ relation: 'communicationTopic' }] }, options);
    }
    async update(entity, options) {
        return this.communicationMatrixRepository.update(entity, options);
    }
    async delete(entity, options) {
        return this.communicationMatrixRepository.delete(entity, options);
    }
    async updateAll(data, where, options) {
        return this.communicationMatrixRepository.updateAll(data, where, options);
    }
    async updateById(id, data, options) {
        return this.communicationMatrixRepository.updateById(id, data, options);
    }
    async replaceById(id, data, options) {
        return this.communicationMatrixRepository.replaceById(id, data, options);
    }
    async deleteAll(where, options) {
        return this.communicationMatrixRepository.deleteAll(where, options);
    }
    async deleteById(id, options) {
        return this.communicationMatrixRepository.deleteById(id, options);
    }
    async count(where, options) {
        return this.communicationMatrixRepository.count(where, options);
    }
    async exists(id, options) {
        return this.communicationMatrixRepository.exists(id, options);
    }
    async findByAccountId(id, options) {
        try {
            let cm = await this.communicationMatrixRepository.find({
                where: {
                    accountId: id,
                    isActive: true
                },
                include: [
                    {
                        relation: 'communicationTopic'
                    }
                ]
            }, options);
            if (!cm) {
                return new common_1.RestError(404, 'Communication matrix not found', { systemcode: 1243 });
            }
            return cm;
        }
        catch (err) {
            common_1.LoggingUtils.error(`Some Error Occured ${JSON.stringify(err)}`);
            return new common_1.RestError(400, 'Something went wrong', { systemcode: 1244 });
        }
    }
    async updateModeOfNotification(id, settings, options) {
        try {
            const topics = await this.communicationTopicRepository.find({
                where: {
                    subCategory: settings.subCategory,
                    isActive: true
                }
            }, options);
            if (topics.length == 0)
                return { success: false, message: 'No topics Found' };
            let topicIds = topics.map((data) => data.id);
            let modes = {};
            if (settings.modeEmail != undefined)
                modes['modeEmail'] = settings.modeEmail;
            if (settings.modeSms != undefined)
                modes['modeSms'] = settings.modeSms;
            if (settings.modePush != undefined)
                modes['modePush'] = settings.modePush;
            await this.communicationMatrixRepository.updateAll(modes, { and: [{ accountId: id }, { isActive: true }, { communicationTopicId: { inq: topicIds } }] }, options);
            return { success: true };
            // if (!cm) {
            //   return new RestError(404, 'Communication matrix not found');
            // }
            // cm.modeEmail = settings.modeEmail;
            // cm.modePush = settings.modePush;
            // cm.modeSms = settings.modeSms;
            // await this.communicationMatrixRepository.save(cm);
            // return {success : true}
        }
        catch (err) {
            common_1.LoggingUtils.error(`Some Error Occured ${JSON.stringify(err)}`);
            throw err;
        }
    }
    async addCommunicationMatrix(accountId, options) {
        try {
            if (accountId == undefined)
                throw 'USER ACCOUNT ID IS IN VALID';
            const communicationTopic = await this.communicationTopicRepository.find({ where: { isActive: true } }, options);
            const communicationTopicMap = communicationTopic.map(data => {
                return {
                    accountId: accountId,
                    communicationTopicId: data.id,
                    modeEmail: data.modeEmail,
                    modeSms: data.modeSms,
                    modePush: data.modePush,
                    toggleNotification: data.toggleNotification
                };
            });
            const result = await this.communicationMatrixRepository.createAll(communicationTopicMap, options);
            return result;
        }
        catch (error) {
            common_1.LoggingUtils.error(error);
            throw error;
        }
    }
    async testNotification(accountId, options) {
        try {
            if (accountId == undefined)
                throw 'USER ACCOUNT ID IS IN VALID';
            const date = (0, moment_1.default)().format('DD/MM/YY');
            await common_1.NotificationUtils.sendNotificationEvent({
                accountId: accountId,
                topicId: common_1.NotificationTopics.TOPICS.login.askReset.value,
                templateKeys: { date: date },
                notificationType: common_1.NotificationTopics.TOPICS.login.askReset.topic
            });
            return { message: 'notification send' };
        }
        catch (error) {
            common_1.LoggingUtils.error(error);
            throw error;
        }
    }
};
CommunicationMatrixFacade = (0, tslib_1.__decorate)([
    (0, core_1.injectable)({ scope: core_1.BindingScope.APPLICATION }),
    (0, tslib_1.__param)(0, (0, repository_1.repository)(common_1.CommunicationMatrixRepository)),
    (0, tslib_1.__param)(1, (0, repository_1.repository)(common_1.CommunicationTopicRepository)),
    (0, tslib_1.__metadata)("design:paramtypes", [common_1.CommunicationMatrixRepository,
        common_1.CommunicationTopicRepository])
], CommunicationMatrixFacade);
exports.CommunicationMatrixFacade = CommunicationMatrixFacade;
//# sourceMappingURL=communication-matrix.facade.js.map