"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdvisoryClientMasterController = void 0;
const tslib_1 = require("tslib");
const authorization_1 = require("@loopback/authorization");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const common_1 = require("common");
const facades_1 = require("../facades");
const API_PREFIX = common_1.AdvisoryClientMaster.modelName;
//Only REST related logic to be written inside a controller.
//Strictly no use of repositories
let AdvisoryClientMasterController = class AdvisoryClientMasterController {
    constructor(advisoryClientMasterFacade) {
        this.advisoryClientMasterFacade = advisoryClientMasterFacade;
    }
    async create(advisoryClientMaster) {
        return this.advisoryClientMasterFacade.create(advisoryClientMaster);
    }
    async count(where) {
        return this.advisoryClientMasterFacade.count(where);
    }
    async find(filter) {
        return this.advisoryClientMasterFacade.find(filter);
    }
    async updateAll(advisoryClientMaster, where) {
        return this.advisoryClientMasterFacade.updateAll(advisoryClientMaster, where);
    }
    async findById(id, filter) {
        return this.advisoryClientMasterFacade.findById(id, filter);
    }
    async updateById(id, advisoryClientMaster) {
        await this.advisoryClientMasterFacade.updateById(id, advisoryClientMaster);
    }
    async replaceById(id, advisoryClientMaster) {
        await this.advisoryClientMasterFacade.replaceById(id, advisoryClientMaster);
    }
    async deleteById(id) {
        await this.advisoryClientMasterFacade.deleteById(id);
    }
};
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'AdvisoryClientMaster model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(common_1.AdvisoryClientMaster) } }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.AdvisoryClientMaster, {
                    title: 'New AdvisoryClientMaster',
                    exclude: ['id']
                })
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AdvisoryClientMasterController.prototype, "create", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/count`),
    (0, rest_1.response)(200, {
        description: 'AdvisoryClientMaster model count',
        content: { 'application/json': { schema: repository_1.CountSchema } }
    }),
    (0, tslib_1.__param)(0, rest_1.param.where(common_1.AdvisoryClientMaster)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AdvisoryClientMasterController.prototype, "count", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'Array of AdvisoryClientMaster model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(common_1.AdvisoryClientMaster, { includeRelations: false })
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.filter(common_1.AdvisoryClientMaster)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AdvisoryClientMasterController.prototype, "find", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'AdvisoryClientMaster PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.AdvisoryClientMaster, { partial: true })
            }
        }
    })),
    (0, tslib_1.__param)(1, rest_1.param.where(common_1.AdvisoryClientMaster)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [common_1.AdvisoryClientMaster, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AdvisoryClientMasterController.prototype, "updateAll", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(200, {
        description: 'AdvisoryClientMaster model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.AdvisoryClientMaster, { includeRelations: false })
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, rest_1.param.filter(common_1.AdvisoryClientMaster, { exclude: 'where' })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AdvisoryClientMasterController.prototype, "findById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'AdvisoryClientMaster PATCH success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.AdvisoryClientMaster, { partial: true })
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, common_1.AdvisoryClientMaster]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AdvisoryClientMasterController.prototype, "updateById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.put)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'AdvisoryClientMaster PUT success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, common_1.AdvisoryClientMaster]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AdvisoryClientMasterController.prototype, "replaceById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.del)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'AdvisoryClientMaster DELETE success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AdvisoryClientMasterController.prototype, "deleteById", null);
AdvisoryClientMasterController = (0, tslib_1.__decorate)([
    (0, authorization_1.authorize)({}),
    (0, tslib_1.__param)(0, (0, core_1.service)(facades_1.AdvisoryClientMasterFacade)),
    (0, tslib_1.__metadata)("design:paramtypes", [facades_1.AdvisoryClientMasterFacade])
], AdvisoryClientMasterController);
exports.AdvisoryClientMasterController = AdvisoryClientMasterController;
//# sourceMappingURL=advisory-client-master.controller.js.map