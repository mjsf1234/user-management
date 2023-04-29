"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaptchaFacade = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const common_1 = require("common");
// All business loigc goes inside Facade layer
let CaptchaFacade = class CaptchaFacade {
    constructor(captchaRepository) {
        this.captchaRepository = captchaRepository;
    }
    async create(entity, options) {
        return this.captchaRepository.create(entity, options);
    }
    async createAll(entities, options) {
        return this.captchaRepository.createAll(entities, options);
    }
    async save(entity, options) {
        return this.captchaRepository.save(entity, options);
    }
    async find(filter, options) {
        return this.captchaRepository.find(filter, options);
    }
    async findOne(filter, options) {
        return this.captchaRepository.findOne(filter, options);
    }
    async findById(id, filter, options) {
        return this.captchaRepository.findById(id, filter, options);
    }
    async update(entity, options) {
        return this.captchaRepository.update(entity, options);
    }
    async delete(entity, options) {
        return this.captchaRepository.delete(entity, options);
    }
    async updateAll(data, where, options) {
        return this.captchaRepository.updateAll(data, where, options);
    }
    async updateById(id, data, options) {
        return this.captchaRepository.updateById(id, data, options);
    }
    async replaceById(id, data, options) {
        return this.captchaRepository.replaceById(id, data, options);
    }
    async deleteAll(where, options) {
        return this.captchaRepository.deleteAll(where, options);
    }
    async deleteById(id, options) {
        return this.captchaRepository.deleteById(id, options);
    }
    async count(where, options) {
        return this.captchaRepository.count(where, options);
    }
    async exists(id, options) {
        return this.captchaRepository.exists(id, options);
    }
};
CaptchaFacade = (0, tslib_1.__decorate)([
    (0, core_1.injectable)({ scope: core_1.BindingScope.APPLICATION }),
    (0, tslib_1.__param)(0, (0, repository_1.repository)(common_1.CaptchaRepository)),
    (0, tslib_1.__metadata)("design:paramtypes", [common_1.CaptchaRepository])
], CaptchaFacade);
exports.CaptchaFacade = CaptchaFacade;
//# sourceMappingURL=captcha.facade.js.map