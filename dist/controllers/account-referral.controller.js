"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountReferralController = void 0;
const tslib_1 = require("tslib");
const authorization_1 = require("@loopback/authorization");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const common_1 = require("common");
const account_referral_facade_1 = require("../facades/account-referral.facade");
const API_PREFIX = common_1.AccountReferral.modelName;
//Only REST related logic to be written inside a controller.
//Strictly no use of repositories
let AccountReferralController = class AccountReferralController {
    constructor(accountReferralFacade) {
        this.accountReferralFacade = accountReferralFacade;
    }
    async create(accountReferral) {
        return this.accountReferralFacade.create(accountReferral);
    }
    async count(where) {
        return this.accountReferralFacade.count(where);
    }
    async find(filter) {
        return this.accountReferralFacade.find(filter);
    }
    async updateAll(AccountReferral, where) {
        return this.accountReferralFacade.updateAll(AccountReferral, where);
    }
    async findById(id, filter) {
        return this.accountReferralFacade.findById(id, filter);
    }
    async updateById(id, accountReferral) {
        await this.accountReferralFacade.updateById(id, accountReferral);
    }
    async replaceById(id, accountReferral) {
        await this.accountReferralFacade.replaceById(id, accountReferral);
    }
    async deleteById(id) {
        await this.accountReferralFacade.deleteById(id);
    }
    async postAccountReferral(ReferralCode, accountId) {
        return await this.accountReferralFacade.postReferralCode(accountId, ReferralCode);
    }
    async findByAccountID(accountID, referralCode) {
        common_1.PathParamsValidations.idValidations(accountID);
        return this.accountReferralFacade.getAccountReferrals(accountID, referralCode);
    }
};
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'AccountReferral model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(common_1.AccountReferral) } }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.AccountReferral, {
                    title: 'New AccountReferral',
                    exclude: ['id']
                })
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AccountReferralController.prototype, "create", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/count`),
    (0, rest_1.response)(200, {
        description: 'AccountReferral model count',
        content: { 'application/json': { schema: repository_1.CountSchema } }
    }),
    (0, tslib_1.__param)(0, rest_1.param.where(common_1.AccountReferral)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AccountReferralController.prototype, "count", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'Array of AccountReferral model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(common_1.AccountReferral, { includeRelations: false })
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.filter(common_1.AccountReferral)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AccountReferralController.prototype, "find", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'AccountReferral PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.AccountReferral, { partial: true })
            }
        }
    })),
    (0, tslib_1.__param)(1, rest_1.param.where(common_1.AccountReferral)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [common_1.AccountReferral, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AccountReferralController.prototype, "updateAll", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(200, {
        description: 'AccountReferral model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.AccountReferral, { includeRelations: false })
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, rest_1.param.filter(common_1.AccountReferral, { exclude: 'where' })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AccountReferralController.prototype, "findById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'AccountReferral PATCH success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.AccountReferral, { partial: true })
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, common_1.AccountReferral]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AccountReferralController.prototype, "updateById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.put)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'AccountReferral PUT success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, common_1.AccountReferral]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AccountReferralController.prototype, "replaceById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.del)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'AccountReferral DELETE success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AccountReferralController.prototype, "deleteById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}/{accountId}/postAccountReferral`),
    (0, rest_1.response)(200, {
        description: 'Add Referal code',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    example: {
                        success: true,
                        message: 'Referral Code Added!'
                    }
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        referralCode: {
                            type: 'string'
                        }
                    },
                    required: ['referralCode']
                }
            }
        }
    })),
    (0, tslib_1.__param)(1, rest_1.param.path.number('accountId')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [common_1.AccountReferral, Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AccountReferralController.prototype, "postAccountReferral", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/{accountID}/fetchAccountReferrals`),
    (0, rest_1.response)(200, {
        description: 'AccountReferral model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.AccountReferral, { includeRelations: false })
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('accountID')),
    (0, tslib_1.__param)(1, rest_1.param.query.string('referralCode')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, String]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AccountReferralController.prototype, "findByAccountID", null);
AccountReferralController = (0, tslib_1.__decorate)([
    (0, authorization_1.authorize)({}),
    (0, tslib_1.__param)(0, (0, core_1.service)(account_referral_facade_1.AccountReferralFacade)),
    (0, tslib_1.__metadata)("design:paramtypes", [account_referral_facade_1.AccountReferralFacade])
], AccountReferralController);
exports.AccountReferralController = AccountReferralController;
//# sourceMappingURL=account-referral.controller.js.map