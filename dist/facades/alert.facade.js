"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertFacade = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const common_1 = require("common");
// All business loigc goes inside Facade layer
let AlertFacade = class AlertFacade {
    constructor(alertRepository) {
        this.alertRepository = alertRepository;
    }
    async create(entity, options) {
        return this.alertRepository.create(entity, options);
    }
    async createAll(entities, options) {
        return this.alertRepository.createAll(entities, options);
    }
    async save(entity, options) {
        return this.alertRepository.save(entity, options);
    }
    async find(filter, options) {
        return this.alertRepository.find(filter, options);
    }
    async findOne(filter, options) {
        return this.alertRepository.findOne(filter, options);
    }
    async findById(id, filter, options) {
        return this.alertRepository.findById(id, filter, options);
    }
    async update(entity, options) {
        return this.alertRepository.update(entity, options);
    }
    async delete(entity, options) {
        return this.alertRepository.delete(entity, options);
    }
    async updateAll(data, where, options) {
        return this.alertRepository.updateAll(data, where, options);
    }
    async updateById(id, data, options) {
        return this.alertRepository.updateById(id, data, options);
    }
    async replaceById(id, data, options) {
        return this.alertRepository.replaceById(id, data, options);
    }
    async deleteAll(where, options) {
        return this.alertRepository.deleteAll(where, options);
    }
    async deleteById(id, options) {
        return this.alertRepository.deleteById(id, options);
    }
    async count(where, options) {
        return this.alertRepository.count(where, options);
    }
    async exists(id, options) {
        return this.alertRepository.exists(id, options);
    }
};
AlertFacade = (0, tslib_1.__decorate)([
    (0, core_1.injectable)({ scope: core_1.BindingScope.APPLICATION }),
    (0, tslib_1.__param)(0, (0, repository_1.repository)(common_1.AlertRepository)),
    (0, tslib_1.__metadata)("design:paramtypes", [common_1.AlertRepository])
], AlertFacade);
exports.AlertFacade = AlertFacade;
//# sourceMappingURL=alert.facade.js.map