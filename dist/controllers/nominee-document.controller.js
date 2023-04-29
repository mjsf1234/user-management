"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NomineeDocumentController = void 0;
const tslib_1 = require("tslib");
const authorization_1 = require("@loopback/authorization");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const common_1 = require("common");
const facades_1 = require("../facades");
const API_PREFIX = common_1.NomineeDocument.modelName;
//Only REST related logic to be written inside a controller.
//Strictly no use of repositories
let NomineeDocumentController = class NomineeDocumentController {
    constructor(NomineeDocumentFacade, additionalHeaders) {
        this.NomineeDocumentFacade = NomineeDocumentFacade;
        this.additionalHeaders = additionalHeaders;
    }
    async create(NomineeDocument) {
        return this.NomineeDocumentFacade.create(NomineeDocument, this.additionalHeaders);
    }
    async count(where) {
        return this.NomineeDocumentFacade.count(where, this.additionalHeaders);
    }
    async find(filter) {
        return this.NomineeDocumentFacade.find(filter, this.additionalHeaders);
    }
    async updateAll(NomineeDocument, where) {
        return this.NomineeDocumentFacade.updateAll(NomineeDocument, where, this.additionalHeaders);
    }
    async findById(id, filter) {
        return this.NomineeDocumentFacade.findById(id, filter, this.additionalHeaders);
    }
    async updateById(id, NomineeDocument) {
        await this.NomineeDocumentFacade.updateById(id, NomineeDocument, this.additionalHeaders);
    }
    async replaceById(id, NomineeDocument) {
        await this.NomineeDocumentFacade.replaceById(id, NomineeDocument, this.additionalHeaders);
    }
    async deleteById(id) {
        await this.NomineeDocumentFacade.deleteById(id, this.additionalHeaders);
    }
    async generateNomineeDocuments(generateNomineeDocuments) {
        return await this.NomineeDocumentFacade.generateNomineeDocuments(generateNomineeDocuments, this.additionalHeaders);
    }
    async userCartDetails(filter, where) {
        return this.NomineeDocumentFacade.nomineeDocumentDetails(filter, where, this.additionalHeaders);
    }
    async updateStatus(NomineeDocument) {
        return this.NomineeDocumentFacade.nomineeDocumentStatusUpdate(NomineeDocument.ids, NomineeDocument.status, this.additionalHeaders);
    }
};
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'NomineeDocument model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(common_1.NomineeDocument) } }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.NomineeDocument, {
                    title: 'New NomineeDocument',
                    exclude: ['id']
                })
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], NomineeDocumentController.prototype, "create", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/count`),
    (0, rest_1.response)(200, {
        description: 'NomineeDocument model count',
        content: { 'application/json': { schema: repository_1.CountSchema } }
    }),
    (0, tslib_1.__param)(0, rest_1.param.where(common_1.NomineeDocument)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], NomineeDocumentController.prototype, "count", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'Array of NomineeDocument model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(common_1.NomineeDocument, { includeRelations: false })
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.filter(common_1.NomineeDocument)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], NomineeDocumentController.prototype, "find", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'NomineeDocument PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.NomineeDocument, { partial: true })
            }
        }
    })),
    (0, tslib_1.__param)(1, rest_1.param.where(common_1.NomineeDocument)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [common_1.NomineeDocument, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], NomineeDocumentController.prototype, "updateAll", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(200, {
        description: 'NomineeDocument model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.NomineeDocument, { includeRelations: false })
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, rest_1.param.filter(common_1.NomineeDocument, { exclude: 'where' })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], NomineeDocumentController.prototype, "findById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'NomineeDocument PATCH success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.NomineeDocument, { partial: true })
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, common_1.NomineeDocument]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], NomineeDocumentController.prototype, "updateById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.put)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'NomineeDocument PUT success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, common_1.NomineeDocument]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], NomineeDocumentController.prototype, "replaceById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.del)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'NomineeDocument DELETE success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], NomineeDocumentController.prototype, "deleteById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}/generateNomineeDocuments`),
    (0, rest_1.response)(200, {
        description: 'Generate NomineeDocuments',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    example: {
                        success: true,
                        message: 'Generated NomineeDocuments!'
                    }
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        rtaId: {
                            type: 'number'
                        },
                        accountId: {
                            type: 'number'
                        },
                        serviceProviderId: {
                            type: 'number'
                        },
                        date: {
                            type: 'string'
                        }
                    }
                }
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], NomineeDocumentController.prototype, "generateNomineeDocuments", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/nomineeDocumentDetails`),
    (0, rest_1.response)(200, {
        description: 'Array of nomineeDocument model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'object'
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.query.object('filter')),
    (0, tslib_1.__param)(1, rest_1.param.query.object('where')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], NomineeDocumentController.prototype, "userCartDetails", null);
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}/updateStatus`),
    (0, rest_1.response)(200, {
        description: 'NomineeDocument model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(common_1.NomineeDocument) } }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        ids: {
                            type: 'array',
                            items: {
                                type: 'number'
                            }
                        },
                        status: {
                            type: 'number'
                        }
                    },
                    required: ['ids', 'status'],
                }
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], NomineeDocumentController.prototype, "updateStatus", null);
NomineeDocumentController = (0, tslib_1.__decorate)([
    (0, authorization_1.authorize)({}),
    (0, tslib_1.__param)(0, (0, core_1.service)(facades_1.NomineeDocumentFacade)),
    (0, tslib_1.__param)(1, (0, core_1.inject)('additionalHeaders')),
    (0, tslib_1.__metadata)("design:paramtypes", [facades_1.NomineeDocumentFacade, Object])
], NomineeDocumentController);
exports.NomineeDocumentController = NomineeDocumentController;
//# sourceMappingURL=nominee-document.controller.js.map