"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceFacade = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const common_1 = require("common");
const underscore_1 = require("underscore");
const { randomUUID } = require('crypto');
// All business loigc goes inside Facade layer
let DeviceFacade = class DeviceFacade {
    constructor(deviceRepository, appVersionRepository, appUserRepository) {
        this.deviceRepository = deviceRepository;
        this.appVersionRepository = appVersionRepository;
        this.appUserRepository = appUserRepository;
    }
    async create(entity, options) {
        return this.deviceRepository.create(entity, options);
    }
    async createAll(entities, options) {
        return this.deviceRepository.createAll(entities, options);
    }
    async save(entity, options) {
        return this.deviceRepository.save(entity, options);
    }
    async find(filter, options) {
        return this.deviceRepository.find(filter, options);
    }
    async findOne(filter, options) {
        return this.deviceRepository.findOne(filter, options);
    }
    async findById(id, filter, options) {
        return this.deviceRepository.findById(id, filter, options);
    }
    async update(entity, options) {
        return this.deviceRepository.update(entity, options);
    }
    async delete(entity, options) {
        return this.deviceRepository.delete(entity, options);
    }
    async updateAll(data, where, options) {
        return this.deviceRepository.updateAll(data, where, options);
    }
    async updateById(id, data, options) {
        return this.deviceRepository.updateById(id, data, options);
    }
    async replaceById(id, data, options) {
        return this.deviceRepository.replaceById(id, data, options);
    }
    async deleteAll(where, options) {
        return this.deviceRepository.deleteAll(where, options);
    }
    async deleteById(id, options) {
        return this.deviceRepository.deleteById(id, options);
    }
    async count(where, options) {
        return this.deviceRepository.count(where, options);
    }
    async exists(id, options) {
        return this.deviceRepository.exists(id, options);
    }
    async deviceBind(userId, deviceId, options) {
        try {
            if ((0, underscore_1.isEmpty)(deviceId)) {
                return new common_1.RestError(400, 'Device uniqueId is required', { systemcode: 1301 });
            }
            const device = await this.deviceRepository
                .findOne({
                where: { and: [{ id: deviceId }, { appUserId: userId }] }
            })
                .catch(err => {
                throw new Error(err);
            });
            if ((0, underscore_1.isEmpty)(device)) {
                return new common_1.RestError(400, 'device not found', { systemcode: 1033 });
            }
            const concatString = `${device.uniqueId}-${device.osName}-${device.versionCode}-${device.osSDKVersion}`;
            const bindingIdentifier = await common_1.CryptoUtils.encrypt(concatString);
            await this.deviceRepository.updateById(device.id, { bindingData: bindingIdentifier });
            return { ...device, bindingData: bindingIdentifier };
        }
        catch (error) {
            common_1.LoggingUtils.error(error);
            return new common_1.RestError(400, 'Error occured while binding your device!', { systemcode: 1036 });
        }
    }
    async createIfNotExist(entity, options) {
        // check if version is new if not check if current version is force update
        //
        // if not create a new device
        // finding if device exists
        // when we search for active devices(isActive is true) for the user and if count >= 3, then reject with
        // message 'You are already logged on 3 devices. Please remove atleast one device from My Account section to continue'.
        // is device exists and isActive is true then we respond with 117.
        // if device exists and isActive is false then we save (updating details).
        try {
            const deviceExist = await this.deviceRepository
                .findOne({
                where: { uniqueId: entity.uniqueId }
            })
                .catch(err => {
                common_1.LoggingUtils.error('Error occured while finding device');
                throw new common_1.RestError(400, 'Error occured while finding device', { systemcode: 1033 });
            });
            if (!(0, underscore_1.isEmpty)(deviceExist) && (deviceExist === null || deviceExist === void 0 ? void 0 : deviceExist.isActive) === true) {
                throw new common_1.RestError(400, 'Device already exists', { id: deviceExist === null || deviceExist === void 0 ? void 0 : deviceExist.id, systemcode: 1034 });
            }
            else if (!(0, underscore_1.isEmpty)(deviceExist) && (deviceExist === null || deviceExist === void 0 ? void 0 : deviceExist.isActive) === false) {
                const updatedDevice = await this.deviceRepository.updateById(deviceExist.id, entity);
                let addedDevice = await this.deviceRepository.findOne({
                    where: {
                        id: deviceExist.id
                    },
                    fields: { 'id': true, 'uniqueId': true, 'biometricSetup': true, 'deviceName': true,
                        'osName': true, 'osSDKVersion': true, 'preLoginUserId': true }
                }).catch(err => {
                    common_1.LoggingUtils.error(`Error occured while updating device. Error : ${err}`);
                    throw new common_1.RestError(400, 'Error occured while updating device', { systemcode: 1303 });
                });
                let responseObject = {};
                if (addedDevice.appUserId) {
                    const userDetails = await this.appUserRepository.findById(addedDevice.appUserId);
                    if (userDetails.mpinSetup) {
                        responseObject = { ...addedDevice, mpinSetup: true };
                    }
                    else {
                        responseObject = { ...addedDevice, mpinSetup: false };
                    }
                }
                else {
                    responseObject = { ...addedDevice, mpinSetup: false };
                }
                return responseObject;
            }
            // In case of a new device, the backend should generate a token and send to the frontend
            const uniqueUUID = randomUUID();
            entity["uniqueId"] = uniqueUUID;
            entity.registeredDate = new Date();
            const newDevice = await this.deviceRepository.create(entity);
            const addedDevice = await this.deviceRepository.findOne({
                where: {
                    id: newDevice.id
                },
                fields: { 'id': true, 'uniqueId': true, 'biometricSetup': true, 'deviceName': true,
                    'mpinSetup': true, 'osName': true, 'osSDKVersion': true, 'preLoginUserId': true }
            }).catch(err => {
                common_1.LoggingUtils.error('Error occured while adding new device');
                throw new common_1.RestError(400, 'Error occured while adding new device', { systemcode: 1304 });
            });
            return addedDevice;
        }
        catch (err) {
            if (err instanceof common_1.RestError) {
                return Promise.reject(err);
            }
            else {
                throw err;
            }
        }
    }
    async checkVersionAndCreate(entity, buildNumber, osType, options) {
        let currentVersionData;
        return new Promise(async (resolve, reject) => {
            this.appVersionRepository
                .findOne({
                where: {
                    isActive: true,
                    buildNumber: buildNumber,
                    osType: osType
                }
            }, options)
                .then((currentVersion) => {
                if (!currentVersion) {
                    return Promise.reject(new common_1.RestError(404, 'Active version not found', { systemcode: 1305 }));
                }
                currentVersionData = currentVersion;
                if (currentVersion.activeVersionFlag) {
                    return Promise.resolve(currentVersion);
                }
                return this.appVersionRepository.findOne({
                    where: {
                        osType: osType,
                        activeVersionFlag: true,
                        isActive: true
                    }
                }, options);
            })
                .then((activeAppVersion) => {
                if (!activeAppVersion) {
                    return Promise.reject(new common_1.RestError(404, 'Active App Version not found', { systemcode: 1306 }));
                }
                if (currentVersionData.id === activeAppVersion.id) {
                    return Promise.resolve({});
                }
                else {
                    if (activeAppVersion.isForceUpdate) {
                        return Promise.reject(new common_1.RestError(400, 'Need to update the application', { systemcode: 1037 }));
                    }
                    return Promise.resolve({});
                }
            })
                .then(() => {
                return this.deviceRepository.findOne({
                    where: {
                        uniqueId: entity.uniqueId,
                        isActive: true
                    }
                }, options);
            })
                .then((deviceData) => {
                if (!deviceData) {
                    return this.deviceRepository.create({
                        uniqueId: entity.uniqueId,
                        appVersionId: currentVersionData.id,
                        deviceName: entity.deviceName,
                        registeredDate: new Date()
                    }, options);
                }
                else {
                    deviceData.uniqueId = entity.uniqueId;
                    deviceData.appVersionId = currentVersionData.id;
                    deviceData.deviceName = entity.deviceName;
                    return this.deviceRepository.save(deviceData, options);
                }
            })
                .then(data => {
                resolve({ success: true });
            })
                .catch((err) => {
                common_1.LoggingUtils.error(err);
                return reject(err);
            });
        });
    }
    async findDeviceDetails(request, appUserId) {
        try {
            if (!(request.headers && request.headers["uniqueid"]))
                return Promise.reject(new common_1.RestError(465, 'Device unique id is missing from headers', { systemcode: 1307 }));
            const uniqueId = request.headers["uniqueid"];
            let filter = {};
            if (!appUserId) {
                filter = {
                    isActive: true,
                    uniqueId: uniqueId
                };
            }
            else {
                filter = {
                    isActive: true,
                    uniqueId: uniqueId,
                    appUserId: appUserId
                };
            }
            let deviceDetails = await this.deviceRepository
                .findOne({
                where: {
                    ...filter
                },
                fields: { 'id': true, 'uniqueId': true, 'biometricSetup': true, 'deviceName': true,
                    'osName': true, 'osSDKVersion': true, 'preLoginUserId': true, 'appUserId': true }
            });
            if (!deviceDetails) {
                return new common_1.RestError(400, 'device not found', { systemcode: 1033 });
            }
            else {
                let responseObject = {};
                if (deviceDetails.appUserId) {
                    const userDetails = await this.appUserRepository.findById(deviceDetails.appUserId);
                    if (userDetails.mpinSetup) {
                        responseObject = { ...deviceDetails, mpinSetup: true };
                    }
                    else {
                        responseObject = { ...deviceDetails, mpinSetup: false };
                    }
                }
                else {
                    responseObject = { ...deviceDetails, mpinSetup: false };
                }
                return responseObject;
            }
        }
        catch (error) {
            common_1.LoggingUtils.error(error);
            return new common_1.RestError(400, 'Error occured while fetching Device Details!', { systemcode: 1308 });
        }
    }
    async deleteExistingDevice(deviceUniqueId, deviceToDelete, appUserId, options) {
        try {
            if (deviceToDelete.uniqueId == deviceUniqueId) {
                throw new common_1.RestError(400, 'Cannot De-register logged in device');
            }
            const checkIfDeviceExists = await this.deviceRepository.findOne({
                where: {
                    appUserId: appUserId,
                    uniqueId: deviceToDelete.uniqueId
                }
            }).catch((err) => {
                common_1.LoggingUtils.error('Error occured while finding device');
                throw new common_1.RestError(400, 'Error occured while finding device', { systemcode: 1033 });
            });
            if (!(0, underscore_1.isEmpty)(checkIfDeviceExists)) {
                await this.deviceRepository.updateById(checkIfDeviceExists === null || checkIfDeviceExists === void 0 ? void 0 : checkIfDeviceExists.id, { isActive: false, appUserId: undefined })
                    .catch((err) => {
                    common_1.LoggingUtils.error('Error occured while updating device');
                    throw new common_1.RestError(400, 'Error occured while updating device', { systemcode: 1303 });
                });
                return {
                    success: true,
                    message: 'Device successfully De-registered.'
                };
            }
            else {
                throw new common_1.RestError(400, 'Device does not exists', { systemcode: 1309 });
            }
        }
        catch (err) {
            throw err;
        }
    }
    async fetchRegisteredDevices(appUserId) {
        try {
            const deviceDetails = await this.deviceRepository.find({
                where: {
                    isActive: true,
                    appUserId: appUserId
                },
                fields: { 'id': true, 'uniqueId': true, 'biometricSetup': true, 'createdDate': true,
                    'osName': true, 'osSDKVersion': true, 'preLoginUserId': true, 'deviceName': true, 'registeredDate': true }
            })
                .catch((err) => {
                common_1.LoggingUtils.error('Error occured while finding devices');
                throw new common_1.RestError(400, 'Error occured while finding devices', { systemcode: 1033 });
            });
            return deviceDetails;
        }
        catch (error) {
            common_1.LoggingUtils.error(error);
            throw error;
        }
    }
};
DeviceFacade = (0, tslib_1.__decorate)([
    (0, core_1.injectable)({ scope: core_1.BindingScope.APPLICATION }),
    (0, tslib_1.__param)(0, (0, repository_1.repository)(common_1.DeviceRepository)),
    (0, tslib_1.__param)(1, (0, repository_1.repository)(common_1.AppVersionRepository)),
    (0, tslib_1.__param)(2, (0, repository_1.repository)(common_1.AppUserRepository)),
    (0, tslib_1.__metadata)("design:paramtypes", [common_1.DeviceRepository,
        common_1.AppVersionRepository,
        common_1.AppUserRepository])
], DeviceFacade);
exports.DeviceFacade = DeviceFacade;
//# sourceMappingURL=device.facade.js.map