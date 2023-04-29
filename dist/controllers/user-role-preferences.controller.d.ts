import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { UserRolePreferences } from 'common';
import { UserRolePreferencesFacade } from '../facades';
export declare class UserRolePreferencesController {
    userRolePreferencesFacade: UserRolePreferencesFacade;
    constructor(userRolePreferencesFacade: UserRolePreferencesFacade);
    create(userRolePreferences: Omit<UserRolePreferences, 'id'>): Promise<UserRolePreferences>;
    count(where?: Where<UserRolePreferences>): Promise<Count>;
    find(filter?: Filter<UserRolePreferences>): Promise<UserRolePreferences[]>;
    updateAll(userRolePreferences: UserRolePreferences, where?: Where<UserRolePreferences>): Promise<Count>;
    findById(id: number, filter?: FilterExcludingWhere<UserRolePreferences>): Promise<UserRolePreferences>;
    updateById(id: number, userRolePreferences: UserRolePreferences): Promise<void>;
    replaceById(id: number, userRolePreferences: UserRolePreferences): Promise<void>;
    deleteById(id: number): Promise<void>;
}
