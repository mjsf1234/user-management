"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvestorNomineeFacade = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const common_1 = require("common");
const app_constant_1 = (0, tslib_1.__importDefault)(require("common/dist/constants/app-constant"));
const moment_timezone_1 = (0, tslib_1.__importDefault)(require("moment-timezone"));
const underscore_1 = (0, tslib_1.__importDefault)(require("underscore"));
// All business loigc goes inside Facade layer
let InvestorNomineeFacade = class InvestorNomineeFacade {
    constructor(investorNomineeRepository, accountRepository, appUserRepository, investorDetailsRepository, addressRepository) {
        this.investorNomineeRepository = investorNomineeRepository;
        this.accountRepository = accountRepository;
        this.appUserRepository = appUserRepository;
        this.investorDetailsRepository = investorDetailsRepository;
        this.addressRepository = addressRepository;
    }
    getAge(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
    async create(entity, options) {
        return this.investorNomineeRepository.create(entity, options);
    }
    async find(filter, options) {
        return this.investorNomineeRepository.find(filter, options);
    }
    async updateAll(data, where, options) {
        return this.investorNomineeRepository.updateAll(data, where, options);
    }
    async updateById(id, data, options) {
        return this.investorNomineeRepository.updateById(id, data, options);
    }
    async findById(id, filter, options) {
        return this.investorNomineeRepository.findById(id, filter, options);
    }
    async count(where, options) {
        return this.investorNomineeRepository.count(where, options);
    }
    async delete(entity, options) {
        return this.investorNomineeRepository.delete(entity, options);
    }
    async deleteAll(where, options) {
        return this.investorNomineeRepository.deleteAll(where, options);
    }
    async deleteById(id, options) {
        return this.investorNomineeRepository.deleteById(id, options);
    }
    async exists(id, options) {
        return this.investorNomineeRepository.exists(id, options);
    }
    async createNomineeByAccountId(accountId, nominee, options) {
        try {
            let nomineeData;
            let guardianAddress;
            const account = await this.accountRepository.findOne({
                where: {
                    id: accountId,
                    isActive: true
                }
            });
            if (!account) {
                return Promise.reject(new common_1.RestError(404, 'Account not found', { systemcode: 1086 }));
            }
            if (!nominee) {
                return Promise.reject(new common_1.RestError(400, 'Nominee details required', { systemcode: 1090 }));
            }
            //check if age<18 in that case check if guardian is available if not availabe ,reject
            const ageInYear = this.getAge(typeof nominee.dateOfBirth == 'string' ? nominee.dateOfBirth : '');
            if (ageInYear < 18 && !nominee.guardianRelationship && !nominee.guardianName) {
                return Promise.reject(new common_1.RestError(404, 'Nominee guardian not found', { systemcode: 1324 }));
            }
            if (!nominee.nomineeAddress) {
                return Promise.reject(new common_1.RestError(404, 'Nominee address details not found', { systemcode: 1374 }));
            }
            if (ageInYear < 18 && !nominee.guardianRelationship && !nominee.guardianAddress) {
                return Promise.reject(new common_1.RestError(404, 'Guardian address details not found', { systemcode: 1375 }));
            }
            if (nominee.dateOfBirth &&
                (0, moment_timezone_1.default)(nominee.dateOfBirth).isValid() &&
                (0, moment_timezone_1.default)((0, moment_timezone_1.default)().format('YYYY-MM-DD')).isSameOrBefore((0, moment_timezone_1.default)(nominee.dateOfBirth).format('YYYY-MM-DD'))) {
                return Promise.reject(new common_1.RestError(404, "Dob should be less than today's date", { systemcode: 1389 }));
            }
            if (nominee.name && !app_constant_1.default.REGEX_ALPHABETS_WITH_SPACE.test(nominee.name)) {
                return Promise.reject(new common_1.RestError(404, "Nominee name shouldn't contains any special characters or numbers. Please update!!", { systemcode: 1390 }));
            }
            if (nominee.guardianName && !app_constant_1.default.REGEX_ALPHABETS_WITH_SPACE.test(nominee.guardianName) && ageInYear < 18) {
                return Promise.reject(new common_1.RestError(404, "Guardian name shouldn't contains any special characters or numbers. Please update!!", { systemcode: 1391 }));
            }
            let nomineeObj = {};
            nomineeObj.relationshipId = nominee.relationshipId;
            nomineeObj.nomineePercentage = nominee.nomineePercentage;
            nomineeObj.accountId = accountId;
            if (ageInYear < 18) {
                nomineeObj.guardianName = nominee.guardianName;
                nomineeObj.guardianRelationship = nominee.guardianRelationship;
                nomineeObj.guardianPanCardNumber = nominee.guardianPanCardNumber;
                // storing guardian address details in address table if the nominee is minor
                guardianAddress = await this.addressRepository.create(nominee.guardianAddress);
                nomineeObj.guardianAddressId = guardianAddress.id;
            }
            // storing details in AppUser
            const user = await this.appUserRepository
                .create({ name: nominee.name, appUserStatus: common_1.Option.GLOBALOPTIONS.APPUSERSTATUS['nomineeUserStatus'].value })
                .catch(err => {
                throw new Error(err);
            });
            if (user) {
                let dob = (0, moment_timezone_1.default)(new Date(String(nominee.dateOfBirth)))
                    .utcOffset('+05:30')
                    .format('YYYY-MM-DD');
                nomineeObj.appUserId = user.id;
                let investorDetails = { birthDate: dob, appUserId: user.id, investorTypeId: nominee.investorTypeId };
                // storing details in investorDetails and address details tables
                let parallalExecutedServices = await Promise.all([
                    this.investorDetailsRepository.create(investorDetails),
                    this.addressRepository.create(nominee.nomineeAddress)
                ]).catch(err => {
                    throw new Error(err);
                });
                let nomineeAddressId = parallalExecutedServices[1]['id'];
                nomineeObj.addressId = nomineeAddressId;
                // storing summarised details in investor nominee table
                nomineeData = await this.investorNomineeRepository.create(nomineeObj).catch(err => {
                    throw new Error(err);
                });
            }
            return nomineeData;
        }
        catch (error) {
            common_1.LoggingUtils.error(error);
            throw error;
        }
    }
    async saveOnboardingSelectedNominees(accountId, nomineeDetails, options) {
        try {
            if (!nomineeDetails || nomineeDetails.length === 0) {
                return Promise.reject(new common_1.RestError(400, 'Nominee details required', { systemcode: 1090 }));
            }
            let nomineeIds = underscore_1.default.pluck(nomineeDetails, 'id');
            const account = await this.accountRepository.findOne({
                fields: ['id', 'primaryHolderId', 'primaryHolder', 'investorNominees'],
                where: {
                    id: accountId,
                    isActive: true
                },
                include: [
                    {
                        relation: 'primaryHolder',
                        scope: {
                            fields: ['id', 'appUserStatus'],
                            where: { isActive: true }
                        }
                    }
                ]
            });
            //** Data validation checks goes below */
            if (!account) {
                return Promise.reject(new common_1.RestError(404, 'Account not found', { systemcode: 1086 }));
            }
            if (!account.primaryHolder) {
                return Promise.reject(new common_1.RestError(404, 'User details not found', { systemcode: 1379 }));
            }
            let investorNominees = await this.investorNomineeRepository.find({
                where: { isActive: true, id: { inq: nomineeIds } },
                include: [
                    {
                        relation: 'address',
                        scope: {
                            where: { isActive: true }
                        }
                    },
                    {
                        relation: 'guardianAddress',
                        scope: {
                            where: { isActive: true }
                        }
                    },
                    {
                        relation: 'appUser',
                        scope: {
                            where: { isActive: true },
                            include: [
                                {
                                    relation: 'investorDetails',
                                    scope: {
                                        where: { isActive: true }
                                    }
                                }
                            ]
                        }
                    }
                ]
            });
            if (!investorNominees || !(investorNominees.length > 0)) {
                return Promise.reject(new common_1.RestError(404, 'investor nominee details not found', { systemcode: 1380 }));
            }
            let primaryHolder = account.primaryHolder;
            if (!(account.primaryHolder.appUserStatus === common_1.Option.GLOBALOPTIONS.APPUSERSTATUS['declarationCompleted'].value)) {
                return Promise.reject(new common_1.RestError(481, `Oops you've landed on wrong page. Please restart the application`, { systemcode: 1381 }));
            }
            if (investorNominees.length > 3) {
                return Promise.reject(new common_1.RestError(400, "can't select more than three nominees", { systemcode: 1382 }));
            }
            let combinedNomineePercentage = 0;
            investorNominees.forEach(nominee => {
                var _a;
                combinedNomineePercentage += (_a = nominee.nomineePercentage) !== null && _a !== void 0 ? _a : 0;
            });
            if (100 - combinedNomineePercentage !== 0) {
                return Promise.reject(new common_1.RestError(465, 'Please adjust the nominee percentage', { systemcode: 1383 }));
            }
            let isNomineeNameFault = false;
            let isNomineeGuardianNameFault = false;
            investorNominees.some(investorNominee => {
                var _a, _b;
                let birthDate = (0, moment_timezone_1.default)((_b = (_a = investorNominee === null || investorNominee === void 0 ? void 0 : investorNominee.appUser) === null || _a === void 0 ? void 0 : _a.investorDetails) === null || _b === void 0 ? void 0 : _b.birthDate).format('YYYY-MM-DD');
                const ageInYear = this.getAge(birthDate !== null && birthDate !== void 0 ? birthDate : '');
                if (investorNominee.guardianName && !app_constant_1.default.REGEX_ALPHABETS_WITH_SPACE.test(investorNominee.guardianName) && ageInYear < 18) {
                    return (isNomineeGuardianNameFault = true);
                }
                if (investorNominee.appUser &&
                    investorNominee.appUser.name &&
                    !app_constant_1.default.REGEX_ALPHABETS_WITH_SPACE.test(investorNominee.appUser.name)) {
                    return (isNomineeNameFault = true);
                }
            });
            if (isNomineeNameFault) {
                return Promise.reject(new common_1.RestError(404, "Nominee name shouldn't contains any special characters or numbers. Please update!!", { systemcode: 1390 }));
            }
            if (isNomineeGuardianNameFault) {
                return Promise.reject(new common_1.RestError(404, "Guardian name shouldn't contains any special characters or numbers. Please update!!", { systemcode: 1391 }));
            }
            //** End of data checks */
            //** updating all nominees mutual funds flag to false */
            await this.investorNomineeRepository.updateAll({ isMfNominee: false }, { accountId, isActive: true }).catch(err => {
                throw new Error(err);
            });
            //** updating selected nominees precentages and mutual funds flag to true*/
            await Promise.all(investorNominees.map(async (nominee) => {
                let nomineeObj = {};
                let nomineeId = nominee.id;
                nomineeObj.nomineePercentage = nominee.nomineePercentage;
                nomineeObj.isMfNominee = true;
                await this.investorNomineeRepository.updateById(nomineeId, nomineeObj).catch(err => {
                    throw new Error(err);
                });
            })).catch(err => {
                throw new Error(err);
            });
            await this.appUserRepository.updateById(primaryHolder.id, {
                appUserStatus: common_1.Option.GLOBALOPTIONS.APPUSERSTATUS['nomineeCompleted'].value
            });
            await this.duplicateSelectedNominees(investorNominees, account);
            return Promise.resolve({ success: true });
        }
        catch (error) {
            common_1.LoggingUtils.error(error);
            throw error;
        }
    }
    async duplicateSelectedNominees(investorNominees, account) {
        try {
            if (!investorNominees || !(investorNominees.length > 0)) {
                return Promise.reject(new common_1.RestError(465, 'No nominees available to duplicate', { systemcode: 1384 }));
            }
            await Promise.all(investorNominees.map(async (nominee) => {
                var _a;
                let nomineeId = nominee.id;
                let investorDetails = await this.investorDetailsRepository
                    .findOne({
                    fields: ['id', 'birthDate', 'investorTypeId', 'appUser', 'appUserId'],
                    where: { appUserId: nominee.appUserId },
                    include: [
                        {
                            relation: 'appUser',
                            scope: {
                                fields: ['id', 'name', 'appUserStatus'],
                                where: {
                                    isActive: true
                                }
                            }
                        }
                    ]
                })
                    .catch(err => {
                    throw new Error(err);
                });
                let nomineeAppUser = investorDetails === null || investorDetails === void 0 ? void 0 : investorDetails.appUser;
                if (!investorDetails) {
                    return Promise.reject(new common_1.RestError(465, 'Nominee investor detials not found', { systemcode: 1385 }));
                }
                if (!nomineeAppUser) {
                    return Promise.reject(new common_1.RestError(465, 'No nominee app user found', { systemcode: 1386 }));
                }
                if (!nominee.addressId || !nominee.address) {
                    return Promise.reject(new common_1.RestError(465, 'Address details not found', { systemcode: 1387 }));
                }
                const newNomineeAppUser = await this.appUserRepository
                    .create({ name: nomineeAppUser.name, appUserStatus: common_1.Option.GLOBALOPTIONS.APPUSERSTATUS['nomineeUserStatus'].value })
                    .catch(err => {
                    throw new Error(err);
                });
                if (!newNomineeAppUser) {
                    return Promise.reject(new common_1.RestError(465, 'User not created successfully', { systemcode: 1388 }));
                }
                await this.investorDetailsRepository
                    .create({
                    birthDate: (0, moment_timezone_1.default)(new Date(investorDetails.birthDate)).utcOffset('+05:30').format('YYYY-MM-DD'),
                    appUserId: newNomineeAppUser.id,
                    investorTypeId: investorDetails.investorTypeId
                })
                    .catch(err => {
                    throw new Error(err);
                });
                let nomineeAddress = nominee.address;
                delete nomineeAddress.id;
                delete nomineeAddress.createdDate;
                delete nomineeAddress.lastModifiedDate;
                let newNomineeAddress = await this.addressRepository.create(nomineeAddress).catch(err => {
                    throw new Error(err);
                });
                let investorNominee = {
                    nomineePercentage: nominee.nomineePercentage,
                    guardianRelationship: nominee.guardianRelationship,
                    guardianName: nominee.guardianName,
                    isMfNominee: false,
                    isSyncedViaBank: (_a = nominee.isSyncedViaBank) !== null && _a !== void 0 ? _a : false,
                    guardianPanCardNumber: nominee.guardianPanCardNumber,
                    appUserId: newNomineeAppUser.id,
                    accountId: nominee.accountId,
                    relationshipId: nominee.relationshipId,
                    addressId: newNomineeAddress.id,
                    serviceProviderAccountId: nominee.serviceProviderAccountId
                };
                if (nominee.guardianAddressId && nominee.guardianAddress) {
                    let guardianAddress = nominee.guardianAddress;
                    delete guardianAddress.id;
                    delete guardianAddress.createdDate;
                    delete guardianAddress.lastModifiedDate;
                    let newGuardianAddress = await this.addressRepository.create(guardianAddress).catch(err => {
                        throw new Error(err);
                    });
                    investorNominee.guardianAddressId = newGuardianAddress.id;
                }
                await this.investorNomineeRepository.create(investorNominee).catch(err => {
                    throw new Error(err);
                });
            })).catch(err => {
                throw new Error(err);
            });
            return Promise.resolve({ success: true });
        }
        catch (error) {
            common_1.LoggingUtils.error(error);
            throw error;
        }
    }
};
InvestorNomineeFacade = (0, tslib_1.__decorate)([
    (0, core_1.injectable)({ scope: core_1.BindingScope.APPLICATION }),
    (0, tslib_1.__param)(0, (0, repository_1.repository)(common_1.InvestorNomineeRepository)),
    (0, tslib_1.__param)(1, (0, repository_1.repository)(common_1.AccountRepository)),
    (0, tslib_1.__param)(2, (0, repository_1.repository)(common_1.AppUserRepository)),
    (0, tslib_1.__param)(3, (0, repository_1.repository)(common_1.InvestorDetailsRepository)),
    (0, tslib_1.__param)(4, (0, repository_1.repository)(common_1.AddressRepository)),
    (0, tslib_1.__metadata)("design:paramtypes", [common_1.InvestorNomineeRepository,
        common_1.AccountRepository,
        common_1.AppUserRepository,
        common_1.InvestorDetailsRepository,
        common_1.AddressRepository])
], InvestorNomineeFacade);
exports.InvestorNomineeFacade = InvestorNomineeFacade;
//# sourceMappingURL=investor-nominee.facade.js.map