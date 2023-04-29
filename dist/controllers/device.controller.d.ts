/// <reference types="express" />
import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Request } from '@loopback/rest';
import { Device } from 'common';
import { DeviceFacade } from '../facades';
export declare class DeviceController {
    deviceFacade: DeviceFacade;
    private userProfile;
    private additionalHeaders;
    constructor(deviceFacade: DeviceFacade, userProfile: any, additionalHeaders: any);
    create(device: Omit<Device, 'id'>): Promise<Device>;
    count(where?: Where<Device>): Promise<Count>;
    find(filter?: Filter<Device>): Promise<Device[]>;
    updateAll(device: Device, where?: Where<Device>): Promise<Count>;
    findById(id: number, filter?: FilterExcludingWhere<Device>): Promise<Device>;
    updateById(id: number, device: Device): Promise<void>;
    replaceById(id: number, device: Device): Promise<void>;
    deleteById(id: number): Promise<void>;
    createIfNotExist(device: Omit<Device, 'id'>): Promise<Partial<Device>>;
    deviceBind(deviceProps: any): Promise<any>;
    checkVersionAndCreate(properties: any): Promise<any>;
    findDeviceDetails(request: Request): Promise<Device[]>;
    deleteExistingDevice(appUserId: number, deviceToDelete: any): Promise<Device>;
    fetchRegisteredDevices(): Promise<Device[]>;
}
