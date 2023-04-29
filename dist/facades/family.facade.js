"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FamilyFacade = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const common_1 = require("common");
// All business loigc goes inside Facade layer
let FamilyFacade = class FamilyFacade {
    constructor(familyRepository) {
        this.familyRepository = familyRepository;
    }
    async create(entity, options) {
        return this.familyRepository.create(entity, options);
    }
    async createAll(entities, options) {
        return this.familyRepository.createAll(entities, options);
    }
    async save(entity, options) {
        return this.familyRepository.save(entity, options);
    }
    async find(filter, options) {
        return this.familyRepository.find(filter, options);
    }
    async findOne(filter, options) {
        return this.familyRepository.findOne(filter, options);
    }
    async findById(id, filter, options) {
        return this.familyRepository.findById(id, filter, options);
    }
    async update(entity, options) {
        return this.familyRepository.update(entity, options);
    }
    async delete(entity, options) {
        return this.familyRepository.delete(entity, options);
    }
    async updateAll(data, where, options) {
        return this.familyRepository.updateAll(data, where, options);
    }
    async updateById(id, data, options) {
        return this.familyRepository.updateById(id, data, options);
    }
    async replaceById(id, data, options) {
        return this.familyRepository.replaceById(id, data, options);
    }
    async deleteAll(where, options) {
        return this.familyRepository.deleteAll(where, options);
    }
    async deleteById(id, options) {
        return this.familyRepository.deleteById(id, options);
    }
    async count(where, options) {
        return this.familyRepository.count(where, options);
    }
    async exists(id, options) {
        return this.familyRepository.exists(id, options);
    }
};
FamilyFacade = (0, tslib_1.__decorate)([
    (0, core_1.injectable)({ scope: core_1.BindingScope.APPLICATION }),
    (0, tslib_1.__param)(0, (0, repository_1.repository)(common_1.FamilyRepository)),
    (0, tslib_1.__metadata)("design:paramtypes", [common_1.FamilyRepository])
], FamilyFacade);
exports.FamilyFacade = FamilyFacade;
//# sourceMappingURL=family.facade.js.map