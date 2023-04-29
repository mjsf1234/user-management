import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { FamilyMapping } from 'common';
import { FamilyMappingFacade } from '../facades';
export declare class FamilyMappingController {
    familyMappingFacade: FamilyMappingFacade;
    constructor(familyMappingFacade: FamilyMappingFacade);
    create(FamilyMapping: Omit<FamilyMapping, 'id'>): Promise<FamilyMapping>;
    count(where?: Where<FamilyMapping>): Promise<Count>;
    find(filter?: Filter<FamilyMapping>): Promise<FamilyMapping[]>;
    updateAll(FamilyMapping: FamilyMapping, where?: Where<FamilyMapping>): Promise<Count>;
    findById(id: number, filter?: FilterExcludingWhere<FamilyMapping>): Promise<FamilyMapping>;
    updateById(id: number, FamilyMapping: FamilyMapping): Promise<void>;
    replaceById(id: number, FamilyMapping: FamilyMapping): Promise<void>;
    deleteById(id: number): Promise<void>;
}
