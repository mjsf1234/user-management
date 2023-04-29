import { AnyObject, Count, DataObject, Filter, FilterExcludingWhere, Options, Where } from '@loopback/repository';
import { RoleRights, RoleRightsRelations, RoleRightsRepository } from 'common';
import { UamIntegrationFacade } from './uam-integration.facade';
export declare class RoleRightsFacade {
    private roleRightsRepository;
    private uamIntegrationFacade;
    constructor(roleRightsRepository: RoleRightsRepository, uamIntegrationFacade: UamIntegrationFacade);
    create(entity: DataObject<RoleRights>, options?: Options): Promise<RoleRights>;
    createAll(entities: DataObject<RoleRights>[], options?: Options): Promise<RoleRights[]>;
    save(entity: RoleRights, options?: Options): Promise<RoleRights>;
    find(filter?: Filter<RoleRights>, options?: Options): Promise<(RoleRights & RoleRightsRelations)[]>;
    findOne(filter?: Filter<RoleRights>, options?: Options): Promise<(RoleRights & RoleRightsRelations) | null>;
    findById(id: number, filter?: FilterExcludingWhere<RoleRights>, options?: Options): Promise<RoleRights & RoleRightsRelations>;
    update(entity: RoleRights, options?: Options): Promise<void>;
    delete(entity: RoleRights, options?: Options): Promise<void>;
    updateAll(data: DataObject<RoleRights>, where?: Where<RoleRights>, options?: Options): Promise<Count>;
    updateById(id: number, data: DataObject<RoleRights>, options?: Options): Promise<void>;
    replaceById(id: number, data: DataObject<RoleRights>, options?: Options): Promise<void>;
    deleteAll(where?: Where<RoleRights>, options?: Options): Promise<Count>;
    deleteById(id: number, options?: Options): Promise<void>;
    count(where?: Where<RoleRights>, options?: Options): Promise<Count>;
    exists(id: number, options?: Options): Promise<boolean>;
    fetchRolesRights(filter?: Filter<RoleRights>, options?: Options): Promise<AnyObject[]>;
}
