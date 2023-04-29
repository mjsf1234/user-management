"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstrumentsExportFileController = void 0;
const tslib_1 = require("tslib");
const authorization_1 = require("@loopback/authorization");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const common_1 = require("common");
const facades_1 = require("../facades");
const API_PREFIX = common_1.InstrumentsExportFile.modelName;
//Only REST related logic to be written inside a controller.
//Strictly no use of repositories
let InstrumentsExportFileController = class InstrumentsExportFileController {
    constructor(InstrumentsExportFileFacade, additionalHeaders) {
        this.InstrumentsExportFileFacade = InstrumentsExportFileFacade;
        this.additionalHeaders = additionalHeaders;
    }
    async create(InstrumentsExportFile) {
        return this.InstrumentsExportFileFacade.create(InstrumentsExportFile, this.additionalHeaders);
    }
    async count(where) {
        return this.InstrumentsExportFileFacade.count(where, this.additionalHeaders);
    }
    async find(filter) {
        return this.InstrumentsExportFileFacade.find(filter, this.additionalHeaders);
    }
    async updateAll(InstrumentsExportFile, where) {
        return this.InstrumentsExportFileFacade.updateAll(InstrumentsExportFile, where, this.additionalHeaders);
    }
    async findById(id, filter) {
        return this.InstrumentsExportFileFacade.findById(id, filter, this.additionalHeaders);
    }
    async updateById(id, InstrumentsExportFile) {
        await this.InstrumentsExportFileFacade.updateById(id, InstrumentsExportFile, this.additionalHeaders);
    }
    async replaceById(id, InstrumentsExportFile) {
        await this.InstrumentsExportFileFacade.replaceById(id, InstrumentsExportFile, this.additionalHeaders);
    }
    async deleteById(id) {
        await this.InstrumentsExportFileFacade.deleteById(id, this.additionalHeaders);
    }
};
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'InstrumentsExportFile model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(common_1.InstrumentsExportFile) } }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.InstrumentsExportFile, {
                    title: 'New InstrumentsExportFile',
                    exclude: ['id']
                })
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], InstrumentsExportFileController.prototype, "create", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/count`),
    (0, rest_1.response)(200, {
        description: 'InstrumentsExportFile model count',
        content: { 'application/json': { schema: repository_1.CountSchema } }
    }),
    (0, tslib_1.__param)(0, rest_1.param.where(common_1.InstrumentsExportFile)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], InstrumentsExportFileController.prototype, "count", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'Array of InstrumentsExportFile model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(common_1.InstrumentsExportFile, { includeRelations: false })
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.filter(common_1.InstrumentsExportFile)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], InstrumentsExportFileController.prototype, "find", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'InstrumentsExportFile PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.InstrumentsExportFile, { partial: true })
            }
        }
    })),
    (0, tslib_1.__param)(1, rest_1.param.where(common_1.InstrumentsExportFile)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [common_1.InstrumentsExportFile, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], InstrumentsExportFileController.prototype, "updateAll", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(200, {
        description: 'InstrumentsExportFile model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.InstrumentsExportFile, { includeRelations: false })
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, rest_1.param.filter(common_1.InstrumentsExportFile, { exclude: 'where' })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], InstrumentsExportFileController.prototype, "findById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'InstrumentsExportFile PATCH success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.InstrumentsExportFile, { partial: true })
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, common_1.InstrumentsExportFile]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], InstrumentsExportFileController.prototype, "updateById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.put)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'InstrumentsExportFile PUT success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, common_1.InstrumentsExportFile]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], InstrumentsExportFileController.prototype, "replaceById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.del)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'InstrumentsExportFile DELETE success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], InstrumentsExportFileController.prototype, "deleteById", null);
InstrumentsExportFileController = (0, tslib_1.__decorate)([
    (0, authorization_1.authorize)({}),
    (0, tslib_1.__param)(0, (0, core_1.service)(facades_1.InstrumentsExportFileFacade)),
    (0, tslib_1.__param)(1, (0, core_1.inject)('additionalHeaders')),
    (0, tslib_1.__metadata)("design:paramtypes", [facades_1.InstrumentsExportFileFacade, Object])
], InstrumentsExportFileController);
exports.InstrumentsExportFileController = InstrumentsExportFileController;
//# sourceMappingURL=instruments-export-file.controller.js.map