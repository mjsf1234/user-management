/// <reference types="express" />
import { Count, DataObject, Filter, FilterExcludingWhere, Options, Where } from '@loopback/repository';
import { Request } from '@loopback/rest';
import { PreLoginUser, PreLoginUserRelations, PreLoginUserRepository, DeviceRepository, Device, DeviceRelations } from 'common';
export declare class PreLoginUserFacade {
    private preLoginUserRepository;
    private deviceRepository;
    constructor(preLoginUserRepository: PreLoginUserRepository, deviceRepository: DeviceRepository);
    create(entity: DataObject<PreLoginUser>, options?: Options): Promise<PreLoginUser>;
    createAll(entities: DataObject<PreLoginUser>[], options?: Options): Promise<PreLoginUser[]>;
    save(entity: PreLoginUser, options?: Options): Promise<PreLoginUser>;
    find(filter?: Filter<PreLoginUser>, options?: Options): Promise<(PreLoginUser & PreLoginUserRelations)[]>;
    findOne(filter?: Filter<PreLoginUser>, options?: Options): Promise<(PreLoginUser & PreLoginUserRelations) | null>;
    findById(id: number, filter?: FilterExcludingWhere<PreLoginUser>, options?: Options): Promise<PreLoginUser & PreLoginUserRelations>;
    update(entity: PreLoginUser, options?: Options): Promise<void>;
    delete(entity: PreLoginUser, options?: Options): Promise<void>;
    updateAll(data: DataObject<PreLoginUser>, where?: Where<PreLoginUser>, options?: Options): Promise<Count>;
    updateById(id: number, data: DataObject<PreLoginUser>, options?: Options): Promise<void>;
    replaceById(id: number, data: DataObject<PreLoginUser>, options?: Options): Promise<void>;
    deleteAll(where?: Where<PreLoginUser>, options?: Options): Promise<Count>;
    deleteById(id: number, options?: Options): Promise<void>;
    count(where?: Where<PreLoginUser>, options?: Options): Promise<Count>;
    exists(id: number, options?: Options): Promise<boolean>;
    savePreLoginData(deviceId: number, userData: DataObject<PreLoginUser>, uniqueId: string, options?: Options): Promise<PreLoginUser>;
    fetchPreLoginUsers(limit: number | undefined, offset: number | undefined, deviceId: number, request: Request): Promise<(Device & DeviceRelations)[]>;
}
