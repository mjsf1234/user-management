"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MandateFacade = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const common_1 = require("common");
// All business loigc goes inside Facade layer
let MandateFacade = class MandateFacade {
    constructor(mandateRepository) {
        this.mandateRepository = mandateRepository;
    }
    async create(entity, options) {
        return this.mandateRepository.create(entity, options);
    }
    async createAll(entities, options) {
        return this.mandateRepository.createAll(entities, options);
    }
    async save(entity, options) {
        return this.mandateRepository.save(entity, options);
    }
    async find(filter, options) {
        return this.mandateRepository.find(filter, options);
    }
    async findOne(filter, options) {
        return this.mandateRepository.findOne(filter, options);
    }
    async findById(id, filter, options) {
        return this.mandateRepository.findById(id, filter, options);
    }
    async update(entity, options) {
        return this.mandateRepository.update(entity, options);
    }
    async delete(entity, options) {
        return this.mandateRepository.delete(entity, options);
    }
    async updateAll(data, where, options) {
        return this.mandateRepository.updateAll(data, where, options);
    }
    async updateById(id, data, options) {
        return this.mandateRepository.updateById(id, data, options);
    }
    async replaceById(id, data, options) {
        return this.mandateRepository.replaceById(id, data, options);
    }
    async deleteAll(where, options) {
        return this.mandateRepository.deleteAll(where, options);
    }
    async deleteById(id, options) {
        return this.mandateRepository.deleteById(id, options);
    }
    async count(where, options) {
        return this.mandateRepository.count(where, options);
    }
    async exists(id, options) {
        return this.mandateRepository.exists(id, options);
    }
};
MandateFacade = (0, tslib_1.__decorate)([
    (0, core_1.injectable)({ scope: core_1.BindingScope.APPLICATION }),
    (0, tslib_1.__param)(0, (0, repository_1.repository)(common_1.MandateRepository)),
    (0, tslib_1.__metadata)("design:paramtypes", [common_1.MandateRepository])
], MandateFacade);
exports.MandateFacade = MandateFacade;
//# sourceMappingURL=mandate.facade.js.map