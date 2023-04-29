import { Count, DataObject, Filter, FilterExcludingWhere, Options, Where } from '@loopback/repository';
import { AppRole, AppRoleRelations, AppRoleRepository } from 'common';
export declare class AppRoleFacade {
    private appRoleRepository;
    constructor(appRoleRepository: AppRoleRepository);
    create(entity: DataObject<AppRole>, options?: Options): Promise<AppRole>;
    createAll(entities: DataObject<AppRole>[], options?: Options): Promise<AppRole[]>;
    save(entity: AppRole, options?: Options): Promise<AppRole>;
    find(filter?: Filter<AppRole>, options?: Options): Promise<(AppRole & AppRoleRelations)[]>;
    findOne(filter?: Filter<AppRole>, options?: Options): Promise<(AppRole & AppRoleRelations) | null>;
    findById(id: number, filter?: FilterExcludingWhere<AppRole>, options?: Options): Promise<AppRole & AppRoleRelations>;
    update(entity: AppRole, options?: Options): Promise<void>;
    delete(entity: AppRole, options?: Options): Promise<void>;
    updateAll(data: DataObject<AppRole>, where?: Where<AppRole>, options?: Options): Promise<Count>;
    updateById(id: number, data: DataObject<AppRole>, options?: Options): Promise<void>;
    replaceById(id: number, data: DataObject<AppRole>, options?: Options): Promise<void>;
    deleteAll(where?: Where<AppRole>, options?: Options): Promise<Count>;
    deleteById(id: number, options?: Options): Promise<void>;
    count(where?: Where<AppRole>, options?: Options): Promise<Count>;
    exists(id: number, options?: Options): Promise<boolean>;
}
