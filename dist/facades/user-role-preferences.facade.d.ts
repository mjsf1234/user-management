import { Count, DataObject, Filter, FilterExcludingWhere, Options, Where } from '@loopback/repository';
import { UserRolePreferences, UserRolePreferencesRelations, UserRolePreferencesRepository } from 'common';
export declare class UserRolePreferencesFacade {
    private userRolePreferencesRepository;
    constructor(userRolePreferencesRepository: UserRolePreferencesRepository);
    create(entity: DataObject<UserRolePreferences>, options?: Options): Promise<UserRolePreferences>;
    createAll(entities: DataObject<UserRolePreferences>[], options?: Options): Promise<UserRolePreferences[]>;
    save(entity: UserRolePreferences, options?: Options): Promise<UserRolePreferences>;
    find(filter?: Filter<UserRolePreferences>, options?: Options): Promise<(UserRolePreferences & UserRolePreferencesRelations)[]>;
    findOne(filter?: Filter<UserRolePreferences>, options?: Options): Promise<(UserRolePreferences & UserRolePreferencesRelations) | null>;
    findById(id: number, filter?: FilterExcludingWhere<UserRolePreferences>, options?: Options): Promise<UserRolePreferences & UserRolePreferencesRelations>;
    update(entity: UserRolePreferences, options?: Options): Promise<void>;
    delete(entity: UserRolePreferences, options?: Options): Promise<void>;
    updateAll(data: DataObject<UserRolePreferences>, where?: Where<UserRolePreferences>, options?: Options): Promise<Count>;
    updateById(id: number, data: DataObject<UserRolePreferences>, options?: Options): Promise<void>;
    replaceById(id: number, data: DataObject<UserRolePreferences>, options?: Options): Promise<void>;
    deleteAll(where?: Where<UserRolePreferences>, options?: Options): Promise<Count>;
    deleteById(id: number, options?: Options): Promise<void>;
    count(where?: Where<UserRolePreferences>, options?: Options): Promise<Count>;
    exists(id: number, options?: Options): Promise<boolean>;
}
