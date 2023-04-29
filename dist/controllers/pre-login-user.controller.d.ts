/// <reference types="express" />
import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Request } from '@loopback/rest';
import { PreLoginUser, Device } from 'common';
import { PreLoginUserFacade } from '../facades';
export declare class PreLoginUserController {
    preLoginUserFacade: PreLoginUserFacade;
    constructor(preLoginUserFacade: PreLoginUserFacade);
    create(preLoginUser: Omit<PreLoginUser, 'id'>): Promise<PreLoginUser>;
    count(where?: Where<PreLoginUser>): Promise<Count>;
    find(filter?: Filter<PreLoginUser>): Promise<PreLoginUser[]>;
    updateAll(preLoginUser: PreLoginUser, where?: Where<PreLoginUser>): Promise<Count>;
    findById(id: number, filter?: FilterExcludingWhere<PreLoginUser>): Promise<PreLoginUser>;
    updateById(id: number, preLoginUser: PreLoginUser): Promise<void>;
    replaceById(id: number, device: PreLoginUser): Promise<void>;
    deleteById(id: number): Promise<void>;
    savePreLoginData(preLoginUser: any): Promise<PreLoginUser>;
    fetchPreLoginUsers(deviceId: number, request: Request, limit?: number, offset?: number): Promise<Device[]>;
}
