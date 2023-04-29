"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreBankingController = void 0;
const tslib_1 = require("tslib");
const authorization_1 = require("@loopback/authorization");
const core_1 = require("@loopback/core");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const facades_1 = require("../facades");
const API_PREFIX = models_1.CoreBanking.modelName;
let CoreBankingController = class CoreBankingController {
    constructor(coreBankingFacade, additionalHeaders, userProfile) {
        this.coreBankingFacade = coreBankingFacade;
        this.additionalHeaders = additionalHeaders;
        this.userProfile = userProfile;
    }
    async storeCustomerAccountAmlFatcaDetailsIntoDB(customerDetails) {
        return this.coreBankingFacade.fetchCustomerAccountAmlFatcaDetails(customerDetails.pan, customerDetails.dob, customerDetails.mobileNumber, customerDetails.customerID, this.userProfile.TrxId, this.additionalHeaders);
    }
};
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'Store data into delta db using fatca api',
        content: {
            'application/json': {
                schema: {
                    type: 'object'
                },
                example: {
                    success: true
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
                        mobileNumber: {
                            type: 'string'
                        },
                        pan: {
                            type: 'string'
                        },
                        dob: {
                            type: 'string'
                        },
                        customerID: {
                            type: 'string'
                        }
                    }
                }
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], CoreBankingController.prototype, "storeCustomerAccountAmlFatcaDetailsIntoDB", null);
CoreBankingController = (0, tslib_1.__decorate)([
    (0, authorization_1.authorize)({}),
    (0, tslib_1.__param)(0, (0, core_1.service)(facades_1.CoreBankingFacade)),
    (0, tslib_1.__param)(1, (0, core_1.inject)('additionalHeaders')),
    (0, tslib_1.__param)(2, (0, core_1.inject)('userProfile')),
    (0, tslib_1.__metadata)("design:paramtypes", [facades_1.CoreBankingFacade, Object, Object])
], CoreBankingController);
exports.CoreBankingController = CoreBankingController;
//# sourceMappingURL=core-banking.controller.js.map