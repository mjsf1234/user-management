import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { AppUserRoleMapping } from 'common';
import { AppUserRoleMappingFacade } from '../facades';
export declare class AppUserRoleMappingController {
    appUserRoleMappingFacade: AppUserRoleMappingFacade;
    constructor(appUserRoleMappingFacade: AppUserRoleMappingFacade);
    create(appUserRoleMapping: Omit<AppUserRoleMapping, 'id'>): Promise<AppUserRoleMapping>;
    count(where?: Where<AppUserRoleMapping>): Promise<Count>;
    find(filter?: Filter<AppUserRoleMapping>): Promise<AppUserRoleMapping[]>;
    updateAll(appUserRoleMapping: AppUserRoleMapping, where?: Where<AppUserRoleMapping>): Promise<Count>;
    findById(id: number, filter?: FilterExcludingWhere<AppUserRoleMapping>): Promise<AppUserRoleMapping>;
    updateById(id: number, appUserRoleMapping: AppUserRoleMapping): Promise<void>;
    replaceById(id: number, appUserRoleMapping: AppUserRoleMapping): Promise<void>;
    deleteById(id: number): Promise<void>;
}
