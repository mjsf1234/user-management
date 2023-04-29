"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupFacade = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const common_1 = require("common");
// All business loigc goes inside Facade layer
let GroupFacade = class GroupFacade {
    constructor(groupRepository) {
        this.groupRepository = groupRepository;
    }
    async create(entity, options) {
        return this.groupRepository.create(entity, options);
    }
    async createAll(entities, options) {
        return this.groupRepository.createAll(entities, options);
    }
    async save(entity, options) {
        return this.groupRepository.save(entity, options);
    }
    async find(filter, options) {
        return this.groupRepository.find(filter, options);
    }
    async findOne(filter, options) {
        return this.groupRepository.findOne(filter, options);
    }
    async findById(id, filter, options) {
        return this.groupRepository.findById(id, filter, options);
    }
    async update(entity, options) {
        return this.groupRepository.update(entity, options);
    }
    async delete(entity, options) {
        return this.groupRepository.delete(entity, options);
    }
    async updateAll(data, where, options) {
        return this.groupRepository.updateAll(data, where, options);
    }
    async updateById(id, data, options) {
        return this.groupRepository.updateById(id, data, options);
    }
    async replaceById(id, data, options) {
        return this.groupRepository.replaceById(id, data, options);
    }
    async deleteAll(where, options) {
        return this.groupRepository.deleteAll(where, options);
    }
    async deleteById(id, options) {
        return this.groupRepository.deleteById(id, options);
    }
    async count(where, options) {
        return this.groupRepository.count(where, options);
    }
    async exists(id, options) {
        return this.groupRepository.exists(id, options);
    }
};
GroupFacade = (0, tslib_1.__decorate)([
    (0, core_1.injectable)({ scope: core_1.BindingScope.APPLICATION }),
    (0, tslib_1.__param)(0, (0, repository_1.repository)(common_1.GroupRepository)),
    (0, tslib_1.__metadata)("design:paramtypes", [common_1.GroupRepository])
], GroupFacade);
exports.GroupFacade = GroupFacade;
//# sourceMappingURL=group.facade.js.map