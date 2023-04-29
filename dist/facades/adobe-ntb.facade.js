"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdobNtbFacade = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const common_1 = require("common");
const app_user_facade_1 = require("./app-user.facade");
const account_facade_1 = require("./account.facade");
const common_2 = require("common");
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
}
let AdobNtbFacade = class AdobNtbFacade {
    constructor(adobentbRepository, appUserFacade, accountFacade, investorDetailsRepository, appUserRepository, accountRepository) {
        this.adobentbRepository = adobentbRepository;
        this.appUserFacade = appUserFacade;
        this.accountFacade = accountFacade;
        this.investorDetailsRepository = investorDetailsRepository;
        this.appUserRepository = appUserRepository;
        this.accountRepository = accountRepository;
    }
    async create(entity, options) {
        try {
            if (!(entity === null || entity === void 0 ? void 0 : entity.mobileNumber))
                return Promise.reject(new common_2.RestError(400, 'Mobile Number Missing', { systemcode: 1121 }));
            const appUser = await this.appUserRepository.findOne({ where: { contactNumber: entity.mobileNumber } });
            if (!appUser)
                return Promise.reject(new common_2.RestError(400, 'No User Found', { systemcode: 1030 }));
            entity.appUserId = appUser.id;
            const data = await this.adobentbRepository.create(entity, options);
            return { status: 'success' };
        }
        catch (error) {
            common_2.LoggingUtils.error(error);
            return Promise.reject(new common_2.RestError(400, 'Failed', { systemcode: 1124 }));
        }
    }
};
AdobNtbFacade = (0, tslib_1.__decorate)([
    (0, core_1.injectable)({ scope: core_1.BindingScope.APPLICATION }),
    (0, tslib_1.__param)(0, (0, repository_1.repository)(common_1.AdobeNtbRepository)),
    (0, tslib_1.__param)(1, (0, core_1.service)(app_user_facade_1.AppUserFacade)),
    (0, tslib_1.__param)(2, (0, core_1.service)(account_facade_1.AccountFacade)),
    (0, tslib_1.__param)(3, (0, repository_1.repository)(common_2.InvestorDetailsRepository)),
    (0, tslib_1.__param)(4, (0, repository_1.repository)(common_2.AppUserRepository)),
    (0, tslib_1.__param)(5, (0, repository_1.repository)(common_2.AccountRepository)),
    (0, tslib_1.__metadata)("design:paramtypes", [common_1.AdobeNtbRepository,
        app_user_facade_1.AppUserFacade,
        account_facade_1.AccountFacade,
        common_2.InvestorDetailsRepository,
        common_2.AppUserRepository,
        common_2.AccountRepository])
], AdobNtbFacade);
exports.AdobNtbFacade = AdobNtbFacade;
//# sourceMappingURL=adobe-ntb.facade.js.map