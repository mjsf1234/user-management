import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { NomineeDocument } from 'common';
import { NomineeDocumentFacade } from '../facades';
export declare class NomineeDocumentController {
    NomineeDocumentFacade: NomineeDocumentFacade;
    private additionalHeaders;
    constructor(NomineeDocumentFacade: NomineeDocumentFacade, additionalHeaders: any);
    create(NomineeDocument: Omit<NomineeDocument, 'id'>): Promise<NomineeDocument>;
    count(where?: Where<NomineeDocument>): Promise<Count>;
    find(filter?: Filter<NomineeDocument>): Promise<NomineeDocument[]>;
    updateAll(NomineeDocument: NomineeDocument, where?: Where<NomineeDocument>): Promise<Count>;
    findById(id: number, filter?: FilterExcludingWhere<NomineeDocument>): Promise<NomineeDocument>;
    updateById(id: number, NomineeDocument: NomineeDocument): Promise<void>;
    replaceById(id: number, NomineeDocument: NomineeDocument): Promise<void>;
    deleteById(id: number): Promise<void>;
    generateNomineeDocuments(generateNomineeDocuments: {
        rtaId: number;
        accountId: number;
        serviceProviderId: number;
        date: string;
    }): Promise<object>;
    userCartDetails(filter: any, where: any): Promise<any>;
    updateStatus(NomineeDocument: {
        ids: Array<number>;
        status: number;
    }): Promise<any>;
}
