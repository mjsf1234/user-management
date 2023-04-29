import { Count, DataObject, Filter, FilterExcludingWhere, Options, Where } from '@loopback/repository';
import { RequestToEngine, RequestToEngineRelations, RequestToEngineRepository } from 'common';
export declare class RequestToEngineFacade {
    private RequestToEngineRepository;
    constructor(RequestToEngineRepository: RequestToEngineRepository);
    create(entity: DataObject<RequestToEngine>, options?: Options): Promise<RequestToEngine>;
    createAll(entities: DataObject<RequestToEngine>[], options?: Options): Promise<RequestToEngine[]>;
    save(entity: RequestToEngine, options?: Options): Promise<RequestToEngine>;
    find(filter?: Filter<RequestToEngine>, options?: Options): Promise<(RequestToEngine & RequestToEngineRelations)[]>;
    findOne(filter?: Filter<RequestToEngine>, options?: Options): Promise<(RequestToEngine & RequestToEngineRelations) | null>;
    findById(id: number, filter?: FilterExcludingWhere<RequestToEngine>, options?: Options): Promise<RequestToEngine & RequestToEngineRelations>;
    update(entity: RequestToEngine, options?: Options): Promise<void>;
    delete(entity: RequestToEngine, options?: Options): Promise<void>;
    updateAll(data: DataObject<RequestToEngine>, where?: Where<RequestToEngine>, options?: Options): Promise<Count>;
    updateById(id: number, data: DataObject<RequestToEngine>, options?: Options): Promise<void>;
    replaceById(id: number, data: DataObject<RequestToEngine>, options?: Options): Promise<void>;
    deleteAll(where?: Where<RequestToEngine>, options?: Options): Promise<Count>;
    deleteById(id: number, options?: Options): Promise<void>;
    count(where?: Where<RequestToEngine>, options?: Options): Promise<Count>;
    exists(id: number, options?: Options): Promise<boolean>;
}
