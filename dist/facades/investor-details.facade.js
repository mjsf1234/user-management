"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvestorDetailsFacade = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const common_1 = require("common");
// All business loigc goes inside Facade layer
let InvestorDetailsFacade = class InvestorDetailsFacade {
    constructor(investorDetailsRepository) {
        this.investorDetailsRepository = investorDetailsRepository;
    }
    async create(entity, options) {
        return this.investorDetailsRepository.create(entity, options);
    }
    async createAll(entities, options) {
        return this.investorDetailsRepository.createAll(entities, options);
    }
    async save(entity, options) {
        return this.investorDetailsRepository.save(entity, options);
    }
    async find(filter, options) {
        return this.investorDetailsRepository.find(filter, options);
    }
    async findOne(filter, options) {
        return this.investorDetailsRepository.findOne(filter, options);
    }
    async findById(id, filter, options) {
        return this.investorDetailsRepository.findById(id, filter, options);
    }
    async update(entity, options) {
        return this.investorDetailsRepository.update(entity, options);
    }
    async delete(entity, options) {
        return this.investorDetailsRepository.delete(entity, options);
    }
    async updateAll(data, where, options) {
        return this.investorDetailsRepository.updateAll(data, where, options);
    }
    async updateById(id, data, options) {
        return this.investorDetailsRepository.updateById(id, data, options);
    }
    async replaceById(id, data, options) {
        return this.investorDetailsRepository.replaceById(id, data, options);
    }
    async deleteAll(where, options) {
        return this.investorDetailsRepository.deleteAll(where, options);
    }
    async deleteById(id, options) {
        return this.investorDetailsRepository.deleteById(id, options);
    }
    async count(where, options) {
        return this.investorDetailsRepository.count(where, options);
    }
    async exists(id, options) {
        return this.investorDetailsRepository.exists(id, options);
    }
};
InvestorDetailsFacade = (0, tslib_1.__decorate)([
    (0, core_1.injectable)({ scope: core_1.BindingScope.APPLICATION }),
    (0, tslib_1.__param)(0, (0, repository_1.repository)(common_1.InvestorDetailsRepository)),
    (0, tslib_1.__metadata)("design:paramtypes", [common_1.InvestorDetailsRepository])
], InvestorDetailsFacade);
exports.InvestorDetailsFacade = InvestorDetailsFacade;
//# sourceMappingURL=investor-details.facade.js.map