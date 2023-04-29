"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRequestDocumentController = void 0;
const tslib_1 = require("tslib");
const authorization_1 = require("@loopback/authorization");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const common_1 = require("common");
const facades_1 = require("../facades");
const API_PREFIX = common_1.ServiceRequestDocument.modelName;
//Only REST related logic to be written inside a controller.
//Strictly no use of repositories
let ServiceRequestDocumentController = class ServiceRequestDocumentController {
    constructor(serviceRequestDocumentFacade) {
        this.serviceRequestDocumentFacade = serviceRequestDocumentFacade;
    }
    async create(serviceRequestDocument) {
        return this.serviceRequestDocumentFacade.create(serviceRequestDocument);
    }
    async count(where) {
        return this.serviceRequestDocumentFacade.count(where);
    }
    async find(filter) {
        return this.serviceRequestDocumentFacade.find(filter);
    }
    async updateAll(serviceRequestDocument, where) {
        return this.serviceRequestDocumentFacade.updateAll(serviceRequestDocument, where);
    }
    async findById(id, filter) {
        return this.serviceRequestDocumentFacade.findById(id, filter);
    }
    async updateById(id, serviceRequestDocument) {
        await this.serviceRequestDocumentFacade.updateById(id, serviceRequestDocument);
    }
    async replaceById(id, serviceRequestDocument) {
        await this.serviceRequestDocumentFacade.replaceById(id, serviceRequestDocument);
    }
    async deleteById(id) {
        await this.serviceRequestDocumentFacade.deleteById(id);
    }
};
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'ServiceRequestDocument model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(common_1.ServiceRequestDocument) } }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.ServiceRequestDocument, {
                    title: 'New ServiceRequestDocument',
                    exclude: ['id']
                })
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ServiceRequestDocumentController.prototype, "create", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/count`),
    (0, rest_1.response)(200, {
        description: 'ServiceRequestDocument model count',
        content: { 'application/json': { schema: repository_1.CountSchema } }
    }),
    (0, tslib_1.__param)(0, rest_1.param.where(common_1.ServiceRequestDocument)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ServiceRequestDocumentController.prototype, "count", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'Array of ServiceRequestDocument model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(common_1.ServiceRequestDocument, { includeRelations: false })
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.filter(common_1.ServiceRequestDocument)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ServiceRequestDocumentController.prototype, "find", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'ServiceRequestDocument PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.ServiceRequestDocument, { partial: true })
            }
        }
    })),
    (0, tslib_1.__param)(1, rest_1.param.where(common_1.ServiceRequestDocument)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [common_1.ServiceRequestDocument, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ServiceRequestDocumentController.prototype, "updateAll", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(200, {
        description: 'ServiceRequestDocument model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.ServiceRequestDocument, { includeRelations: false })
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, rest_1.param.filter(common_1.ServiceRequestDocument, { exclude: 'where' })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ServiceRequestDocumentController.prototype, "findById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'ServiceRequestDocument PATCH success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.ServiceRequestDocument, { partial: true })
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, common_1.ServiceRequestDocument]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ServiceRequestDocumentController.prototype, "updateById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.put)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'ServiceRequestDocument PUT success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, common_1.ServiceRequestDocument]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ServiceRequestDocumentController.prototype, "replaceById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.del)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'ServiceRequestDocument DELETE success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ServiceRequestDocumentController.prototype, "deleteById", null);
ServiceRequestDocumentController = (0, tslib_1.__decorate)([
    (0, authorization_1.authorize)({}),
    (0, tslib_1.__param)(0, (0, core_1.service)(facades_1.ServiceRequestDocumentFacade)),
    (0, tslib_1.__metadata)("design:paramtypes", [facades_1.ServiceRequestDocumentFacade])
], ServiceRequestDocumentController);
exports.ServiceRequestDocumentController = ServiceRequestDocumentController;
//# sourceMappingURL=service-request-document.controller.js.map