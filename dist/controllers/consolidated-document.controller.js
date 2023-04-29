"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsolidatedDocumentController = void 0;
const tslib_1 = require("tslib");
const authorization_1 = require("@loopback/authorization");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const common_1 = require("common");
const facades_1 = require("../facades");
const API_PREFIX = common_1.ConsolidatedDocument.modelName;
//Only REST related logic to be written inside a controller.
//Strictly no use of repositories
let ConsolidatedDocumentController = class ConsolidatedDocumentController {
    constructor(ConsolidatedDocumentFacade, additionalHeaders) {
        this.ConsolidatedDocumentFacade = ConsolidatedDocumentFacade;
        this.additionalHeaders = additionalHeaders;
    }
    async create(ConsolidatedDocument) {
        return this.ConsolidatedDocumentFacade.create(ConsolidatedDocument, this.additionalHeaders);
    }
    async count(where) {
        return this.ConsolidatedDocumentFacade.count(where, this.additionalHeaders);
    }
    async find(filter) {
        return this.ConsolidatedDocumentFacade.find(filter, this.additionalHeaders);
    }
    async updateAll(ConsolidatedDocument, where) {
        return this.ConsolidatedDocumentFacade.updateAll(ConsolidatedDocument, where, this.additionalHeaders);
    }
    async findById(id, filter) {
        return this.ConsolidatedDocumentFacade.findById(id, filter, this.additionalHeaders);
    }
    async updateById(id, ConsolidatedDocument) {
        await this.ConsolidatedDocumentFacade.updateById(id, ConsolidatedDocument, this.additionalHeaders);
    }
    async replaceById(id, ConsolidatedDocument) {
        await this.ConsolidatedDocumentFacade.replaceById(id, ConsolidatedDocument, this.additionalHeaders);
    }
    async deleteById(id) {
        await this.ConsolidatedDocumentFacade.deleteById(id, this.additionalHeaders);
    }
    async updateStatus(ConsolidatedDocument) {
        return this.ConsolidatedDocumentFacade.consolidateStatusUpdate(ConsolidatedDocument.rtaId, ConsolidatedDocument.accountId, ConsolidatedDocument.status, this.additionalHeaders);
    }
    async rtaGeneratedConsolidatedDocuments(filterObject) {
        return this.ConsolidatedDocumentFacade.rtaGeneratedConsolidatedDocuments(filterObject, this.additionalHeaders);
    }
};
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'ConsolidatedDocument model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(common_1.ConsolidatedDocument) } }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.ConsolidatedDocument, {
                    title: 'New ConsolidatedDocument',
                    exclude: ['id']
                })
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ConsolidatedDocumentController.prototype, "create", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/count`),
    (0, rest_1.response)(200, {
        description: 'ConsolidatedDocument model count',
        content: { 'application/json': { schema: repository_1.CountSchema } }
    }),
    (0, tslib_1.__param)(0, rest_1.param.where(common_1.ConsolidatedDocument)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ConsolidatedDocumentController.prototype, "count", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'Array of ConsolidatedDocument model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(common_1.ConsolidatedDocument, { includeRelations: false })
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.filter(common_1.ConsolidatedDocument)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ConsolidatedDocumentController.prototype, "find", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'ConsolidatedDocument PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.ConsolidatedDocument, { partial: true })
            }
        }
    })),
    (0, tslib_1.__param)(1, rest_1.param.where(common_1.ConsolidatedDocument)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [common_1.ConsolidatedDocument, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ConsolidatedDocumentController.prototype, "updateAll", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(200, {
        description: 'ConsolidatedDocument model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.ConsolidatedDocument, { includeRelations: false })
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, rest_1.param.filter(common_1.ConsolidatedDocument, { exclude: 'where' })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ConsolidatedDocumentController.prototype, "findById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'ConsolidatedDocument PATCH success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.ConsolidatedDocument, { partial: true })
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, common_1.ConsolidatedDocument]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ConsolidatedDocumentController.prototype, "updateById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.put)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'ConsolidatedDocument PUT success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, common_1.ConsolidatedDocument]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ConsolidatedDocumentController.prototype, "replaceById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.del)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'ConsolidatedDocument DELETE success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ConsolidatedDocumentController.prototype, "deleteById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}/updateStatus`),
    (0, rest_1.response)(200, {
        description: 'ConsolidatedDocument model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(common_1.ConsolidatedDocument) } }
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
                            type: 'array',
                            items: {
                                type: 'number'
                            }
                        },
                        status: {
                            type: 'number'
                        }
                    },
                    required: ['rtaId', 'accountId', 'status'],
                }
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ConsolidatedDocumentController.prototype, "updateStatus", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/filterRtaDocuments`),
    (0, rest_1.response)(200, {
        description: 'Array of generated rta documents instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(common_1.ConsolidatedDocument, { includeRelations: false })
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.query.object('queryParameters', {
        type: 'object',
        example: {
            limit: 10,
            offset: 0,
            order: "id ASC",
            rtaId: 2,
            status: 4,
            where: [{ "appUserName": "string" }, { "accountId": "string" }]
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ConsolidatedDocumentController.prototype, "rtaGeneratedConsolidatedDocuments", null);
ConsolidatedDocumentController = (0, tslib_1.__decorate)([
    (0, authorization_1.authorize)({}),
    (0, tslib_1.__param)(0, (0, core_1.service)(facades_1.ConsolidatedDocumentFacade)),
    (0, tslib_1.__param)(1, (0, core_1.inject)('additionalHeaders')),
    (0, tslib_1.__metadata)("design:paramtypes", [facades_1.ConsolidatedDocumentFacade, Object])
], ConsolidatedDocumentController);
exports.ConsolidatedDocumentController = ConsolidatedDocumentController;
//# sourceMappingURL=consolidated-document.controller.js.map