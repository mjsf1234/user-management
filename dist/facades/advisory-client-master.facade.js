"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdvisoryClientMasterFacade = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const common_1 = require("common");
// All business loigc goes inside Facade layer
let AdvisoryClientMasterFacade = class AdvisoryClientMasterFacade {
    constructor(advisoryClientMasterRepository, appUserRepository) {
        this.advisoryClientMasterRepository = advisoryClientMasterRepository;
        this.appUserRepository = appUserRepository;
    }
    async create(entity, options) {
        try {
            const advisoryClientMaster = await this.advisoryClientMasterRepository.create(entity, options);
            if (!entity.customerId)
                return Promise.reject(new common_1.RestError(404, 'Please provide customer ID', { systemcode: 1125 }));
            if (entity &&
                entity.customerId &&
                entity.customerFlag &&
                entity.customerFlag == common_1.Option.GLOBALOPTIONS.ADVISORYCUSTOMERFLAG.ADVISORY.value) {
                await this.appUserRepository
                    .findOne({
                    where: {
                        isActive: true,
                        bosCode: entity.customerId
                    }
                }, options)
                    .then((fetchedUser) => {
                    if (!fetchedUser) {
                        return advisoryClientMaster;
                    }
                    if (fetchedUser && fetchedUser.id) {
                        this.appUserRepository.updateAll({
                            appUserStatus: common_1.Option.GLOBALOPTIONS.APPUSERSTATUS.advisoryUser.value
                        }, {
                            id: fetchedUser.id,
                            isActive: true
                        }, options);
                    }
                });
            }
            return advisoryClientMaster;
        }
        catch (err) {
            common_1.LoggingUtils.error(err);
            return Promise.reject(new common_1.RestError(err.status, err.message));
        }
    }
    async createAll(entities, options) {
        return this.advisoryClientMasterRepository.createAll(entities, options);
    }
    async save(entity, options) {
        return this.advisoryClientMasterRepository.save(entity, options);
    }
    async find(filter, options) {
        return this.advisoryClientMasterRepository.find(filter, options);
    }
    async findOne(filter, options) {
        return this.advisoryClientMasterRepository.findOne(filter, options);
    }
    async findById(id, filter, options) {
        return this.advisoryClientMasterRepository.findById(id, filter, options);
    }
    async update(entity, options) {
        return this.advisoryClientMasterRepository.update(entity, options);
    }
    async delete(entity, options) {
        return this.advisoryClientMasterRepository.delete(entity, options);
    }
    async updateAll(data, where, options) {
        return this.advisoryClientMasterRepository.updateAll(data, where, options);
    }
    async updateById(id, data, options) {
        return this.advisoryClientMasterRepository.updateById(id, data, options);
    }
    async replaceById(id, data, options) {
        return this.advisoryClientMasterRepository.replaceById(id, data, options);
    }
    async deleteAll(where, options) {
        return this.advisoryClientMasterRepository.deleteAll(where, options);
    }
    async deleteById(id, options) {
        return this.advisoryClientMasterRepository.deleteById(id, options);
    }
    async count(where, options) {
        return this.advisoryClientMasterRepository.count(where, options);
    }
    async exists(id, options) {
        return this.advisoryClientMasterRepository.exists(id, options);
    }
};
AdvisoryClientMasterFacade = (0, tslib_1.__decorate)([
    (0, core_1.injectable)({ scope: core_1.BindingScope.APPLICATION }),
    (0, tslib_1.__param)(0, (0, repository_1.repository)(common_1.AdvisoryClientMasterRepository)),
    (0, tslib_1.__param)(1, (0, repository_1.repository)(common_1.AppUserRepository)),
    (0, tslib_1.__metadata)("design:paramtypes", [common_1.AdvisoryClientMasterRepository,
        common_1.AppUserRepository])
], AdvisoryClientMasterFacade);
exports.AdvisoryClientMasterFacade = AdvisoryClientMasterFacade;
//# sourceMappingURL=advisory-client-master.facade.js.map