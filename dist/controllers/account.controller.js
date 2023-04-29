"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountController = void 0;
const tslib_1 = require("tslib");
const authorization_1 = require("@loopback/authorization");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const common_1 = require("common");
const facades_1 = require("../facades");
const API_PREFIX = common_1.Account.modelName;
//Only REST related logic to be written inside a controller.
//Strictly no use of repositories
let AccountController = class AccountController {
    constructor(accountFacade, appUserFacade, additionalHeaders, userProfile, res) {
        this.accountFacade = accountFacade;
        this.appUserFacade = appUserFacade;
        this.additionalHeaders = additionalHeaders;
        this.userProfile = userProfile;
        this.res = res;
    }
    async create(account) {
        return this.accountFacade.create(account);
    }
    async createPdf(id, data) {
        common_1.PathParamsValidations.idValidations(id);
        return this.accountFacade.generateAOF(id, data.aofType, {}, this.additionalHeaders);
    }
    async count(where) {
        return this.accountFacade.count(where);
    }
    async find(filter) {
        return this.accountFacade.find(filter, this.additionalHeaders);
    }
    async fetchAccounts(filter) {
        return this.accountFacade.find(filter, this.additionalHeaders);
    }
    async updateAll(account, where) {
        return this.accountFacade.updateAll(account, where);
    }
    async findById(id, filter) {
        return this.accountFacade.findById(id, filter, this.additionalHeaders);
    }
    async updateById(id, account) {
        await this.accountFacade.updateById(id, account);
    }
    async replaceById(id, account) {
        await this.accountFacade.replaceById(id, account);
    }
    async deleteById(id) {
        await this.accountFacade.deleteById(id);
    }
    async submitRiskProfileAnswers(id, answers) {
        common_1.PathParamsValidations.idValidations(id);
        return this.accountFacade.submitRiskProfileAnswers(id, answers, this.additionalHeaders);
    }
    async fetchNomineeDetailsById(accountId, isOnboardedNominee) {
        common_1.PathParamsValidations.idValidations(accountId);
        return this.accountFacade.fetchNomineeByAccountIdNew(accountId, isOnboardedNominee, this.additionalHeaders);
    }
    async updateNomineeDetailsById(id, nomineeAppUserId, nomineeDetails) {
        common_1.PathParamsValidations.idValidations(id);
        common_1.PathParamsValidations.idValidations(nomineeAppUserId);
        return this.accountFacade.updateNomineeDetailsById(id, nomineeAppUserId, nomineeDetails);
    }
    async getBankDetailsById(accountId) {
        common_1.PathParamsValidations.idValidations(accountId);
        return this.accountFacade.getBankDetailsById(accountId, this.additionalHeaders);
    }
    async getBankBalanceByAccountNo(accountId) {
        return this.accountFacade.getBankBalanceByAccountId(accountId, this.userProfile.TrxId, this.additionalHeaders);
    }
    async getNomineesById(accountId) {
        common_1.PathParamsValidations.idValidations(accountId);
        return this.accountFacade.getNomineesById(accountId, this.additionalHeaders);
    }
    async getBankAccountsById(accountId) {
        common_1.PathParamsValidations.idValidations(accountId);
        return this.accountFacade.getBankAccountsByAccountId(accountId, this.additionalHeaders);
    }
    async fetchFolioByAccountId(accountId, instrumentId) {
        common_1.PathParamsValidations.idValidations(accountId);
        common_1.PathParamsValidations.idValidations(instrumentId);
        return this.accountFacade.fetchFolioByAccountId(accountId, instrumentId, this.additionalHeaders);
    }
    async updateRiskProfileByAccountId(accountId, details) {
        common_1.PathParamsValidations.idValidations(accountId);
        return this.accountFacade.updateRiskProfileByAccountId(accountId, details.riskProfileId, this.additionalHeaders);
    }
    async updateSkippedNomineeFlag(id, skipNomineeRequest) {
        common_1.PathParamsValidations.idValidations(id);
        return this.accountFacade.updateSkippedNomineeById(id, skipNomineeRequest, this.additionalHeaders);
    }
    async dataRefreshByAccountId(id) {
        common_1.PathParamsValidations.idValidations(id);
        return this.accountFacade.dataRefreshByAccountId(id);
    }
    async fatcaGenerationByAccountId(id) {
        common_1.PathParamsValidations.idValidations(id);
        return this.accountFacade.fatcaGenerationByAccountId(id);
    }
    async exportInvestorMaster(exportFormat, filterObject) {
        return this.accountFacade.exportInvestorMaster(filterObject, exportFormat, this.res, this.additionalHeaders);
    }
    async orderItemsRepotingReplicatorByAccountId(id) {
        common_1.PathParamsValidations.idValidations(id);
        return this.accountFacade.orderItemsRepotingReplicatorByAccountId(id);
    }
    //API to fetch mobile & email from RTA
    async fetchMobileEmailRta(fetchRta, id) {
        common_1.PathParamsValidations.idValidations(id);
        return await this.appUserFacade.fetchRta(fetchRta, id, this.userProfile.TrxId, this.additionalHeaders);
    }
    //API to generateZipForDocuments RTA
    async generateZipForDocuments(generatedDocuments) {
        return await this.accountFacade.generateZipForDocuments(generatedDocuments.accountIDs, generatedDocuments.rtaId, this.additionalHeaders);
    }
    //Investor Master details API for HDFC Delta Portal
    async investorMasterDetails(filterObject) {
        return this.accountFacade.investorMasterDetails(filterObject, this.additionalHeaders);
    }
};
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'Account model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(common_1.Account) } }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.Account, {
                    title: 'New Account',
                    exclude: ['id']
                })
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AccountController.prototype, "create", null);
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}/{id}/pdf`),
    (0, rest_1.response)(200, {
        description: 'Account model instance',
        content: {
            'application/json': {
                schema: {
                    type: 'object'
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    required: ['aofType'],
                    properties: {
                        aofType: {
                            type: 'string',
                            minLength: 1,
                            maxLength: 5
                        }
                    }
                }
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AccountController.prototype, "createPdf", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/count`),
    (0, rest_1.response)(200, {
        description: 'Account model count',
        content: { 'application/json': { schema: repository_1.CountSchema } }
    }),
    (0, tslib_1.__param)(0, rest_1.param.where(common_1.Account)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AccountController.prototype, "count", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'Array of Account model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(common_1.Account, { includeRelations: false })
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.filter(common_1.Account)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AccountController.prototype, "find", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/fetchAccounts`),
    (0, rest_1.response)(200, {
        description: 'Array of Account model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(common_1.Account, { includeRelations: false })
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.filter(common_1.Account)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AccountController.prototype, "fetchAccounts", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'Account PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.Account, { partial: true })
            }
        }
    })),
    (0, tslib_1.__param)(1, rest_1.param.where(common_1.Account)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [common_1.Account, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AccountController.prototype, "updateAll", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(200, {
        description: 'Account model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.Account, { includeRelations: false })
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, rest_1.param.filter(common_1.Account, { exclude: 'where' })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AccountController.prototype, "findById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'Account PATCH success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.Account, { partial: true })
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, common_1.Account]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AccountController.prototype, "updateById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.put)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'Account PUT success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, common_1.Account]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AccountController.prototype, "replaceById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.del)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'Account DELETE success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AccountController.prototype, "deleteById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`${API_PREFIX}/{id}/submitRiskProfileAnswers/`),
    (0, rest_1.response)(204, {
        description: 'To submit Risk profile answers',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(common_1.Account) } }
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(common_1.RiskProfileQuestionSubmittedAnswer, { partial: true })
                }
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, Array]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AccountController.prototype, "submitRiskProfileAnswers", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/{id}/fetchNomineeDetails`),
    (0, rest_1.response)(200, {
        description: 'For fetching nominee details of user based on account',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            address: {
                                type: 'object',
                                properties: {
                                    addressId: {
                                        type: 'number'
                                    },
                                    addressLine1: {
                                        type: 'string'
                                    },
                                    addressLine2: {
                                        type: 'string'
                                    },
                                    stateId: {
                                        type: 'number'
                                    },
                                    state: {
                                        type: 'string'
                                    },
                                    countryId: {
                                        type: 'number'
                                    },
                                    country: {
                                        type: 'string'
                                    },
                                    landmark: {
                                        type: 'string'
                                    },
                                    pincode: {
                                        type: 'string'
                                    },
                                    city: {
                                        type: 'string'
                                    }
                                }
                            },
                            guardianAddress: {
                                type: 'object',
                                properties: {
                                    guardianAddressId: {
                                        type: 'number'
                                    },
                                    addressLine1: {
                                        type: 'string'
                                    },
                                    addressLine2: {
                                        type: 'string'
                                    },
                                    stateId: {
                                        type: 'number'
                                    },
                                    state: {
                                        type: 'string'
                                    },
                                    countryId: {
                                        type: 'number'
                                    },
                                    country: {
                                        type: 'string'
                                    },
                                    landmark: {
                                        type: 'string'
                                    },
                                    pincode: {
                                        type: 'string'
                                    },
                                    city: {
                                        type: 'string'
                                    }
                                }
                            },
                            nomineeId: {
                                type: 'number'
                            },
                            name: {
                                type: 'string'
                            },
                            nomineeAppUserId: {
                                type: 'number'
                            },
                            relationshipName: {
                                type: 'string'
                            },
                            relationshipId: {
                                type: 'number'
                            },
                            percentage: {
                                type: 'number'
                            },
                            dateOfBirth: {
                                type: 'string'
                            },
                            guardianRelationship: {
                                type: 'number'
                            },
                            guardianName: {
                                type: 'string'
                            },
                            isMfNominee: {
                                type: 'boolean'
                            },
                            guardianPanCardNumber: {
                                type: 'string'
                            }
                        }
                    },
                    example: `[
              {
                address: {
                  addressId: 130525,
                  addressLine1: 'ABCDefgh',
                  addressLine2: 'IJKL',
                  landmark: '',
                  pincode: '',
                  city: '',
                  state: 'Arunachal Pradesh',
                  stateId: 3,
                  country: '',
                  countryId: null
                },
                guardianAddress: {
                  guardianAddressId: 130525,
                  addressLine1: 'ABCDefgh',
                  addressLine2: 'IJKL',
                  landmark: '',
                  pincode: '',
                  city: '',
                  state: 'Arunachal Pradesh',
                  stateId: 3,
                  country: '',
                  countryId: null
                }
                nomineeId: 498,
                name: 'shefali',
                nomineeAppUserId: 451,
                relationshipName: 'Father',
                relationshipId: 2,
                percentage: null,
                dateOfBirth  : null,
                guardianRelationship: 3,
                guardianName:'lucky',
                isMfNominee: true,
                guardianPanCardNumber: 'ABCDE1234A'
              }
            ]`
                }
            }
        },
        param: rest_1.param
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, rest_1.param.query.boolean('isOnboardedNominee')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, Boolean]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AccountController.prototype, "fetchNomineeDetailsById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.put)(`/${API_PREFIX}/{id}/{nomineeAppUserId}/updateNomineeDetails`),
    (0, rest_1.response)(200, {
        description: 'nominee details update success',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean'
                        }
                    }
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, rest_1.param.path.number('nomineeAppUserId')),
    (0, tslib_1.__param)(2, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    required: ['nomineePercentage', 'relationshipId', 'dateOfBirth'],
                    properties: {
                        nomineeAddress: {
                            type: 'object',
                            required: ['stateId', 'addressLine1', 'pincode', 'city'],
                            properties: {
                                stateId: {
                                    type: 'number',
                                    minimum: 1,
                                    maximum: 1000
                                },
                                addressLine1: {
                                    type: 'string',
                                    minLength: 1,
                                    maxLength: 200
                                },
                                addressLine2: {
                                    type: 'string',
                                    maxLength: 120
                                },
                                addressLine3: {
                                    type: 'string',
                                    maxLength: 120
                                },
                                pincode: {
                                    type: 'string',
                                    pattern: '[0-9]',
                                    minLength: 1,
                                    maxLength: 6
                                },
                                city: {
                                    type: 'string',
                                    minLength: 1,
                                    maxLength: 100
                                }
                            }
                        },
                        guardianAddress: {
                            type: 'object',
                            required: ['stateId', 'addressLine1', 'pincode', 'city'],
                            properties: {
                                stateId: {
                                    type: 'number',
                                    minimum: 1,
                                    maximum: 1000
                                },
                                addressLine1: {
                                    type: 'string',
                                    minLength: 1,
                                    maxLength: 200
                                },
                                addressLine2: {
                                    type: 'string',
                                    maxLength: 120
                                },
                                addressLine3: {
                                    type: 'string',
                                    maxLength: 120
                                },
                                pincode: {
                                    type: 'string',
                                    pattern: '[0-9]',
                                    minLength: 1,
                                    maxLength: 6
                                },
                                city: {
                                    type: 'string',
                                    minLength: 1,
                                    maxLength: 100
                                }
                            }
                        },
                        id: {
                            type: 'number',
                            minimum: 1,
                            maximum: 2147483647
                        },
                        name: {
                            type: 'string',
                            minLength: 1,
                            maxLength: 100
                        },
                        nomineePercentage: {
                            type: 'number',
                            minimum: 1,
                            maximum: 100
                        },
                        relationshipId: {
                            type: 'number',
                            minimum: 1
                        },
                        dateOfBirth: {
                            type: 'string',
                            pattern: '^\\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$'
                        },
                        guardianName: {
                            type: 'string',
                            minLength: 1,
                            maxLength: 100
                        },
                        guardianRelationship: {
                            type: 'number',
                            minimum: 1
                        },
                        guardianPanCardNumber: {
                            type: 'string',
                            pattern: '([A-Z]){5}([0-9]){4}([A-Z]){1}$'
                        },
                        investorTypeId: {
                            type: 'number'
                        }
                    },
                    example: `{
              "nomineeAddress":{
                 "stateId":2,
                 "addressLine1":"ABCD",
                 "addressLine2":"G",
                 "addressLine3":"H",
                 "landmark":"abc",
                 "pincode":"507301",
                 "district":"khammam",
                 "city":"Mumbai"
              },
              "guardianAddress":{
                 "stateId":2,
                 "addressLine1":"ABCD",
                 "addressLine2":"P",
                 "addressLine3":"Q",
                 "landmark":"xyz",
                 "pincode":"507301",
                 "district":"khammam",
                 "city":"Mumbai"
              },
              "id":2,
              "name":"A",
              "relationshipId":1,
              "nomineePercentage":10,
              "dateOfBirth":"1993-04-03",
              "guardianName":"Amit",
              "guardianRelationship":1,
              "guardianPanCardNumber":"AZLPN4486H",
              "investorTypeId": 2
           }`
                }
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, Number, common_1.InvestorNominee]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AccountController.prototype, "updateNomineeDetailsById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/{id}/fetchBankDetails`),
    (0, rest_1.response)(200, {
        description: 'For fetching bank details of account',
        content: {
            'application/json': {
                schema: {
                    type: 'array'
                }
            }
        },
        param: rest_1.param
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AccountController.prototype, "getBankDetailsById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`${API_PREFIX}/{accountId}/fetchBankBalance`),
    (0, rest_1.response)(204, {
        description: 'For fetching bank balance of account',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    example: { bankBalance: 107187156, bankAccountNo: '1234567' }
                }
            }
        },
        param: rest_1.param
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('accountId')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AccountController.prototype, "getBankBalanceByAccountNo", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/{id}/fetchNominees`),
    (0, rest_1.response)(200, {
        description: 'For fetching nominees based on account, bank account and service provider account',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    example: `[{
            name: 'Am',
            relationshipName: 'Mother',
            nomineePercentage: 10,
            dateOfBirth: '1992-01-23'
          }]`
                }
            }
        },
        param: rest_1.param
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AccountController.prototype, "getNomineesById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/{id}/fetchBankAccounts`),
    (0, rest_1.response)(200, {
        description: 'For fetching bank accounts based on account',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    example: `{
            accountNumber: '000000000',
            accountType: 'Saving Bank',
            accountName: 'A',
            branchName: 'AI',
            holdingPattern: 'Single',
            holdingPatternId: 1,
            isDefault: true,
            isActive: true
          }`
                }
            }
        },
        param: rest_1.param
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AccountController.prototype, "getBankAccountsById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/{id}/fetchFolioByAccountId`),
    (0, rest_1.response)(200, {
        description: 'For fetching bank accounts based on account',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            serviceProviderAccountNumber: { type: 'string' },
                            serviceProviderAccountId: { type: 'number' },
                            existingInvestment: { type: 'number' }
                        }
                    }
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, rest_1.param.query.number('instrumentId')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AccountController.prototype, "fetchFolioByAccountId", null);
(0, tslib_1.__decorate)([
    (0, rest_1.put)(`/${API_PREFIX}/{id}/updateRiskProfileByAccountId`),
    (0, rest_1.response)(200, {
        description: 'For fetching bank accounts based on account',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.Account, { includeRelations: false })
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    required: ['riskProfileId'],
                    properties: {
                        riskProfileId: {
                            type: 'number',
                            minimum: 1
                        }
                    }
                }
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AccountController.prototype, "updateRiskProfileByAccountId", null);
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`${API_PREFIX}/{id}/skippedNominee`),
    (0, rest_1.response)(204, {
        description: 'skipe nominee',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean'
                        }
                    }
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    required: ['skippedNominee'],
                    properties: {
                        skippedNominee: {
                            type: 'boolean'
                        }
                    }
                }
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AccountController.prototype, "updateSkippedNomineeFlag", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/{id}/dataRefreshByAccountId`),
    (0, rest_1.response)(204, {
        description: 'Data Refresher by Account ID',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean'
                        }
                    }
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AccountController.prototype, "dataRefreshByAccountId", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/{id}/fatcaGenerationByAccountId`),
    (0, rest_1.response)(204, {
        description: 'Fatca Generation by Account ID',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean'
                        }
                    }
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AccountController.prototype, "fatcaGenerationByAccountId", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/exportInvestorMaster/{exportFormat}`),
    (0, rest_1.response)(200, {
        description: 'Export Investor Master in XLSX format',
        content: {
            'application/json': {
                schema: {
                    type: 'object'
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.string('exportFormat')),
    (0, tslib_1.__param)(1, rest_1.param.query.object('queryParameters', {
        type: 'object',
        example: {
            order: 'id ASC',
            where: [{ primaryHolderName: 'string' }, { secondaryHolderName: 'string' }],
            export: true
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AccountController.prototype, "exportInvestorMaster", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/{id}/orderItemsRepotingReplicatorByAccountId`),
    (0, rest_1.response)(204, {
        description: 'Execute orderitems reporting replicatin for passed account id',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean'
                        }
                    }
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AccountController.prototype, "orderItemsRepotingReplicatorByAccountId", null);
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}/{id}/fetchMobileEmailRta`),
    (0, rest_1.response)(200, {
        description: 'fetch mobile & email from RTA',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    example: {
                        success: true,
                        message: 'OTP sent to user!'
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
                    required: ['serviceProviderAccountID', 'refreshFlag'],
                    properties: {
                        serviceProviderAccountID: {
                            type: 'number',
                            minimum: 1
                        },
                        refreshFlag: {
                            type: 'boolean'
                        }
                    }
                }
            }
        }
    })),
    (0, tslib_1.__param)(1, rest_1.param.path.number('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object, Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AccountController.prototype, "fetchMobileEmailRta", null);
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}/generateZipForDocuments`),
    (0, rest_1.response)(200, {
        description: 'Generate Documents for RTA',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    example: {
                        success: true,
                        message: 'Generated the documents!'
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
                        accountIDs: {
                            type: 'array',
                            items: {
                                type: 'number'
                            }
                        },
                        rtaId: {
                            type: 'number'
                        }
                    },
                    required: ['accountIDs', 'rtaId']
                }
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AccountController.prototype, "generateZipForDocuments", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/investorMaster`),
    (0, rest_1.response)(200, {
        description: 'Array of Account model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(common_1.Account, { includeRelations: false })
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.query.object('queryParameters', {
        type: 'object',
        example: {
            limit: 10,
            offset: 0,
            order: 'id ASC',
            where: [{ primaryHolderName: 'string' }, { secondaryHolderName: 'string' }]
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AccountController.prototype, "investorMasterDetails", null);
AccountController = (0, tslib_1.__decorate)([
    (0, authorization_1.authorize)({}),
    (0, tslib_1.__param)(0, (0, core_1.service)(facades_1.AccountFacade)),
    (0, tslib_1.__param)(1, (0, core_1.service)(facades_1.AppUserFacade)),
    (0, tslib_1.__param)(2, (0, core_1.inject)('additionalHeaders')),
    (0, tslib_1.__param)(3, (0, core_1.inject)('userProfile')),
    (0, tslib_1.__param)(4, (0, core_1.inject)(rest_1.RestBindings.Http.RESPONSE)),
    (0, tslib_1.__metadata)("design:paramtypes", [facades_1.AccountFacade,
        facades_1.AppUserFacade, Object, Object, Object])
], AccountController);
exports.AccountController = AccountController;
//# sourceMappingURL=account.controller.js.map