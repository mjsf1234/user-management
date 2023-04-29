"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MpinHistoryFacade = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const common_1 = require("common");
// All business loigc goes inside Facade layer
let MpinHistoryFacade = class MpinHistoryFacade {
    constructor(mpinHistoryRepository) {
        this.mpinHistoryRepository = mpinHistoryRepository;
    }
    async create(entity, options) {
        return this.mpinHistoryRepository.create(entity, options);
    }
    async createAll(entities, options) {
        return this.mpinHistoryRepository.createAll(entities, options);
    }
    async save(entity, options) {
        return this.mpinHistoryRepository.save(entity, options);
    }
    async find(filter, options) {
        return this.mpinHistoryRepository.find(filter, options);
    }
    async findOne(filter, options) {
        return this.mpinHistoryRepository.findOne(filter, options);
    }
    async findById(id, filter, options) {
        return this.mpinHistoryRepository.findById(id, filter, options);
    }
    async update(entity, options) {
        return this.mpinHistoryRepository.update(entity, options);
    }
    async delete(entity, options) {
        return this.mpinHistoryRepository.delete(entity, options);
    }
    async updateAll(data, where, options) {
        return this.mpinHistoryRepository.updateAll(data, where, options);
    }
    async updateById(id, data, options) {
        return this.mpinHistoryRepository.updateById(id, data, options);
    }
    async replaceById(id, data, options) {
        return this.mpinHistoryRepository.replaceById(id, data, options);
    }
    async deleteAll(where, options) {
        return this.mpinHistoryRepository.deleteAll(where, options);
    }
    async deleteById(id, options) {
        return this.mpinHistoryRepository.deleteById(id, options);
    }
    async count(where, options) {
        return this.mpinHistoryRepository.count(where, options);
    }
    async exists(id, options) {
        return this.mpinHistoryRepository.exists(id, options);
    }
};
MpinHistoryFacade = (0, tslib_1.__decorate)([
    (0, core_1.injectable)({ scope: core_1.BindingScope.APPLICATION }),
    (0, tslib_1.__param)(0, (0, repository_1.repository)(common_1.MpinHistoryRepository)),
    (0, tslib_1.__metadata)("design:paramtypes", [common_1.MpinHistoryRepository])
], MpinHistoryFacade);
exports.MpinHistoryFacade = MpinHistoryFacade;
//# sourceMappingURL=mpin-history.facade.js.map