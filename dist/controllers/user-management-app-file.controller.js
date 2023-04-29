"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserManagementAppFileController = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const authorization_1 = require("@loopback/authorization");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const common_1 = require("common");
const facades_1 = require("../facades");
const API_PREFIX = common_1.UserManagementAppFile.modelName;
//Only REST related logic to be written inside a controller.
//Strictly no use of repositories
let UserManagementAppFileController = class UserManagementAppFileController {
    constructor(userManagementAppFileFacade, response, additionalHeaders) {
        this.userManagementAppFileFacade = userManagementAppFileFacade;
        this.response = response;
        this.additionalHeaders = additionalHeaders;
    }
    async create(appFile) {
        return this.userManagementAppFileFacade.create(appFile);
    }
    async count(where) {
        return this.userManagementAppFileFacade.count(where);
    }
    async find(filter) {
        return this.userManagementAppFileFacade.find(filter);
    }
    async updateAll(appFile, where) {
        return this.userManagementAppFileFacade.updateAll(appFile, where);
    }
    async findById(id, filter) {
        return this.userManagementAppFileFacade.findById(id, filter);
    }
    async updateById(id, appFile) {
        await this.userManagementAppFileFacade.updateById(id, appFile);
    }
    async replaceById(id, appFile) {
        await this.userManagementAppFileFacade.replaceById(id, appFile);
    }
    async deleteById(id) {
        await this.userManagementAppFileFacade.deleteById(id);
    }
    async getContainerDetails(ContainerFilter) {
        return this.userManagementAppFileFacade.getContainerDetails(ContainerFilter);
    }
    // @post(`/${API_PREFIX}/{accountId}/documents/{documentType}/uploadDocument`)
    // @response(200, {
    //   description: 'UserManagementAppFile model instance',
    //   content: {
    //     'application/json': {
    //       schema: {
    //         type: 'object',
    //         example: `{success: true}`
    //       }
    //     }
    //   }
    // })
    // async uploadDocument(
    //   @param.path.number('accountId') accountId: number,
    //   @param.path.number('documentType') documentType: number,
    //   @requestBody({
    //     content: {
    //       'multipart/form-data': {
    //         'x-parser': 'stream',
    //         schema: {
    //           type: 'object',
    //           properties: {
    //             file: {
    //               type: 'string',
    //               format: 'binary'
    //             }
    //           }
    //         }
    //       }
    //     }
    //   })
    //   request: Request
    // ): Promise<object> {
    //   return this.userManagementAppFileFacade.uploadDocument(accountId, documentType, request, this.response);
    // }
    async userManagementDownloadFile(ContainerFilter) {
        return this.userManagementAppFileFacade.userManagementDownloadFile(ContainerFilter.containerName, ContainerFilter.fileName, ContainerFilter.request, ContainerFilter.response);
    }
    async downloadMultipleuserManagementDownloadFile(ContainerFilter) {
        return this.userManagementAppFileFacade.downloadMultipleuserManagementDownloadFile(ContainerFilter);
    }
    async userManagementAppFileDetails(filter, where) {
        return this.userManagementAppFileFacade.userManagementAppFileMappingDetails(filter, where, this.additionalHeaders);
    }
};
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'UserManagementAppFile model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(common_1.UserManagementAppFile) } }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.UserManagementAppFile, {
                    title: 'New UserManagementAppFile',
                    exclude: ['id']
                })
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UserManagementAppFileController.prototype, "create", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/count`),
    (0, rest_1.response)(200, {
        description: 'UserManagementAppFile model count',
        content: { 'application/json': { schema: repository_1.CountSchema } }
    }),
    (0, tslib_1.__param)(0, rest_1.param.where(common_1.UserManagementAppFile)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UserManagementAppFileController.prototype, "count", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'Array of UserManagementAppFile model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(common_1.UserManagementAppFile, { includeRelations: false })
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.filter(common_1.UserManagementAppFile)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UserManagementAppFileController.prototype, "find", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'UserManagementAppFile PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.UserManagementAppFile, { partial: true })
            }
        }
    })),
    (0, tslib_1.__param)(1, rest_1.param.where(common_1.UserManagementAppFile)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [common_1.UserManagementAppFile, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UserManagementAppFileController.prototype, "updateAll", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(200, {
        description: 'UserManagementAppFile model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.UserManagementAppFile, { includeRelations: false })
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, rest_1.param.filter(common_1.UserManagementAppFile, { exclude: 'where' })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UserManagementAppFileController.prototype, "findById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'UserManagementAppFile PATCH success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.UserManagementAppFile, { partial: true })
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, common_1.UserManagementAppFile]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UserManagementAppFileController.prototype, "updateById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.put)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'UserManagementAppFile PUT success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, common_1.UserManagementAppFile]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UserManagementAppFileController.prototype, "replaceById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.del)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'UserManagementAppFile DELETE success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UserManagementAppFileController.prototype, "deleteById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/getContainerDetails`),
    (0, rest_1.response)(200, {
        description: 'For fetching documents based on container',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    example: {
                        id: 1,
                        isActive: true,
                        createdDate: '2022-03-07T18:30:00.000Z',
                        lastModifiedDate: '2022-03-07T18:30:00.000Z',
                        path: '0c871c3d-896a-42fd-ae54-191b7230c230',
                        containerName: 'signatures',
                        checksum: null,
                        originalFileName: 'signature-ruban',
                        name: '0c871c3d-896a-42fd-ae54-191b7230c230',
                        size: 6672,
                        extension: 'jpeg',
                        mimeType: 'image/png',
                        batchCode: null,
                        sampleModel: {}
                    }
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.query.object('ContainerFilter')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UserManagementAppFileController.prototype, "getContainerDetails", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/userManagementDownloadFile`),
    (0, rest_1.response)(200, {
        description: 'API for downloading the file',
        content: {
            'application/json': {
                schema: {
                    type: 'array'
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.query.object('ContainerFilter')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UserManagementAppFileController.prototype, "userManagementDownloadFile", null);
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}/downloadMultipleUserManagementFiles`),
    (0, rest_1.response)(200, {
        description: 'API for downloading multiple files',
        content: {
            'application/json': {
                schema: {
                    type: 'array'
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    properties: {
                        ContainerFilter: {
                            type: 'object',
                            properties: {
                                containerName: {
                                    type: 'string'
                                },
                                fileName: {
                                    type: 'string'
                                }
                            }
                        }
                    },
                    example: [
                        {
                            "containerName": "sting",
                            "fileName": "string"
                        }
                    ]
                }
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UserManagementAppFileController.prototype, "downloadMultipleuserManagementDownloadFile", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/userManagementAppFileDetails`),
    (0, rest_1.response)(200, {
        description: 'Array of userManagementAppFile model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'object'
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.query.object('filter')),
    (0, tslib_1.__param)(1, rest_1.param.query.object('where')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UserManagementAppFileController.prototype, "userManagementAppFileDetails", null);
UserManagementAppFileController = (0, tslib_1.__decorate)([
    (0, authorization_1.authorize)({}),
    (0, tslib_1.__param)(0, (0, core_1.service)(facades_1.UserManagementAppFileFacade)),
    (0, tslib_1.__param)(1, (0, core_1.inject)(rest_1.RestBindings.Http.RESPONSE)),
    (0, tslib_1.__param)(2, (0, core_1.inject)('additionalHeaders')),
    (0, tslib_1.__metadata)("design:paramtypes", [facades_1.UserManagementAppFileFacade, Object, Object])
], UserManagementAppFileController);
exports.UserManagementAppFileController = UserManagementAppFileController;
//# sourceMappingURL=user-management-app-file.controller.js.map