"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WealthfyDomesticFCPB = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let WealthfyDomesticFCPB = class WealthfyDomesticFCPB extends repository_1.Entity {
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
], WealthfyDomesticFCPB.prototype, "id", void 0);
WealthfyDomesticFCPB = (0, tslib_1.__decorate)([
    (0, repository_1.model)({ settings: { strict: false } }),
    (0, tslib_1.__metadata)("design:paramtypes", [Object])
], WealthfyDomesticFCPB);
exports.WealthfyDomesticFCPB = WealthfyDomesticFCPB;
//# sourceMappingURL=wealthfy-domestic-FCPB.model.js.map