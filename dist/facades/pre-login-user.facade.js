"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreLoginUserFacade = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const common_1 = require("common");
// All business loigc goes inside Facade layer
let PreLoginUserFacade = class PreLoginUserFacade {
    constructor(preLoginUserRepository, deviceRepository) {
        this.preLoginUserRepository = preLoginUserRepository;
        this.deviceRepository = deviceRepository;
    }
    async create(entity, options) {
        return this.preLoginUserRepository.create(entity, options);
    }
    async createAll(entities, options) {
        return this.preLoginUserRepository.createAll(entities, options);
    }
    async save(entity, options) {
        return this.preLoginUserRepository.save(entity, options);
    }
    async find(filter, options) {
        return this.preLoginUserRepository.find(filter, options);
    }
    async findOne(filter, options) {
        return this.preLoginUserRepository.findOne(filter, options);
    }
    async findById(id, filter, options) {
        return this.preLoginUserRepository.findById(id, filter, options);
    }
    async update(entity, options) {
        return this.preLoginUserRepository.update(entity, options);
    }
    async delete(entity, options) {
        return this.preLoginUserRepository.delete(entity, options);
    }
    async updateAll(data, where, options) {
        return this.preLoginUserRepository.updateAll(data, where, options);
    }
    async updateById(id, data, options) {
        return this.preLoginUserRepository.updateById(id, data, options);
    }
    async replaceById(id, data, options) {
        return this.preLoginUserRepository.replaceById(id, data, options);
    }
    async deleteAll(where, options) {
        return this.preLoginUserRepository.deleteAll(where, options);
    }
    async deleteById(id, options) {
        return this.preLoginUserRepository.deleteById(id, options);
    }
    async count(where, options) {
        return this.preLoginUserRepository.count(where, options);
    }
    async exists(id, options) {
        return this.preLoginUserRepository.exists(id, options);
    }
    //todo Replace any used in this block
    async savePreLoginData(deviceId, userData, uniqueId, options) {
        return new Promise((resolve, reject) => {
            this.deviceRepository
                .findOne({
                where: {
                    id: deviceId,
                    uniqueId: uniqueId,
                    isActive: true
                },
                include: [
                    {
                        relation: 'preLoginUser',
                        scope: {
                            where: { isActive: true }
                        }
                    }
                ]
            })
                .then((deviceDetails) => {
                let promise;
                let preLoginDataToResolve;
                if (deviceDetails && !deviceDetails.preLoginUser) {
                    promise = this.preLoginUserRepository
                        .create({
                        userData: userData
                    })
                        .then((data) => {
                        preLoginDataToResolve = data;
                        return this.deviceRepository.updateAll({
                            preLoginUserId: preLoginDataToResolve.id
                        }, {
                            id: deviceId
                        });
                    })
                        .then(() => {
                        return Promise.resolve(preLoginDataToResolve);
                    })
                        .catch(err => {
                        throw err;
                    });
                }
                else if (deviceDetails && deviceDetails.preLoginUser) {
                    const preLoginUserId = deviceDetails.preLoginUser.id;
                    promise = this.preLoginUserRepository
                        .updateAll({
                        userData: userData
                    }, {
                        id: deviceDetails.preLoginUser.id
                    })
                        .then(() => {
                        return this.preLoginUserRepository.findById(preLoginUserId);
                    })
                        .catch(err => {
                        throw err;
                    });
                }
                else {
                    return reject(new common_1.RestError(400, 'Invalid Device Id', { systemcode: 1327 }));
                }
                return promise;
            })
                .then((data) => {
                return resolve(data);
            })
                .catch(error => {
                common_1.LoggingUtils.error(error);
                throw error;
            });
        });
    }
    async fetchPreLoginUsers(limit = 50, offset = 0, deviceId, request) {
        if (!(request.headers && request.headers["uniqueid"])) {
            return Promise.reject(new common_1.RestError(465, 'Device unique id is missing from headers', { systemcode: 1307 }));
        }
        const uniqueId = request.headers["uniqueid"];
        if (!deviceId || !uniqueId) {
            return Promise.reject(new common_1.RestError(400, 'Both deviceId and uniqueId not found', { systemcode: 1328 }));
        }
        try {
            const response = await this.deviceRepository
                .find({
                where: {
                    id: deviceId,
                    uniqueId: uniqueId,
                    isActive: true
                },
                fields: { 'preLoginUserId': true, 'preLoginUser': true },
                limit: limit,
                offset: offset,
                include: [
                    {
                        relation: 'preLoginUser',
                        scope: {
                            where: { isActive: true }
                        }
                    }
                ]
            });
            if (!response) {
                return Promise.reject(new common_1.RestError(400, 'No data found!', { systemcode: 1234 }));
            }
            return Promise.resolve(response);
        }
        catch (error) {
            common_1.LoggingUtils.error(error);
            throw error;
        }
    }
};
PreLoginUserFacade = (0, tslib_1.__decorate)([
    (0, core_1.injectable)({ scope: core_1.BindingScope.APPLICATION }),
    (0, tslib_1.__param)(0, (0, repository_1.repository)(common_1.PreLoginUserRepository)),
    (0, tslib_1.__param)(1, (0, repository_1.repository)(common_1.DeviceRepository)),
    (0, tslib_1.__metadata)("design:paramtypes", [common_1.PreLoginUserRepository,
        common_1.DeviceRepository])
], PreLoginUserFacade);
exports.PreLoginUserFacade = PreLoginUserFacade;
//# sourceMappingURL=pre-login-user.facade.js.map