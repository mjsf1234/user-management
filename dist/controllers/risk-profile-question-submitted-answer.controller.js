"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RiskProfileQuestionSubmittedAnswerController = void 0;
const tslib_1 = require("tslib");
const authorization_1 = require("@loopback/authorization");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const common_1 = require("common");
const facades_1 = require("../facades");
const API_PREFIX = common_1.RiskProfileQuestionSubmittedAnswer.modelName;
//Only REST related logic to be written inside a controller.
//Strictly no use of repositories
let RiskProfileQuestionSubmittedAnswerController = class RiskProfileQuestionSubmittedAnswerController {
    constructor(riskProfileQuestionSubmittedAnswerFacade, additionalHeaders) {
        this.riskProfileQuestionSubmittedAnswerFacade = riskProfileQuestionSubmittedAnswerFacade;
        this.additionalHeaders = additionalHeaders;
    }
    async create(riskProfileQuestionSubmittedAnswer) {
        return this.riskProfileQuestionSubmittedAnswerFacade.create(riskProfileQuestionSubmittedAnswer, this.additionalHeaders);
    }
    async count(where) {
        return this.riskProfileQuestionSubmittedAnswerFacade.count(where, this.additionalHeaders);
    }
    async find(filter) {
        return this.riskProfileQuestionSubmittedAnswerFacade.find(filter, this.additionalHeaders);
    }
    async updateAll(riskProfileQuestionSubmittedAnswer, where) {
        return this.riskProfileQuestionSubmittedAnswerFacade.updateAll(riskProfileQuestionSubmittedAnswer, where, this.additionalHeaders);
    }
    async findById(id, filter) {
        return this.riskProfileQuestionSubmittedAnswerFacade.findById(id, filter, this.additionalHeaders);
    }
    async updateById(id, riskProfileQuestionSubmittedAnswer) {
        await this.riskProfileQuestionSubmittedAnswerFacade.updateById(id, riskProfileQuestionSubmittedAnswer, this.additionalHeaders);
    }
    async replaceById(id, riskProfileQuestionSubmittedAnswer) {
        await this.riskProfileQuestionSubmittedAnswerFacade.replaceById(id, riskProfileQuestionSubmittedAnswer, this.additionalHeaders);
    }
    async deleteById(id) {
        await this.riskProfileQuestionSubmittedAnswerFacade.deleteById(id, this.additionalHeaders);
    }
};
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'RiskProfileQuestionSubmittedAnswer model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(common_1.RiskProfileQuestionSubmittedAnswer) } }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.RiskProfileQuestionSubmittedAnswer, {
                    title: 'New RiskProfileQuestionSubmittedAnswer',
                    exclude: ['id']
                })
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], RiskProfileQuestionSubmittedAnswerController.prototype, "create", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/count`),
    (0, rest_1.response)(200, {
        description: 'RiskProfileQuestionSubmittedAnswer model count',
        content: { 'application/json': { schema: repository_1.CountSchema } }
    }),
    (0, tslib_1.__param)(0, rest_1.param.where(common_1.RiskProfileQuestionSubmittedAnswer)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], RiskProfileQuestionSubmittedAnswerController.prototype, "count", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'Array of RiskProfileQuestionSubmittedAnswer model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(common_1.RiskProfileQuestionSubmittedAnswer, { includeRelations: false })
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.filter(common_1.RiskProfileQuestionSubmittedAnswer)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], RiskProfileQuestionSubmittedAnswerController.prototype, "find", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'RiskProfileQuestionSubmittedAnswer PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.RiskProfileQuestionSubmittedAnswer, { partial: true })
            }
        }
    })),
    (0, tslib_1.__param)(1, rest_1.param.where(common_1.RiskProfileQuestionSubmittedAnswer)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [common_1.RiskProfileQuestionSubmittedAnswer, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], RiskProfileQuestionSubmittedAnswerController.prototype, "updateAll", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(200, {
        description: 'RiskProfileQuestionSubmittedAnswer model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.RiskProfileQuestionSubmittedAnswer, { includeRelations: false })
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, rest_1.param.filter(common_1.RiskProfileQuestionSubmittedAnswer, { exclude: 'where' })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], RiskProfileQuestionSubmittedAnswerController.prototype, "findById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'RiskProfileQuestionSubmittedAnswer PATCH success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.RiskProfileQuestionSubmittedAnswer, { partial: true })
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, common_1.RiskProfileQuestionSubmittedAnswer]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], RiskProfileQuestionSubmittedAnswerController.prototype, "updateById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.put)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'RiskProfileQuestionSubmittedAnswer PUT success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, common_1.RiskProfileQuestionSubmittedAnswer]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], RiskProfileQuestionSubmittedAnswerController.prototype, "replaceById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.del)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'RiskProfileQuestionSubmittedAnswer DELETE success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], RiskProfileQuestionSubmittedAnswerController.prototype, "deleteById", null);
RiskProfileQuestionSubmittedAnswerController = (0, tslib_1.__decorate)([
    (0, authorization_1.authorize)({}),
    (0, tslib_1.__param)(0, (0, core_1.service)(facades_1.RiskProfileQuestionSubmittedAnswerFacade)),
    (0, tslib_1.__param)(1, (0, core_1.inject)('additionalHeaders')),
    (0, tslib_1.__metadata)("design:paramtypes", [facades_1.RiskProfileQuestionSubmittedAnswerFacade, Object])
], RiskProfileQuestionSubmittedAnswerController);
exports.RiskProfileQuestionSubmittedAnswerController = RiskProfileQuestionSubmittedAnswerController;
//# sourceMappingURL=risk-profile-question-submitted-answer.controller.js.map