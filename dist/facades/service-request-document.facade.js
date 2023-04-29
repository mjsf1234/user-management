"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRequestDocumentFacade = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const common_1 = require("common");
// All business loigc goes inside Facade layer
let ServiceRequestDocumentFacade = class ServiceRequestDocumentFacade {
    constructor(serviceRequestDocumentRepository) {
        this.serviceRequestDocumentRepository = serviceRequestDocumentRepository;
    }
    async create(entity, options) {
        return this.serviceRequestDocumentRepository.create(entity, options);
    }
    async createAll(entities, options) {
        return this.serviceRequestDocumentRepository.createAll(entities, options);
    }
    async save(entity, options) {
        return this.serviceRequestDocumentRepository.save(entity, options);
    }
    async find(filter, options) {
        return this.serviceRequestDocumentRepository.find(filter, options);
    }
    async findOne(filter, options) {
        return this.serviceRequestDocumentRepository.findOne(filter, options);
    }
    async findById(id, filter, options) {
        return this.serviceRequestDocumentRepository.findById(id, filter, options);
    }
    async update(entity, options) {
        return this.serviceRequestDocumentRepository.update(entity, options);
    }
    async delete(entity, options) {
        return this.serviceRequestDocumentRepository.delete(entity, options);
    }
    async updateAll(data, where, options) {
        return this.serviceRequestDocumentRepository.updateAll(data, where, options);
    }
    async updateById(id, data, options) {
        return this.serviceRequestDocumentRepository.updateById(id, data, options);
    }
    async replaceById(id, data, options) {
        return this.serviceRequestDocumentRepository.replaceById(id, data, options);
    }
    async deleteAll(where, options) {
        return this.serviceRequestDocumentRepository.deleteAll(where, options);
    }
    async deleteById(id, options) {
        return this.serviceRequestDocumentRepository.deleteById(id, options);
    }
    async count(where, options) {
        return this.serviceRequestDocumentRepository.count(where, options);
    }
    async exists(id, options) {
        return this.serviceRequestDocumentRepository.exists(id, options);
    }
};
ServiceRequestDocumentFacade = (0, tslib_1.__decorate)([
    (0, core_1.injectable)({ scope: core_1.BindingScope.APPLICATION }),
    (0, tslib_1.__param)(0, (0, repository_1.repository)(common_1.ServiceRequestDocumentRepository)),
    (0, tslib_1.__metadata)("design:paramtypes", [common_1.ServiceRequestDocumentRepository])
], ServiceRequestDocumentFacade);
exports.ServiceRequestDocumentFacade = ServiceRequestDocumentFacade;
//# sourceMappingURL=service-request-document.facade.js.map