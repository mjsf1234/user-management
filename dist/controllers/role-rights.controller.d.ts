import { AnyObject, Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { RoleRights } from 'common';
import { RoleRightsFacade } from '../facades';
export declare class RoleRightsController {
    roleRightsFacade: RoleRightsFacade;
    constructor(roleRightsFacade: RoleRightsFacade);
    create(RoleRights: Omit<RoleRights, 'id'>): Promise<RoleRights>;
    count(where?: Where<RoleRights>): Promise<Count>;
    find(filter?: Filter<RoleRights>): Promise<RoleRights[]>;
    updateAll(RoleRights: RoleRights, where?: Where<RoleRights>): Promise<Count>;
    findById(id: number, filter?: FilterExcludingWhere<RoleRights>): Promise<RoleRights>;
    updateById(id: number, RoleRights: RoleRights): Promise<void>;
    replaceById(id: number, RoleRights: RoleRights): Promise<void>;
    deleteById(id: number): Promise<void>;
    fetchRolesRights(filter?: Filter<RoleRights>): Promise<AnyObject[]>;
}
