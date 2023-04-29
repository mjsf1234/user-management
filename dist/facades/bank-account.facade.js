"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankAccountFacade = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const common_1 = require("common");
const repositories_1 = require("../repositories");
// All business loigc goes inside Facade layer
let BankAccountFacade = class BankAccountFacade {
    constructor(bankAccountRepository, accountRepository, appUserRepository, investorTypeRepository, investorDetailsRepository, coreBankingRepository) {
        this.bankAccountRepository = bankAccountRepository;
        this.accountRepository = accountRepository;
        this.appUserRepository = appUserRepository;
        this.investorTypeRepository = investorTypeRepository;
        this.investorDetailsRepository = investorDetailsRepository;
        this.coreBankingRepository = coreBankingRepository;
    }
    async create(entity, options) {
        return this.bankAccountRepository.create(entity, options);
    }
    async createAll(entities, options) {
        return this.bankAccountRepository.createAll(entities, options);
    }
    async save(entity, options) {
        return this.bankAccountRepository.save(entity, options);
    }
    async find(filter, options) {
        return this.bankAccountRepository.find(filter, options);
    }
    async findOne(filter, options) {
        return this.bankAccountRepository.findOne(filter, options);
    }
    async findById(id, filter, options) {
        return this.bankAccountRepository.findById(id, filter, options);
    }
    async update(entity, options) {
        return this.bankAccountRepository.update(entity, options);
    }
    async delete(entity, options) {
        return this.bankAccountRepository.delete(entity, options);
    }
    async updateAll(data, where, options) {
        return this.bankAccountRepository.updateAll(data, where, options);
    }
    async updateById(id, data, options) {
        return this.bankAccountRepository.updateById(id, data, options);
    }
    async replaceById(id, data, options) {
        return this.bankAccountRepository.replaceById(id, data, options);
    }
    async deleteAll(where, options) {
        return this.bankAccountRepository.deleteAll(where, options);
    }
    async deleteById(id, options) {
        return this.bankAccountRepository.deleteById(id, options);
    }
    async count(where, options) {
        return this.bankAccountRepository.count(where, options);
    }
    async exists(id, options) {
        return this.bankAccountRepository.exists(id, options);
    }
    async validatePanAadharLink(customerId) {
        try {
            const demographicDetails = await this.coreBankingRepository.doDemographicDetailsInquiry(customerId);
            let panStatus = {};
            // finds PanStatus
            demographicDetails.dictionaryArray.forEach((object) => {
                if (object['nameValuePairDTOArray']) {
                    panStatus = object['nameValuePairDTOArray'].find((nameValuePair) => {
                        if (nameValuePair.name && nameValuePair.name === 'panStatus') {
                            return nameValuePair;
                        }
                    });
                }
            });
            if (panStatus.value.toLowerCase() === 'operative') {
                return common_1.Option.GLOBALOPTIONS.PANAADHARLINKSTATUS.operative.value;
            }
            else if (panStatus.value.toLowerCase() === 'null') {
                return common_1.Option.GLOBALOPTIONS.PANAADHARLINKSTATUS.pending.value;
            }
            else {
                return common_1.Option.GLOBALOPTIONS.PANAADHARLINKSTATUS.nonOperative.value;
            }
        }
        catch (err) {
            throw err;
        }
    }
    async updateBankAccount(id, accountId, data, options) {
        return new Promise((resolve, reject) => {
            if (!data.hasOwnProperty('isDefault') || data.isDefault == false) {
                return Promise.reject(new common_1.RestError(465, 'isDefault property needs to be set to true', { systemcode: 1241 }));
            }
            let panAadharLinkStatusG;
            let bankAccountData;
            this.bankAccountRepository
                .findOne({
                where: {
                    id: id,
                    accountId: accountId,
                    isActive: true
                },
                include: [
                    {
                        relation: 'account',
                        scope: {
                            include: [{
                                    relation: 'primaryHolder',
                                    scope: {
                                        include: ['investorDetails']
                                    }
                                }]
                        }
                    },
                    {
                        relation: 'bankAccountType'
                    }
                ]
            }, options)
                .then((bankAccount) => {
                if (!bankAccount) {
                    return Promise.reject(new common_1.RestError(404, 'Bank Account Not found', { systemcode: 1242 }));
                }
                bankAccountData = bankAccount;
                // validate whether pan and aadhar are linked
                if (bankAccountData.account.primaryHolderId) {
                    if (!bankAccountData.account.primaryHolder.bosCode) {
                        return Promise.reject(new common_1.RestError(400, 'We regret to inform you that we are unable to proceed with your request, as your PAN and Aadhaar details couldn’t be retrieved.', { systemcode: 1397 }));
                    }
                    // validate pan and aadhar linking
                    return this.validatePanAadharLink(bankAccountData.account.primaryHolder.bosCode);
                }
                else {
                    return Promise.reject(new common_1.RestError(400, 'Primary User not found', { systemcode: 1397 }));
                }
            })
                .then((panAadharLinkStatus) => {
                panAadharLinkStatusG = panAadharLinkStatus;
                return this.appUserRepository.updateAll({
                    panAadharLinkStatus: panAadharLinkStatus
                }, {
                    id: bankAccountData.account.primaryHolderId
                });
            })
                .then(() => {
                if (panAadharLinkStatusG === common_1.Option.GLOBALOPTIONS.PANAADHARLINKSTATUS.nonOperative.value) {
                    return Promise.reject(new common_1.RestError(400, 'We regret to inform you that we are unable to proceed with your request, as your PAN and Aadhaar are not linked. To link your PAN with Aadhaar: https://eportal.incometax.gov.in/iec/foservices/#/pre-login/bl-link-aadhaar', { systemcode: 1396 }));
                }
                if (panAadharLinkStatusG === common_1.Option.GLOBALOPTIONS.PANAADHARLINKSTATUS.pending.value) {
                    return Promise.reject(new common_1.RestError(400, 'We regret to inform you that we are unable to proceed with your request, as your PAN and Aadhaar details couldn’t be retrieved.', { systemcode: 1397 }));
                }
                return Promise.resolve(true);
            })
                .then(() => {
                return this.bankAccountRepository.updateAll({ isDefault: false }, { accountId: accountId, isActive: true });
            })
                .then(() => {
                return this.bankAccountRepository.updateAll({ isDefault: true }, { id: id });
            })
                .then(() => {
                // update appUser
                return this.appUserRepository.updateAll({ appUserStatus: common_1.Option.GLOBALOPTIONS.APPUSERSTATUS['bankAccountIsReady'].value }, { id: bankAccountData.account.primaryHolderId });
            })
                .then(async () => {
                let investorTypeId;
                if (bankAccountData.bankAccountType.bosCode == 'NRE-SAVING') {
                    //Finding NRE investor type & setting its id to investorTypeId
                    let NREinvestorTypeData = await this.investorTypeRepository.findOne({ where: { isActive: true, bseCode: '21' } }, options);
                    if (NREinvestorTypeData) {
                        investorTypeId = NREinvestorTypeData.id;
                        return this.investorDetailsRepository.updateAll({ investorTypeId: investorTypeId }, { isActive: true, appUserId: bankAccountData.account.primaryHolderId }, options);
                    }
                }
                else if (bankAccountData.bankAccountType.bosCode == 'NRO-SAVING') {
                    //Finding NRO investor type & setting its id to investorTypeId
                    let NROinvestorTypeData = await this.investorTypeRepository.findOne({ where: { isActive: true, bseCode: '24' } }, options);
                    if (NROinvestorTypeData) {
                        investorTypeId = NROinvestorTypeData.id;
                        return this.investorDetailsRepository.updateAll({ investorTypeId: investorTypeId }, { isActive: true, appUserId: bankAccountData.account.primaryHolderId }, options);
                    }
                }
                else {
                    return {};
                }
            })
                .then(() => {
                resolve({ success: true });
            })
                .catch(error => {
                common_1.LoggingUtils.error(error);
                return reject(error);
            });
        });
    }
    async fetchBankAccountDetailsById(bankAccountId, accountId) {
        const accountExists = await this.bankAccountRepository.findOne({
            where: {
                id: bankAccountId,
                accountId: accountId,
                isActive: true
            }
        });
        if (!accountExists)
            return Promise.reject(new common_1.RestError(404, "Bank Account couldn't be found", { systemcode: 1242 }));
        return accountExists;
    }
};
BankAccountFacade = (0, tslib_1.__decorate)([
    (0, core_1.injectable)({ scope: core_1.BindingScope.APPLICATION }),
    (0, tslib_1.__param)(0, (0, repository_1.repository)(common_1.BankAccountRepository)),
    (0, tslib_1.__param)(1, (0, repository_1.repository)(common_1.AccountRepository)),
    (0, tslib_1.__param)(2, (0, repository_1.repository)(common_1.AppUserRepository)),
    (0, tslib_1.__param)(3, (0, repository_1.repository)(common_1.InvestorTypeRepository)),
    (0, tslib_1.__param)(4, (0, repository_1.repository)(common_1.InvestorDetailsRepository)),
    (0, tslib_1.__param)(5, (0, repository_1.repository)(repositories_1.CoreBankingRepository)),
    (0, tslib_1.__metadata)("design:paramtypes", [common_1.BankAccountRepository,
        common_1.AccountRepository,
        common_1.AppUserRepository,
        common_1.InvestorTypeRepository,
        common_1.InvestorDetailsRepository,
        repositories_1.CoreBankingRepository])
], BankAccountFacade);
exports.BankAccountFacade = BankAccountFacade;
//# sourceMappingURL=bank-account.facade.js.map