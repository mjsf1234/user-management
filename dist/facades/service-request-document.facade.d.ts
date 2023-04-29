import { Count, DataObject, Filter, FilterExcludingWhere, Options, Where } from '@loopback/repository';
import { ServiceRequestDocument, ServiceRequestDocumentRelations, ServiceRequestDocumentRepository } from 'common';
export declare class ServiceRequestDocumentFacade {
    private serviceRequestDocumentRepository;
    constructor(serviceRequestDocumentRepository: ServiceRequestDocumentRepository);
    create(entity: DataObject<ServiceRequestDocument>, options?: Options): Promise<ServiceRequestDocument>;
    createAll(entities: DataObject<ServiceRequestDocument>[], options?: Options): Promise<ServiceRequestDocument[]>;
    save(entity: ServiceRequestDocument, options?: Options): Promise<ServiceRequestDocument>;
    find(filter?: Filter<ServiceRequestDocument>, options?: Options): Promise<(ServiceRequestDocument & ServiceRequestDocumentRelations)[]>;
    findOne(filter?: Filter<ServiceRequestDocument>, options?: Options): Promise<(ServiceRequestDocument & ServiceRequestDocumentRelations) | null>;
    findById(id: number, filter?: FilterExcludingWhere<ServiceRequestDocument>, options?: Options): Promise<ServiceRequestDocument & ServiceRequestDocumentRelations>;
    update(entity: ServiceRequestDocument, options?: Options): Promise<void>;
    delete(entity: ServiceRequestDocument, options?: Options): Promise<void>;
    updateAll(data: DataObject<ServiceRequestDocument>, where?: Where<ServiceRequestDocument>, options?: Options): Promise<Count>;
    updateById(id: number, data: DataObject<ServiceRequestDocument>, options?: Options): Promise<void>;
    replaceById(id: number, data: DataObject<ServiceRequestDocument>, options?: Options): Promise<void>;
    deleteAll(where?: Where<ServiceRequestDocument>, options?: Options): Promise<Count>;
    deleteById(id: number, options?: Options): Promise<void>;
    count(where?: Where<ServiceRequestDocument>, options?: Options): Promise<Count>;
    exists(id: number, options?: Options): Promise<boolean>;
}
