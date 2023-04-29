"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoleFacade = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const common_1 = require("common");
// All business loigc goes inside Facade layer
let AppRoleFacade = class AppRoleFacade {
    constructor(appRoleRepository) {
        this.appRoleRepository = appRoleRepository;
    }
    async create(entity, options) {
        return this.appRoleRepository.create(entity, options);
    }
    async createAll(entities, options) {
        return this.appRoleRepository.createAll(entities, options);
    }
    async save(entity, options) {
        return this.appRoleRepository.save(entity, options);
    }
    async find(filter, options) {
        return this.appRoleRepository.find(filter, options);
    }
    async findOne(filter, options) {
        return this.appRoleRepository.findOne(filter, options);
    }
    async findById(id, filter, options) {
        return this.appRoleRepository.findById(id, filter, options);
    }
    async update(entity, options) {
        return this.appRoleRepository.update(entity, options);
    }
    async delete(entity, options) {
        return this.appRoleRepository.delete(entity, options);
    }
    async updateAll(data, where, options) {
        return this.appRoleRepository.updateAll(data, where, options);
    }
    async updateById(id, data, options) {
        return this.appRoleRepository.updateById(id, data, options);
    }
    async replaceById(id, data, options) {
        return this.appRoleRepository.replaceById(id, data, options);
    }
    async deleteAll(where, options) {
        return this.appRoleRepository.deleteAll(where, options);
    }
    async deleteById(id, options) {
        return this.appRoleRepository.deleteById(id, options);
    }
    async count(where, options) {
        return this.appRoleRepository.count(where, options);
    }
    async exists(id, options) {
        return this.appRoleRepository.exists(id, options);
    }
};
AppRoleFacade = (0, tslib_1.__decorate)([
    (0, core_1.injectable)({ scope: core_1.BindingScope.APPLICATION }),
    (0, tslib_1.__param)(0, (0, repository_1.repository)(common_1.AppRoleRepository)),
    (0, tslib_1.__metadata)("design:paramtypes", [common_1.AppRoleRepository])
], AppRoleFacade);
exports.AppRoleFacade = AppRoleFacade;
//# sourceMappingURL=app-role.facade.js.map