"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstrumentsExportFileFacade = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const common_1 = require("common");
// All business loigc goes inside Facade layer
let InstrumentsExportFileFacade = class InstrumentsExportFileFacade {
    constructor(InstrumentsExportFileRepository) {
        this.InstrumentsExportFileRepository = InstrumentsExportFileRepository;
    }
    async create(entity, options) {
        return this.InstrumentsExportFileRepository.create(entity, options);
    }
    async createAll(entities, options) {
        return this.InstrumentsExportFileRepository.createAll(entities, options);
    }
    async save(entity, options) {
        return this.InstrumentsExportFileRepository.save(entity, options);
    }
    async find(filter, options) {
        return this.InstrumentsExportFileRepository.find(filter, options);
    }
    async findOne(filter, options) {
        return this.InstrumentsExportFileRepository.findOne(filter, options);
    }
    async findById(id, filter, options) {
        return this.InstrumentsExportFileRepository.findById(id, filter, options);
    }
    async update(entity, options) {
        return this.InstrumentsExportFileRepository.update(entity, options);
    }
    async delete(entity, options) {
        return this.InstrumentsExportFileRepository.delete(entity, options);
    }
    async updateAll(data, where, options) {
        return this.InstrumentsExportFileRepository.updateAll(data, where, options);
    }
    async updateById(id, data, options) {
        return this.InstrumentsExportFileRepository.updateById(id, data, options);
    }
    async replaceById(id, data, options) {
        return this.InstrumentsExportFileRepository.replaceById(id, data, options);
    }
    async deleteAll(where, options) {
        return this.InstrumentsExportFileRepository.deleteAll(where, options);
    }
    async deleteById(id, options) {
        return this.InstrumentsExportFileRepository.deleteById(id, options);
    }
    async count(where, options) {
        return this.InstrumentsExportFileRepository.count(where, options);
    }
    async exists(id, options) {
        return this.InstrumentsExportFileRepository.exists(id, options);
    }
};
InstrumentsExportFileFacade = (0, tslib_1.__decorate)([
    (0, core_1.injectable)({ scope: core_1.BindingScope.APPLICATION }),
    (0, tslib_1.__param)(0, (0, repository_1.repository)(common_1.InstrumentsExportFileRepository)),
    (0, tslib_1.__metadata)("design:paramtypes", [common_1.InstrumentsExportFileRepository])
], InstrumentsExportFileFacade);
exports.InstrumentsExportFileFacade = InstrumentsExportFileFacade;
//# sourceMappingURL=instruments-export-file.facade.js.map