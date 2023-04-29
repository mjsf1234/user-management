"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestToEngineController = void 0;
const tslib_1 = require("tslib");
const authorization_1 = require("@loopback/authorization");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const common_1 = require("common");
const facades_1 = require("../facades");
const API_PREFIX = common_1.RequestToEngine.modelName;
//Only REST related logic to be written inside a controller.
//Strictly no use of repositories
let RequestToEngineController = class RequestToEngineController {
    constructor(RequestToEngineFacade, additionalHeaders) {
        this.RequestToEngineFacade = RequestToEngineFacade;
        this.additionalHeaders = additionalHeaders;
    }
    async create(RequestToEngine) {
        return this.RequestToEngineFacade.create(RequestToEngine, this.additionalHeaders);
    }
    async count(where) {
        return this.RequestToEngineFacade.count(where, this.additionalHeaders);
    }
    async find(filter) {
        return this.RequestToEngineFacade.find(filter, this.additionalHeaders);
    }
    async updateAll(RequestToEngine, where) {
        return this.RequestToEngineFacade.updateAll(RequestToEngine, where, this.additionalHeaders);
    }
    async findById(id, filter) {
        return this.RequestToEngineFacade.findById(id, filter, this.additionalHeaders);
    }
    async updateById(id, RequestToEngine) {
        await this.RequestToEngineFacade.updateById(id, RequestToEngine, this.additionalHeaders);
    }
    async replaceById(id, RequestToEngine) {
        await this.RequestToEngineFacade.replaceById(id, RequestToEngine, this.additionalHeaders);
    }
    async deleteById(id) {
        await this.RequestToEngineFacade.deleteById(id, this.additionalHeaders);
    }
};
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'RequestToEngine model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(common_1.RequestToEngine) } }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.RequestToEngine, {
                    title: 'New RequestToEngine',
                    exclude: ['id']
                })
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], RequestToEngineController.prototype, "create", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/count`),
    (0, rest_1.response)(200, {
        description: 'RequestToEngine model count',
        content: { 'application/json': { schema: repository_1.CountSchema } }
    }),
    (0, tslib_1.__param)(0, rest_1.param.where(common_1.RequestToEngine)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], RequestToEngineController.prototype, "count", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'Array of RequestToEngine model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(common_1.RequestToEngine, { includeRelations: false })
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.filter(common_1.RequestToEngine)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], RequestToEngineController.prototype, "find", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'RequestToEngine PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.RequestToEngine, { partial: true })
            }
        }
    })),
    (0, tslib_1.__param)(1, rest_1.param.where(common_1.RequestToEngine)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [common_1.RequestToEngine, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], RequestToEngineController.prototype, "updateAll", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(200, {
        description: 'RequestToEngine model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.RequestToEngine, { includeRelations: false })
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, rest_1.param.filter(common_1.RequestToEngine, { exclude: 'where' })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], RequestToEngineController.prototype, "findById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'RequestToEngine PATCH success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.RequestToEngine, { partial: true })
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, common_1.RequestToEngine]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], RequestToEngineController.prototype, "updateById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.put)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'RequestToEngine PUT success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, common_1.RequestToEngine]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], RequestToEngineController.prototype, "replaceById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.del)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'RequestToEngine DELETE success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], RequestToEngineController.prototype, "deleteById", null);
RequestToEngineController = (0, tslib_1.__decorate)([
    (0, authorization_1.authorize)({}),
    (0, tslib_1.__param)(0, (0, core_1.service)(facades_1.RequestToEngineFacade)),
    (0, tslib_1.__param)(1, (0, core_1.inject)('additionalHeaders')),
    (0, tslib_1.__metadata)("design:paramtypes", [facades_1.RequestToEngineFacade, Object])
], RequestToEngineController);
exports.RequestToEngineController = RequestToEngineController;
//# sourceMappingURL=request-to-engine.controller.js.map