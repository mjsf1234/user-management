"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreBanking = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let CoreBanking = class CoreBanking extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
(0, tslib_1.__decorate)([
    (0, repository_1.property)({
        type: 'number',
        id: true,
        generated: true
    }),
    (0, tslib_1.__metadata)("design:type", Number)
], CoreBanking.prototype, "id", void 0);
CoreBanking = (0, tslib_1.__decorate)([
    (0, repository_1.model)({ settings: { strict: false } }),
    (0, tslib_1.__metadata)("design:paramtypes", [Object])
], CoreBanking);
exports.CoreBanking = CoreBanking;
//# sourceMappingURL=core-banking.model.js.map