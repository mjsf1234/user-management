"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountAppFileMappingController = void 0;
const tslib_1 = require("tslib");
const authorization_1 = require("@loopback/authorization");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const common_1 = require("common");
const facades_1 = require("../facades");
const API_PREFIX = common_1.AccountAppFileMapping.modelName;
//Only REST related logic to be written inside a controller.
//Strictly no use of repositories
let AccountAppFileMappingController = class AccountAppFileMappingController {
    constructor(accountAppFileMappingFacade, additionalHeaders) {
        this.accountAppFileMappingFacade = accountAppFileMappingFacade;
        this.additionalHeaders = additionalHeaders;
    }
    async create(accountAppFileMapping) {
        return this.accountAppFileMappingFacade.create(accountAppFileMapping);
    }
    async count(where) {
        return this.accountAppFileMappingFacade.count(where);
    }
    async find(filter) {
        return this.accountAppFileMappingFacade.find(filter);
    }
    async updateAll(accountAppFileMapping, where) {
        return this.accountAppFileMappingFacade.updateAll(accountAppFileMapping, where);
    }
    async findById(id, filter) {
        return this.accountAppFileMappingFacade.findById(id, filter);
    }
    async updateById(id, accountAppFileMapping) {
        await this.accountAppFileMappingFacade.updateById(id, accountAppFileMapping);
    }
    async replaceById(id, accountAppFileMapping) {
        await this.accountAppFileMappingFacade.replaceById(id, accountAppFileMapping);
    }
    async deleteById(id) {
        await this.accountAppFileMappingFacade.deleteById(id);
    }
    async accountAppFileMappingDetails(filter, where) {
        return this.accountAppFileMappingFacade.accountAppFileMappingDetails(filter, where, this.additionalHeaders);
    }
};
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'AccountAppFileMapping model instance',
        content: {
            'application/json': { schema: (0, rest_1.getModelSchemaRef)(common_1.AccountAppFileMapping) }
        }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.AccountAppFileMapping, {
                    title: 'New AccountAppFileMapping',
                    exclude: ['id']
                })
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AccountAppFileMappingController.prototype, "create", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/count`),
    (0, rest_1.response)(200, {
        description: 'AccountAppFileMapping model count',
        content: { 'application/json': { schema: repository_1.CountSchema } }
    }),
    (0, tslib_1.__param)(0, rest_1.param.where(common_1.AccountAppFileMapping)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AccountAppFileMappingController.prototype, "count", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'Array of AccountAppFileMapping model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(common_1.AccountAppFileMapping, {
                        includeRelations: false
                    })
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.filter(common_1.AccountAppFileMapping)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AccountAppFileMappingController.prototype, "find", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'AccountAppFileMapping PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.AccountAppFileMapping, { partial: true })
            }
        }
    })),
    (0, tslib_1.__param)(1, rest_1.param.where(common_1.AccountAppFileMapping)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [common_1.AccountAppFileMapping, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AccountAppFileMappingController.prototype, "updateAll", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(200, {
        description: 'AccountAppFileMapping model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.AccountAppFileMapping, {
                    includeRelations: false
                })
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, rest_1.param.filter(common_1.AccountAppFileMapping, { exclude: 'where' })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AccountAppFileMappingController.prototype, "findById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'AccountAppFileMapping PATCH success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.AccountAppFileMapping, { partial: true })
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, common_1.AccountAppFileMapping]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AccountAppFileMappingController.prototype, "updateById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.put)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'AccountAppFileMapping PUT success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, common_1.AccountAppFileMapping]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AccountAppFileMappingController.prototype, "replaceById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.del)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'AccountAppFileMapping DELETE success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AccountAppFileMappingController.prototype, "deleteById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/accountAppFileMappingDetails`),
    (0, rest_1.response)(200, {
        description: 'Array of AccountAppFileMapping model instances',
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
], AccountAppFileMappingController.prototype, "accountAppFileMappingDetails", null);
AccountAppFileMappingController = (0, tslib_1.__decorate)([
    (0, authorization_1.authorize)({}),
    (0, tslib_1.__param)(0, (0, core_1.service)(facades_1.AccountAppFileMappingFacade)),
    (0, tslib_1.__param)(1, (0, core_1.inject)('additionalHeaders')),
    (0, tslib_1.__metadata)("design:paramtypes", [facades_1.AccountAppFileMappingFacade, Object])
], AccountAppFileMappingController);
exports.AccountAppFileMappingController = AccountAppFileMappingController;
//# sourceMappingURL=account-app-file-mapping.controller.js.map