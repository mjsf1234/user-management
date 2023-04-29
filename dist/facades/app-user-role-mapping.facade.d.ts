import { Count, DataObject, Filter, FilterExcludingWhere, Options, Where } from '@loopback/repository';
import { AppUserRoleMapping, AppUserRoleMappingRelations, AppUserRoleMappingRepository } from 'common';
export declare class AppUserRoleMappingFacade {
    private appUserRoleMappingRepository;
    constructor(appUserRoleMappingRepository: AppUserRoleMappingRepository);
    create(entity: DataObject<AppUserRoleMapping>, options?: Options): Promise<AppUserRoleMapping>;
    createAll(entities: DataObject<AppUserRoleMapping>[], options?: Options): Promise<AppUserRoleMapping[]>;
    save(entity: AppUserRoleMapping, options?: Options): Promise<AppUserRoleMapping>;
    find(filter?: Filter<AppUserRoleMapping>, options?: Options): Promise<(AppUserRoleMapping & AppUserRoleMappingRelations)[]>;
    findOne(filter?: Filter<AppUserRoleMapping>, options?: Options): Promise<(AppUserRoleMapping & AppUserRoleMappingRelations) | null>;
    findById(id: number, filter?: FilterExcludingWhere<AppUserRoleMapping>, options?: Options): Promise<AppUserRoleMapping & AppUserRoleMappingRelations>;
    update(entity: AppUserRoleMapping, options?: Options): Promise<void>;
    delete(entity: AppUserRoleMapping, options?: Options): Promise<void>;
    updateAll(data: DataObject<AppUserRoleMapping>, where?: Where<AppUserRoleMapping>, options?: Options): Promise<Count>;
    updateById(id: number, data: DataObject<AppUserRoleMapping>, options?: Options): Promise<void>;
    replaceById(id: number, data: DataObject<AppUserRoleMapping>, options?: Options): Promise<void>;
    deleteAll(where?: Where<AppUserRoleMapping>, options?: Options): Promise<Count>;
    deleteById(id: number, options?: Options): Promise<void>;
    count(where?: Where<AppUserRoleMapping>, options?: Options): Promise<Count>;
    exists(id: number, options?: Options): Promise<boolean>;
}
