import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { AppRole } from 'common';
import { AppRoleFacade } from '../facades';
export declare class AppRoleController {
    appRoleFacade: AppRoleFacade;
    constructor(appRoleFacade: AppRoleFacade);
    create(appRole: Omit<AppRole, 'id'>): Promise<AppRole>;
    count(where?: Where<AppRole>): Promise<Count>;
    find(filter?: Filter<AppRole>): Promise<AppRole[]>;
    updateAll(appRole: AppRole, where?: Where<AppRole>): Promise<Count>;
    findById(id: number, filter?: FilterExcludingWhere<AppRole>): Promise<AppRole>;
    updateById(id: number, appRole: AppRole): Promise<void>;
    replaceById(id: number, appRole: AppRole): Promise<void>;
    deleteById(id: number): Promise<void>;
    fetchRoles(filter?: Filter<AppRole>): Promise<AppRole[]>;
}
