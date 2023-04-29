import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { MpinHistory } from 'common';
import { MpinHistoryFacade } from '../facades';
export declare class MpinHistoryController {
    mpinHistoryFacade: MpinHistoryFacade;
    constructor(mpinHistoryFacade: MpinHistoryFacade);
    create(mpinHistory: Omit<MpinHistory, 'id'>): Promise<MpinHistory>;
    count(where?: Where<MpinHistory>): Promise<Count>;
    find(filter?: Filter<MpinHistory>): Promise<MpinHistory[]>;
    updateAll(mpinHistory: MpinHistory, where?: Where<MpinHistory>): Promise<Count>;
    findById(id: number, filter?: FilterExcludingWhere<MpinHistory>): Promise<MpinHistory>;
    updateById(id: number, mpinHistory: MpinHistory): Promise<void>;
    replaceById(id: number, mpinHistory: MpinHistory): Promise<void>;
    deleteById(id: number): Promise<void>;
}
