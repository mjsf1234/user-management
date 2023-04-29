"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdcomIntegrationController = void 0;
const tslib_1 = require("tslib");
const authorization_1 = require("@loopback/authorization");
const core_1 = require("@loopback/core");
const rest_1 = require("@loopback/rest");
const idcom_integration_facade_1 = require("../facades/idcom-integration.facade");
const API_PREFIX = 'IDCOM';
/**
 * Controller for IDCOM Integration.
 */
let IdcomIntegrationController = class IdcomIntegrationController {
    constructor(idcomIntegrationFacade, userProfile) {
        this.idcomIntegrationFacade = idcomIntegrationFacade;
        this.userProfile = userProfile;
    }
    /**
     *  This Endpoint fetch auth coe and redirect url
     * @param idcomProps
     * @returns
     */
    async getAuthCode(device) {
        return this.idcomIntegrationFacade.getAuthCode(this.userProfile.appUserId, device.deviceId, this.userProfile.TrxId);
    }
    async getIdToken(idcomProps) {
        return this.idcomIntegrationFacade.getIdToken(idcomProps, this.userProfile.TrxId);
    }
    async decryptIdToken(idcomProps) {
        return this.idcomIntegrationFacade.decryptIdToken(idcomProps, this.userProfile.TrxId);
    }
};
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`${API_PREFIX}/getAuthCode/{userId}`),
    (0, rest_1.response)(200, {
        description: 'Fetching auth code from idcom',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    title: 'getAuthCode response body',
                    properties: {
                        redirectUrl: { type: 'string' },
                        success: { type: 'boolean' }
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
                    required: ['deviceId'],
                    properties: {
                        deviceId: {
                            type: 'number'
                        }
                    }
                }
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], IdcomIntegrationController.prototype, "getAuthCode", null);
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`${API_PREFIX}/getIdToken`),
    (0, rest_1.response)(200, {
        description: 'Request body of getIdToken',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    title: 'getAuthCode response body',
                    properties: {
                        authCode: { type: 'string' },
                        IDToken: { type: 'string' },
                        authStatus: { type: 'string' },
                        success: { type: 'boolean' }
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
                        authCode: { type: 'string' }
                    }
                }
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], IdcomIntegrationController.prototype, "getIdToken", null);
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`${API_PREFIX}/decryptIdToken`),
    (0, rest_1.response)(200, {
        description: 'Request body of decryptIdToken',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    title: 'decryptIdToken response body',
                    properties: {
                        customerID: { type: 'number' },
                        fintechID: { type: 'string' },
                        mobileNo: { type: 'number' },
                        panNo: { type: 'string' },
                        success: { type: 'boolean' }
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
                        idToken: { type: 'string' },
                        scope: { type: 'string' }
                    }
                }
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], IdcomIntegrationController.prototype, "decryptIdToken", null);
IdcomIntegrationController = (0, tslib_1.__decorate)([
    (0, authorization_1.authorize)({}),
    (0, tslib_1.__param)(0, (0, core_1.service)(idcom_integration_facade_1.IdcomIntegrationFacade)),
    (0, tslib_1.__param)(1, (0, core_1.inject)('userProfile')),
    (0, tslib_1.__metadata)("design:paramtypes", [idcom_integration_facade_1.IdcomIntegrationFacade, Object])
], IdcomIntegrationController);
exports.IdcomIntegrationController = IdcomIntegrationController;
//# sourceMappingURL=idcom-integration.controller.js.map