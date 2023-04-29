"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestToEngineFacade = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const common_1 = require("common");
// All business loigc goes inside Facade layer
let RequestToEngineFacade = class RequestToEngineFacade {
    constructor(RequestToEngineRepository) {
        this.RequestToEngineRepository = RequestToEngineRepository;
    }
    async create(entity, options) {
        return this.RequestToEngineRepository.create(entity, options);
    }
    async createAll(entities, options) {
        return this.RequestToEngineRepository.createAll(entities, options);
    }
    async save(entity, options) {
        return this.RequestToEngineRepository.save(entity, options);
    }
    async find(filter, options) {
        return this.RequestToEngineRepository.find(filter, options);
    }
    async findOne(filter, options) {
        return this.RequestToEngineRepository.findOne(filter, options);
    }
    async findById(id, filter, options) {
        return this.RequestToEngineRepository.findById(id, filter, options);
    }
    async update(entity, options) {
        return this.RequestToEngineRepository.update(entity, options);
    }
    async delete(entity, options) {
        return this.RequestToEngineRepository.delete(entity, options);
    }
    async updateAll(data, where, options) {
        return this.RequestToEngineRepository.updateAll(data, where, options);
    }
    async updateById(id, data, options) {
        return this.RequestToEngineRepository.updateById(id, data, options);
    }
    async replaceById(id, data, options) {
        return this.RequestToEngineRepository.replaceById(id, data, options);
    }
    async deleteAll(where, options) {
        return this.RequestToEngineRepository.deleteAll(where, options);
    }
    async deleteById(id, options) {
        return this.RequestToEngineRepository.deleteById(id, options);
    }
    async count(where, options) {
        return this.RequestToEngineRepository.count(where, options);
    }
    async exists(id, options) {
        return this.RequestToEngineRepository.exists(id, options);
    }
};
RequestToEngineFacade = (0, tslib_1.__decorate)([
    (0, core_1.injectable)({ scope: core_1.BindingScope.APPLICATION }),
    (0, tslib_1.__param)(0, (0, repository_1.repository)(common_1.RequestToEngineRepository)),
    (0, tslib_1.__metadata)("design:paramtypes", [common_1.RequestToEngineRepository])
], RequestToEngineFacade);
exports.RequestToEngineFacade = RequestToEngineFacade;
//# sourceMappingURL=request-to-engine.facade.js.map