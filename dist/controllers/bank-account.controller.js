"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankAccountController = void 0;
const tslib_1 = require("tslib");
const authorization_1 = require("@loopback/authorization");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const common_1 = require("common");
const facades_1 = require("../facades");
const API_PREFIX = common_1.BankAccount.modelName;
//Only REST related logic to be written inside a controller.
//Strictly no use of repositories
let BankAccountController = class BankAccountController {
    constructor(bankAccountFacade, additionalHeaders) {
        this.bankAccountFacade = bankAccountFacade;
        this.additionalHeaders = additionalHeaders;
    }
    async create(bankAccount) {
        return this.bankAccountFacade.create(bankAccount);
    }
    async count(where) {
        return this.bankAccountFacade.count(where);
    }
    async find(filter) {
        return this.bankAccountFacade.find(filter);
    }
    async updateAll(bankAccount, where) {
        return this.bankAccountFacade.updateAll(bankAccount, where);
    }
    async findById(id, filter) {
        return this.bankAccountFacade.findById(id, filter);
    }
    async updateById(id, bankAccount) {
        await this.bankAccountFacade.updateById(id, bankAccount);
    }
    // update by id post request
    async updateBankAccount(id, accountId, bankAccount) {
        common_1.PathParamsValidations.idValidations(id);
        common_1.PathParamsValidations.idValidations(accountId);
        return this.bankAccountFacade.updateBankAccount(id, accountId, bankAccount, this.additionalHeaders);
    }
    async replaceById(id, bankAccount) {
        await this.bankAccountFacade.replaceById(id, bankAccount);
    }
    async deleteById(id) {
        await this.bankAccountFacade.deleteById(id);
    }
    async fetchBankAccountDetailsById(bankAccountId, accountId) {
        common_1.PathParamsValidations.idValidations(bankAccountId);
        common_1.PathParamsValidations.idValidations(accountId);
        return this.bankAccountFacade.fetchBankAccountDetailsById(bankAccountId, accountId);
    }
};
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'BankAccount model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(common_1.BankAccount) } }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.BankAccount, {
                    title: 'New BankAccount',
                    exclude: ['id']
                })
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], BankAccountController.prototype, "create", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/count`),
    (0, rest_1.response)(200, {
        description: 'BankAccount model count',
        content: { 'application/json': { schema: repository_1.CountSchema } }
    }),
    (0, tslib_1.__param)(0, rest_1.param.where(common_1.BankAccount)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], BankAccountController.prototype, "count", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'Array of BankAccount model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(common_1.BankAccount, { includeRelations: false })
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.filter(common_1.BankAccount)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], BankAccountController.prototype, "find", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'BankAccount PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.BankAccount, { partial: true })
            }
        }
    })),
    (0, tslib_1.__param)(1, rest_1.param.where(common_1.BankAccount)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [common_1.BankAccount, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], BankAccountController.prototype, "updateAll", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(200, {
        description: 'BankAccount model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.BankAccount, { includeRelations: false })
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, rest_1.param.filter(common_1.BankAccount, { exclude: 'where' })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], BankAccountController.prototype, "findById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'BankAccount PATCH success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.BankAccount, { partial: true })
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, common_1.BankAccount]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], BankAccountController.prototype, "updateById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}/{accountId}/updateBankAccountDetailsById/{id}`),
    (0, rest_1.response)(204, {
        description: 'BankAccount Post success',
        content: {
            'application/json': {
                schema: {
                    type: 'Object'
                },
                example: {
                    success: true
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, rest_1.param.path.number('accountId')),
    (0, tslib_1.__param)(2, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.BankAccount, { partial: true })
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, Number, common_1.BankAccount]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], BankAccountController.prototype, "updateBankAccount", null);
(0, tslib_1.__decorate)([
    (0, rest_1.put)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'BankAccount PUT success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, common_1.BankAccount]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], BankAccountController.prototype, "replaceById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.del)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'BankAccount DELETE success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], BankAccountController.prototype, "deleteById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/{accountId}/fetchBankAccountDetailsById/{bankAccountId}`),
    (0, rest_1.response)(200, {
        description: 'BankAccount model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.BankAccount, { includeRelations: false })
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('bankAccountId')),
    (0, tslib_1.__param)(1, rest_1.param.path.number('accountId')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], BankAccountController.prototype, "fetchBankAccountDetailsById", null);
BankAccountController = (0, tslib_1.__decorate)([
    (0, authorization_1.authorize)({}),
    (0, tslib_1.__param)(0, (0, core_1.service)(facades_1.BankAccountFacade)),
    (0, tslib_1.__param)(1, (0, core_1.inject)('additionalHeaders')),
    (0, tslib_1.__metadata)("design:paramtypes", [facades_1.BankAccountFacade, Object])
], BankAccountController);
exports.BankAccountController = BankAccountController;
//# sourceMappingURL=bank-account.controller.js.map