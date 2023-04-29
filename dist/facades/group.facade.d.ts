import { Count, DataObject, Filter, FilterExcludingWhere, Options, Where } from '@loopback/repository';
import { Group, GroupRelations, GroupRepository } from 'common';
export declare class GroupFacade {
    private groupRepository;
    constructor(groupRepository: GroupRepository);
    create(entity: DataObject<Group>, options?: Options): Promise<Group>;
    createAll(entities: DataObject<Group>[], options?: Options): Promise<Group[]>;
    save(entity: Group, options?: Options): Promise<Group>;
    find(filter?: Filter<Group>, options?: Options): Promise<(Group & GroupRelations)[]>;
    findOne(filter?: Filter<Group>, options?: Options): Promise<(Group & GroupRelations) | null>;
    findById(id: number, filter?: FilterExcludingWhere<Group>, options?: Options): Promise<Group & GroupRelations>;
    update(entity: Group, options?: Options): Promise<void>;
    delete(entity: Group, options?: Options): Promise<void>;
    updateAll(data: DataObject<Group>, where?: Where<Group>, options?: Options): Promise<Count>;
    updateById(id: number, data: DataObject<Group>, options?: Options): Promise<void>;
    replaceById(id: number, data: DataObject<Group>, options?: Options): Promise<void>;
    deleteAll(where?: Where<Group>, options?: Options): Promise<Count>;
    deleteById(id: number, options?: Options): Promise<void>;
    count(where?: Where<Group>, options?: Options): Promise<Count>;
    exists(id: number, options?: Options): Promise<boolean>;
}
