"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunicationMatrixController = void 0;
const tslib_1 = require("tslib");
const authorization_1 = require("@loopback/authorization");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const common_1 = require("common");
const communication_matrix_facade_1 = require("../facades/communication-matrix.facade");
const API_PREFIX = common_1.CommunicationMatrix.modelName;
//Only REST related logic to be written inside a controller.
//Strictly no use of repositories
let CommunicationMatrixController = class CommunicationMatrixController {
    constructor(communicationMatrixFacade, additionalHeaders) {
        this.communicationMatrixFacade = communicationMatrixFacade;
        this.additionalHeaders = additionalHeaders;
    }
    async create(communicationMatrix) {
        return this.communicationMatrixFacade.create(communicationMatrix);
    }
    async count(where) {
        return this.communicationMatrixFacade.count(where, this.additionalHeaders);
    }
    async find(filter) {
        return this.communicationMatrixFacade.find(filter, this.additionalHeaders);
    }
    async updateAll(CommunicationMatrix, where) {
        return this.communicationMatrixFacade.updateAll(CommunicationMatrix, where, this.additionalHeaders);
    }
    async findById(id, filter) {
        return this.communicationMatrixFacade.findById(id, filter, this.additionalHeaders);
    }
    async updateById(id, communicationMatrix) {
        await this.communicationMatrixFacade.updateById(id, communicationMatrix, this.additionalHeaders);
    }
    async replaceById(id, communicationMatrix) {
        await this.communicationMatrixFacade.replaceById(id, communicationMatrix, this.additionalHeaders);
    }
    async deleteById(id) {
        await this.communicationMatrixFacade.deleteById(id, this.additionalHeaders);
    }
    async findByAccountId(id
    // @param.filter(CommunicationMatrix, {exclude: 'where'})
    // filter?: FilterExcludingWhere<CommunicationMatrix>
    ) {
        return this.communicationMatrixFacade.findByAccountId(id, this.additionalHeaders);
    }
    async updateModeOfNotificationByAccountId(accountId, settings) {
        return this.communicationMatrixFacade.updateModeOfNotification(accountId, settings, this.additionalHeaders);
    }
    async addCommunicationMatrix(accountId) {
        return this.communicationMatrixFacade.addCommunicationMatrix(accountId, this.additionalHeaders);
    }
    async testNotification(accountId) {
        return this.communicationMatrixFacade.testNotification(accountId, this.additionalHeaders);
    }
};
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'CommunicationMatrix model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(common_1.CommunicationMatrix) } }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.CommunicationMatrix, {
                    title: 'New CommunicationMatrix',
                    exclude: ['id']
                })
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], CommunicationMatrixController.prototype, "create", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/count`),
    (0, rest_1.response)(200, {
        description: 'CommunicationMatrix model count',
        content: { 'application/json': { schema: repository_1.CountSchema } }
    }),
    (0, tslib_1.__param)(0, rest_1.param.where(common_1.CommunicationMatrix)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], CommunicationMatrixController.prototype, "count", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'Array of CommunicationMatrix model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(common_1.CommunicationMatrix, { includeRelations: false })
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.filter(common_1.CommunicationMatrix)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], CommunicationMatrixController.prototype, "find", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'CommunicationMatrix PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.CommunicationMatrix, { partial: true })
            }
        }
    })),
    (0, tslib_1.__param)(1, rest_1.param.where(common_1.CommunicationMatrix)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [common_1.CommunicationMatrix, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], CommunicationMatrixController.prototype, "updateAll", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(200, {
        description: 'CommunicationMatrix model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.CommunicationMatrix, { includeRelations: false })
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, rest_1.param.filter(common_1.CommunicationMatrix, { exclude: 'where' })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], CommunicationMatrixController.prototype, "findById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'CommunicationMatrix PATCH success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.CommunicationMatrix, { partial: true })
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, common_1.CommunicationMatrix]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], CommunicationMatrixController.prototype, "updateById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.put)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'CommunicationMatrix PUT success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, common_1.CommunicationMatrix]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], CommunicationMatrixController.prototype, "replaceById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.del)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'CommunicationMatrix DELETE success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], CommunicationMatrixController.prototype, "deleteById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/{accountId}/fetchCommunicationMatrixByAccountId`),
    (0, rest_1.response)(200, {
        description: 'To fetch CommunicationMatrix model instance by account Id',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.CommunicationMatrix, { includeRelations: false })
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('accountId')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], CommunicationMatrixController.prototype, "findByAccountId", null);
(0, tslib_1.__decorate)([
    (0, rest_1.put)(`/${API_PREFIX}/{accountId}/modeOfNotificationByAccountId`),
    (0, rest_1.response)(204, {
        description: 'Updates Mode of CommunicationMatrix PUT success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('accountId')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    required: ['modeEmail', 'modeSms', 'modePush', 'id'],
                    properties: {
                        modeEmail: {
                            type: 'boolean'
                        },
                        modeSms: {
                            type: 'boolean'
                        },
                        modePush: {
                            type: 'boolean'
                        },
                        subCategory: {
                            type: 'string'
                        }
                    }
                }
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], CommunicationMatrixController.prototype, "updateModeOfNotificationByAccountId", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/addCommunicationMatrix/{accountId}`),
    (0, rest_1.response)(200, {
        description: 'CommunicationMatrix model count'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('accountId')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], CommunicationMatrixController.prototype, "addCommunicationMatrix", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/testNotification/{accountId}`),
    (0, rest_1.response)(200, {
        description: 'CommunicationMatrix model count'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('accountId')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], CommunicationMatrixController.prototype, "testNotification", null);
CommunicationMatrixController = (0, tslib_1.__decorate)([
    (0, authorization_1.authorize)({}),
    (0, tslib_1.__param)(0, (0, core_1.service)(communication_matrix_facade_1.CommunicationMatrixFacade)),
    (0, tslib_1.__param)(1, (0, core_1.inject)('additionalHeaders')),
    (0, tslib_1.__metadata)("design:paramtypes", [communication_matrix_facade_1.CommunicationMatrixFacade, Object])
], CommunicationMatrixController);
exports.CommunicationMatrixController = CommunicationMatrixController;
//# sourceMappingURL=communication-matrix.controller.js.map