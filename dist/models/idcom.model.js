"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Idcom = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let Idcom = class Idcom extends repository_1.Entity {
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
], Idcom.prototype, "id", void 0);
Idcom = (0, tslib_1.__decorate)([
    (0, repository_1.model)({ settings: { strict: false } }),
    (0, tslib_1.__metadata)("design:paramtypes", [Object])
], Idcom);
exports.Idcom = Idcom;
//# sourceMappingURL=idcom.model.js.map