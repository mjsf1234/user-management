"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentUploadFacade = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const common_1 = require("common");
// All business loigc goes inside Facade layer
let DocumentUploadFacade = class DocumentUploadFacade {
    constructor(documentUploadRepository) {
        this.documentUploadRepository = documentUploadRepository;
    }
    async create(entity, options) {
        return this.documentUploadRepository.create(entity, options);
    }
    async createAll(entities, options) {
        return this.documentUploadRepository.createAll(entities, options);
    }
    async save(entity, options) {
        return this.documentUploadRepository.save(entity, options);
    }
    async find(filter, options) {
        return this.documentUploadRepository.find(filter, options);
    }
    async findOne(filter, options) {
        return this.documentUploadRepository.findOne(filter, options);
    }
    async findById(id, filter, options) {
        return this.documentUploadRepository.findById(id, filter, options);
    }
    async update(entity, options) {
        return this.documentUploadRepository.update(entity, options);
    }
    async delete(entity, options) {
        return this.documentUploadRepository.delete(entity, options);
    }
    async updateAll(data, where, options) {
        return this.documentUploadRepository.updateAll(data, where, options);
    }
    async updateById(id, data, options) {
        return this.documentUploadRepository.updateById(id, data, options);
    }
    async replaceById(id, data, options) {
        return this.documentUploadRepository.replaceById(id, data, options);
    }
    async deleteAll(where, options) {
        return this.documentUploadRepository.deleteAll(where, options);
    }
    async deleteById(id, options) {
        return this.documentUploadRepository.deleteById(id, options);
    }
    async count(where, options) {
        return this.documentUploadRepository.count(where, options);
    }
    async exists(id, options) {
        return this.documentUploadRepository.exists(id, options);
    }
};
DocumentUploadFacade = (0, tslib_1.__decorate)([
    (0, core_1.injectable)({ scope: core_1.BindingScope.APPLICATION }),
    (0, tslib_1.__param)(0, (0, repository_1.repository)(common_1.DocumentUploadRepository)),
    (0, tslib_1.__metadata)("design:paramtypes", [common_1.DocumentUploadRepository])
], DocumentUploadFacade);
exports.DocumentUploadFacade = DocumentUploadFacade;
//# sourceMappingURL=document-upload.facade.js.map