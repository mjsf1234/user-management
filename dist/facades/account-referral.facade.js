"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountReferralFacade = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const common_1 = require("common");
// All business loigc goes inside Facade layer
let AccountReferralFacade = class AccountReferralFacade {
    constructor(accountReferralRepository) {
        this.accountReferralRepository = accountReferralRepository;
    }
    async create(entity, options) {
        return this.accountReferralRepository.create(entity, options);
    }
    async createAll(entities, options) {
        return this.accountReferralRepository.createAll(entities, options);
    }
    async save(entity, options) {
        return this.accountReferralRepository.save(entity, options);
    }
    async find(filter, options) {
        return this.accountReferralRepository.find(filter, options);
    }
    async findOne(filter, options) {
        return this.accountReferralRepository.findOne(filter, options);
    }
    async findById(id, filter, options) {
        return this.accountReferralRepository.findById(id, filter, options);
    }
    async update(entity, options) {
        return this.accountReferralRepository.update(entity, options);
    }
    async delete(entity, options) {
        return this.accountReferralRepository.delete(entity, options);
    }
    async updateAll(data, where, options) {
        return this.accountReferralRepository.updateAll(data, where, options);
    }
    async updateById(id, data, options) {
        return this.accountReferralRepository.updateById(id, data, options);
    }
    async replaceById(id, data, options) {
        return this.accountReferralRepository.replaceById(id, data, options);
    }
    async deleteAll(where, options) {
        return this.accountReferralRepository.deleteAll(where, options);
    }
    async deleteById(id, options) {
        return this.accountReferralRepository.deleteById(id, options);
    }
    async count(where, options) {
        return this.accountReferralRepository.count(where, options);
    }
    async exists(id, options) {
        return this.accountReferralRepository.exists(id, options);
    }
    async postReferralCode(accountId, referralcode) {
        try {
            referralcode.accountId = accountId;
            let referralDoc = await this.findOne({ where: { accountId, isActive: true } });
            if (referralDoc) {
                return Promise.reject(new common_1.RestError(400, 'Referral code already exists for this account!', { systemcode: 1373 }));
            }
            return this.create(referralcode);
        }
        catch (error) {
            return new common_1.RestError(400, error);
        }
    }
    async getAccountReferrals(accountId, referralcode) {
        try {
            const accountReferrals = this.accountReferralRepository.find({
                where: { referralCode: referralcode, accountId: accountId, isActive: true }
            });
            if (!accountReferrals) {
                return Promise.reject(new common_1.RestError(400, 'AccountReferrals not found', { systemcode: 1371 }));
            }
            return accountReferrals;
        }
        catch (error) {
            return Promise.reject(new common_1.RestError(400, error));
        }
    }
};
AccountReferralFacade = (0, tslib_1.__decorate)([
    (0, core_1.injectable)({ scope: core_1.BindingScope.APPLICATION }),
    (0, tslib_1.__param)(0, (0, repository_1.repository)(common_1.AccountReferralRepository)),
    (0, tslib_1.__metadata)("design:paramtypes", [common_1.AccountReferralRepository])
], AccountReferralFacade);
exports.AccountReferralFacade = AccountReferralFacade;
//# sourceMappingURL=account-referral.facade.js.map