import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { ConsolidatedDocument } from 'common';
import { ConsolidatedDocumentFacade } from '../facades';
export declare class ConsolidatedDocumentController {
    ConsolidatedDocumentFacade: ConsolidatedDocumentFacade;
    private additionalHeaders;
    constructor(ConsolidatedDocumentFacade: ConsolidatedDocumentFacade, additionalHeaders: any);
    create(ConsolidatedDocument: Omit<ConsolidatedDocument, 'id'>): Promise<ConsolidatedDocument>;
    count(where?: Where<ConsolidatedDocument>): Promise<Count>;
    find(filter?: Filter<ConsolidatedDocument>): Promise<ConsolidatedDocument[]>;
    updateAll(ConsolidatedDocument: ConsolidatedDocument, where?: Where<ConsolidatedDocument>): Promise<Count>;
    findById(id: number, filter?: FilterExcludingWhere<ConsolidatedDocument>): Promise<ConsolidatedDocument>;
    updateById(id: number, ConsolidatedDocument: ConsolidatedDocument): Promise<void>;
    replaceById(id: number, ConsolidatedDocument: ConsolidatedDocument): Promise<void>;
    deleteById(id: number): Promise<void>;
    updateStatus(ConsolidatedDocument: {
        rtaId: number;
        accountId: Array<number>;
        status: number;
    }): Promise<any>;
    rtaGeneratedConsolidatedDocuments(filterObject: object): Promise<ConsolidatedDocument[]>;
}
