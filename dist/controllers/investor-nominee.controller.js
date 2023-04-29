"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvestorNomineeController = void 0;
const tslib_1 = require("tslib");
const authorization_1 = require("@loopback/authorization");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const common_1 = require("common");
const facades_1 = require("../facades");
const API_PREFIX = common_1.InvestorNominee.modelName;
//Only REST related logic to be written inside a controller.
//Strictly no use of repositories
let InvestorNomineeController = class InvestorNomineeController {
    constructor(investorNomineeFacade, additionalHeaders) {
        this.investorNomineeFacade = investorNomineeFacade;
        this.additionalHeaders = additionalHeaders;
    }
    async create(investorNominee) {
        return this.investorNomineeFacade.create(investorNominee);
    }
    async count(where) {
        return this.investorNomineeFacade.count(where);
    }
    async find(filter) {
        return this.investorNomineeFacade.find(filter);
    }
    async findById(id, filter) {
        return this.investorNomineeFacade.findById(id, filter);
    }
    async deleteById(id) {
        await this.investorNomineeFacade.deleteById(id);
    }
    async createNomineeByAccountId(accountId, investorNominee) {
        //validate account id
        common_1.PathParamsValidations.idValidations(accountId);
        return this.investorNomineeFacade.createNomineeByAccountId(accountId, investorNominee);
    }
    async saveOnboardingSelectedNominees(accountId, investorNominee) {
        //validate account id
        common_1.PathParamsValidations.idValidations(accountId);
        return this.investorNomineeFacade.saveOnboardingSelectedNominees(accountId, investorNominee);
    }
    async updateAll(investorNominee, where) {
        return this.investorNomineeFacade.updateAll(investorNominee, where, this.additionalHeaders);
    }
    async updateById(id, investorNominee) {
        await this.investorNomineeFacade.updateById(id, investorNominee, this.additionalHeaders);
    }
};
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'InvestorNominee model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(common_1.InvestorNominee) } }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.InvestorNominee, {
                    title: 'New InvestorNominee',
                    exclude: ['id']
                })
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], InvestorNomineeController.prototype, "create", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/count`),
    (0, rest_1.response)(200, {
        description: 'InvestorNominee model count',
        content: { 'application/json': { schema: repository_1.CountSchema } }
    }),
    (0, tslib_1.__param)(0, rest_1.param.where(common_1.InvestorNominee)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], InvestorNomineeController.prototype, "count", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'Array of InvestorNominee model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(common_1.InvestorNominee, { includeRelations: false })
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.filter(common_1.InvestorNominee)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], InvestorNomineeController.prototype, "find", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(200, {
        description: 'InvestorNominee model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.InvestorNominee, { includeRelations: false })
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, rest_1.param.filter(common_1.InvestorNominee, { exclude: 'where' })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], InvestorNomineeController.prototype, "findById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.del)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'InvestorNominee DELETE success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], InvestorNomineeController.prototype, "deleteById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}/{accountId}/createNominee`),
    (0, rest_1.response)(200, {
        description: 'InvestorNominee model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(common_1.InvestorNominee) } }
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('accountId')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    required: ['name', 'relationshipId', 'nomineePercentage', 'dateOfBirth'],
                    properties: {
                        name: {
                            type: 'string',
                            minLength: 1,
                            maxLength: 255
                        },
                        relationshipId: {
                            type: 'number'
                        },
                        nomineePercentage: {
                            type: 'number',
                            minimum: 1,
                            maximum: 100
                        },
                        dateOfBirth: {
                            type: 'string',
                            pattern: '^\\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$'
                        },
                        guardianName: {
                            type: 'string',
                            minLength: 1,
                            maxLength: 100,
                        },
                        guardianRelationship: {
                            type: 'number',
                            minimum: 1
                        },
                        guardianPanCardNumber: {
                            type: 'string',
                            pattern: '([A-Z]){5}([0-9]){4}([A-Z]){1}$'
                        },
                        nomineeAddress: {
                            type: 'object'
                        },
                        guardianAddress: {
                            type: 'object'
                        },
                        investorTypeId: {
                            type: 'number'
                        }
                    },
                    example: `{
              "name": "A",
              "relationshipId": 1,
              "nomineePercentage": 10,
              "dateOfBirth": "1993-04-03",
              "guardianRelationship": 1,
              "guardianName":"Ramesh",
              "guardianPanCardNumber":"AZLPN4486H",
              "investorTypeId": 2,
              "nomineeAddress": {
                "addressLine1":"address line 1 here",
                "addressLine2":"address line 2 here",
                "addressLine3":"address line 3 here",
                "fullAddress":"full address here",
                "district":"district here",
                "city":"city here",
                "pincode": "507301",
                "landmark":"landmark here",
                "addressTypeId": 2,
                "stateId": 3
              },
              "guardianAddress": {
                "addressLine1":"address line 1 here",
                "addressLine2":"address line 2 here",
                "addressLine3":"address line 3 here",
                "fullAddress":"full address here",
                "district":"district here",
                "city":"city here",
                "pincode": "507301",
                "landmark":"landmark here",
                "addressTypeId": 2,
                "stateId": 3
              }
            }`
                }
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], InvestorNomineeController.prototype, "createNomineeByAccountId", null);
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}/{accountId}/saveOnboardingSelectedNominees`),
    (0, rest_1.response)(200, {
        description: 'Save selected investor nominee details while onboarding',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(common_1.InvestorNominee) } }
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('accountId')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    example: `
            [{
              "id":210,
              "appUserId":22443
            },
            {
              "id":211,
              "appUserId":22444
            },
            {
              "id":212,
              "appUserId":22445
            }]`
                }
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, Array]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], InvestorNomineeController.prototype, "saveOnboardingSelectedNominees", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'investor nominee PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.InvestorNominee, { partial: true })
            }
        }
    })),
    (0, tslib_1.__param)(1, rest_1.param.where(common_1.InvestorNominee)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [common_1.InvestorNominee, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], InvestorNomineeController.prototype, "updateAll", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'investor Nominee PATCH success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.InvestorNominee, { partial: true })
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, common_1.InvestorNominee]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], InvestorNomineeController.prototype, "updateById", null);
InvestorNomineeController = (0, tslib_1.__decorate)([
    (0, authorization_1.authorize)({}),
    (0, tslib_1.__param)(0, (0, core_1.service)(facades_1.InvestorNomineeFacade)),
    (0, tslib_1.__param)(1, (0, core_1.inject)('additionalHeaders')),
    (0, tslib_1.__metadata)("design:paramtypes", [facades_1.InvestorNomineeFacade, Object])
], InvestorNomineeController);
exports.InvestorNomineeController = InvestorNomineeController;
//# sourceMappingURL=investor-nominee.controller.js.map