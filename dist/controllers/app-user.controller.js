"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppUserController = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const common_1 = require("common");
const facades_1 = require("../facades");
const authorization_1 = require("@loopback/authorization");
const common_2 = require("common");
const API_PREFIX = common_1.AppUser.modelName;
//Only REST related logic to be written inside a controller.
//Strictly no use of repositories
let AppUserController = class AppUserController {
    constructor(appUserFacade, adobNtbFacade, userProfile, additionalHeaders, response, familyMappingFacade, res) {
        this.appUserFacade = appUserFacade;
        this.adobNtbFacade = adobNtbFacade;
        this.userProfile = userProfile;
        this.additionalHeaders = additionalHeaders;
        this.response = response;
        this.familyMappingFacade = familyMappingFacade;
        this.res = res;
    }
    async create(appUser) {
        return this.appUserFacade.create(appUser);
    }
    async adobeAnalyticsSA(adobeNtbUser) {
        return this.adobNtbFacade.create(adobeNtbUser);
    }
    async count(where) {
        return this.appUserFacade.count(where);
    }
    async find(filter) {
        return this.appUserFacade.find(filter);
    }
    async fetchAppUsers(filter) {
        return this.appUserFacade.find(filter);
    }
    async updateAll(appUser, where) {
        return this.appUserFacade.updateAll(appUser, where);
    }
    async findById(id, filter) {
        return this.appUserFacade.findById(id, filter);
    }
    async updateById(id, appUser) {
        await this.appUserFacade.updateById(id, appUser);
    }
    async replaceById(id, appUser) {
        await this.appUserFacade.replaceById(id, appUser);
    }
    async deleteById(id) {
        await this.appUserFacade.deleteById(id);
    }
    async fetchUserDetailsByToken(request) {
        // @ts-ignore:
        return this.appUserFacade.fetchUserDetailsByToken(request.headers['Authorization'] || request.headers['authorization']);
    }
    async logout(id, crendentials, request) {
        common_2.PathParamsValidations.idValidations(id);
        // @ts-ignore:
        return this.appUserFacade.logout(id, crendentials.deviceUniqueId, request.headers['Authorization'] || request.headers['authorization'], request, this.additionalHeaders);
    }
    async loginWithMpin(crendentials, request) {
        return this.appUserFacade.loginWithMpin(crendentials.deviceUniqueId, crendentials.mpin, request, this.additionalHeaders);
    }
    async loginWithBiometric(crendentials, request) {
        return this.appUserFacade.loginWithBiometric(crendentials.deviceUniqueId, crendentials.biometricSignature, request, this.additionalHeaders);
    }
    async loginWithPassword(crendentials, request) {
        return this.appUserFacade.loginWithPassword(crendentials.userCode, crendentials.password, request, this.additionalHeaders);
    }
    async loginWithPasswordMock(crendentials, request) {
        return this.appUserFacade.loginWithPasswordMock2(crendentials.userCode, crendentials.password);
    }
    async getPersonalDetailsById(userId) {
        common_2.PathParamsValidations.idValidations(userId);
        return this.appUserFacade.getPersonalDetailsById(userId);
    }
    //review User Details
    // this api is consolidation of fetchAddress,fetchPersonal,fetchProfessionalDetails
    async reviewUserDetails(userId) {
        common_2.PathParamsValidations.idValidations(userId);
        return this.appUserFacade.reviewUserDetails(userId, false, this.additionalHeaders);
    }
    async updatePersonalDetailsById(id, personalDetails) {
        common_2.PathParamsValidations.idValidations(id);
        return this.appUserFacade.updatePersonalDetailsById(id, personalDetails);
    }
    async getAddressDetailsById(userId) {
        common_2.PathParamsValidations.idValidations(userId);
        return this.appUserFacade.getAddressDetailsById(userId);
    }
    async fetchCorrespondenceAddressDetails(userId) {
        common_2.PathParamsValidations.idValidations(userId);
        return this.appUserFacade.fetchCorrespondenceAddressDetails(userId, this.additionalHeaders);
    }
    async getProfessionalDetailsById(userId) {
        common_2.PathParamsValidations.idValidations(userId);
        return this.appUserFacade.getProfessionalDetailsById(userId, this.additionalHeaders);
    }
    async updateProfessionalDetailsById(id, professionalDetails) {
        common_2.PathParamsValidations.idValidations(id);
        return this.appUserFacade.updateProfessionalDetailsById(id, professionalDetails, this.additionalHeaders);
    }
    async updateAddressDetailsById(id, addressDetails) {
        common_2.PathParamsValidations.idValidations(id);
        return this.appUserFacade.updateAddressDetailsById(id, addressDetails);
    }
    async setupMpin(request, id, data) {
        common_2.PathParamsValidations.idValidations(id);
        return this.appUserFacade.setupMpin(id, data, request);
    }
    async resetMpin(id, data) {
        common_2.PathParamsValidations.idValidations(id);
        return this.appUserFacade.resetMpin(id, data);
    }
    async setupBiometric(id, data) {
        common_2.PathParamsValidations.idValidations(id);
        return this.appUserFacade.setupBiometric(id, data);
    }
    //disable biometric
    async disableBiometric(id, data) {
        common_2.PathParamsValidations.idValidations(id);
        return this.appUserFacade.disableBiometric(id, data);
    }
    async generateOTP(contactDetails) {
        var _a;
        let env = ((_a = process.env.MOCK_OTP) !== null && _a !== void 0 ? _a : '');
        if (env.toLowerCase() === 'true') {
            return this.appUserFacade.generateOTPMock(contactDetails, this.userProfile.TrxId, this.userProfile.ip);
        }
        else {
            return this.appUserFacade.generateOTP(contactDetails, this.userProfile.TrxId, this.userProfile.ip);
        }
    }
    async updatePANOrDOB(id, panAndDOBDetails) {
        common_2.PathParamsValidations.idValidations(id);
        return await this.appUserFacade.updatePANOrDOB(id, panAndDOBDetails, this.userProfile, this.additionalHeaders);
    }
    async verifyOTP(contactDetails, request) {
        //todo - remove the mock part. only in place as bank otp is not working
        var _a;
        let env = ((_a = process.env.MOCK_OTP) !== null && _a !== void 0 ? _a : '');
        if (env.toLowerCase() === 'true') {
            return this.appUserFacade.verifyOTPMock(contactDetails, request, this.userProfile.TrxId);
        }
        else {
            return this.appUserFacade.verifyOTP(contactDetails, request, this.userProfile.TrxId);
        }
    }
    async checkIfExistingWealthfyCustomer(customerId) {
        return this.appUserFacade.checkIfExistingWealthfyCustomer(customerId, this.userProfile.TrxId);
    }
    async handleIdcomCallback(authCode, success, errorCode, errorMessage) {
        var _a;
        const { logParams } = this.additionalHeaders;
        const response = await this.appUserFacade.handleIdcomCallback(authCode, success, this.userProfile, this.additionalHeaders, errorCode, errorMessage);
        common_1.LogApiCallUtils.sendMessageIncomingApiCall({
            url: logParams.url,
            request: logParams.query,
            response: response,
            success: (_a = response.success) !== null && _a !== void 0 ? _a : false,
            externalSystemName: common_1.Option.GLOBALOPTIONS.EXTERNALAPISYSTEMNAME.IDCOM,
        });
        return response;
    }
    async handleEkycCallback(data) {
        const { logParams } = this.additionalHeaders;
        const response = await this.appUserFacade.handleEkycCallback(data);
        common_1.LogApiCallUtils.sendMessageIncomingApiCall({
            url: logParams.url,
            request: data,
            response: response,
            success: response.status,
            externalSystemName: common_1.Option.GLOBALOPTIONS.EXTERNALAPISYSTEMNAME.EKYC,
        });
        return response;
    }
    async pollCallBackStatus(userId, idcomProps) {
        common_2.PathParamsValidations.idValidations(userId);
        return this.appUserFacade.getCallBackStatus(userId, idcomProps.authCode, this.additionalHeaders);
    }
    async updateContactDetails(id, deviceId, contactInfo) {
        common_2.PathParamsValidations.idValidations(id);
        common_2.PathParamsValidations.idValidations(deviceId);
        return await this.appUserFacade.updateContactDetails(id, deviceId, contactInfo.email, contactInfo.PAN);
    }
    async sendRequestforFamilyAddition(id, memberDetails) {
        common_2.PathParamsValidations.idValidations(id);
        return this.familyMappingFacade.sendRequestforFamilyAddition(id, memberDetails);
    }
    async approveRejectFamilyRequest(id, parentDetails) {
        common_2.PathParamsValidations.idValidations(id);
        return this.familyMappingFacade.approveRejectFamilyRequest(id, parentDetails);
    }
    async getParents(id) {
        common_2.PathParamsValidations.idValidations(id);
        return this.familyMappingFacade.getParents(id);
    }
    async getChildren(id) {
        common_2.PathParamsValidations.idValidations(id);
        return this.familyMappingFacade.getChildren(id);
    }
    async removeChild(id, childDetails) {
        common_2.PathParamsValidations.idValidations(id);
        return this.familyMappingFacade.removeChild(id, childDetails);
    }
    async removeParent(id, parentDetails) {
        common_2.PathParamsValidations.idValidations(id);
        return this.familyMappingFacade.removeParent(id, parentDetails);
    }
    async getPendingRequests(id) {
        common_2.PathParamsValidations.idValidations(id);
        return this.familyMappingFacade.getPendingRequests(id);
    }
    async getSentRequestsPending(id) {
        common_2.PathParamsValidations.idValidations(id);
        return this.familyMappingFacade.getSentRequestsPending(id);
    }
    // @TODO remove userId
    async processEmail(id) {
        common_2.PathParamsValidations.idValidations(id);
        return this.appUserFacade.processEmail(id);
    }
    async getDematAcc(id, customerId) {
        common_2.PathParamsValidations.idValidations(id);
        common_2.PathParamsValidations.idValidations(customerId);
        let env = process.env.NODE_ENV;
        if (env.toLowerCase() === 'dev') {
            return this.appUserFacade.mockGetDematAcc(id, customerId, this.userProfile.TrxId);
        }
        else {
            return this.appUserFacade.getDematAcc(id, customerId, this.userProfile.TrxId);
        }
    }
    async getSignature(id) {
        common_2.PathParamsValidations.idValidations(id);
        let env = process.env.NODE_ENV;
        // if (env.toLowerCase() === 'dev') {
        //   return this.appUserFacade.mockGetDematAcc(id,customerId);
        // } else {
        return this.appUserFacade.getSignature(id, this.userProfile.TrxId);
        // }
    }
    async uploadCamsRtaFile(rtaId, request) {
        //@Todo - userID to be changed to pick from token later when authentication is implemented
        return this.appUserFacade.uploadRtaFile(this.userProfile.appUserId, rtaId, request, this.response, this.additionalHeaders);
    }
    async exportSampleFile(rtaId) {
        return this.appUserFacade.exportSampleFile(rtaId, this.additionalHeaders);
    }
    async exportAuditTrial(auditTrailFileId) {
        return this.appUserFacade.exportAuditTrail(this.res, auditTrailFileId, this.additionalHeaders);
    }
    async uploadSignature(id, request) {
        common_2.PathParamsValidations.idValidations(id);
        return this.appUserFacade.uploadSignature(id, request, this.response);
    }
    //Only for testing validating mfrta
    async mfrta(id) {
        common_2.PathParamsValidations.idValidations(id);
        return this.appUserFacade.validateMfRtaFields(id, this.additionalHeaders);
    }
    async investmentAccountCreated(id) {
        common_2.PathParamsValidations.idValidations(id);
        return this.appUserFacade.investmentAccountCreated(id);
    }
    async fetchExistingNominee(id) {
        common_2.PathParamsValidations.idValidations(id);
        return this.appUserFacade.fetchExistingNominee(id, this.userProfile.TrxId, this.additionalHeaders);
    }
    async logoutInternalUser(id, request) {
        common_2.PathParamsValidations.idValidations(id);
        // @ts-ignore:
        return this.appUserFacade.logoutInternalUser(id, request.headers['Authorization'] || request.headers['authorization'], this.additionalHeaders);
    }
    async generateOTPForTransaction(id, cartDetails) {
        var _a;
        let env = ((_a = process.env.MOCK_OTP) !== null && _a !== void 0 ? _a : '');
        if (env.toLowerCase() === 'true') {
            return await this.appUserFacade.generateOTPForTransactionMock(id, cartDetails.cartItemId, this.additionalHeaders);
        }
        else {
            return await this.appUserFacade.generateOTPForTransaction(id, cartDetails.cartItemId, this.additionalHeaders);
        }
    }
    async verifyOTPForTransaction(id, contactDetails, request) {
        var _a;
        let env = (_a = process.env.MOCK_OTP) !== null && _a !== void 0 ? _a : '';
        if (env.toLowerCase() === 'true') {
            return await this.appUserFacade.verifyOTPForTransactionMock(id, contactDetails, request, this.additionalHeaders);
        }
        else {
            return await this.appUserFacade.verifyOTPForTransaction(id, contactDetails, request, this.additionalHeaders);
        }
    }
    async updateDecleration(id, data) {
        common_2.PathParamsValidations.idValidations(id);
        return this.appUserFacade.updateDecleration(id, data, this.additionalHeaders);
    }
};
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'AppUser model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(common_1.AppUser) } }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.AppUser, {
                    title: 'New AppUser',
                    exclude: ['id']
                })
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AppUserController.prototype, "create", null);
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}/adobeAnalyticsSA`),
    (0, rest_1.response)(200, {
        description: 'AppUser model instance',
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
                schema: (0, rest_1.getModelSchemaRef)(common_1.AdobeNtbUser, {
                    title: 'Adobe ntb',
                    exclude: ['id', 'appUserId', 'isActive', 'createdDate', 'lastModifiedDate', 'additionalProp1']
                })
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AppUserController.prototype, "adobeAnalyticsSA", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/count`),
    (0, rest_1.response)(200, {
        description: 'AppUser model count',
        content: { 'application/json': { schema: repository_1.CountSchema } }
    }),
    (0, tslib_1.__param)(0, rest_1.param.where(common_1.AppUser)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AppUserController.prototype, "count", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'Array of AppUser model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(common_1.AppUser, { includeRelations: false })
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.filter(common_1.AppUser)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AppUserController.prototype, "find", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/fetchAppUsers`),
    (0, rest_1.response)(200, {
        description: 'Array of AppUser model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(common_1.AppUser, { includeRelations: false })
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.filter(common_1.AppUser)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AppUserController.prototype, "fetchAppUsers", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'AppUser PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.AppUser, { partial: true })
            }
        }
    })),
    (0, tslib_1.__param)(1, rest_1.param.where(common_1.AppUser)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [common_1.AppUser, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AppUserController.prototype, "updateAll", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(200, {
        description: 'AppUser model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.AppUser, { includeRelations: false })
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, rest_1.param.filter(common_1.AppUser, { exclude: 'where' })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AppUserController.prototype, "findById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'AppUser PATCH success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.AppUser, { partial: true })
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, common_1.AppUser]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AppUserController.prototype, "updateById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.put)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'AppUser PUT success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, common_1.AppUser]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AppUserController.prototype, "replaceById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.del)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'AppUser DELETE success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AppUserController.prototype, "deleteById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/fetchUserDetailsByToken`),
    (0, rest_1.response)(200, {
        description: 'For fetching user details for a user',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.AppUser, { includeRelations: true })
            }
        },
        param: rest_1.param
    }),
    (0, tslib_1.__param)(0, (0, core_1.inject)(rest_1.RestBindings.Http.REQUEST)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AppUserController.prototype, "fetchUserDetailsByToken", null);
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}/{id}/logout`),
    (0, rest_1.response)(200, {
        description: 'For logging out a user',
        content: {
            'application/json': {
                schema: {
                    type: 'object'
                },
                example: {
                    success: true
                }
            }
        },
        param: rest_1.param
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    required: ['deviceUniqueId'],
                    properties: {
                        deviceUniqueId: {
                            type: 'string',
                            pattern: '^[a-zA-Z0-9-]{16,36}'
                        }
                    },
                    example: {
                        deviceUniqueId: 'afsdfasfgasfsafaqfasf'
                    }
                }
            }
        }
    })),
    (0, tslib_1.__param)(2, (0, core_1.inject)(rest_1.RestBindings.Http.REQUEST)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, Object, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AppUserController.prototype, "logout", null);
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}/loginWithMpin`),
    (0, rest_1.response)(200, {
        description: 'login function for an existing user using device id and mpin',
        content: {
            'application/json': {
                schema: {
                    example: {
                        appAccessToken: 'dfggrwfasfgegwarsgfasgvaeg'
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
                    required: ['deviceUniqueId', 'mpin'],
                    properties: {
                        deviceUniqueId: {
                            type: 'string',
                            pattern: '^[a-zA-Z0-9-]{16,36}'
                        },
                        mpin: {
                            type: 'string',
                            pattern: '^\\d{4}$',
                            minLength: 0,
                            maxLength: 4
                        }
                    }
                },
                example: {
                    deviceUniqueId: 'afsdfasfgasfsafaqfasf',
                    mpin: '1234'
                }
            }
        }
    })),
    (0, tslib_1.__param)(1, (0, core_1.inject)(rest_1.RestBindings.Http.REQUEST)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AppUserController.prototype, "loginWithMpin", null);
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}/loginWithBiometric`),
    (0, rest_1.response)(200, {
        description: 'login function for an existing user using device id and mpin',
        content: {
            'application/json': {
                schema: {
                    example: {
                        appAccessToken: 'dfggrwfasfgegwarsgfasgvaeg'
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
                    required: ['deviceUniqueId', 'biometricToken'],
                    properties: {
                        deviceUniqueId: {
                            type: 'string',
                            pattern: '^[a-zA-Z0-9-]{16,36}'
                        },
                        biometricSignature: {
                            type: 'string'
                        }
                    }
                },
                example: {
                    deviceUniqueId: 'afsdfasfgasfsafaqfasf',
                    biometricSignature: '0bd623cf76bf35d1c709043ceef80032'
                }
            }
        }
    })),
    (0, tslib_1.__param)(1, (0, core_1.inject)(rest_1.RestBindings.Http.REQUEST)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AppUserController.prototype, "loginWithBiometric", null);
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}/loginWithPassword`),
    (0, rest_1.response)(200, {
        description: 'login function for an existing user using user id and password',
        content: {
            'application/json': {
                schema: {
                    example: {
                        appAccessToken: 'dfggrwfasfgegwarsgfasgvaeg'
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
                    required: ['userCode', 'password'],
                    properties: {
                        userCode: {
                            type: 'string',
                            minLength: 0,
                            maxLength: 50
                        },
                        password: {
                            type: 'string',
                            minLength: 0,
                            maxLength: 255
                        }
                    }
                },
                example: {
                    userCode: 'jack12',
                    password: '1234'
                }
            }
        }
    })),
    (0, tslib_1.__param)(1, (0, core_1.inject)(rest_1.RestBindings.Http.REQUEST)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AppUserController.prototype, "loginWithPassword", null);
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}/loginWithPasswordMock`),
    (0, rest_1.response)(200, {
        description: 'login function for an existing user using user id and password',
        content: {
            'application/json': {
                schema: {
                    example: {
                        appAccessToken: 'dfggrwfasfgegwarsgfasgvaeg'
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
                    required: ['userCode', 'password'],
                    properties: {
                        userCode: {
                            type: 'string',
                            minLength: 0,
                            maxLength: 50
                        },
                        password: {
                            type: 'string',
                            minLength: 0,
                            maxLength: 255
                        }
                    }
                },
                example: {
                    userCode: 'jack12',
                    password: '1234'
                }
            }
        }
    })),
    (0, tslib_1.__param)(1, (0, core_1.inject)(rest_1.RestBindings.Http.REQUEST)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AppUserController.prototype, "loginWithPasswordMock", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/{id}/fetchPersonalDetails`),
    (0, rest_1.response)(200, {
        description: 'For fetching personal details of user',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    example: `{
            data: {
              name: 'string',
              gender: '',
              genderLabel: '',
              email: 'string',
              contactNumber: '0123456789',
              contactNumberCountryCode: '+91',
              PAN: 'fghfh',
              nationality: '',
              nationalityId: null,
              dateOfBirth: null,
              birthCity: '',
              birthState: '',
              birthStateId: null,
              fatherName: '',
              motherName: '',
              spouseName: '',
              maritalStatus: null,
              maritalStatusLabel: '',
              identificationType: '',
              identificationTypeId: null
            },
            metaData: {
              accountOpening: {
                name: 'string',
                gender: '',
                email: 'string',
                contactNumber: '0123456789',
                PAN: 'fghfh',
                nationality: '',
                dateOfBirth: null,
                birthCity: '',
                fatherName: '',
                motherName: '',
                spouseName: '',
                maritalStatus: '',
                birthState: ''
              },
              mfKYC: {
                name: 'string',
                gender: '',
                email: 'string',
                contactNumber: '0123456789',
                PAN: 'fghfh',
                nationality: '',
                dateOfBirth: null,
                fatherName: '',
                maritalStatus: ''
              },
              mfRTA: {
                name: 'string',
                email: 'string',
                contactNumber: '0123456789',
                PAN: 'fghfh',
                nationality: '',
                dateOfBirth: null,
                maritalStatus: '',
                birthCity: '',
                identificationType: '',
                birthState: ''
              }
            }
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
], AppUserController.prototype, "getPersonalDetailsById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/{id}/reviewUserDetails`),
    (0, rest_1.response)(200, {
        description: 'For fetching user details for review',
        content: {
            'application/json': {
                schema: {
                    type: 'object'
                }
            }
        },
        param: rest_1.param
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AppUserController.prototype, "reviewUserDetails", null);
(0, tslib_1.__decorate)([
    (0, rest_1.put)(`/${API_PREFIX}/{id}/updatePersonalDetails`),
    (0, rest_1.response)(200, {
        description: 'User personal details PUT success',
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
                    required: ['name', 'gender', 'email', 'contactNumber', 'contactNumberCountryCode', 'PAN', 'birthState', 'nationality', 'fatherName', 'mothersName', 'maritalStatus', 'identificationType'],
                    properties: {
                        name: {
                            type: 'string',
                            pattern: '^[A-Za-z\\s]{1,}[\\.]{0,1}[A-Za-z\\s]{0,}$',
                            minLength: 1,
                            maxLength: 255
                        },
                        gender: {
                            type: 'string',
                            minLength: 0,
                            maxLength: 6
                        },
                        email: {
                            type: 'string',
                            pattern: '^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$'
                        },
                        contactNumber: {
                            type: 'string',
                            pattern: '^\\d{7,12}$'
                        },
                        contactNumberCountryCode: {
                            type: 'string',
                            pattern: '^(\\+?\\d{1,3}|\\d{1,4})$'
                        },
                        PAN: {
                            type: 'string',
                            pattern: '([A-Z]){5}([0-9]){4}([A-Z]){1}$'
                        },
                        birthState: {
                            type: 'string',
                            minLength: 0,
                            maxLength: 10
                        },
                        nationality: {
                            type: 'string',
                            minLength: 0,
                            maxLength: 10
                        },
                        fatherName: {
                            type: 'string',
                            pattern: '^[A-Za-z\\s]{1,}[\\.]{0,1}[A-Za-z\\s]{0,}$',
                            minLength: 1,
                            maxLength: 255
                        },
                        mothersName: {
                            type: 'string',
                            pattern: '^[A-Za-z\\s]{1,}[\\.]{0,1}[A-Za-z\\s]{0,}$',
                            minLength: 1,
                            maxLength: 255
                        },
                        spouseName: {
                            type: 'string',
                            pattern: '^[A-Za-z\\s]{1,}[\\.]{0,1}[A-Za-z\\s]{0,}$',
                            maxLength: 100
                        },
                        maritalStatus: {
                            type: 'string',
                            minLength: 1,
                            maxLength: 2
                        },
                        identificationType: {
                            type: 'string',
                            minLength: 1,
                            maxLength: 2
                        }
                    },
                    example: `{
              name: 'abc',
              gender: 2,
              email: 'abc@me.com',
              contactNumber: '0123456789',
              contactNumberCountryCode: '+91',
              PAN: 'nbbm',
              birthState: 2,
              dateOfBirth: '1991-12-03',
              birthCity: 'Jaipur',
              nationality: 1,
              fatherName: '',
              mothersName: '',
              spouseName: '',
              maritalStatus: 2,
              identificationType: 2
            }`
                }
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, common_1.AppUser]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AppUserController.prototype, "updatePersonalDetailsById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/{id}/fetchAddressDetails`),
    (0, rest_1.response)(200, {
        description: 'For fetching Address details of user',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    example: `{
            data: {
              correspondenceAddress: {
                addressLine1: '',
                addressLine2: '',
                city: '',
                pincode: '',
                landmark: '',
                state: '',
                stateId: null,
                addressType: '',
                addressTypeId: null,
                country: '',
                countryId: null,
                proofOfAddress: ''
              },
              permanentAddress: {
                addressLine1: '',
                addressLine2: '',
                city: '',
                pincode: '',
                landmark: '',
                state: '',
                stateId: null,
                addressType: '',
                addressTypeId: null,
                country: '',
                countryId: null,
                proofOfAddress: ''
              },
              overseesAddress: {
                addressLine1: '',
                addressLine2: '',
                city: '',
                pincode: '',
                landmark: '',
                stateId: '',
                state: null,
                addressType: '',
                addressTypeId: null,
                country: '',
                countryId: null
              }
            },
            metaData: {
              correspondenceAddress: {
                accountOpening: {
                  addressLine1: '',
                  addressLine2: '',
                  city: '',
                  pincode: '',
                  landmark: '',
                  state: ''
                },
                mfKYC: {
                  addressLine1: '',
                  addressLine2: '',
                  city: '',
                  pincode: '',
                  landmark: '',
                  state: '',
                  addressType: '',
                  country: '',
                  proofOfAddress: ''
                },
                mfRTA: {
                  addressLine1: '',
                  addressLine2: '',
                  city: '',
                  pincode: '',
                  landmark: '',
                  state: '',
                  country: ''
                }
              },
              permanentAddress: {
                accountOpening: {
                  addressLine1: '',
                  addressLine2: '',
                  city: '',
                  pincode: '',
                  landmark: ''
                },
                mfKYC: {
                  addressLine1: '',
                  addressLine2: '',
                  city: '',
                  pincode: '',
                  landmark: '',
                  state: '',
                  addressType: '',
                  country: '',
                  proofOfAddress: ''
                },
                mfRTA: {
                  addressLine1: '',
                  addressLine2: '',
                  city: '',
                  pincode: ''
                }
              },
              overseesAddress: {
                accountOpening: {
                  addressLine1: '',
                  addressLine2: '',
                  city: '',
                  pincode: ''
                },
                mfKYC: {
                  addressLine1: '',
                  addressLine2: '',
                  city: '',
                  pincode: ''
                },
                mfRTA: {
                  addressLine1: '',
                  addressLine2: '',
                  city: '',
                  pincode: '',
                  landmark: '',
                  state: '',
                  country: ''
                }
              }
            }
          }`
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AppUserController.prototype, "getAddressDetailsById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/{id}/fetchCorrespondenceAddressDetails`),
    (0, rest_1.response)(200, {
        description: 'For fetching Address details of user',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    example: ` correspondenceAddress: {
            "addressLine1": "line11",
            "addressLine2": "line21",
            "addressLine3": "line31",
            "pincode": "930199",
            "landmark": "SOC SEC",
            "state": "Andhra Pradesh",
            "stateId": 2,
            "addressType": "Residential",
            "addressTypeId": 2,
            "country": "India",
            "countryId": 106
          }`
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AppUserController.prototype, "fetchCorrespondenceAddressDetails", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/{id}/fetchProfessionalDetails`),
    (0, rest_1.response)(200, {
        description: 'For fetching professional details of user',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    example: ` {
            data: {
              employerName: 'A',
              employerCategory: '',
              occupationId: 5,
              occupation: 'Retired',
              sourceOfFunds: 'Rental Income',
              sourceOfFundsId: 5,
              grossAnnualIncome: '> 25 Lacs < = 1 Crore',
              grossAnnualIncomeId: 5,
              politicalExposure: 'Yes',
              grossMonthlyIncome: '> 25 Lacs < = 1 Crore',
              grossMonthlyIncomeId: 5,
              countryOfTaxResidency: 'Andorra',
              countryOfTaxResidencyId: 1,
              taxIdentificationNumber: '',
              taxStatus: 'AOP/BOI',
              taxStatusId: 5,
              countryId:106,
              country:'India',
              birthCity:'Mumbai',
              fatherName:'Jackson',
              motherName: 'Olivia',
              spouseName: 'Natasha',
              maritalStatus:'Single',
              addressTypeId:'Resiidential',
              taxResident:'No'
            },
            metaData: {
              accountOpening: {
                employerName: 'A',
                employerCategory: '',
                occupation: 'Retired',
                sourceOfFunds: 'Rental Income',
                grossAnnualIncome: '> 25 Lacs < = 1 Crore',
                grossMonthlyIncome: '> 25 Lacs < = 1 Crore',
                countryOfTaxResidency: 'Andorra',
                taxStatus: 'AOP/BOI'
              },
              mfRTA: {
                occupation: 'Retired',
                sourceOfFunds: 'Rental Income',
                grossAnnualIncome: '> 25 Lacs < = 1 Crore',
                countryOfTaxResidency: 'Andorra',
                taxIdentificationNumber: '',
                taxStatus: 'AOP/BOI'
              }
            }
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
], AppUserController.prototype, "getProfessionalDetailsById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.put)(`/${API_PREFIX}/{id}/updateProfessionalDetails`),
    (0, rest_1.response)(200, {
        description: 'User personal details PUT success',
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
                    required: ['occupation', 'sourceOfFunds', 'grossAnnualIncome', 'politicalExposure', 'country', 'birthCity', 'fatherName', 'maritalStatus', 'addressTypeId', 'taxResident'],
                    properties: {
                        employerName: {
                            type: 'string',
                            pattern: '^[A-Za-z\\s]{1,}[\\.]{0,1}[A-Za-z\\s]{0,}$',
                            minLength: 1,
                            maxLength: 255
                        },
                        employerCategory: {
                            type: 'string',
                            minLength: 1,
                            maxLength: 100
                        },
                        occupation: {
                            type: 'number',
                            minimum: 1,
                            maximum: 1000,
                        },
                        sourceOfFunds: {
                            type: 'number',
                            minimum: 1,
                            maximum: 1000
                        },
                        grossAnnualIncome: {
                            type: 'number',
                            minimum: 1,
                            maximum: 100
                        },
                        politicalExposure: {
                            type: 'string'
                        },
                        grossMonthlyIncome: {
                            type: 'number',
                            minimum: 1
                        },
                        countryOfTaxResidency: {
                            type: 'number',
                            minimum: 1,
                            maximum: 1000
                        },
                        taxStatus: {
                            type: 'number',
                            minimum: 1
                        },
                        country: {
                            type: 'number',
                            minimum: 1,
                            maximum: 1000
                        },
                        birthCity: {
                            type: 'string',
                            minLength: 3,
                            maxLength: 100
                        },
                        fatherName: {
                            type: 'string',
                            minLength: 3,
                            maximum: 100
                        },
                        motherName: {
                            type: 'string',
                            minLength: 3,
                            maximum: 100
                        },
                        spouseName: {
                            type: 'string',
                            maximum: 100
                        },
                        maritalStatus: {
                            type: 'number',
                            minimum: 1,
                            maximum: 100
                        },
                        addressTypeId: {
                            type: 'number',
                            minimum: 1,
                            maximum: 100
                        },
                        taxResident: {
                            type: 'string',
                            minLength: 2,
                            maxLength: 3
                        },
                        countryOfTaxResidency2: {
                            type: 'number',
                            maximum: 500
                        },
                        countryOfTaxResidency3: {
                            type: 'number',
                            maximum: 500
                        },
                        countryOfTaxResidency4: {
                            type: 'number',
                            maximum: 500
                        },
                        taxIdentificationNumber: {
                            type: 'string',
                            maximum: 100
                        },
                        taxIdentificationNumber2: {
                            type: 'string',
                            maximum: 100
                        },
                        taxIdentificationNumber3: {
                            type: 'string',
                            maximum: 100
                        },
                        taxIdentificationNumber4: {
                            type: 'string',
                            maximum: 100
                        },
                        identificationType: {
                            type: 'number',
                            minimum: 1,
                            maximum: 100
                        },
                        identificationType2: {
                            type: 'number',
                            minimum: 1,
                            maximum: 100
                        },
                        identificationType3: {
                            type: 'number',
                            minimum: 1,
                            maximum: 100
                        },
                        identificationType4: {
                            type: 'number',
                            minimum: 1,
                            maximum: 100
                        }
                    },
                    example: `{
              employerName: 'A',
              employerCategory: 'hh',
              occupation: 5,
              sourceOfFunds: 5,
              grossAnnualIncome: 5,
              politicalExposure: 'Yes',
              grossMonthlyIncome: 5,
              countryOfTaxResidency: 1,
              countryOfTaxResidency2: 4,
              countryOfTaxResidency3: 5,
              taxStatus: 5,
              country: 106,
              birthCity:'Mumbai',
              fatherName:'Jackson',
              motherName: 'Olivia',
              spouseName: 'Natasha',
              maritalStatus:1,
              addressTypeId:10,
              taxResident:'No'
            }`
                }
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AppUserController.prototype, "updateProfessionalDetailsById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.put)(`/${API_PREFIX}/{id}/updateAddressDetails`),
    (0, rest_1.response)(200, {
        description: 'User address details PUT success',
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
                    required: ['correspondenceAddress', 'permanentAddress', 'overseasAddress'],
                    properties: {
                        correspondenceAddress: {
                            type: 'object',
                            properties: {
                                addressLine1: {
                                    type: 'string',
                                    minLength: 0,
                                    maxLength: 200
                                },
                                addressLine2: {
                                    type: 'string',
                                    minLength: 0,
                                    maxLength: 1200
                                },
                                city: {
                                    type: 'string',
                                    minLength: 0,
                                    maximum: 100
                                },
                                pincode: {
                                    type: 'string',
                                    pattern: '[0-9]',
                                    minLength: 0,
                                    maxLength: 6
                                },
                                landmark: {
                                    type: 'string',
                                    minLength: 0,
                                    maxLength: 30
                                },
                                state: {
                                    type: 'string',
                                    pattern: '[0-9]',
                                    minLength: 0,
                                    maxLength: 10
                                },
                                addressType: {
                                    type: 'string',
                                    pattern: '[0-9]',
                                    minLength: 0,
                                    maxLength: 10
                                },
                                country: {
                                    type: 'string',
                                    pattern: '[0-9]',
                                    minLength: 0,
                                    maxLength: 10
                                },
                                proofOfAddress: {
                                    type: 'string',
                                    minLength: 0,
                                    maxLength: 100,
                                }
                            }
                        },
                        permanentAddress: {
                            type: 'object',
                            properties: {
                                addressLine1: {
                                    type: 'string',
                                    minLength: 0,
                                    maxLength: 200
                                },
                                addressLine2: {
                                    type: 'string',
                                    minLength: 0,
                                    maxLength: 120
                                },
                                city: {
                                    type: 'string',
                                    pattern: '[0-9]',
                                    minLength: 0,
                                    maxLength: 10
                                },
                                pincode: {
                                    type: 'string',
                                    pattern: '[0-9]',
                                    minLength: 0,
                                    maxLength: 6
                                },
                                landmark: {
                                    type: 'string',
                                    minLength: 0,
                                    maxLength: 30
                                },
                                state: {
                                    type: 'string',
                                    pattern: '[0-9]',
                                    minLength: 0,
                                    maxLength: 10
                                },
                                addressType: {
                                    type: 'string',
                                    pattern: '[0-9]',
                                    minLength: 0,
                                    maxLength: 10
                                },
                                country: {
                                    type: 'string',
                                    pattern: '[0-9]',
                                    minLength: 0,
                                    maxLength: 10
                                },
                                proofOfAddress: {
                                    type: 'string',
                                    minLength: 0,
                                    maxLength: 100
                                }
                            }
                        },
                        overseasAddress: {
                            type: 'object',
                            properties: {
                                addressLine1: {
                                    type: 'string',
                                    minLength: 0,
                                    maxLength: 200
                                },
                                addressLine2: {
                                    type: 'string',
                                    minLength: 0,
                                    maxLength: 120
                                },
                                city: {
                                    type: 'string',
                                    pattern: '[0-9]',
                                    minLength: 0,
                                    maxLength: 10
                                },
                                pincode: {
                                    type: 'string',
                                    pattern: '[0-9]',
                                    minLength: 0,
                                    maxLength: 6
                                },
                                landmark: {
                                    type: 'string',
                                    minLength: 0,
                                    maxLength: 30
                                },
                                state: {
                                    type: 'string',
                                    pattern: '[0-9]',
                                    minLength: 0,
                                    maxLength: 10
                                },
                                addressType: {
                                    type: 'string',
                                    pattern: '[0-9]',
                                    minLength: 0,
                                    maxLength: 20
                                },
                                country: {
                                    type: 'string',
                                    pattern: '[0-9]',
                                    minLength: 0,
                                    maxLength: 10
                                },
                                proofOfAddress: {
                                    type: 'string'
                                }
                            }
                        }
                    },
                    example: {
                        correspondenceAddress: {
                            addressLine1: 'A-2BCD',
                            addressLine2: '(E)',
                            city: 'Mumbai',
                            pincode: '400056',
                            landmark: '',
                            state: 2,
                            addressType: 2,
                            country: 2,
                            proofOfAddress: ''
                        },
                        permanentAddress: {
                            addressLine1: 'A-2BCD',
                            addressLine2: 'Go',
                            city: 'Mumbai',
                            pincode: '400063',
                            landmark: '',
                            state: 2,
                            addressType: 2,
                            country: 2,
                            proofOfAddress: ''
                        },
                        overseasAddress: {
                            addressLine1: 'A-2BCD',
                            addressLine2: 'E',
                            city: 'Mumbai',
                            pincode: '400063',
                            landmark: '',
                            state: 2,
                            addressType: 2,
                            country: 2,
                            proofOfAddress: ''
                        }
                    }
                }
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AppUserController.prototype, "updateAddressDetailsById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}/{id}/setupMpin`),
    (0, rest_1.response)(200, {
        description: 'AppUser model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(common_1.AppUser) } }
    }),
    (0, tslib_1.__param)(0, (0, core_1.inject)(rest_1.RestBindings.Http.REQUEST)),
    (0, tslib_1.__param)(1, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(2, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    required: ['mpin'],
                    properties: {
                        mpin: {
                            type: 'string',
                            pattern: '^\\d{4}$'
                        }
                    },
                    example: `{
              mpin: '1234'
            }`
                }
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object, Number, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AppUserController.prototype, "setupMpin", null);
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}/{id}/resetMpin`),
    (0, rest_1.response)(200, {
        description: 'AppUser model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(common_1.AppUser) } }
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    required: ['mpin'],
                    properties: {
                        mpin: {
                            type: 'string',
                            pattern: '^\\d{4}$'
                        }
                    },
                    example: `{
              mpin: '1234'
            }`
                }
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AppUserController.prototype, "resetMpin", null);
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}/{id}/setupBiometric`),
    (0, rest_1.response)(200, {
        description: 'Sets up biometric for a device',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(common_1.AppUser) } }
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    required: ['deviceUniqueId'],
                    properties: {
                        deviceUniqueId: {
                            type: 'string',
                            pattern: '^[a-zA-Z0-9-]{16,36}',
                        },
                        pubKey: {
                            type: 'string'
                        }
                    },
                    example: `{
              deviceUniqueId: 'ABCD',
              'pubKey':'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA8vSOTtkiMZzJjNjCKhfo5K7kNAPYs5gc2ustFHnM+dc5+7QPJYKmZ8WPyGoEH555VnEjm2is9PBnFs8WIz8Em+iGRKTbqxDbS95XEQtBgVkgJQPQSdKTXXTik/arPlRLKYq/GY7AC4vrujItx2IQ494c8FYksqpm/eCKrG70S6S5HH7W6/us+BQUvRzZtBoeQmj1iao1irarBJhLWUQDZNT+dVjf4/ry2/NC3OavFlswBPjm5sooimzYTM+DP3Btqet2odnnjrE0BjUmvqyGbWQCb2ti4sWSP5wKIGJtfP9FEyjmW7vGC6O1YTHRpNnufgIHiwxHEYO1vXjmcNEz9wIDAQAB'
            }`
                }
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AppUserController.prototype, "setupBiometric", null);
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}/{id}/disableBiometric`),
    (0, rest_1.response)(200, {
        description: 'Disable biometric on device',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(common_1.AppUser) } }
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    required: ['deviceUniqueId'],
                    properties: {
                        deviceUniqueId: {
                            type: 'string',
                            pattern: '^[a-zA-Z0-9-]{16,36}'
                        }
                    },
                    example: `{
              deviceUniqueId: 'ABCD'
            }`
                }
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AppUserController.prototype, "disableBiometric", null);
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}/generateOTP`),
    (0, rest_1.response)(200, {
        description: 'Generated OTP based on mobile no',
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
                    required: ['contactNumber', 'countryCode'],
                    properties: {
                        contactNumber: {
                            type: 'string',
                            pattern: '^\\d{7,12}$'
                        },
                        countryCode: {
                            type: 'string',
                            pattern: '^(\\+?\\d{1,3}|\\d{1,4})$'
                        }
                    }
                }
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AppUserController.prototype, "generateOTP", null);
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}/{id}/updatePANOrDOB`),
    (0, rest_1.response)(200, {
        description: 'Upserts PAN/DOB.',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    example: {
                        success: true,
                        message: 'Details successfully updated!'
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
                    required: ['deviceId'],
                    properties: {
                        PAN: {
                            type: 'string',
                            pattern: '([A-Z]){5}([0-9]){4}([A-Z]){1}$'
                        },
                        DOB: {
                            type: 'string',
                            pattern: '^\\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$'
                        },
                        deviceId: {
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
], AppUserController.prototype, "updatePANOrDOB", null);
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}/verifyOTP`),
    (0, rest_1.response)(200, {
        description: 'Verify OTP',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    example: {
                        success: true
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
                    required: ['otp', 'contactNumber', 'deviceUniqueId', 'countryCode'],
                    properties: {
                        otp: {
                            type: 'string',
                            pattern: '[0-9]',
                            minLength: 0,
                            maxLength: 6
                        },
                        contactNumber: {
                            type: 'string',
                            pattern: '^\\d{7,12}$'
                        },
                        deviceUniqueId: {
                            type: 'string',
                            pattern: '^[a-zA-Z0-9-]{16,36}'
                        },
                        countryCode: {
                            type: 'string',
                            pattern: '^(\\+?\\d{1,3}|\\d{1,4})$'
                        }
                    }
                }
            }
        }
    })),
    (0, tslib_1.__param)(1, (0, core_1.inject)(rest_1.RestBindings.Http.REQUEST)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AppUserController.prototype, "verifyOTP", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/checkIfExistingWealthfyCustomer`),
    (0, rest_1.response)(200, {
        description: 'Check if wealthfy customer exists',
        content: {
            'application/json': {
                schema: {
                    type: 'boolean'
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.query.string('customerId')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AppUserController.prototype, "checkIfExistingWealthfyCustomer", null);
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`${API_PREFIX}/handleIdcomCallback`),
    (0, rest_1.response)(200, {
        description: 'Request of getIdToken',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    title: 'getAuthCode response body',
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
    (0, tslib_1.__param)(0, rest_1.param.query.string('authcode')),
    (0, tslib_1.__param)(1, rest_1.param.query.boolean('success')),
    (0, tslib_1.__param)(2, rest_1.param.query.number('errorCode ')),
    (0, tslib_1.__param)(3, rest_1.param.query.string('errorMessage ')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String, Boolean, Number, String]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AppUserController.prototype, "handleIdcomCallback", null);
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`${API_PREFIX}/handleEkycCallback`),
    (0, rest_1.response)(200, {
        description: 'Handle Ekyc Callback',
        content: {
            'application/json': {
                schema: {
                    type: 'object'
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
                        errDescription: { type: 'string' },
                        sessId: { type: 'string' },
                        ekycCompleted: { type: 'boolean' },
                        ekycMessage: { type: 'string', nullable: true }
                    }
                }
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AppUserController.prototype, "handleEkycCallback", null);
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}/{id}/pollCallBackStatus`),
    (0, rest_1.response)(200, {
        description: 'For fetching Address details of user',
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
                    required: ['authCode'],
                    properties: {
                        authCode: {
                            type: 'string',
                            minLength: 0
                        }
                    }
                }
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AppUserController.prototype, "pollCallBackStatus", null);
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}/{id}/{deviceId}/updateContactDetails`),
    (0, rest_1.response)(200, {
        description: 'Update contact details',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    example: {
                        success: true,
                        message: 'Details successfully updated!'
                    }
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, rest_1.param.path.number('deviceId')),
    (0, tslib_1.__param)(2, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    required: ['PAN', 'email'],
                    properties: {
                        PAN: {
                            type: 'string',
                            pattern: '([A-Z]){5}([0-9]){4}([A-Z]){1}$'
                        },
                        email: {
                            type: 'string',
                            pattern: '^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$'
                        }
                    }
                }
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, Number, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AppUserController.prototype, "updateContactDetails", null);
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}/{id}/sendRequestforFamilyAddition`),
    (0, rest_1.response)(200, {
        description: 'Generate request to add a member by member userCode',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    example: {
                        success: true,
                        message: 'Family mapping created. Ask member to authenticate on the app.',
                        familyItem: {
                            id: 20,
                            isActive: true,
                            createdDate: '2022-04-15T07:15:27.533Z',
                            lastModifiedDate: '2022-04-15T07:15:27.533Z',
                            name: 'Sharad Singh - 9999999999',
                            familyRequestStatus: 1,
                            numberOfRejects: 0,
                            parentId: 61,
                            childId: 9
                        },
                        parentDetails: {
                            id: 61,
                            name: 'Sharad Singh',
                            userCode: 'INV13124'
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
                    required: ['userCode'],
                    properties: {
                        userCode: {
                            type: 'string',
                            pattern: '^\\d{4,15}$'
                        }
                    }
                }
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AppUserController.prototype, "sendRequestforFamilyAddition", null);
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}/{id}/approveRejectFamilyRequest`),
    (0, rest_1.response)(200, {
        description: 'Approve or reject a family addition request',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    example: {
                        success: true,
                        message: 'Family addition request is successfully approved.'
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
                    required: ['parentId', 'isApproved'],
                    properties: {
                        parentId: {
                            type: 'number',
                            minimum: 1,
                        },
                        isApproved: {
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
], AppUserController.prototype, "approveRejectFamilyRequest", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/{id}/getParents`),
    (0, rest_1.response)(200, {
        description: 'Get the list of parents',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    example: {
                        success: true,
                        parents: [
                            {
                                id: 14,
                                isActive: true,
                                createdDate: '2022-04-14T12:35:00.218Z',
                                lastModifiedDate: '2022-04-15T07:07:31.842Z',
                                name: 'Sharad Singh - Pranav Date',
                                familyRequestStatus: 2,
                                numberOfRejects: 1,
                                lastRejectDate: '2022-04-12T12:48:02.866Z',
                                parentId: 61,
                                childId: 3,
                                familyRequestStatusLabel: 'Approved',
                                parentAppUser: {
                                    id: 61,
                                    name: 'Sharad Singh'
                                }
                            }
                        ]
                    }
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AppUserController.prototype, "getParents", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/{id}/getChildren`),
    (0, rest_1.response)(200, {
        description: 'Get the list of children',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    example: {
                        success: true,
                        families: [
                            {
                                id: 14,
                                isActive: true,
                                createdDate: '2022-04-14T12:35:00.218Z',
                                lastModifiedDate: '2022-04-15T07:07:31.842Z',
                                name: 'Sharad Singh - Pranav Date',
                                familyRequestStatus: 2,
                                numberOfRejects: 1,
                                lastRejectDate: '2022-04-12T12:48:02.866Z',
                                parentId: 61,
                                childId: 3,
                                familyRequestStatusLabel: 'Approved',
                                childAppUser: {
                                    id: 3,
                                    name: 'Pranav Date'
                                }
                            }
                        ]
                    }
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AppUserController.prototype, "getChildren", null);
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}/{id}/removeChild`),
    (0, rest_1.response)(200, {
        description: 'Remove a child',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    example: {
                        success: true,
                        message: 'Child successfully removed.'
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
                    required: ['childId'],
                    properties: {
                        childId: {
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
], AppUserController.prototype, "removeChild", null);
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}/{id}/removeParent`),
    (0, rest_1.response)(200, {
        description: 'Remove a parent',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    example: {
                        success: true,
                        message: 'Parent successfully removed.'
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
                    required: ['parentId'],
                    properties: {
                        parentId: {
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
], AppUserController.prototype, "removeParent", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/{id}/getPendingRequests`),
    (0, rest_1.response)(200, {
        description: 'Get the list of parents from whom family joining requests are pending',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    example: {
                        success: true,
                        parents: [
                            {
                                id: 18,
                                isActive: true,
                                createdDate: '2022-04-14T12:35:56.871Z',
                                lastModifiedDate: '2022-04-14T12:35:56.871Z',
                                name: 'Dharmil - Pranav Date',
                                familyRequestStatus: 1,
                                numberOfRejects: 0,
                                lastRejectDate: null,
                                parentId: 2,
                                childId: 3,
                                familyRequestStatusLabel: 'Initiated',
                                parentAppUser: {
                                    id: 2,
                                    name: 'Dharmil'
                                }
                            }
                        ]
                    }
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AppUserController.prototype, "getPendingRequests", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/{id}/getSentRequestsPending`),
    (0, rest_1.response)(200, {
        description: 'Get the list of children to whom sent request was sent and is pending',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    example: {
                        success: true,
                        families: [
                            {
                                id: 18,
                                isActive: true,
                                createdDate: '2022-04-14T12:35:56.871Z',
                                lastModifiedDate: '2022-04-14T12:35:56.871Z',
                                name: 'Pranav Date - Dharmil',
                                familyRequestStatus: 1,
                                numberOfRejects: 0,
                                lastRejectDate: null,
                                parentId: 2,
                                childId: 3,
                                familyRequestStatusLabel: 'Initiated',
                                childAppUser: {
                                    id: 2,
                                    name: 'Dharmil'
                                }
                            }
                        ]
                    }
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AppUserController.prototype, "getSentRequestsPending", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/{id}/processEmail`),
    (0, rest_1.response)(204, {
        description: 'trigger message in communication handler to process cas received from email',
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
], AppUserController.prototype, "processEmail", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/{id}/{customerId}/getDematAcc`),
    (0, rest_1.response)(200, {
        description: 'Fetch demat account number and dpid',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        accNum: { type: 'string' },
                        dpid: { type: 'string' },
                    }
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, rest_1.param.path.number('customerId')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AppUserController.prototype, "getDematAcc", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/{id}/getSignature`),
    (0, rest_1.response)(200, {
        description: 'Fetch signature',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        success: { type: Boolean }
                    }
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AppUserController.prototype, "getSignature", null);
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}/uploadRtaFile`, {
        responses: {
            200: {
                description: 'API to upload Rta file for operations team',
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
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.query.number('rtaId')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)({
        content: {
            'multipart/form-data': {
                'x-parser': 'stream',
                schema: {
                    type: 'object',
                    properties: {
                        files: {
                            type: 'string',
                            format: 'binary'
                        }
                    }
                }
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AppUserController.prototype, "uploadCamsRtaFile", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/exportSample/{rtaId}`),
    (0, rest_1.response)(200, {
        description: 'Export Sample Files for 2FA Update',
        content: {
            'application/json': {
                schema: {
                    type: 'object'
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('rtaId')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AppUserController.prototype, "exportSampleFile", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/auditTrail/{auditTrailFileId}`),
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
    (0, tslib_1.__param)(0, rest_1.param.path.number('auditTrailFileId')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AppUserController.prototype, "exportAuditTrial", null);
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}/{id}/uploadSignature`),
    (0, rest_1.response)(200, {
        description: 'Upload Signature',
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
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)({
        content: {
            'multipart/form-data': {
                'x-parser': 'stream',
                schema: {
                    type: 'object',
                    properties: {
                        file: {
                            type: 'string',
                            format: 'binary'
                        }
                    }
                }
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AppUserController.prototype, "uploadSignature", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/{id}/mfrtaCheck`),
    (0, rest_1.response)(200, {
        description: 'Validate Mfrta',
        content: {
            'application/json': {
                schema: {
                    type: 'object'
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AppUserController.prototype, "mfrta", null);
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}/{id}/investmentAccountCreated`),
    (0, rest_1.response)(200, {
        description: 'Changing App User Status to investmentAccountReady',
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
], AppUserController.prototype, "investmentAccountCreated", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/{id}/fetchExistingNominee`),
    (0, rest_1.response)(200, {
        description: 'Fetching Existing Nominee Associated with Bank',
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
], AppUserController.prototype, "fetchExistingNominee", null);
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}/{id}/logoutInternalUser`),
    (0, rest_1.response)(200, {
        description: 'For logging out an internal user',
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
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, (0, core_1.inject)(rest_1.RestBindings.Http.REQUEST)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AppUserController.prototype, "logoutInternalUser", null);
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}/{id}/generateOTPForTransaction`),
    (0, rest_1.response)(200, {
        description: 'Generated OTP based Sell Transaction',
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
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    required: ['cartItemId'],
                    properties: {
                        cartItemId: {
                            type: 'number'
                        }
                    }
                }
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AppUserController.prototype, "generateOTPForTransaction", null);
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}/{id}/verifyOTPForTransaction`),
    (0, rest_1.response)(200, {
        description: 'Verify OTP for transaction',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    example: {
                        success: true
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
                    required: ['otp', 'cartItemId'],
                    properties: {
                        otp: {
                            type: 'string',
                            pattern: '[0-9]',
                            minLength: 0,
                            maxLength: 6
                        },
                        cartItemId: {
                            type: 'number'
                        }
                    }
                }
            }
        }
    })),
    (0, tslib_1.__param)(2, (0, core_1.inject)(rest_1.RestBindings.Http.REQUEST)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, Object, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AppUserController.prototype, "verifyOTPForTransaction", null);
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}/{id}/updateDecleration`),
    (0, rest_1.response)(200, {
        description: 'AppUser model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(common_1.AppUser) } }
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    required: ['emailBelongsTo', 'contactNumberBelongsTo'],
                    properties: {
                        emailBelongsTo: {
                            type: 'number'
                        },
                        contactNumberBelongsTo: {
                            type: 'number'
                        }
                    },
                    example: { emailBelongsTo: 1, contactNumberBelongsTo: 1 }
                }
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AppUserController.prototype, "updateDecleration", null);
AppUserController = (0, tslib_1.__decorate)([
    (0, authorization_1.authorize)({}),
    (0, tslib_1.__param)(0, (0, core_1.service)(facades_1.AppUserFacade)),
    (0, tslib_1.__param)(1, (0, core_1.service)(facades_1.AdobNtbFacade)),
    (0, tslib_1.__param)(2, (0, core_1.inject)('userProfile')),
    (0, tslib_1.__param)(3, (0, core_1.inject)('additionalHeaders')),
    (0, tslib_1.__param)(4, (0, core_1.inject)(rest_1.RestBindings.Http.RESPONSE)),
    (0, tslib_1.__param)(5, (0, core_1.service)(facades_1.FamilyMappingFacade)),
    (0, tslib_1.__param)(6, (0, core_1.inject)(rest_1.RestBindings.Http.RESPONSE)),
    (0, tslib_1.__metadata)("design:paramtypes", [facades_1.AppUserFacade,
        facades_1.AdobNtbFacade, Object, Object, Object, facades_1.FamilyMappingFacade, Object])
], AppUserController);
exports.AppUserController = AppUserController;
//# sourceMappingURL=app-user.controller.js.map