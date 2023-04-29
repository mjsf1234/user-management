"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HSLRedirectFacade = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const common_1 = require("common");
const moment_timezone_1 = (0, tslib_1.__importDefault)(require("moment-timezone"));
const underscore_1 = require("underscore");
let HSLRedirectFacade = class HSLRedirectFacade {
    constructor() { }
    /**
     * @description Bussiness logic to generate redirect url for given tag
     * @param tag - Requires to identify redirect url
     * @returns
     */
    async getRedirectURL(tag) {
        return new Promise((resolve, reject) => {
            try {
                if ((0, underscore_1.isEmpty)(process.env.NODE_ENV) ||
                    (0, underscore_1.isEmpty)(process.env.USR_MGMT_FCD_HSL_KEY) ||
                    (0, underscore_1.isEmpty)(process.env.USR_MGMT_FCD_HSL_IV) ||
                    (0, underscore_1.isEmpty)(process.env.USR_MGMT_FCD_HSL_ALGO) ||
                    (0, underscore_1.isEmpty)(process.env.USR_MGMT_FCD_HSL_REDIRECT_BASE_URL)) {
                    throw new Error('Environment variables cannot be empty');
                }
                const env = String(process.env.USR_MGMT_FCD_NODE_ENV);
                const key = String(process.env.USR_MGMT_FCD_HSL_KEY);
                const iv = String(process.env.USR_MGMT_FCD_HSL_IV);
                const algo = String(process.env.USR_MGMT_FCD_HSL_ALGO);
                const reUrl = String(process.env.USR_MGMT_FCD_HSL_REDIRECT_BASE_URL);
                const now = (0, moment_timezone_1.default)().format('DDMMYYhhss');
                const id = `wealthapp${now}_${tag}`;
                const encryptid = common_1.CryptoUtils.encrypt(id, algo, key, iv);
                resolve({ redirectUrl: `${reUrl}?id=${encryptid}` });
            }
            catch (error) {
                common_1.LoggingUtils.error(error);
                reject(new common_1.RestError(500, 'Environmnet variables not set', { systemcode: 1323 }));
            }
        });
    }
};
HSLRedirectFacade = (0, tslib_1.__decorate)([
    (0, core_1.injectable)({ scope: core_1.BindingScope.APPLICATION }),
    (0, tslib_1.__metadata)("design:paramtypes", [])
], HSLRedirectFacade);
exports.HSLRedirectFacade = HSLRedirectFacade;
//# sourceMappingURL=hsl-redirect.facade.js.map