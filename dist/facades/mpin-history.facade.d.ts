import { Count, DataObject, Filter, FilterExcludingWhere, Options, Where } from '@loopback/repository';
import { MpinHistory, MpinHistoryRelations, MpinHistoryRepository } from 'common';
export declare class MpinHistoryFacade {
    private mpinHistoryRepository;
    constructor(mpinHistoryRepository: MpinHistoryRepository);
    create(entity: DataObject<MpinHistory>, options?: Options): Promise<MpinHistory>;
    createAll(entities: DataObject<MpinHistory>[], options?: Options): Promise<MpinHistory[]>;
    save(entity: MpinHistory, options?: Options): Promise<MpinHistory>;
    find(filter?: Filter<MpinHistory>, options?: Options): Promise<(MpinHistory & MpinHistoryRelations)[]>;
    findOne(filter?: Filter<MpinHistory>, options?: Options): Promise<(MpinHistory & MpinHistoryRelations) | null>;
    findById(id: number, filter?: FilterExcludingWhere<MpinHistory>, options?: Options): Promise<MpinHistory & MpinHistoryRelations>;
    update(entity: MpinHistory, options?: Options): Promise<void>;
    delete(entity: MpinHistory, options?: Options): Promise<void>;
    updateAll(data: DataObject<MpinHistory>, where?: Where<MpinHistory>, options?: Options): Promise<Count>;
    updateById(id: number, data: DataObject<MpinHistory>, options?: Options): Promise<void>;
    replaceById(id: number, data: DataObject<MpinHistory>, options?: Options): Promise<void>;
    deleteAll(where?: Where<MpinHistory>, options?: Options): Promise<Count>;
    deleteById(id: number, options?: Options): Promise<void>;
    count(where?: Where<MpinHistory>, options?: Options): Promise<Count>;
    exists(id: number, options?: Options): Promise<boolean>;
}
