"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotificationTokenController = void 0;
const tslib_1 = require("tslib");
const authorization_1 = require("@loopback/authorization");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const common_1 = require("common");
const facades_1 = require("../facades");
const API_PREFIX = common_1.UserNotificationToken.modelName;
//Only REST related logic to be written inside a controller.
//Strictly no use of repositories
let UserNotificationTokenController = class UserNotificationTokenController {
    constructor(userNotificationTokenFacade) {
        this.userNotificationTokenFacade = userNotificationTokenFacade;
    }
    async create(appUserId, userNotificationToken) {
        return this.userNotificationTokenFacade.create(userNotificationToken);
    }
    async deactivateToken(appUserId, where) {
        return this.userNotificationTokenFacade.deactivatToken(appUserId, where);
    }
    async sendTestNoficationMessage(content) {
        let message = content !== null && content !== void 0 ? content : new common_1.CommunicationQueueMessage();
        if (!content) {
            message.eventType = common_1.CommunicationQueueMessageEventType.SEND_PUSH_NOTIFICATION;
            message.userId = 3;
            message.pushNotification = {
                notificationType: common_1.PushNotificationTemplateName.CART_ITEM_PENDING,
                data: {
                    firstName: 'First Name',
                    message: 'Test Message',
                    count: 2
                }
            };
        }
        await common_1.QueueProducer.sendMessageInCommunicationQueue(message);
        return { count: 1 };
    }
};
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}/{id}/create`),
    (0, rest_1.response)(200, {
        description: 'UserNotificationToken model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(common_1.UserNotificationToken) } }
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.UserNotificationToken, {
                    title: 'New UserNotificationToken',
                    exclude: ['id']
                })
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UserNotificationTokenController.prototype, "create", null);
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}/{id}/deactivate`),
    (0, rest_1.response)(200, {
        description: 'UserNotificationToken deactivate succes count',
        content: { 'application/json': { schema: repository_1.CountSchema } }
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.UserNotificationToken, {
                    title: 'UserNotificationToken Details',
                    exclude: ['id', 'isActive', 'createdDate', 'lastModifiedDate', 'deviceName', 'osName', 'config', 'appUserId']
                })
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UserNotificationTokenController.prototype, "deactivateToken", null);
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}/testNotification`),
    (0, rest_1.response)(200, {
        description: 'UserNotificationToken POST Test success count',
        content: { 'application/json': { schema: repository_1.CountSchema } }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [common_1.CommunicationQueueMessage]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UserNotificationTokenController.prototype, "sendTestNoficationMessage", null);
UserNotificationTokenController = (0, tslib_1.__decorate)([
    (0, authorization_1.authorize)({}),
    (0, tslib_1.__param)(0, (0, core_1.service)(facades_1.UserNotificationTokenFacade)),
    (0, tslib_1.__metadata)("design:paramtypes", [facades_1.UserNotificationTokenFacade])
], UserNotificationTokenController);
exports.UserNotificationTokenController = UserNotificationTokenController;
//# sourceMappingURL=user-notification-token.controller.js.map