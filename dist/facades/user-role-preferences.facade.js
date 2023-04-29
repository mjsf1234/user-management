"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRolePreferencesFacade = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const common_1 = require("common");
// All business loigc goes inside Facade layer
let UserRolePreferencesFacade = class UserRolePreferencesFacade {
    constructor(userRolePreferencesRepository) {
        this.userRolePreferencesRepository = userRolePreferencesRepository;
    }
    async create(entity, options) {
        return this.userRolePreferencesRepository.create(entity, options);
    }
    async createAll(entities, options) {
        return this.userRolePreferencesRepository.createAll(entities, options);
    }
    async save(entity, options) {
        return this.userRolePreferencesRepository.save(entity, options);
    }
    async find(filter, options) {
        return this.userRolePreferencesRepository.find(filter, options);
    }
    async findOne(filter, options) {
        return this.userRolePreferencesRepository.findOne(filter, options);
    }
    async findById(id, filter, options) {
        return this.userRolePreferencesRepository.findById(id, filter, options);
    }
    async update(entity, options) {
        return this.userRolePreferencesRepository.update(entity, options);
    }
    async delete(entity, options) {
        return this.userRolePreferencesRepository.delete(entity, options);
    }
    async updateAll(data, where, options) {
        return this.userRolePreferencesRepository.updateAll(data, where, options);
    }
    async updateById(id, data, options) {
        return this.userRolePreferencesRepository.updateById(id, data, options);
    }
    async replaceById(id, data, options) {
        return this.userRolePreferencesRepository.replaceById(id, data, options);
    }
    async deleteAll(where, options) {
        return this.userRolePreferencesRepository.deleteAll(where, options);
    }
    async deleteById(id, options) {
        return this.userRolePreferencesRepository.deleteById(id, options);
    }
    async count(where, options) {
        return this.userRolePreferencesRepository.count(where, options);
    }
    async exists(id, options) {
        return this.userRolePreferencesRepository.exists(id, options);
    }
};
UserRolePreferencesFacade = (0, tslib_1.__decorate)([
    (0, core_1.injectable)({ scope: core_1.BindingScope.APPLICATION }),
    (0, tslib_1.__param)(0, (0, repository_1.repository)(common_1.UserRolePreferencesRepository)),
    (0, tslib_1.__metadata)("design:paramtypes", [common_1.UserRolePreferencesRepository])
], UserRolePreferencesFacade);
exports.UserRolePreferencesFacade = UserRolePreferencesFacade;
//# sourceMappingURL=user-role-preferences.facade.js.map