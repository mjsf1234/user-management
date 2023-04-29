"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppUserRoleMappingFacade = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const common_1 = require("common");
// All business loigc goes inside Facade layer
let AppUserRoleMappingFacade = class AppUserRoleMappingFacade {
    constructor(appUserRoleMappingRepository) {
        this.appUserRoleMappingRepository = appUserRoleMappingRepository;
    }
    async create(entity, options) {
        return this.appUserRoleMappingRepository.create(entity, options);
    }
    async createAll(entities, options) {
        return this.appUserRoleMappingRepository.createAll(entities, options);
    }
    async save(entity, options) {
        return this.appUserRoleMappingRepository.save(entity, options);
    }
    async find(filter, options) {
        return this.appUserRoleMappingRepository.find(filter, options);
    }
    async findOne(filter, options) {
        return this.appUserRoleMappingRepository.findOne(filter, options);
    }
    async findById(id, filter, options) {
        return this.appUserRoleMappingRepository.findById(id, filter, options);
    }
    async update(entity, options) {
        return this.appUserRoleMappingRepository.update(entity, options);
    }
    async delete(entity, options) {
        return this.appUserRoleMappingRepository.delete(entity, options);
    }
    async updateAll(data, where, options) {
        return this.appUserRoleMappingRepository.updateAll(data, where, options);
    }
    async updateById(id, data, options) {
        return this.appUserRoleMappingRepository.updateById(id, data, options);
    }
    async replaceById(id, data, options) {
        return this.appUserRoleMappingRepository.replaceById(id, data, options);
    }
    async deleteAll(where, options) {
        return this.appUserRoleMappingRepository.deleteAll(where, options);
    }
    async deleteById(id, options) {
        return this.appUserRoleMappingRepository.deleteById(id, options);
    }
    async count(where, options) {
        return this.appUserRoleMappingRepository.count(where, options);
    }
    async exists(id, options) {
        return this.appUserRoleMappingRepository.exists(id, options);
    }
};
AppUserRoleMappingFacade = (0, tslib_1.__decorate)([
    (0, core_1.injectable)({ scope: core_1.BindingScope.APPLICATION }),
    (0, tslib_1.__param)(0, (0, repository_1.repository)(common_1.AppUserRoleMappingRepository)),
    (0, tslib_1.__metadata)("design:paramtypes", [common_1.AppUserRoleMappingRepository])
], AppUserRoleMappingFacade);
exports.AppUserRoleMappingFacade = AppUserRoleMappingFacade;
//# sourceMappingURL=app-user-role-mapping.facade.js.map