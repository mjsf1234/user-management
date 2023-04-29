import { Count, DataObject, Filter, FilterExcludingWhere, Options, Where } from '@loopback/repository';
import { NomineeDocument, NomineeDocumentRelations, NomineeDocumentRepository, RequestToEngineRepository } from 'common';
import { NomineeDocumentGenerationEngine } from '../engines/nominee-document-generation.engine';
export declare class NomineeDocumentFacade {
    private nomineeDocumentRepository;
    private nomineeDocumentGenerationEngine;
    private requestToEngineRepository;
    constructor(nomineeDocumentRepository: NomineeDocumentRepository, nomineeDocumentGenerationEngine: NomineeDocumentGenerationEngine, requestToEngineRepository: RequestToEngineRepository);
    create(entity: DataObject<NomineeDocument>, options?: Options): Promise<NomineeDocument>;
    createAll(entities: DataObject<NomineeDocument>[], options?: Options): Promise<NomineeDocument[]>;
    save(entity: NomineeDocument, options?: Options): Promise<NomineeDocument>;
    find(filter?: Filter<NomineeDocument>, options?: Options): Promise<(NomineeDocument & NomineeDocumentRelations)[]>;
    findOne(filter?: Filter<NomineeDocument>, options?: Options): Promise<(NomineeDocument & NomineeDocumentRelations) | null>;
    findById(id: number, filter?: FilterExcludingWhere<NomineeDocument>, options?: Options): Promise<NomineeDocument & NomineeDocumentRelations>;
    update(entity: NomineeDocument, options?: Options): Promise<void>;
    delete(entity: NomineeDocument, options?: Options): Promise<void>;
    updateAll(data: DataObject<NomineeDocument>, where?: Where<NomineeDocument>, options?: Options): Promise<Count>;
    updateById(id: number, data: DataObject<NomineeDocument>, options?: Options): Promise<void>;
    replaceById(id: number, data: DataObject<NomineeDocument>, options?: Options): Promise<void>;
    deleteAll(where?: Where<NomineeDocument>, options?: Options): Promise<Count>;
    deleteById(id: number, options?: Options): Promise<void>;
    count(where?: Where<NomineeDocument>, options?: Options): Promise<Count>;
    exists(id: number, options?: Options): Promise<boolean>;
    generateNomineeDocuments(obj: any, options: Options): Promise<any>;
    nomineeDocumentDetails(filter: any, filterObject: any, options: Options): Promise<any>;
    nomineeDocumentStatusUpdate(ids: Array<number>, status: number, options?: Options): Promise<Count>;
}
