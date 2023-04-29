"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppAccessTokenFacade = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const common_1 = require("common");
const uid2_1 = (0, tslib_1.__importDefault)(require("uid2"));
const underscore_1 = (0, tslib_1.__importDefault)(require("underscore"));
const tokenLength = 64;
// All business loigc goes inside Facade layer
let AppAccessTokenFacade = class AppAccessTokenFacade {
    constructor(appAccessTokenRepository, appUserRepository, deviceRepository, uamLoginLogsRepository) {
        this.appAccessTokenRepository = appAccessTokenRepository;
        this.appUserRepository = appUserRepository;
        this.deviceRepository = deviceRepository;
        this.uamLoginLogsRepository = uamLoginLogsRepository;
    }
    async create(entity, options) {
        return this.appAccessTokenRepository.create(entity, options);
    }
    async createAll(entities, options) {
        return this.appAccessTokenRepository.createAll(entities, options);
    }
    async save(entity, options) {
        return this.appAccessTokenRepository.save(entity, options);
    }
    async find(filter, options) {
        return this.appAccessTokenRepository.find(filter, options);
    }
    async findOne(filter, options) {
        return this.appAccessTokenRepository.findOne(filter, options);
    }
    async findById(id, filter, options) {
        return this.appAccessTokenRepository.findById(id, filter, options);
    }
    async update(entity, options) {
        return this.appAccessTokenRepository.update(entity, options);
    }
    async delete(entity, options) {
        return this.appAccessTokenRepository.delete(entity, options);
    }
    async updateAll(data, where, options) {
        return this.appAccessTokenRepository.updateAll(data, where, options);
    }
    async updateById(id, data, options) {
        return this.appAccessTokenRepository.updateById(id, data, options);
    }
    async replaceById(id, data, options) {
        return this.appAccessTokenRepository.replaceById(id, data, options);
    }
    async deleteAll(where, options) {
        return this.appAccessTokenRepository.deleteAll(where, options);
    }
    async deleteById(id, options) {
        return this.appAccessTokenRepository.deleteById(id, options);
    }
    async count(where, options) {
        return this.appAccessTokenRepository.count(where, options);
    }
    async exists(id, options) {
        return this.appAccessTokenRepository.exists(id, options);
    }
    async fetchUserDetailsByToken(token) {
        return new Promise((resolve, reject) => {
            if (!token) {
                return reject(new common_1.RestError(401, 'Invalid access token!', { systemcode: 1023 }));
            }
            this.appAccessTokenRepository
                .findOne({
                where: {
                    token: token
                },
                include: [
                    {
                        relation: 'appUser',
                        scope: {
                            include: [
                                {
                                    relation: 'appRoles'
                                },
                                {
                                    relation: 'investorDetails'
                                },
                                {
                                    relation: 'primaryAccounts',
                                    scope: {
                                        where: {
                                            isActive: true
                                        }
                                    }
                                }
                            ],
                            fields: {
                                id: true,
                                name: true,
                                email: true,
                                gender: true,
                                userCode: true,
                                contactNumberCountryCode: true,
                                mpinSetup: true,
                                contactNumber: true,
                                lastLoginDate: true,
                                appUserStatus: true,
                                familyId: true,
                                remarks: true,
                                appUserStatusLabel: true,
                                emailBelongsTo: true,
                                contactNumberBelongsTo: true,
                                panAadharLinkStatus: true
                            }
                        }
                    }
                ]
            })
                .then((token) => {
                if (!token || !token.appUser) {
                    return Promise.reject(new common_1.RestError(401, 'Invalid access token!', { systemcode: 1023 }));
                }
                // let panCardNumber = token.investorDetails?.panCardNumber?token.investorDetails?.panCardNumber
                if (token && token.appUser && token.appUser.investorDetails && token.appUser.investorDetails.panCardNumber) {
                    token.appUser.investorDetails.panCardNumber = common_1.FormatUtils.panMaskFormat(token.appUser.investorDetails.panCardNumber);
                }
                return Promise.resolve(token.appUser);
            })
                .then(async (data) => {
                return resolve({ ...data });
            })
                .catch((error) => {
                common_1.LoggingUtils.error(error);
                return reject(error);
            });
        });
    }
    async logout(appUserId, deviceUniqueId, token, req, options) {
        return new Promise((resolve, reject) => {
            const logParams = options.logParams;
            if (!token) {
                return reject(new common_1.RestError(401, 'Invalid access token!', { systemcode: 1023 }));
            }
            this.appAccessTokenRepository
                .findOne({
                where: {
                    token: token,
                    appUserId: appUserId
                }
            })
                .then((appAccessToken) => {
                if (!appAccessToken) {
                    return Promise.reject(new common_1.RestError(401, 'Invalid access token!', { systemcode: 1023 }));
                }
                return this.appAccessTokenRepository.deleteById(appAccessToken === null || appAccessToken === void 0 ? void 0 : appAccessToken.id);
            })
                //   .then(() => {
                //     return this.deviceRepository.findOne({
                //       where: {
                //         uniqueId: deviceUniqueId,
                //         appUserId: appUserId
                //       }
                //     })
                //  })
                .then(() => {
                return this.deviceRepository.updateAll({
                    // mpinSetup: false,
                    appUserId: undefined,
                    biometricSetup: false
                }, { uniqueId: deviceUniqueId, appUserId: appUserId });
            })
                .then(() => {
                // @todo set actual value in ip, source, version
                common_1.LogApiCallUtils.sendMessageLoginApiCall({
                    loginDate: new Date(),
                    ipAddress: logParams.ipAddress,
                    source: logParams.source,
                    version: logParams.version,
                    details: { logout: true },
                    transactionId: logParams.transactionId,
                    appUserId: appUserId
                });
                return resolve({ success: true });
            })
                .catch((error) => {
                // @todo set actual value in ip, source, version
                common_1.LogApiCallUtils.sendMessageLoginApiCall({
                    loginDate: new Date(),
                    ipAddress: logParams.ipAddress,
                    source: logParams.source,
                    version: logParams.version,
                    details: { logout: false, error },
                    transactionId: logParams.transactionId,
                    appUserId: appUserId
                });
                common_1.LoggingUtils.error(error);
                return reject(error);
            });
        });
    }
    async logoutInternalUser(appUserId, token, options) {
        const logParams = options.logParams;
        try {
            await this.appAccessTokenRepository.updateAll({ isActive: false }, { appUserId: appUserId, isActive: true });
            await this.createUamLoginLogs(null, "logout", token);
            // @todo set actual value in ip, source, version
            common_1.LogApiCallUtils.sendMessageLoginApiCall({
                loginDate: new Date(),
                ipAddress: logParams.ipAddress,
                source: logParams.source,
                version: logParams.version,
                details: { logout: true },
                transactionId: logParams.transactionId,
                appUserId: appUserId
            });
            return { success: true };
        }
        catch (error) {
            // @todo set actual value in ip, source, version
            common_1.LogApiCallUtils.sendMessageLoginApiCall({
                loginDate: new Date(),
                ipAddress: logParams.ipAddress,
                source: logParams.source,
                version: logParams.version,
                details: { logout: false, error },
                transactionId: logParams.transactionId,
                appUserId: appUserId
            });
            throw error;
        }
    }
    async recreateTokenWithRereshToken(refreshToken, request) {
        try {
            if (!refreshToken) {
                return Promise.reject(new common_1.RestError(401, 'Invalid access token!', { systemcode: 1023 }));
            }
            const appAccessToken = await this.appAccessTokenRepository.findOne({
                where: {
                    refreshToken: refreshToken,
                    isActive: true
                    // appUserId: appUserId
                }
            });
            // console.log(appAccessToken);
            if (!appAccessToken) {
                return Promise.reject(new common_1.RestError(401, 'Invalid refresh token!', { systemcode: 1023 }));
            }
            //if check refresh token Expiry date
            if (!appAccessToken.refreshTokenExpiry)
                throw new Error('Invalid Refresh Token Expiry Date');
            //CHECK IF REFRESH TOKEN IS VALID
            const curreDate = new Date();
            const refreshTokenExpiryDate = new Date(appAccessToken.refreshTokenExpiry);
            //if current date is grater the the refreshtoken expiry date then the refresh token is expeired
            if (curreDate > refreshTokenExpiryDate) {
                return Promise.reject(new common_1.RestError(401, 'Refresh Token Expired', { systemcode: 1129 }));
            }
            const tokenData = appAccessToken.tokenData;
            if (tokenData.appRoles && Array.isArray(tokenData.appRoles) && tokenData.appRoles.length && tokenData.appRoles[0] == '$otpVerified') {
                return this.createToken(appAccessToken.appUserId, request, true);
            }
            //create new accesstoken access token and refresh token
            return this.createToken(appAccessToken.appUserId, request);
        }
        catch (error) {
            common_1.LoggingUtils.error(error);
            return Promise.reject(new common_1.RestError(401, 'Request Could Not Be Processed', { systemcode: 1011 }));
        }
    }
    //added isVerifyOTPRequest in order to add the role $otpVerified for the token. this is necessary because we only want certain endpoints to be accessible using the token generated from verifyotp
    async createToken(appUserId, request, isVerifyOTPRequest) {
        //@todo - use request object to capturte the ip address
        return new Promise((resolve, reject) => {
            let token = '';
            let refreshToken = '';
            let appAccessToken;
            Promise.resolve()
                .then(() => {
                token = (0, uid2_1.default)(tokenLength);
                refreshToken = (0, uid2_1.default)(tokenLength);
                return this.appUserRepository.findById(appUserId, {
                    include: ['appRoles', 'primaryAccounts'] //add family data here when the framework is in place
                });
            })
                .then(appUser => {
                if (!appUser) {
                    return Promise.reject(new common_1.RestError(404, 'User not found!', { systemcode: 1030 }));
                }
                appAccessToken = new common_1.AppAccessToken();
                appAccessToken.appUserId = appUserId;
                appAccessToken.ipAddress = request.ip;
                appAccessToken.token = token;
                appAccessToken.refreshToken = refreshToken;
                appAccessToken.expiry = new Date(new Date().getTime() + parseInt(process.env.ACCESS_TOKEN_SESSION_TIMEOUT));
                appAccessToken.refreshTokenExpiry = new Date(new Date().getTime() + parseInt(process.env.REFRESH_TOKEN_SESSION_TIMEOUT));
                let tokenData = {};
                tokenData['appUserId'] = appUser.id;
                if (isVerifyOTPRequest) {
                    tokenData['appRoleIds'] = [0];
                    tokenData['appRoles'] = ['$otpVerified'];
                    tokenData['primaryAccountIds'] = [];
                }
                else {
                    tokenData['appRoleIds'] = underscore_1.default.pluck(appUser.appRoles, 'id');
                    tokenData['appRoles'] = underscore_1.default.pluck(appUser.appRoles, 'name');
                    tokenData['primaryAccountIds'] = underscore_1.default.pluck(appUser.primaryAccounts || [], 'id');
                }
                //@TODO- add family access objects here.
                appAccessToken.tokenData = tokenData;
            })
                .then(data => {
                return this.appUserRepository.updateById(appUserId, { loginRetryCount: 0, lastLoginDate: new Date() });
            })
                .then(data => {
                //set isActive to false where isActive is true for that partiular user id
                return this.appAccessTokenRepository.updateAll({ isActive: false }, { appUserId: appUserId, isActive: true });
            })
                .then(data => {
                return this.appAccessTokenRepository.create(appAccessToken);
            })
                .then(data => {
                if (isVerifyOTPRequest) {
                    return resolve({ appAccessToken: token, appRefreshToken: refreshToken });
                }
                return resolve({ appAccessToken: token, appRefreshToken: refreshToken });
            })
                .catch((error) => {
                common_1.LoggingUtils.error(error);
                return reject(error);
            });
        });
    }
    async createUamLoginLogs(input, type, token) {
        if (type == "login") {
            if (!input)
                return Promise.reject(new common_1.RestError(465, "There was an issue with the request"));
            await this.uamLoginLogsRepository.create(input);
        }
        if (type == "logout") {
            const currentDate = new Date();
            const uamUamLoginLogsRecord = await this.uamLoginLogsRepository.findOne({
                where: {
                    token: token
                }
            });
            if (uamUamLoginLogsRecord && uamUamLoginLogsRecord.id)
                await this.uamLoginLogsRepository.updateById(uamUamLoginLogsRecord === null || uamUamLoginLogsRecord === void 0 ? void 0 : uamUamLoginLogsRecord.id, { logoutTime: currentDate.toLocaleTimeString() });
        }
    }
    async recreateTokenData(appUserId) {
        return new Promise((resolve, reject) => {
            Promise.resolve()
                .then(() => {
                return this.appUserRepository.find({
                    where: {
                        isActive: true,
                        id: appUserId
                    },
                    include: [
                        {
                            relation: 'appRoles'
                        },
                        {
                            relation: 'primaryAccounts'
                        },
                        {
                            relation: 'accessTokens',
                            scope: {
                                where: {
                                    isActive: true
                                }
                            }
                        }
                    ]
                });
            })
                .then((appUsers) => {
                const appUser = appUsers[0];
                if (!appUser) {
                    return Promise.reject(new common_1.RestError(404, 'User not found!', { systemcode: 1030 }));
                }
                let tokenData = {};
                tokenData['appUserId'] = appUser.id;
                tokenData['appRoleIds'] = underscore_1.default.pluck(appUser.appRoles, 'id');
                tokenData['appRoles'] = underscore_1.default.pluck(appUser.appRoles, 'name');
                tokenData['primaryAccountIds'] = underscore_1.default.pluck(appUser.primaryAccounts || [], 'id');
                //@TODO- add family access objects here.
                let promises = [];
                underscore_1.default.each(appUser.accessTokens || [], (appAccessToken) => {
                    if (!(appAccessToken.tokenData && appAccessToken.tokenData.appRoles && appAccessToken.tokenData.appRoles.includes('$otpVerified'))) {
                        appAccessToken.tokenData = tokenData;
                        promises.push(this.appAccessTokenRepository.save(appAccessToken));
                    }
                });
                return Promise.all(promises);
            })
                .then(data => {
                return resolve(data);
            })
                .catch((error) => {
                common_1.LoggingUtils.error(error);
                return reject(error);
            });
        });
    }
};
AppAccessTokenFacade = (0, tslib_1.__decorate)([
    (0, core_1.injectable)({ scope: core_1.BindingScope.APPLICATION }),
    (0, tslib_1.__param)(0, (0, repository_1.repository)(common_1.AppAccessTokenRepository)),
    (0, tslib_1.__param)(1, (0, repository_1.repository)(common_1.AppUserRepository)),
    (0, tslib_1.__param)(2, (0, repository_1.repository)(common_1.DeviceRepository)),
    (0, tslib_1.__param)(3, (0, repository_1.repository)(common_1.UamLoginLogsRepository)),
    (0, tslib_1.__metadata)("design:paramtypes", [common_1.AppAccessTokenRepository,
        common_1.AppUserRepository,
        common_1.DeviceRepository,
        common_1.UamLoginLogsRepository])
], AppAccessTokenFacade);
exports.AppAccessTokenFacade = AppAccessTokenFacade;
//# sourceMappingURL=app-access-token.facade.js.map