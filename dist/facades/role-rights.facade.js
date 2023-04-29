"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleRightsFacade = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const common_1 = require("common");
const uam_integration_facade_1 = require("./uam-integration.facade");
// All business loigc goes inside Facade layer
let RoleRightsFacade = class RoleRightsFacade {
    constructor(roleRightsRepository, uamIntegrationFacade) {
        this.roleRightsRepository = roleRightsRepository;
        this.uamIntegrationFacade = uamIntegrationFacade;
    }
    async create(entity, options) {
        return this.roleRightsRepository.create(entity, options);
    }
    async createAll(entities, options) {
        return this.roleRightsRepository.createAll(entities, options);
    }
    async save(entity, options) {
        return this.roleRightsRepository.save(entity, options);
    }
    async find(filter, options) {
        return this.roleRightsRepository.find(filter, options);
    }
    async findOne(filter, options) {
        return this.roleRightsRepository.findOne(filter, options);
    }
    async findById(id, filter, options) {
        return this.roleRightsRepository.findById(id, filter, options);
    }
    async update(entity, options) {
        return this.roleRightsRepository.update(entity, options);
    }
    async delete(entity, options) {
        return this.roleRightsRepository.delete(entity, options);
    }
    async updateAll(data, where, options) {
        return this.roleRightsRepository.updateAll(data, where, options);
    }
    async updateById(id, data, options) {
        return this.roleRightsRepository.updateById(id, data, options);
    }
    async replaceById(id, data, options) {
        return this.roleRightsRepository.replaceById(id, data, options);
    }
    async deleteAll(where, options) {
        return this.roleRightsRepository.deleteAll(where, options);
    }
    async deleteById(id, options) {
        return this.roleRightsRepository.deleteById(id, options);
    }
    async count(where, options) {
        return this.roleRightsRepository.count(where, options);
    }
    async exists(id, options) {
        return this.roleRightsRepository.exists(id, options);
    }
    async fetchRolesRights(filter, options) {
        const results = await this.roleRightsRepository.find(filter, options);
        const resultsWithDepartment = await this.uamIntegrationFacade.addDepartmentToResults(results);
        return resultsWithDepartment;
    }
};
RoleRightsFacade = (0, tslib_1.__decorate)([
    (0, core_1.injectable)({ scope: core_1.BindingScope.APPLICATION }),
    (0, tslib_1.__param)(0, (0, repository_1.repository)(common_1.RoleRightsRepository)),
    (0, tslib_1.__param)(1, (0, core_1.service)(uam_integration_facade_1.UamIntegrationFacade)),
    (0, tslib_1.__metadata)("design:paramtypes", [common_1.RoleRightsRepository,
        uam_integration_facade_1.UamIntegrationFacade])
], RoleRightsFacade);
exports.RoleRightsFacade = RoleRightsFacade;
//# sourceMappingURL=role-rights.facade.js.map