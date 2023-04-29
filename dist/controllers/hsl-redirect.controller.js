"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HSLRedirectController = void 0;
const tslib_1 = require("tslib");
const authorization_1 = require("@loopback/authorization");
const core_1 = require("@loopback/core");
const rest_1 = require("@loopback/rest");
const hsl_redirect_facade_1 = require("../facades/hsl-redirect.facade");
/**
 * A simple controller to get HSL redirect url.
 */
let HSLRedirectController = class HSLRedirectController {
    constructor(hslRedirectFacade) {
        this.hslRedirectFacade = hslRedirectFacade;
    }
    /**
     *
     * @param tag - Requires to identify redirect url
     * @returns
     */
    async hslRedirect(tag) {
        return this.hslRedirectFacade.getRedirectURL(tag);
    }
};
(0, tslib_1.__decorate)([
    (0, rest_1.get)('/hsl/{tag}'),
    (0, rest_1.response)(200, {
        description: 'HSL Redirect Response',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    title: 'HSLRedirectResponse',
                    properties: {
                        redirectURL: { type: 'string' }
                    }
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.string('tag')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], HSLRedirectController.prototype, "hslRedirect", null);
HSLRedirectController = (0, tslib_1.__decorate)([
    (0, authorization_1.authorize)({}),
    (0, tslib_1.__param)(0, (0, core_1.service)(hsl_redirect_facade_1.HSLRedirectFacade)),
    (0, tslib_1.__metadata)("design:paramtypes", [hsl_redirect_facade_1.HSLRedirectFacade])
], HSLRedirectController);
exports.HSLRedirectController = HSLRedirectController;
//# sourceMappingURL=hsl-redirect.controller.js.map