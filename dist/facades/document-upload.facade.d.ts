import { Count, DataObject, Filter, FilterExcludingWhere, Options, Where } from '@loopback/repository';
import { DocumentUpload, DocumentUploadRelations, DocumentUploadRepository } from 'common';
export declare class DocumentUploadFacade {
    private documentUploadRepository;
    constructor(documentUploadRepository: DocumentUploadRepository);
    create(entity: DataObject<DocumentUpload>, options?: Options): Promise<DocumentUpload>;
    createAll(entities: DataObject<DocumentUpload>[], options?: Options): Promise<DocumentUpload[]>;
    save(entity: DocumentUpload, options?: Options): Promise<DocumentUpload>;
    find(filter?: Filter<DocumentUpload>, options?: Options): Promise<(DocumentUpload & DocumentUploadRelations)[]>;
    findOne(filter?: Filter<DocumentUpload>, options?: Options): Promise<(DocumentUpload & DocumentUploadRelations) | null>;
    findById(id: number, filter?: FilterExcludingWhere<DocumentUpload>, options?: Options): Promise<DocumentUpload & DocumentUploadRelations>;
    update(entity: DocumentUpload, options?: Options): Promise<void>;
    delete(entity: DocumentUpload, options?: Options): Promise<void>;
    updateAll(data: DataObject<DocumentUpload>, where?: Where<DocumentUpload>, options?: Options): Promise<Count>;
    updateById(id: number, data: DataObject<DocumentUpload>, options?: Options): Promise<void>;
    replaceById(id: number, data: DataObject<DocumentUpload>, options?: Options): Promise<void>;
    deleteAll(where?: Where<DocumentUpload>, options?: Options): Promise<Count>;
    deleteById(id: number, options?: Options): Promise<void>;
    count(where?: Where<DocumentUpload>, options?: Options): Promise<Count>;
    exists(id: number, options?: Options): Promise<boolean>;
}
