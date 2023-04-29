import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Family } from 'common';
import { FamilyFacade } from '../facades';
export declare class FamilyController {
    familyFacade: FamilyFacade;
    constructor(familyFacade: FamilyFacade);
    create(family: Omit<Family, 'id'>): Promise<Family>;
    count(where?: Where<Family>): Promise<Count>;
    find(filter?: Filter<Family>): Promise<Family[]>;
    updateAll(family: Family, where?: Where<Family>): Promise<Count>;
    findById(id: number, filter?: FilterExcludingWhere<Family>): Promise<Family>;
    updateById(id: number, family: Family): Promise<void>;
    replaceById(id: number, family: Family): Promise<void>;
    deleteById(id: number): Promise<void>;
}
