"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountAppFileMappingFacade = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const common_1 = require("common");
// All business loigc goes inside Facade layer
let AccountAppFileMappingFacade = class AccountAppFileMappingFacade {
    constructor(accountAppFileMappingRepository) {
        this.accountAppFileMappingRepository = accountAppFileMappingRepository;
    }
    async create(entity, options) {
        return this.accountAppFileMappingRepository.create(entity, options);
    }
    async createAll(entities, options) {
        return this.accountAppFileMappingRepository.createAll(entities, options);
    }
    async save(entity, options) {
        return this.accountAppFileMappingRepository.save(entity, options);
    }
    async find(filter, options) {
        return this.accountAppFileMappingRepository.find(filter, options);
    }
    async findOne(filter, options) {
        return this.accountAppFileMappingRepository.findOne(filter, options);
    }
    async findById(id, filter, options) {
        return this.accountAppFileMappingRepository.findById(id, filter, options);
    }
    async update(entity, options) {
        return this.accountAppFileMappingRepository.update(entity, options);
    }
    async delete(entity, options) {
        return this.accountAppFileMappingRepository.delete(entity, options);
    }
    async updateAll(data, where, options) {
        return this.accountAppFileMappingRepository.updateAll(data, where, options);
    }
    async updateById(id, data, options) {
        return this.accountAppFileMappingRepository.updateById(id, data, options);
    }
    async replaceById(id, data, options) {
        return this.accountAppFileMappingRepository.replaceById(id, data, options);
    }
    async deleteAll(where, options) {
        return this.accountAppFileMappingRepository.deleteAll(where, options);
    }
    async deleteById(id, options) {
        return this.accountAppFileMappingRepository.deleteById(id, options);
    }
    async count(where, options) {
        return this.accountAppFileMappingRepository.count(where, options);
    }
    async exists(id, options) {
        return this.accountAppFileMappingRepository.exists(id, options);
    }
    async accountAppFileMappingDetails(filter, filterObject, options) {
        return new Promise(async (resolve, reject) => {
            let count;
            let response = {};
            count = await this.accountAppFileMappingRepository.count(filter, options);
            return this.accountAppFileMappingRepository
                .find({ ...filter }, options)
                .then(async (result) => {
                let searchCriteria = new Map();
                let valueToSearch;
                filterObject.where.find((data) => {
                    searchCriteria.set(Object.keys(data)[0], Object.values(data)[0]);
                });
                let updatedArray = result.filter(data => {
                    if (searchCriteria.has('accountUniqueId')) {
                        if (data.account && data.account.uniqueId) {
                            valueToSearch = searchCriteria.get('accountUniqueId').toLowerCase();
                            if (!data.account.uniqueId.toLowerCase().includes(valueToSearch)) {
                                return false;
                            }
                        }
                        else {
                            return false;
                        }
                    }
                    if (searchCriteria.has('originalFileName')) {
                        if (data.userManagementAppFile && data.userManagementAppFile.originalFileName) {
                            valueToSearch = searchCriteria.get('originalFileName').toLowerCase();
                            if (!data.userManagementAppFile.originalFileName.toLowerCase().includes(valueToSearch)) {
                                return false;
                            }
                        }
                        else {
                            return false;
                        }
                    }
                    return true;
                });
                const data = updatedArray.slice(filterObject.offset, filterObject.limit + filterObject.offset);
                response = {
                    data: data,
                    count: updatedArray.length
                };
                return resolve(response);
            })
                .catch((error) => {
                common_1.LoggingUtils.error(error);
                return reject(error);
            });
        });
    }
};
AccountAppFileMappingFacade = (0, tslib_1.__decorate)([
    (0, core_1.injectable)({ scope: core_1.BindingScope.APPLICATION }),
    (0, tslib_1.__param)(0, (0, repository_1.repository)(common_1.AccountAppFileMappingRepository)),
    (0, tslib_1.__metadata)("design:paramtypes", [common_1.AccountAppFileMappingRepository])
], AccountAppFileMappingFacade);
exports.AccountAppFileMappingFacade = AccountAppFileMappingFacade;
//# sourceMappingURL=account-app-file-mapping.facade.js.map