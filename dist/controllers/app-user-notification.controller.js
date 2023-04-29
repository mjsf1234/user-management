"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppUserNotificationController = void 0;
const tslib_1 = require("tslib");
const authorization_1 = require("@loopback/authorization");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const common_1 = require("common");
const facades_1 = require("../facades");
const API_PREFIX = common_1.AppUserNotification.modelName;
//Only REST related logic to be written inside a controller.
//Strictly no use of repositories
let AppUserNotificationController = class AppUserNotificationController {
    constructor(AppUserNotificationFacade, additionalHeaders) {
        this.AppUserNotificationFacade = AppUserNotificationFacade;
        this.additionalHeaders = additionalHeaders;
    }
    async create(AppUserNotification) {
        return this.AppUserNotificationFacade.create(AppUserNotification);
    }
    async count(where) {
        return this.AppUserNotificationFacade.count(where);
    }
    async find(filter) {
        return this.AppUserNotificationFacade.find(filter);
    }
    async findById(id, filter) {
        return this.AppUserNotificationFacade.findById(id, filter);
    }
    async deleteById(id) {
        await this.AppUserNotificationFacade.deleteById(id);
    }
    async createNomineeByAccountId(appUserId, AppUserNotification) {
        return this.AppUserNotificationFacade.createAppUserNotification(appUserId, AppUserNotification);
    }
    async findUserNotification(appUserId) {
        return await this.AppUserNotificationFacade.findUserNotification(appUserId, this.additionalHeaders);
    }
};
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'AppUserNotification model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(common_1.AppUserNotification) } }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.AppUserNotification, {
                    title: 'New AppUserNotification',
                    exclude: ['id']
                })
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AppUserNotificationController.prototype, "create", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/count`),
    (0, rest_1.response)(200, {
        description: 'AppUserNotification model count',
        content: { 'application/json': { schema: repository_1.CountSchema } }
    }),
    (0, tslib_1.__param)(0, rest_1.param.where(common_1.AppUserNotification)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AppUserNotificationController.prototype, "count", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'Array of AppUserNotification model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(common_1.AppUserNotification, { includeRelations: false })
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.filter(common_1.AppUserNotification)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AppUserNotificationController.prototype, "find", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(200, {
        description: 'AppUserNotification model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.AppUserNotification, { includeRelations: false })
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, rest_1.param.filter(common_1.AppUserNotification, { exclude: 'where' })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AppUserNotificationController.prototype, "findById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.del)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'AppUserNotification DELETE success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AppUserNotificationController.prototype, "deleteById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}/{appUserId}/createUserNotification`),
    (0, rest_1.response)(200, {
        description: 'AppUserNotification model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(common_1.AppUserNotification) } }
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('appUserId')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        transactionSms: {
                            type: 'boolean'
                        },
                        transactionEmail: {
                            type: 'boolean'
                        },
                        transactionPushnotification: {
                            type: 'boolean'
                        },
                        upcomingPaymentsSms: {
                            type: 'boolean'
                        },
                        upcomingPaymentsEmail: {
                            type: 'boolean'
                        },
                        upcomingPaymentsPushnotification: {
                            type: 'boolean'
                        },
                        rebalanceSms: {
                            type: 'boolean'
                        },
                        rebalanceEmail: {
                            type: 'boolean'
                        },
                        rebalancePushnotification: {
                            type: 'boolean'
                        },
                    },
                    required: ['transactionSms', 'transactionEmail', 'transactionPushnotification', 'upcomingPaymentsSms', 'upcomingPaymentsEmail', 'upcomingPaymentsPushnotification', 'rebalanceSms', 'rebalanceEmail', 'rebalancePushnotification'],
                    example: `{
              "transactionSms": true,
              "transactionEmail": true,
              "transactionPushnotification": false,
              "upcomingPaymentsSms": true,
              "upcomingPaymentsEmail": true,
              "upcomingPaymentsPushnotification":true,
              "rebalanceSms":true,
              "rebalanceEmail":true,
              "rebalancePushnotification":true
            }`
                }
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, common_1.AppUserNotification]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AppUserNotificationController.prototype, "createNomineeByAccountId", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`${API_PREFIX}/{userid}/getUserNotification`),
    (0, rest_1.response)(200, {
        description: "Get AppUserNotification by appUserId",
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.AppUserNotification, { includeRelations: false })
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('userid')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AppUserNotificationController.prototype, "findUserNotification", null);
AppUserNotificationController = (0, tslib_1.__decorate)([
    (0, authorization_1.authorize)({}),
    (0, tslib_1.__param)(0, (0, core_1.service)(facades_1.AppUserNotificationFacade)),
    (0, tslib_1.__param)(1, (0, core_1.inject)('additionalHeaders')),
    (0, tslib_1.__metadata)("design:paramtypes", [facades_1.AppUserNotificationFacade, Object])
], AppUserNotificationController);
exports.AppUserNotificationController = AppUserNotificationController;
//# sourceMappingURL=app-user-notification.controller.js.map