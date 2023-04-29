import { Count, DataObject, Filter, FilterExcludingWhere, Options, Where } from '@loopback/repository';
import { TransactionFeedLogRepository } from 'common';
import { ConsolidatedDocument, ConsolidatedDocumentRelations, ConsolidatedDocumentRepository } from 'common';
export declare class ConsolidatedDocumentFacade {
    private ConsolidatedDocumentRepository;
    private transactionFeedLogRepository;
    constructor(ConsolidatedDocumentRepository: ConsolidatedDocumentRepository, transactionFeedLogRepository: TransactionFeedLogRepository);
    create(entity: DataObject<ConsolidatedDocument>, options?: Options): Promise<ConsolidatedDocument>;
    createAll(entities: DataObject<ConsolidatedDocument>[], options?: Options): Promise<ConsolidatedDocument[]>;
    save(entity: ConsolidatedDocument, options?: Options): Promise<ConsolidatedDocument>;
    find(filter?: Filter<ConsolidatedDocument>, options?: Options): Promise<(ConsolidatedDocument & ConsolidatedDocumentRelations)[]>;
    findOne(filter?: Filter<ConsolidatedDocument>, options?: Options): Promise<(ConsolidatedDocument & ConsolidatedDocumentRelations) | null>;
    findById(id: number, filter?: FilterExcludingWhere<ConsolidatedDocument>, options?: Options): Promise<ConsolidatedDocument & ConsolidatedDocumentRelations>;
    update(entity: ConsolidatedDocument, options?: Options): Promise<void>;
    delete(entity: ConsolidatedDocument, options?: Options): Promise<void>;
    updateAll(data: DataObject<ConsolidatedDocument>, where?: Where<ConsolidatedDocument>, options?: Options): Promise<Count>;
    updateById(id: number, data: DataObject<ConsolidatedDocument>, options?: Options): Promise<void>;
    replaceById(id: number, data: DataObject<ConsolidatedDocument>, options?: Options): Promise<void>;
    deleteAll(where?: Where<ConsolidatedDocument>, options?: Options): Promise<Count>;
    deleteById(id: number, options?: Options): Promise<void>;
    count(where?: Where<ConsolidatedDocument>, options?: Options): Promise<Count>;
    exists(id: number, options?: Options): Promise<boolean>;
    ConsolidatedDocumentMapping(ConsolidatedDocument: Array<{
        ConsolidatedDocumentId: number;
        ConsolidatedDocumentweight: number;
    }>, options?: Options): Promise<object>;
    createConsolidatedDocumentEntry(appUserId: number, accountId: number, options?: Options): Promise<any>;
    consolidateStatusUpdate(rtaId: number, accountId: Array<number>, status: number, options?: Options): Promise<Count>;
    fetchRtaPendingConsolidatedDocuments(rtaNumber: number, filterObject: any, options: Options): Promise<any>;
    rtaGeneratedConsolidatedDocuments(filterObject: any, options: Options): Promise<any>;
}
