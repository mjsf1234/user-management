"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WealthfyDomesticFinacle = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let WealthfyDomesticFinacle = class WealthfyDomesticFinacle extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
(0, tslib_1.__decorate)([
    (0, repository_1.property)({
        type: 'number',
        id: 1,
        generated: true
    }),
    (0, tslib_1.__metadata)("design:type", Number)
], WealthfyDomesticFinacle.prototype, "id", void 0);
WealthfyDomesticFinacle = (0, tslib_1.__decorate)([
    (0, repository_1.model)({ settings: { strict: false } }),
    (0, tslib_1.__metadata)("design:paramtypes", [Object])
], WealthfyDomesticFinacle);
exports.WealthfyDomesticFinacle = WealthfyDomesticFinacle;
//# sourceMappingURL=wealthfy-domestic-finacle.model.js.map