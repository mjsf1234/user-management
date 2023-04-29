"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsrFatcaController = void 0;
const tslib_1 = require("tslib");
const authorization_1 = require("@loopback/authorization");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const common_1 = require("common");
const facades_1 = require("../facades");
const API_PREFIX = common_1.CsrFatca.modelName;
//Only REST related logic to be written inside a controller.
//Strictly no use of repositories
let CsrFatcaController = class CsrFatcaController {
    constructor(csrFatcaFacade, additionalHeaders) {
        this.csrFatcaFacade = csrFatcaFacade;
        this.additionalHeaders = additionalHeaders;
    }
    async create(csrFatca) {
        return this.csrFatcaFacade.create(csrFatca, this.additionalHeaders);
    }
    async count(where) {
        return this.csrFatcaFacade.count(where);
    }
    async find(filter) {
        return this.csrFatcaFacade.find(filter, this.additionalHeaders);
    }
    async updateAll(csrFatca, where) {
        return this.csrFatcaFacade.updateAll(csrFatca, where);
    }
    async updatecsrFatcaStatus(csrFatca, where) {
        return this.csrFatcaFacade.updatecsrFatcaStatus(csrFatca);
    }
    async findById(id, filter) {
        return this.csrFatcaFacade.findById(id, filter, this.additionalHeaders);
    }
    async updateById(id, csrFatca) {
        await this.csrFatcaFacade.updateById(id, csrFatca);
    }
    async replaceById(id, csrFatca) {
        await this.csrFatcaFacade.replaceById(id, csrFatca);
    }
    async deleteById(id) {
        await this.csrFatcaFacade.deleteById(id);
    }
    async generateFatca() {
        return this.csrFatcaFacade.generateFatca(this.additionalHeaders);
    }
    async fetchFatca(paginator) {
        return this.csrFatcaFacade.fetchFatca(paginator, this.additionalHeaders);
    }
};
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'CsrFatca model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(common_1.CsrFatca) } }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.CsrFatca, {
                    title: 'New CsrFatca',
                    exclude: ['id']
                })
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], CsrFatcaController.prototype, "create", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/count`),
    (0, rest_1.response)(200, {
        description: 'CsrFatca model count',
        content: { 'application/json': { schema: repository_1.CountSchema } }
    }),
    (0, tslib_1.__param)(0, rest_1.param.where(common_1.CsrFatca)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], CsrFatcaController.prototype, "count", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'Array of CsrFatca model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(common_1.CsrFatca, { includeRelations: false })
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.filter(common_1.CsrFatca)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], CsrFatcaController.prototype, "find", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'CsrFatca PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.CsrFatca, { partial: true })
            }
        }
    })),
    (0, tslib_1.__param)(1, rest_1.param.where(common_1.CsrFatca)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [common_1.CsrFatca, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], CsrFatcaController.prototype, "updateAll", null);
(0, tslib_1.__decorate)([
    (0, rest_1.put)(`/${API_PREFIX}/updatecsrFatcaStatus`),
    (0, rest_1.response)(200, {
        description: 'csr FATCA Status update PUT success',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        count: {
                            type: 'number'
                        }
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
                        accountIds: {
                            type: 'array',
                            items: {
                                type: 'number'
                            }
                        }
                    },
                    example: {
                        rtaId: 1,
                        accountIds: [4613, 20767]
                    }
                }
            }
        }
    })),
    (0, tslib_1.__param)(1, rest_1.param.where(common_1.CsrFatca)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [common_1.CsrFatca, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], CsrFatcaController.prototype, "updatecsrFatcaStatus", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(200, {
        description: 'CsrFatca model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.CsrFatca, { includeRelations: false })
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, rest_1.param.filter(common_1.CsrFatca, { exclude: 'where' })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], CsrFatcaController.prototype, "findById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'CsrFatca PATCH success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.CsrFatca, { partial: true })
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, common_1.CsrFatca]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], CsrFatcaController.prototype, "updateById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.put)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'CsrFatca PUT success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, common_1.CsrFatca]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], CsrFatcaController.prototype, "replaceById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.del)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'CsrFatca DELETE success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], CsrFatcaController.prototype, "deleteById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/generateFatca`),
    (0, rest_1.response)(200, {
        description: 'method to generate FATCA',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean'
                        },
                        message: {
                            type: 'string'
                        }
                    }
                }
            }
        }
    }),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", []),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], CsrFatcaController.prototype, "generateFatca", null);
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}/fetchFatca`),
    (0, rest_1.response)(200, {
        description: 'method to generate FATCA',
        content: {
            'application/json': {
                schema: {
                    type: 'object'
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
                        limit: {
                            type: 'number'
                        },
                        offset: {
                            type: 'number'
                        },
                        where: {
                            type: 'object',
                            properties: {
                                generatedDate: {
                                    type: 'string'
                                },
                                rtaId: {
                                    type: 'number'
                                }
                            }
                        }
                    },
                    example: {
                        limit: 100,
                        offset: 0,
                        where: {
                            generatedDate: '%2022-09-12%',
                            rtaId: 1
                        }
                    }
                }
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], CsrFatcaController.prototype, "fetchFatca", null);
CsrFatcaController = (0, tslib_1.__decorate)([
    (0, authorization_1.authorize)({}),
    (0, tslib_1.__param)(0, (0, core_1.service)(facades_1.CsrFatcaFacade)),
    (0, tslib_1.__param)(1, (0, core_1.inject)('additionalHeaders')),
    (0, tslib_1.__metadata)("design:paramtypes", [facades_1.CsrFatcaFacade, Object])
], CsrFatcaController);
exports.CsrFatcaController = CsrFatcaController;
//# sourceMappingURL=csr-fatca.controller.js.map