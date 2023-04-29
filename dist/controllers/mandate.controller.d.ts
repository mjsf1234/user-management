import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Mandate } from 'common';
import { MandateFacade } from '../facades';
export declare class MandateController {
    mandateFacade: MandateFacade;
    constructor(mandateFacade: MandateFacade);
    create(mandate: Omit<Mandate, 'id'>): Promise<Mandate>;
    count(where?: Where<Mandate>): Promise<Count>;
    find(filter?: Filter<Mandate>): Promise<Mandate[]>;
    updateAll(mandate: Mandate, where?: Where<Mandate>): Promise<Count>;
    findById(id: number, filter?: FilterExcludingWhere<Mandate>): Promise<Mandate>;
    updateById(id: number, mandate: Mandate): Promise<void>;
    replaceById(id: number, mandate: Mandate): Promise<void>;
    deleteById(id: number): Promise<void>;
}
