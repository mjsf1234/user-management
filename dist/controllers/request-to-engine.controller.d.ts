import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { RequestToEngine } from 'common';
import { RequestToEngineFacade } from '../facades';
export declare class RequestToEngineController {
    RequestToEngineFacade: RequestToEngineFacade;
    private additionalHeaders;
    constructor(RequestToEngineFacade: RequestToEngineFacade, additionalHeaders: any);
    create(RequestToEngine: Omit<RequestToEngine, 'id'>): Promise<RequestToEngine>;
    count(where?: Where<RequestToEngine>): Promise<Count>;
    find(filter?: Filter<RequestToEngine>): Promise<RequestToEngine[]>;
    updateAll(RequestToEngine: RequestToEngine, where?: Where<RequestToEngine>): Promise<Count>;
    findById(id: number, filter?: FilterExcludingWhere<RequestToEngine>): Promise<RequestToEngine>;
    updateById(id: number, RequestToEngine: RequestToEngine): Promise<void>;
    replaceById(id: number, RequestToEngine: RequestToEngine): Promise<void>;
    deleteById(id: number): Promise<void>;
}
