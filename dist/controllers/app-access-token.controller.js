"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppAccessTokenController = void 0;
const tslib_1 = require("tslib");
const authorization_1 = require("@loopback/authorization");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const common_1 = require("common");
const facades_1 = require("../facades");
const API_PREFIX = common_1.AppAccessToken.modelName;
//Only REST related logic to be written inside a controller.
//Strictly no use of repositories
let AppAccessTokenController = class AppAccessTokenController {
    constructor(appAccessTokenFacade) {
        this.appAccessTokenFacade = appAccessTokenFacade;
    }
    async create(appAccessToken) {
        return this.appAccessTokenFacade.create(appAccessToken);
    }
    async refreshUsertToken(refreshTokenRequest, request) {
        // @ts-ignore:
        return this.appAccessTokenFacade.recreateTokenWithRereshToken(refreshTokenRequest.refreshToken, request);
    }
    async count(where) {
        return this.appAccessTokenFacade.count(where);
    }
    async find(filter) {
        return this.appAccessTokenFacade.find(filter);
    }
    async updateAll(appAccessToken, where) {
        return this.appAccessTokenFacade.updateAll(appAccessToken, where);
    }
    async findById(id, filter) {
        return this.appAccessTokenFacade.findById(id, filter);
    }
    async updateById(id, appAccessToken) {
        await this.appAccessTokenFacade.updateById(id, appAccessToken);
    }
    async replaceById(id, appAccessToken) {
        await this.appAccessTokenFacade.replaceById(id, appAccessToken);
    }
    async deleteById(id) {
        await this.appAccessTokenFacade.deleteById(id);
    }
};
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'AppAccessToken model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(common_1.AppAccessToken) } }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.AppAccessToken, {
                    title: 'New AppAccessToken',
                    exclude: ['id']
                })
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AppAccessTokenController.prototype, "create", null);
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}/recreateTokenWithRefreshToken`),
    (0, rest_1.response)(200, {
        description: 'Refresh Token',
        content: {
            'application/json': {
                schema: {
                    example: {
                        appAccessToken: 'dfggrwfasfgegwarsgfasgvaeg',
                        appRefreshToken: 'string'
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
                    required: ['refreshToken'],
                    properties: {
                        refreshToken: {
                            type: 'string',
                            minLength: 0,
                            maxLength: 64
                        }
                    },
                    example: {
                        refreshToken: 'kjsgdjshgdjh'
                    }
                }
            }
        }
    })),
    (0, tslib_1.__param)(1, (0, core_1.inject)(rest_1.RestBindings.Http.REQUEST)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AppAccessTokenController.prototype, "refreshUsertToken", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/count`),
    (0, rest_1.response)(200, {
        description: 'AppAccessToken model count',
        content: { 'application/json': { schema: repository_1.CountSchema } }
    }),
    (0, tslib_1.__param)(0, rest_1.param.where(common_1.AppAccessToken)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AppAccessTokenController.prototype, "count", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'Array of AppAccessToken model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(common_1.AppAccessToken, { includeRelations: false })
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.filter(common_1.AppAccessToken)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AppAccessTokenController.prototype, "find", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'AppAccessToken PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.AppAccessToken, { partial: true })
            }
        }
    })),
    (0, tslib_1.__param)(1, rest_1.param.where(common_1.AppAccessToken)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [common_1.AppAccessToken, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AppAccessTokenController.prototype, "updateAll", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(200, {
        description: 'AppAccessToken model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.AppAccessToken, { includeRelations: false })
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, rest_1.param.filter(common_1.AppAccessToken, { exclude: 'where' })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AppAccessTokenController.prototype, "findById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'AppAccessToken PATCH success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.AppAccessToken, { partial: true })
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, common_1.AppAccessToken]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AppAccessTokenController.prototype, "updateById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.put)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'AppAccessToken PUT success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, common_1.AppAccessToken]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AppAccessTokenController.prototype, "replaceById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.del)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'AppAccessToken DELETE success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AppAccessTokenController.prototype, "deleteById", null);
AppAccessTokenController = (0, tslib_1.__decorate)([
    (0, authorization_1.authorize)({}),
    (0, tslib_1.__param)(0, (0, core_1.service)(facades_1.AppAccessTokenFacade)),
    (0, tslib_1.__metadata)("design:paramtypes", [facades_1.AppAccessTokenFacade])
], AppAccessTokenController);
exports.AppAccessTokenController = AppAccessTokenController;
//# sourceMappingURL=app-access-token.controller.js.map