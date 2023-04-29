"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppUserNotificationFacade = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const common_1 = require("common");
// All business loigc goes inside Facade layer
let AppUserNotificationFacade = class AppUserNotificationFacade {
    constructor(AppUserNotificationRepository) {
        this.AppUserNotificationRepository = AppUserNotificationRepository;
    }
    async create(entity, options) {
        return this.AppUserNotificationRepository.create(entity, options);
    }
    async createAll(entities, options) {
        return this.AppUserNotificationRepository.createAll(entities, options);
    }
    async save(entity, options) {
        return this.AppUserNotificationRepository.save(entity, options);
    }
    async find(filter, options) {
        return this.AppUserNotificationRepository.find(filter, options);
    }
    async findOne(filter, options) {
        return this.AppUserNotificationRepository.findOne(filter, options);
    }
    async findById(id, filter, options) {
        return this.AppUserNotificationRepository.findById(id, filter, options);
    }
    async update(entity, options) {
        return this.AppUserNotificationRepository.update(entity, options);
    }
    async delete(entity, options) {
        return this.AppUserNotificationRepository.delete(entity, options);
    }
    async updateAll(data, where, options) {
        return this.AppUserNotificationRepository.updateAll(data, where, options);
    }
    async updateById(id, data, options) {
        return this.AppUserNotificationRepository.updateById(id, data, options);
    }
    async replaceById(id, data, options) {
        return this.AppUserNotificationRepository.replaceById(id, data, options);
    }
    async deleteAll(where, options) {
        return this.AppUserNotificationRepository.deleteAll(where, options);
    }
    async deleteById(id, options) {
        return this.AppUserNotificationRepository.deleteById(id, options);
    }
    async count(where, options) {
        return this.AppUserNotificationRepository.count(where, options);
    }
    async exists(id, options) {
        return this.AppUserNotificationRepository.exists(id, options);
    }
    async createAppUserNotification(appUserId, entity) {
        return new Promise((resolve, reject) => {
            try {
                entity.appUserId = appUserId;
                return resolve(this.create(entity));
            }
            catch (error) {
                throw error;
            }
        });
    }
    async findUserNotification(appUserId, options) {
        return new Promise(async (resolve, reject) => {
            try {
                this.AppUserNotificationRepository.findOne({
                    where: {
                        appUserId: appUserId,
                        isActive: true
                    }
                }, options)
                    .then((appUserNotification) => {
                    if (appUserNotification)
                        return resolve(appUserNotification);
                    else
                        return reject(new common_1.RestError(400, 'No Records Found', { systemcode: 1134 }));
                }).catch((error) => {
                    throw error;
                });
            }
            catch (error) {
                common_1.LoggingUtils.error(error);
                throw error;
            }
        });
    }
};
AppUserNotificationFacade = (0, tslib_1.__decorate)([
    (0, core_1.injectable)({ scope: core_1.BindingScope.APPLICATION }),
    (0, tslib_1.__param)(0, (0, repository_1.repository)(common_1.AppUserNotificationRepository)),
    (0, tslib_1.__metadata)("design:paramtypes", [common_1.AppUserNotificationRepository])
], AppUserNotificationFacade);
exports.AppUserNotificationFacade = AppUserNotificationFacade;
//# sourceMappingURL=app-user-notification.facade.js.map