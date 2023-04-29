"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressFacade = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const common_1 = require("common");
// All business loigc goes inside Facade layer
let AddressFacade = class AddressFacade {
    constructor(addressRepository) {
        this.addressRepository = addressRepository;
    }
    async create(entity, options) {
        return this.addressRepository.create(entity, options);
    }
    async createAll(entities, options) {
        return this.addressRepository.createAll(entities, options);
    }
    async save(entity, options) {
        return this.addressRepository.save(entity, options);
    }
    async find(filter, options) {
        return this.addressRepository.find(filter, options);
    }
    async findOne(filter, options) {
        return this.addressRepository.findOne(filter, options);
    }
    async findById(id, filter, options) {
        return this.addressRepository.findById(id, filter, options);
    }
    async update(entity, options) {
        return this.addressRepository.update(entity, options);
    }
    async delete(entity, options) {
        return this.addressRepository.delete(entity, options);
    }
    async updateAll(data, where, options) {
        return this.addressRepository.updateAll(data, where, options);
    }
    async updateById(id, data, options) {
        return this.addressRepository.updateById(id, data, options);
    }
    async replaceById(id, data, options) {
        return this.addressRepository.replaceById(id, data, options);
    }
    async deleteAll(where, options) {
        return this.addressRepository.deleteAll(where, options);
    }
    async deleteById(id, options) {
        return this.addressRepository.deleteById(id, options);
    }
    async count(where, options) {
        return this.addressRepository.count(where, options);
    }
    async exists(id, options) {
        return this.addressRepository.exists(id, options);
    }
};
AddressFacade = (0, tslib_1.__decorate)([
    (0, core_1.injectable)({ scope: core_1.BindingScope.APPLICATION }),
    (0, tslib_1.__param)(0, (0, repository_1.repository)(common_1.AddressRepository)),
    (0, tslib_1.__metadata)("design:paramtypes", [common_1.AddressRepository])
], AddressFacade);
exports.AddressFacade = AddressFacade;
//# sourceMappingURL=address.facade.js.map