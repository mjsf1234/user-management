"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UamLoginLogsController = void 0;
const tslib_1 = require("tslib");
const authorization_1 = require("@loopback/authorization");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const common_1 = require("common");
const facades_1 = require("../facades");
const API_PREFIX = common_1.UamLoginLogs.modelName;
//Only REST related logic to be written inside a controller.
//Strictly no use of repositories
let UamLoginLogsController = class UamLoginLogsController {
    constructor(uamLoginLogsFacade, res, additionalHeaders) {
        this.uamLoginLogsFacade = uamLoginLogsFacade;
        this.res = res;
        this.additionalHeaders = additionalHeaders;
    }
    async create(UamLoginLogs) {
        return this.uamLoginLogsFacade.create(UamLoginLogs);
    }
    async count(where) {
        return this.uamLoginLogsFacade.count(where);
    }
    async find(filter) {
        return this.uamLoginLogsFacade.find(filter);
    }
    async updateAll(UamLoginLogs, where) {
        return this.uamLoginLogsFacade.updateAll(UamLoginLogs, where);
    }
    async findById(id, filter) {
        return this.uamLoginLogsFacade.findById(id, filter);
    }
    async updateById(id, UamLoginLogs) {
        await this.uamLoginLogsFacade.updateById(id, UamLoginLogs);
    }
    async replaceById(id, UamLoginLogs) {
        await this.uamLoginLogsFacade.replaceById(id, UamLoginLogs);
    }
    async deleteById(id) {
        await this.uamLoginLogsFacade.deleteById(id);
    }
    async fetchLoginLogs(filter) {
        return this.uamLoginLogsFacade.fetchLoginLogs(filter);
    }
    async downloadLoginLogsReport(filter) {
        return this.uamLoginLogsFacade.downloadLoginLogsReport(this.res, filter, this.additionalHeaders);
    }
};
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'UamLoginLogs model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(common_1.UamLoginLogs) } }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.UamLoginLogs, {
                    title: 'New UamLoginLogs',
                    exclude: ['id']
                })
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UamLoginLogsController.prototype, "create", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/count`),
    (0, rest_1.response)(200, {
        description: 'UamLoginLogs model count',
        content: { 'application/json': { schema: repository_1.CountSchema } }
    }),
    (0, tslib_1.__param)(0, rest_1.param.where(common_1.UamLoginLogs)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UamLoginLogsController.prototype, "count", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'Array of UamLoginLogs model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(common_1.UamLoginLogs, { includeRelations: false })
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.filter(common_1.UamLoginLogs)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UamLoginLogsController.prototype, "find", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'UamLoginLogs PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.UamLoginLogs, { partial: true })
            }
        }
    })),
    (0, tslib_1.__param)(1, rest_1.param.where(common_1.UamLoginLogs)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [common_1.UamLoginLogs, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UamLoginLogsController.prototype, "updateAll", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(200, {
        description: 'UamLoginLogs model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.UamLoginLogs, { includeRelations: false })
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, rest_1.param.filter(common_1.UamLoginLogs, { exclude: 'where' })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UamLoginLogsController.prototype, "findById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'UamLoginLogs PATCH success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.UamLoginLogs, { partial: true })
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, common_1.UamLoginLogs]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UamLoginLogsController.prototype, "updateById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.put)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'UamLoginLogs PUT success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, common_1.UamLoginLogs]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UamLoginLogsController.prototype, "replaceById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.del)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'UamLoginLogs DELETE success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UamLoginLogsController.prototype, "deleteById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/fetchLoginLogs`),
    (0, rest_1.response)(200, {
        description: 'Array of UamLoginLogs model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(common_1.UamLoginLogs, { includeRelations: false })
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.filter(common_1.UamLoginLogs)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UamLoginLogsController.prototype, "fetchLoginLogs", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/downloadLoginLogsReport`),
    (0, rest_1.response)(200, {
        description: 'API for downloading the file',
        content: {
            'application/json': {
                schema: {
                    type: 'object'
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.filter(common_1.UamLoginLogs)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UamLoginLogsController.prototype, "downloadLoginLogsReport", null);
UamLoginLogsController = (0, tslib_1.__decorate)([
    (0, authorization_1.authorize)({}),
    (0, tslib_1.__param)(0, (0, core_1.service)(facades_1.UamLoginLogsFacade)),
    (0, tslib_1.__param)(1, (0, core_1.inject)(rest_1.RestBindings.Http.RESPONSE)),
    (0, tslib_1.__param)(2, (0, core_1.inject)('additionalHeaders')),
    (0, tslib_1.__metadata)("design:paramtypes", [facades_1.UamLoginLogsFacade, Object, Object])
], UamLoginLogsController);
exports.UamLoginLogsController = UamLoginLogsController;
//# sourceMappingURL=uam-login-logs.controller.js.map