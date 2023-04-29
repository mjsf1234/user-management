"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotificationTokenFacade = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const common_1 = require("common");
const common_2 = require("common");
// All business loigc goes inside Facade layer
let UserNotificationTokenFacade = class UserNotificationTokenFacade {
    constructor(userNotificationTokenRepository) {
        this.userNotificationTokenRepository = userNotificationTokenRepository;
    }
    async create(entity, options) {
        return this.userNotificationTokenRepository.create(entity, options);
    }
    async deactivatToken(appUserId, where, options) {
        if (!(where === null || where === void 0 ? void 0 : where.registrationToken)) {
            throw new common_2.RestError(400, 'Token is required!', { systemcode: 1367 });
        }
        return this.userNotificationTokenRepository.updateAll({ isActive: false }, { appUserId, registrationToken: where.registrationToken, isActive: true }, options);
    }
};
UserNotificationTokenFacade = (0, tslib_1.__decorate)([
    (0, core_1.injectable)({ scope: core_1.BindingScope.APPLICATION }),
    (0, tslib_1.__param)(0, (0, repository_1.repository)(common_1.UserNotificationTokenRepository)),
    (0, tslib_1.__metadata)("design:paramtypes", [common_1.UserNotificationTokenRepository])
], UserNotificationTokenFacade);
exports.UserNotificationTokenFacade = UserNotificationTokenFacade;
//# sourceMappingURL=user-notification-token.facade.js.map