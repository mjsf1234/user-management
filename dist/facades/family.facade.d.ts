import { Count, DataObject, Filter, FilterExcludingWhere, Options, Where } from '@loopback/repository';
import { Family, FamilyRelations, FamilyRepository } from 'common';
export declare class FamilyFacade {
    private familyRepository;
    constructor(familyRepository: FamilyRepository);
    create(entity: DataObject<Family>, options?: Options): Promise<Family>;
    createAll(entities: DataObject<Family>[], options?: Options): Promise<Family[]>;
    save(entity: Family, options?: Options): Promise<Family>;
    find(filter?: Filter<Family>, options?: Options): Promise<(Family & FamilyRelations)[]>;
    findOne(filter?: Filter<Family>, options?: Options): Promise<(Family & FamilyRelations) | null>;
    findById(id: number, filter?: FilterExcludingWhere<Family>, options?: Options): Promise<Family & FamilyRelations>;
    update(entity: Family, options?: Options): Promise<void>;
    delete(entity: Family, options?: Options): Promise<void>;
    updateAll(data: DataObject<Family>, where?: Where<Family>, options?: Options): Promise<Count>;
    updateById(id: number, data: DataObject<Family>, options?: Options): Promise<void>;
    replaceById(id: number, data: DataObject<Family>, options?: Options): Promise<void>;
    deleteAll(where?: Where<Family>, options?: Options): Promise<Count>;
    deleteById(id: number, options?: Options): Promise<void>;
    count(where?: Where<Family>, options?: Options): Promise<Count>;
    exists(id: number, options?: Options): Promise<boolean>;
}
