"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRolePreferencesController = void 0;
const tslib_1 = require("tslib");
const authorization_1 = require("@loopback/authorization");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const common_1 = require("common");
const facades_1 = require("../facades");
const API_PREFIX = common_1.UserRolePreferences.modelName;
//Only REST related logic to be written inside a controller.
//Strictly no use of repositories
let UserRolePreferencesController = class UserRolePreferencesController {
    constructor(userRolePreferencesFacade) {
        this.userRolePreferencesFacade = userRolePreferencesFacade;
    }
    async create(userRolePreferences) {
        return this.userRolePreferencesFacade.create(userRolePreferences);
    }
    async count(where) {
        return this.userRolePreferencesFacade.count(where);
    }
    async find(filter) {
        return this.userRolePreferencesFacade.find(filter);
    }
    async updateAll(userRolePreferences, where) {
        return this.userRolePreferencesFacade.updateAll(userRolePreferences, where);
    }
    async findById(id, filter) {
        return this.userRolePreferencesFacade.findById(id, filter);
    }
    async updateById(id, userRolePreferences) {
        await this.userRolePreferencesFacade.updateById(id, userRolePreferences);
    }
    async replaceById(id, userRolePreferences) {
        await this.userRolePreferencesFacade.replaceById(id, userRolePreferences);
    }
    async deleteById(id) {
        await this.userRolePreferencesFacade.deleteById(id);
    }
};
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'UserRolePreferences model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(common_1.UserRolePreferences) } }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.UserRolePreferences, {
                    title: 'New UserRolePreferences',
                    exclude: ['id']
                })
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UserRolePreferencesController.prototype, "create", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/count`),
    (0, rest_1.response)(200, {
        description: 'UserRolePreferences model count',
        content: { 'application/json': { schema: repository_1.CountSchema } }
    }),
    (0, tslib_1.__param)(0, rest_1.param.where(common_1.UserRolePreferences)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UserRolePreferencesController.prototype, "count", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'Array of UserRolePreferences model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(common_1.UserRolePreferences, { includeRelations: false })
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.filter(common_1.UserRolePreferences)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UserRolePreferencesController.prototype, "find", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'UserRolePreferences PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.UserRolePreferences, { partial: true })
            }
        }
    })),
    (0, tslib_1.__param)(1, rest_1.param.where(common_1.UserRolePreferences)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [common_1.UserRolePreferences, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UserRolePreferencesController.prototype, "updateAll", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(200, {
        description: 'UserRolePreferences model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.UserRolePreferences, { includeRelations: false })
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, rest_1.param.filter(common_1.UserRolePreferences, { exclude: 'where' })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UserRolePreferencesController.prototype, "findById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'UserRolePreferences PATCH success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.UserRolePreferences, { partial: true })
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, common_1.UserRolePreferences]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UserRolePreferencesController.prototype, "updateById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.put)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'UserRolePreferences PUT success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, common_1.UserRolePreferences]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UserRolePreferencesController.prototype, "replaceById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.del)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'UserRolePreferences DELETE success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UserRolePreferencesController.prototype, "deleteById", null);
UserRolePreferencesController = (0, tslib_1.__decorate)([
    (0, authorization_1.authorize)({}),
    (0, tslib_1.__param)(0, (0, core_1.service)(facades_1.UserRolePreferencesFacade)),
    (0, tslib_1.__metadata)("design:paramtypes", [facades_1.UserRolePreferencesFacade])
], UserRolePreferencesController);
exports.UserRolePreferencesController = UserRolePreferencesController;
//# sourceMappingURL=user-role-preferences.controller.js.map