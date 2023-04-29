"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FamilyController = void 0;
const tslib_1 = require("tslib");
const authorization_1 = require("@loopback/authorization");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const common_1 = require("common");
const facades_1 = require("../facades");
const API_PREFIX = common_1.Family.modelName;
//Only REST related logic to be written inside a controller.
//Strictly no use of repositories
let FamilyController = class FamilyController {
    constructor(familyFacade) {
        this.familyFacade = familyFacade;
    }
    async create(family) {
        return this.familyFacade.create(family);
    }
    async count(where) {
        return this.familyFacade.count(where);
    }
    async find(filter) {
        return this.familyFacade.find(filter);
    }
    async updateAll(family, where) {
        return this.familyFacade.updateAll(family, where);
    }
    async findById(id, filter) {
        return this.familyFacade.findById(id, filter);
    }
    async updateById(id, family) {
        await this.familyFacade.updateById(id, family);
    }
    async replaceById(id, family) {
        await this.familyFacade.replaceById(id, family);
    }
    async deleteById(id) {
        await this.familyFacade.deleteById(id);
    }
};
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'Family model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(common_1.Family) } }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.Family, {
                    title: 'New Family',
                    exclude: ['id']
                })
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], FamilyController.prototype, "create", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/count`),
    (0, rest_1.response)(200, {
        description: 'Family model count',
        content: { 'application/json': { schema: repository_1.CountSchema } }
    }),
    (0, tslib_1.__param)(0, rest_1.param.where(common_1.Family)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], FamilyController.prototype, "count", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'Array of Family model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(common_1.Family, { includeRelations: false })
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.filter(common_1.Family)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], FamilyController.prototype, "find", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'Family PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.Family, { partial: true })
            }
        }
    })),
    (0, tslib_1.__param)(1, rest_1.param.where(common_1.Family)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [common_1.Family, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], FamilyController.prototype, "updateAll", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(200, {
        description: 'Family model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.Family, { includeRelations: false })
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, rest_1.param.filter(common_1.Family, { exclude: 'where' })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], FamilyController.prototype, "findById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'Family PATCH success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.Family, { partial: true })
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, common_1.Family]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], FamilyController.prototype, "updateById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.put)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'Family PUT success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, common_1.Family]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], FamilyController.prototype, "replaceById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.del)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'Family DELETE success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], FamilyController.prototype, "deleteById", null);
FamilyController = (0, tslib_1.__decorate)([
    (0, authorization_1.authorize)({}),
    (0, tslib_1.__param)(0, (0, core_1.service)(facades_1.FamilyFacade)),
    (0, tslib_1.__metadata)("design:paramtypes", [facades_1.FamilyFacade])
], FamilyController);
exports.FamilyController = FamilyController;
//# sourceMappingURL=family.controller.js.map