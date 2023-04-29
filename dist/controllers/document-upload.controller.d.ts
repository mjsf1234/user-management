import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { DocumentUpload } from 'common';
import { DocumentUploadFacade } from '../facades';
export declare class DocumentUploadController {
    documentUploadFacade: DocumentUploadFacade;
    constructor(documentUploadFacade: DocumentUploadFacade);
    create(documentUpload: Omit<DocumentUpload, 'id'>): Promise<DocumentUpload>;
    count(where?: Where<DocumentUpload>): Promise<Count>;
    find(filter?: Filter<DocumentUpload>): Promise<DocumentUpload[]>;
    updateAll(documentUpload: DocumentUpload, where?: Where<DocumentUpload>): Promise<Count>;
    findById(id: number, filter?: FilterExcludingWhere<DocumentUpload>): Promise<DocumentUpload>;
    updateById(id: number, documentUpload: DocumentUpload): Promise<void>;
    replaceById(id: number, documentUpload: DocumentUpload): Promise<void>;
    deleteById(id: number): Promise<void>;
}
