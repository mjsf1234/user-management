"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditTrailFileController = void 0;
const tslib_1 = require("tslib");
const authorization_1 = require("@loopback/authorization");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const common_1 = require("common");
const facades_1 = require("../facades");
const API_PREFIX = common_1.AuditTrailFile.modelName;
//Only REST related logic to be written inside a controller.
//Strictly no use of repositories
let AuditTrailFileController = class AuditTrailFileController {
    constructor(AuditTrailFileFacade, additionalHeaders, res, userProfile) {
        this.AuditTrailFileFacade = AuditTrailFileFacade;
        this.additionalHeaders = additionalHeaders;
        this.res = res;
        this.userProfile = userProfile;
    }
    async create(AuditTrailFile) {
        return this.AuditTrailFileFacade.create(AuditTrailFile);
    }
    async count(where) {
        return this.AuditTrailFileFacade.count(where);
    }
    async find(filter) {
        return this.AuditTrailFileFacade.find(filter, this.additionalHeaders);
    }
    async updateAll(AuditTrailFile, where) {
        return this.AuditTrailFileFacade.updateAll(AuditTrailFile, where);
    }
    async findById(id, filter) {
        return this.AuditTrailFileFacade.findById(id, filter, this.additionalHeaders);
    }
    async updateById(id, AuditTrailFile) {
        await this.AuditTrailFileFacade.updateById(id, AuditTrailFile);
    }
    async replaceById(id, AuditTrailFile) {
        await this.AuditTrailFileFacade.replaceById(id, AuditTrailFile);
    }
    async deleteById(id) {
        await this.AuditTrailFileFacade.deleteById(id);
    }
};
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'AuditTrailFile model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(common_1.AuditTrailFile) } }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.AuditTrailFile, {
                    title: 'New AuditTrailFile',
                    exclude: ['id']
                })
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AuditTrailFileController.prototype, "create", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/count`),
    (0, rest_1.response)(200, {
        description: 'AuditTrailFile model count',
        content: { 'application/json': { schema: repository_1.CountSchema } }
    }),
    (0, tslib_1.__param)(0, rest_1.param.where(common_1.AuditTrailFile)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AuditTrailFileController.prototype, "count", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'Array of AuditTrailFile model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(common_1.AuditTrailFile, { includeRelations: false })
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.filter(common_1.AuditTrailFile)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AuditTrailFileController.prototype, "find", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'AuditTrailFile PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.AuditTrailFile, { partial: true })
            }
        }
    })),
    (0, tslib_1.__param)(1, rest_1.param.where(common_1.AuditTrailFile)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [common_1.AuditTrailFile, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AuditTrailFileController.prototype, "updateAll", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(200, {
        description: 'AuditTrailFile model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.AuditTrailFile, { includeRelations: false })
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, rest_1.param.filter(common_1.AuditTrailFile, { exclude: 'where' })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AuditTrailFileController.prototype, "findById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'AuditTrailFile PATCH success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.AuditTrailFile, { partial: true })
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, common_1.AuditTrailFile]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AuditTrailFileController.prototype, "updateById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.put)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'AuditTrailFile PUT success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, common_1.AuditTrailFile]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AuditTrailFileController.prototype, "replaceById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.del)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'AuditTrailFile DELETE success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AuditTrailFileController.prototype, "deleteById", null);
AuditTrailFileController = (0, tslib_1.__decorate)([
    (0, authorization_1.authorize)({}),
    (0, tslib_1.__param)(0, (0, core_1.service)(facades_1.AuditTrailFileFacade)),
    (0, tslib_1.__param)(1, (0, core_1.inject)('additionalHeaders')),
    (0, tslib_1.__param)(2, (0, core_1.inject)(rest_1.RestBindings.Http.RESPONSE)),
    (0, tslib_1.__param)(3, (0, core_1.inject)('userProfile')),
    (0, tslib_1.__metadata)("design:paramtypes", [facades_1.AuditTrailFileFacade, Object, Object, Object])
], AuditTrailFileController);
exports.AuditTrailFileController = AuditTrailFileController;
//# sourceMappingURL=audit-trail-file.controller.js.map