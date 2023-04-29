/// <reference types="express" />
import { Count, DataObject, Filter, FilterExcludingWhere, Options, Where } from '@loopback/repository';
import { Request } from '@loopback/rest';
import { Device, DeviceRelations, DeviceRepository, AppVersionRepository, AppUserRepository } from 'common';
export declare class DeviceFacade {
    private deviceRepository;
    private appVersionRepository;
    private appUserRepository;
    constructor(deviceRepository: DeviceRepository, appVersionRepository: AppVersionRepository, appUserRepository: AppUserRepository);
    create(entity: DataObject<Device>, options?: Options): Promise<Device>;
    createAll(entities: DataObject<Device>[], options?: Options): Promise<Device[]>;
    save(entity: Device, options?: Options): Promise<Device>;
    find(filter?: Filter<Device>, options?: Options): Promise<(Device & DeviceRelations)[]>;
    findOne(filter?: Filter<Device>, options?: Options): Promise<(Device & DeviceRelations) | null>;
    findById(id: number, filter?: FilterExcludingWhere<Device>, options?: Options): Promise<Device & DeviceRelations>;
    update(entity: Device, options?: Options): Promise<void>;
    delete(entity: Device, options?: Options): Promise<void>;
    updateAll(data: DataObject<Device>, where?: Where<Device>, options?: Options): Promise<Count>;
    updateById(id: number, data: DataObject<Device>, options?: Options): Promise<void>;
    replaceById(id: number, data: DataObject<Device>, options?: Options): Promise<void>;
    deleteAll(where?: Where<Device>, options?: Options): Promise<Count>;
    deleteById(id: number, options?: Options): Promise<void>;
    count(where?: Where<Device>, options?: Options): Promise<Count>;
    exists(id: number, options?: Options): Promise<boolean>;
    deviceBind(userId: number, deviceId: number, options?: Options): Promise<any>;
    createIfNotExist(entity: DataObject<Device>, options?: Options): Promise<Partial<Device>>;
    checkVersionAndCreate(entity: Partial<Device>, buildNumber: string, osType: number, options?: Options): Promise<any>;
    findDeviceDetails(request: Request, appUserId: any): Promise<any>;
    deleteExistingDevice(deviceUniqueId: string, deviceToDelete: any, appUserId: number, options?: Options): Promise<any>;
    fetchRegisteredDevices(appUserId: any): Promise<any>;
}
