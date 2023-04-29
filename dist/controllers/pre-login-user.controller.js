"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreLoginUserController = void 0;
const tslib_1 = require("tslib");
const authorization_1 = require("@loopback/authorization");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const common_1 = require("common");
const common_2 = require("common");
const facades_1 = require("../facades");
const API_PREFIX = common_2.PreLoginUser.modelName;
//Only REST related logic to be written inside a controller.
//Strictly no use of repositories
let PreLoginUserController = class PreLoginUserController {
    constructor(preLoginUserFacade) {
        this.preLoginUserFacade = preLoginUserFacade;
    }
    async create(preLoginUser) {
        return this.preLoginUserFacade.create(preLoginUser);
    }
    async count(where) {
        return this.preLoginUserFacade.count(where);
    }
    async find(filter) {
        return this.preLoginUserFacade.find(filter);
    }
    async updateAll(preLoginUser, where) {
        return this.preLoginUserFacade.updateAll(preLoginUser, where);
    }
    async findById(id, filter) {
        return this.preLoginUserFacade.findById(id, filter);
    }
    async updateById(id, preLoginUser) {
        await this.preLoginUserFacade.updateById(id, preLoginUser);
    }
    async replaceById(id, device) {
        await this.preLoginUserFacade.replaceById(id, device);
    }
    async deleteById(id) {
        await this.preLoginUserFacade.deleteById(id);
    }
    async savePreLoginData(preLoginUser) {
        return this.preLoginUserFacade.savePreLoginData(preLoginUser.deviceId, preLoginUser.userData, preLoginUser.uniqueId);
    }
    async fetchPreLoginUsers(deviceId, request, limit, offset) {
        common_1.PathParamsValidations.idValidations(deviceId);
        // PathParamsValidations.limitValidations(limit)
        // PathParamsValidations.genericNumericValidations(offset)
        return this.preLoginUserFacade.fetchPreLoginUsers(limit, offset, deviceId, request);
    }
};
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'Pre Login User model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(common_2.PreLoginUser) } }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_2.PreLoginUser, {
                    title: 'New PreLogin User',
                    exclude: ['id']
                })
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], PreLoginUserController.prototype, "create", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/count`),
    (0, rest_1.response)(200, {
        description: 'PreLogin User model count',
        content: { 'application/json': { schema: repository_1.CountSchema } }
    }),
    (0, tslib_1.__param)(0, rest_1.param.where(common_2.PreLoginUser)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], PreLoginUserController.prototype, "count", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'Array of PreLogin User model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(common_2.PreLoginUser, { includeRelations: false })
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.filter(common_2.PreLoginUser)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], PreLoginUserController.prototype, "find", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'PreLogin User PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_2.PreLoginUser, { partial: true })
            }
        }
    })),
    (0, tslib_1.__param)(1, rest_1.param.where(common_2.PreLoginUser)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [common_2.PreLoginUser, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], PreLoginUserController.prototype, "updateAll", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(200, {
        description: 'PreLogin User model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_2.PreLoginUser, { includeRelations: false })
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, rest_1.param.filter(common_2.PreLoginUser, { exclude: 'where' })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], PreLoginUserController.prototype, "findById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'PreLogin User PATCH success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_2.PreLoginUser, { partial: true })
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, common_2.PreLoginUser]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], PreLoginUserController.prototype, "updateById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.put)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'PreLogin User PUT success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, common_2.PreLoginUser]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], PreLoginUserController.prototype, "replaceById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.del)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'PreLogin User DELETE success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], PreLoginUserController.prototype, "deleteById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}/savePreLoginData`),
    (0, rest_1.response)(200, {
        description: 'Save Pre Login Data for Device Id',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(common_2.PreLoginUser) } }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    required: ['deviceId', 'uniqueId'],
                    properties: {
                        deviceId: {
                            type: 'number',
                            minimum: 1
                        },
                        uniqueId: {
                            type: 'string',
                            pattern: '^[a-zA-Z0-9-]{16,36}'
                        },
                        userData: {
                            type: 'object'
                        }
                    }
                }
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], PreLoginUserController.prototype, "savePreLoginData", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/fetchPreLoginUsers`),
    (0, rest_1.response)(200, {
        description: 'Array of PreLoginUser model instances',
        content: {
            'application/json': {
                schema: {
                    schema: {
                        type: 'array',
                        title: 'PreLoginUser response body',
                        properties: {
                            preLoginUserId: {
                                type: 'number'
                            },
                            preLoginUser: {
                                type: 'object',
                                properties: {
                                    id: { type: 'number' },
                                    isActive: { type: 'boolean' },
                                    createdDate: { type: 'string' },
                                    lastModifiedDate: { type: 'string' },
                                    userData: {
                                        type: 'object'
                                    }
                                }
                            }
                        }
                    },
                    example: `[
            {
              "preLoginUserId": 13,
              "preLoginUser": {
                "id": 13,
                "isActive": true,
                "createdDate": "2022-04-21T05:35:31.909Z",
                "lastModifiedDate": "2022-05-09T13:17:56.993Z",
                "userData": {
                  "test": "data",
                  "goalPlanning": {
                    "cartItems": [
                      {
                        "startDateForSip": "2022-05-09T13:17:54.232Z",
                        "endDateForSip": "2025-05-09T00:00:00.000Z",
                        "totalAmount": 100,
                        "transactionTypeId": 1,
                        "frequency": 10,
                        "goalId": 1221,
                        "instrumentId": 21910,
                        "transactionSubType": 1,
                        "goalParam": {
                          "name": "Car",
                          "startDate": "2022-05-09T13:17:51.332Z",
                          "endDate": "2025-05-09T00:00:00.000Z",
                          "targetAmount": 700000,
                          "expectedCorpus": 700000,
                          "goalCategoryId": 1,
                          "type": 2
                        }
                      }
                    ]
                  }
                }
              }
            }
          ]`
                },
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.query.number('deviceId')),
    (0, tslib_1.__param)(1, (0, core_1.inject)(rest_1.RestBindings.Http.REQUEST)),
    (0, tslib_1.__param)(2, rest_1.param.query.number('limit')),
    (0, tslib_1.__param)(3, rest_1.param.query.number('offset')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, Object, Number, Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], PreLoginUserController.prototype, "fetchPreLoginUsers", null);
PreLoginUserController = (0, tslib_1.__decorate)([
    (0, authorization_1.authorize)({}),
    (0, tslib_1.__param)(0, (0, core_1.service)(facades_1.PreLoginUserFacade)),
    (0, tslib_1.__metadata)("design:paramtypes", [facades_1.PreLoginUserFacade])
], PreLoginUserController);
exports.PreLoginUserController = PreLoginUserController;
//# sourceMappingURL=pre-login-user.controller.js.map