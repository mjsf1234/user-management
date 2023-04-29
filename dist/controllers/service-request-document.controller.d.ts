import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { ServiceRequestDocument } from 'common';
import { ServiceRequestDocumentFacade } from '../facades';
export declare class ServiceRequestDocumentController {
    serviceRequestDocumentFacade: ServiceRequestDocumentFacade;
    constructor(serviceRequestDocumentFacade: ServiceRequestDocumentFacade);
    create(serviceRequestDocument: Omit<ServiceRequestDocument, 'id'>): Promise<ServiceRequestDocument>;
    count(where?: Where<ServiceRequestDocument>): Promise<Count>;
    find(filter?: Filter<ServiceRequestDocument>): Promise<ServiceRequestDocument[]>;
    updateAll(serviceRequestDocument: ServiceRequestDocument, where?: Where<ServiceRequestDocument>): Promise<Count>;
    findById(id: number, filter?: FilterExcludingWhere<ServiceRequestDocument>): Promise<ServiceRequestDocument>;
    updateById(id: number, serviceRequestDocument: ServiceRequestDocument): Promise<void>;
    replaceById(id: number, serviceRequestDocument: ServiceRequestDocument): Promise<void>;
    deleteById(id: number): Promise<void>;
}
