import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Group } from 'common';
import { GroupFacade } from '../facades';
export declare class GroupController {
    groupFacade: GroupFacade;
    constructor(groupFacade: GroupFacade);
    create(group: Omit<Group, 'id'>): Promise<Group>;
    count(where?: Where<Group>): Promise<Count>;
    find(filter?: Filter<Group>): Promise<Group[]>;
    updateAll(group: Group, where?: Where<Group>): Promise<Count>;
    findById(id: number, filter?: FilterExcludingWhere<Group>): Promise<Group>;
    updateById(id: number, group: Group): Promise<void>;
    replaceById(id: number, group: Group): Promise<void>;
    deleteById(id: number): Promise<void>;
}
