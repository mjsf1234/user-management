"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OverseesAddressFacade = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const common_1 = require("common");
// All business loigc goes inside Facade layer
let OverseesAddressFacade = class OverseesAddressFacade {
    constructor(overseesAddressRepository) {
        this.overseesAddressRepository = overseesAddressRepository;
    }
    async create(entity, options) {
        return this.overseesAddressRepository.create(entity, options);
    }
    async createAll(entities, options) {
        return this.overseesAddressRepository.createAll(entities, options);
    }
    async save(entity, options) {
        return this.overseesAddressRepository.save(entity, options);
    }
    async find(filter, options) {
        return this.overseesAddressRepository.find(filter, options);
    }
    async findOne(filter, options) {
        return this.overseesAddressRepository.findOne(filter, options);
    }
    async findById(id, filter, options) {
        return this.overseesAddressRepository.findById(id, filter, options);
    }
    async update(entity, options) {
        return this.overseesAddressRepository.update(entity, options);
    }
    async delete(entity, options) {
        return this.overseesAddressRepository.delete(entity, options);
    }
    async updateAll(data, where, options) {
        return this.overseesAddressRepository.updateAll(data, where, options);
    }
    async updateById(id, data, options) {
        return this.overseesAddressRepository.updateById(id, data, options);
    }
    async replaceById(id, data, options) {
        return this.overseesAddressRepository.replaceById(id, data, options);
    }
    async deleteAll(where, options) {
        return this.overseesAddressRepository.deleteAll(where, options);
    }
    async deleteById(id, options) {
        return this.overseesAddressRepository.deleteById(id, options);
    }
    async count(where, options) {
        return this.overseesAddressRepository.count(where, options);
    }
    async exists(id, options) {
        return this.overseesAddressRepository.exists(id, options);
    }
};
OverseesAddressFacade = (0, tslib_1.__decorate)([
    (0, core_1.injectable)({ scope: core_1.BindingScope.APPLICATION }),
    (0, tslib_1.__param)(0, (0, repository_1.repository)(common_1.OverseesAddressRepository)),
    (0, tslib_1.__metadata)("design:paramtypes", [common_1.OverseesAddressRepository])
], OverseesAddressFacade);
exports.OverseesAddressFacade = OverseesAddressFacade;
//# sourceMappingURL=oversees-address.facade.js.map