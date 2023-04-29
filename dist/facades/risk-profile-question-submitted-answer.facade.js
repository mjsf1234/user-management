"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RiskProfileQuestionSubmittedAnswerFacade = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const common_1 = require("common");
// All business loigc goes inside Facade layer
let RiskProfileQuestionSubmittedAnswerFacade = class RiskProfileQuestionSubmittedAnswerFacade {
    constructor(riskProfileQuestionSubmittedAnswerRepository) {
        this.riskProfileQuestionSubmittedAnswerRepository = riskProfileQuestionSubmittedAnswerRepository;
    }
    async create(entity, options) {
        return this.riskProfileQuestionSubmittedAnswerRepository.create(entity, options);
    }
    async createAll(entities, options) {
        return this.riskProfileQuestionSubmittedAnswerRepository.createAll(entities, options);
    }
    async save(entity, options) {
        return this.riskProfileQuestionSubmittedAnswerRepository.save(entity, options);
    }
    async find(filter, options) {
        return this.riskProfileQuestionSubmittedAnswerRepository.find(filter, options);
    }
    async findOne(filter, options) {
        return this.riskProfileQuestionSubmittedAnswerRepository.findOne(filter, options);
    }
    async findById(id, filter, options) {
        return this.riskProfileQuestionSubmittedAnswerRepository.findById(id, filter, options);
    }
    async update(entity, options) {
        return this.riskProfileQuestionSubmittedAnswerRepository.update(entity, options);
    }
    async delete(entity, options) {
        return this.riskProfileQuestionSubmittedAnswerRepository.delete(entity, options);
    }
    async updateAll(data, where, options) {
        return this.riskProfileQuestionSubmittedAnswerRepository.updateAll(data, where, options);
    }
    async updateById(id, data, options) {
        return this.riskProfileQuestionSubmittedAnswerRepository.updateById(id, data, options);
    }
    async replaceById(id, data, options) {
        return this.riskProfileQuestionSubmittedAnswerRepository.replaceById(id, data, options);
    }
    async deleteAll(where, options) {
        return this.riskProfileQuestionSubmittedAnswerRepository.deleteAll(where, options);
    }
    async deleteById(id, options) {
        return this.riskProfileQuestionSubmittedAnswerRepository.deleteById(id, options);
    }
    async count(where, options) {
        return this.riskProfileQuestionSubmittedAnswerRepository.count(where, options);
    }
    async exists(id, options) {
        return this.riskProfileQuestionSubmittedAnswerRepository.exists(id, options);
    }
};
RiskProfileQuestionSubmittedAnswerFacade = (0, tslib_1.__decorate)([
    (0, core_1.injectable)({ scope: core_1.BindingScope.APPLICATION }),
    (0, tslib_1.__param)(0, (0, repository_1.repository)(common_1.RiskProfileQuestionSubmittedAnswerRepository)),
    (0, tslib_1.__metadata)("design:paramtypes", [common_1.RiskProfileQuestionSubmittedAnswerRepository])
], RiskProfileQuestionSubmittedAnswerFacade);
exports.RiskProfileQuestionSubmittedAnswerFacade = RiskProfileQuestionSubmittedAnswerFacade;
//# sourceMappingURL=risk-profile-question-submitted-answer.facade.js.map