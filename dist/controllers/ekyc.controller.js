"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EkycController = void 0;
const tslib_1 = require("tslib");
const authorization_1 = require("@loopback/authorization");
const core_1 = require("@loopback/core");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const facades_1 = require("../facades");
const common_1 = require("common");
const API_PREFIX = models_1.Ekyc.modelName;
let EkycController = class EkycController {
    constructor(ekycFacade, userProfile, additionalHeaders) {
        this.ekycFacade = ekycFacade;
        this.userProfile = userProfile;
        this.additionalHeaders = additionalHeaders;
    }
    //verify ekyc api
    async fetchKRAKYC(request) {
        // @ts-ignore:
        return this.ekycFacade.fetchKRAKYC(this.userProfile.appUserId, true, this.userProfile.TrxId, this.additionalHeaders);
    }
    //verify ekyc api by id
    async fetchKRAKYCBYID(data) {
        // @ts-ignore:
        return this.ekycFacade.fetchKRAKYC(data.userId, true, this.userProfile.TrxId, this.additionalHeaders);
    }
    //get pan ekyc
    async updateKRAKYC(request) {
        // @ts-ignore:
        return this.ekycFacade.updateKRAKYC(this.userProfile.appUserId, this.userProfile.TrxId);
    }
    async kycCompleted(id) {
        common_1.PathParamsValidations.idValidations(id);
        return this.ekycFacade.kycCompleted(id);
    }
};
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/checkEkycStatus`),
    (0, rest_1.response)(200, {
        description: 'fetch KRAKYC',
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
    (0, tslib_1.__param)(0, (0, core_1.inject)(rest_1.RestBindings.Http.REQUEST)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], EkycController.prototype, "fetchKRAKYC", null);
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}/checkEkycStatusById`),
    (0, rest_1.response)(200, {
        description: 'fetch KRAKYC',
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
                    required: ['userId'],
                    properties: {
                        userId: {
                            type: 'string',
                            pattern: '[0-9]',
                            minLength: 0
                        }
                    },
                    example: {
                        userId: '1'
                    }
                }
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], EkycController.prototype, "fetchKRAKYCBYID", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/verifyPan`),
    (0, rest_1.response)(200, {
        description: 'Verify EKYC PAN CONTROLLER',
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
    (0, tslib_1.__param)(0, (0, core_1.inject)(rest_1.RestBindings.Http.REQUEST)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], EkycController.prototype, "updateKRAKYC", null);
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}/{id}/kycCompleted`),
    (0, rest_1.response)(200, {
        description: 'Setting is_kyc_done flag to TRUE',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    example: { success: true }
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], EkycController.prototype, "kycCompleted", null);
EkycController = (0, tslib_1.__decorate)([
    (0, authorization_1.authorize)({}),
    (0, tslib_1.__param)(0, (0, core_1.service)(facades_1.EkycFacade)),
    (0, tslib_1.__param)(1, (0, core_1.inject)('userProfile')),
    (0, tslib_1.__param)(2, (0, core_1.inject)('additionalHeaders')),
    (0, tslib_1.__metadata)("design:paramtypes", [facades_1.EkycFacade, Object, Object])
], EkycController);
exports.EkycController = EkycController;
//# sourceMappingURL=ekyc.controller.js.map