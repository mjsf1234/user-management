"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackFacade = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const common_1 = require("common");
// All business loigc goes inside Facade layer
let FeedbackFacade = class FeedbackFacade {
    constructor(feedbackRepository) {
        this.feedbackRepository = feedbackRepository;
    }
    async create(entity, options) {
        return this.feedbackRepository.create(entity, options);
    }
    async createAll(entities, options) {
        return this.feedbackRepository.createAll(entities, options);
    }
    async save(entity, options) {
        return this.feedbackRepository.save(entity, options);
    }
    async find(filter, options) {
        return this.feedbackRepository.find(filter, options);
    }
    async findOne(filter, options) {
        return this.feedbackRepository.findOne(filter, options);
    }
    async findById(id, filter, options) {
        return this.feedbackRepository.findById(id, filter, options);
    }
    async update(entity, options) {
        return this.feedbackRepository.update(entity, options);
    }
    async delete(entity, options) {
        return this.feedbackRepository.delete(entity, options);
    }
    async updateAll(data, where, options) {
        return this.feedbackRepository.updateAll(data, where, options);
    }
    async updateById(id, data, options) {
        return this.feedbackRepository.updateById(id, data, options);
    }
    async replaceById(id, data, options) {
        return this.feedbackRepository.replaceById(id, data, options);
    }
    async deleteAll(where, options) {
        return this.feedbackRepository.deleteAll(where, options);
    }
    async deleteById(id, options) {
        return this.feedbackRepository.deleteById(id, options);
    }
    async count(where, options) {
        return this.feedbackRepository.count(where, options);
    }
    async exists(id, options) {
        return this.feedbackRepository.exists(id, options);
    }
};
FeedbackFacade = (0, tslib_1.__decorate)([
    (0, core_1.injectable)({ scope: core_1.BindingScope.APPLICATION }),
    (0, tslib_1.__param)(0, (0, repository_1.repository)(common_1.FeedbackRepository)),
    (0, tslib_1.__metadata)("design:paramtypes", [common_1.FeedbackRepository])
], FeedbackFacade);
exports.FeedbackFacade = FeedbackFacade;
//# sourceMappingURL=feedback.facade.js.map