"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceController = void 0;
const tslib_1 = require("tslib");
const authorization_1 = require("@loopback/authorization");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const common_1 = require("common");
const facades_1 = require("../facades");
const API_PREFIX = common_1.Device.modelName;
//Only REST related logic to be written inside a controller.
//Strictly no use of repositories
let DeviceController = class DeviceController {
    constructor(deviceFacade, userProfile, additionalHeaders) {
        this.deviceFacade = deviceFacade;
        this.userProfile = userProfile;
        this.additionalHeaders = additionalHeaders;
    }
    async create(device) {
        return this.deviceFacade.create(device);
    }
    async count(where) {
        return this.deviceFacade.count(where);
    }
    async find(filter) {
        return this.deviceFacade.find(filter);
    }
    async updateAll(device, where) {
        return this.deviceFacade.updateAll(device, where);
    }
    async findById(id, filter) {
        return this.deviceFacade.findById(id, filter);
    }
    async updateById(id, device) {
        await this.deviceFacade.updateById(id, device);
    }
    async replaceById(id, device) {
        await this.deviceFacade.replaceById(id, device);
    }
    async deleteById(id) {
        await this.deviceFacade.deleteById(id);
    }
    async createIfNotExist(device) {
        return this.deviceFacade.createIfNotExist(device);
    }
    async deviceBind(deviceProps) {
        return this.deviceFacade.deviceBind(this.userProfile.appUserId, deviceProps.uniqueId);
    }
    async checkVersionAndCreate(properties) {
        return this.deviceFacade.checkVersionAndCreate(properties.deviceDetails, properties.appVersion, properties.osType, this.additionalHeaders);
    }
    async findDeviceDetails(request) {
        return this.deviceFacade.findDeviceDetails(request, this.userProfile.appUserId);
    }
    async deleteExistingDevice(appUserId, deviceToDelete) {
        return this.deviceFacade.deleteExistingDevice(deviceToDelete.deviceUniqueId, deviceToDelete, appUserId, this.additionalHeaders);
    }
    async fetchRegisteredDevices() {
        return this.deviceFacade.fetchRegisteredDevices(this.userProfile.appUserId);
    }
};
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'Device model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(common_1.Device) } }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.Device, {
                    title: 'New Device',
                    exclude: ['id']
                })
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], DeviceController.prototype, "create", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/count`),
    (0, rest_1.response)(200, {
        description: 'Device model count',
        content: { 'application/json': { schema: repository_1.CountSchema } }
    }),
    (0, tslib_1.__param)(0, rest_1.param.where(common_1.Device)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], DeviceController.prototype, "count", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'Array of Device model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(common_1.Device, { includeRelations: false })
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.filter(common_1.Device)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], DeviceController.prototype, "find", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'Device PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.Device, { partial: true })
            }
        }
    })),
    (0, tslib_1.__param)(1, rest_1.param.where(common_1.Device)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [common_1.Device, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], DeviceController.prototype, "updateAll", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(200, {
        description: 'Device model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.Device, { includeRelations: false })
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, rest_1.param.filter(common_1.Device, { exclude: 'where' })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], DeviceController.prototype, "findById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'Device PATCH success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.Device, { partial: true })
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, common_1.Device]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], DeviceController.prototype, "updateById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.put)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'Device PUT success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, common_1.Device]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], DeviceController.prototype, "replaceById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.del)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'Device DELETE success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], DeviceController.prototype, "deleteById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}/addDeviceIfNotExist`),
    (0, rest_1.response)(200, {
        description: 'Add a new device if not exist',
        content: {
            'application/json': {
                schema: {
                    schema: {
                        type: 'object',
                        title: 'fetchDeviceDetails response body',
                        properties: {
                            id: { type: 'number' },
                            uniqueId: { type: 'string' },
                            biometricSetup: { type: 'boolean' },
                            deviceName: { type: 'string' },
                            mpinSetup: { type: 'boolean' },
                            osName: { type: 'string' },
                            osSDKVersion: { type: 'string' },
                            preLoginUserId: { type: 'number' }
                        }
                    }
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    required: ['uniqueId', 'deviceType', 'deviceName', 'osName', 'versionName', 'versionCode', 'osSDKVersion'],
                    properties: {
                        uniqueId: {
                            type: 'string',
                            pattern: '^[a-zA-Z0-9-]{16,36}'
                        },
                        deviceType: {
                            type: 'number'
                        },
                        deviceName: {
                            type: 'string'
                        },
                        osName: {
                            type: 'string',
                            pattern: '^(Android|iOS|iPadOS)$'
                        },
                        versionName: {
                            type: 'string'
                        },
                        versionCode: {
                            type: 'string'
                        },
                        osSDKVersion: {
                            type: 'string'
                        }
                    }
                }
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], DeviceController.prototype, "createIfNotExist", null);
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}/bindDevice`),
    (0, rest_1.response)(200, {
        description: 'Bind user device',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(common_1.Device) } }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        uniqueId: {
                            type: 'string'
                        }
                    }
                }
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], DeviceController.prototype, "deviceBind", null);
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}/checkVersionAndCreate`),
    (0, rest_1.response)(200, {
        description: 'Will check the version of device and create device if not exist or update device',
        content: { 'application/json': { schema: { type: 'object' } } }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        deviceDetails: {
                            type: 'object',
                            properties: {
                                uniqueId: {
                                    type: 'string'
                                },
                                deviceName: {
                                    type: 'string'
                                }
                            },
                            example: `{
                  uniqueId: 'ABCD',
                  deviceName: 'DVNM'
                }`
                        },
                        buildNumber: {
                            type: 'string'
                        },
                        osType: {
                            type: 'number'
                        }
                    }
                }
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], DeviceController.prototype, "checkVersionAndCreate", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/fetchDeviceDetails`),
    (0, rest_1.response)(200, {
        description: 'Fetching Device details',
        content: {
            'application/json': {
                schema: { schema: {
                        type: 'object',
                        title: 'fetchDeviceDetails response body',
                        properties: {
                            id: { type: 'number' },
                            uniqueId: { type: 'string' },
                            biometricSetup: { type: 'boolean' },
                            deviceName: { type: 'string' },
                            mpinSetup: { type: 'boolean' },
                            osName: { type: 'string' },
                            osSDKVersion: { type: 'string' },
                            preLoginUserId: { type: 'number' }
                        }
                    } }
            }
        }
    }),
    (0, tslib_1.__param)(0, (0, core_1.inject)(rest_1.RestBindings.Http.REQUEST)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], DeviceController.prototype, "findDeviceDetails", null);
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}/{appUserId}/deleteExistingDevice`),
    (0, rest_1.response)(200, {
        description: 'Remove a device if exists',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    example: {
                        success: true,
                        message: 'Device successfully removed.'
                    }
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('appUserId')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        uniqueId: {
                            type: 'string'
                        },
                        deviceUniqueId: {
                            type: 'string'
                        }
                    }
                }
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], DeviceController.prototype, "deleteExistingDevice", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/{appUserId}/fetchRegisteredDevices`),
    (0, rest_1.response)(200, {
        description: 'Fetching all devices registered to user',
        content: {
            'application/json': {
                schema: { schema: {
                        type: 'object',
                        title: 'fetchRegisteredDevices response body',
                        properties: {
                            id: { type: 'number' },
                            createdDate: { type: 'string' },
                            uniqueId: { type: 'string' },
                            biometricSetup: { type: 'boolean' },
                            deviceName: { type: 'string' },
                            osName: { type: 'string' },
                            osSDKVersion: { type: 'string' },
                            preLoginUserId: { type: 'number' },
                        }
                    } }
            }
        }
    }),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", []),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], DeviceController.prototype, "fetchRegisteredDevices", null);
DeviceController = (0, tslib_1.__decorate)([
    (0, authorization_1.authorize)({}),
    (0, tslib_1.__param)(0, (0, core_1.service)(facades_1.DeviceFacade)),
    (0, tslib_1.__param)(1, (0, core_1.inject)('userProfile')),
    (0, tslib_1.__param)(2, (0, core_1.inject)('additionalHeaders')),
    (0, tslib_1.__metadata)("design:paramtypes", [facades_1.DeviceFacade, Object, Object])
], DeviceController);
exports.DeviceController = DeviceController;
//# sourceMappingURL=device.controller.js.map