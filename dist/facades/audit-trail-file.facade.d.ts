import { Count, DataObject, Filter, FilterExcludingWhere, Options, Where } from '@loopback/repository';
import { AuditTrailFile, AuditTrailFileRelations, AuditTrailFileRepository, IStorageService } from 'common';
export declare class AuditTrailFileFacade {
    private AuditTrailFileRepository;
    private fileStorageService;
    constructor(AuditTrailFileRepository: AuditTrailFileRepository, fileStorageService: IStorageService);
    create(entity: DataObject<AuditTrailFile>, options?: Options): Promise<AuditTrailFile>;
    createAll(entities: DataObject<AuditTrailFile>[], options?: Options): Promise<AuditTrailFile[]>;
    save(entity: AuditTrailFile, options?: Options): Promise<AuditTrailFile>;
    find(filter?: Filter<AuditTrailFile>, options?: Options): Promise<(AuditTrailFile & AuditTrailFileRelations)[]>;
    findOne(filter?: Filter<AuditTrailFile>, options?: Options): Promise<(AuditTrailFile & AuditTrailFileRelations) | null>;
    findById(id: number, filter?: FilterExcludingWhere<AuditTrailFile>, options?: Options): Promise<AuditTrailFile & AuditTrailFileRelations>;
    update(entity: AuditTrailFile, options?: Options): Promise<void>;
    delete(entity: AuditTrailFile, options?: Options): Promise<void>;
    updateAll(data: DataObject<AuditTrailFile>, where?: Where<AuditTrailFile>, options?: Options): Promise<Count>;
    updateById(id: number, data: DataObject<AuditTrailFile>, options?: Options): Promise<void>;
    replaceById(id: number, data: DataObject<AuditTrailFile>, options?: Options): Promise<void>;
    deleteAll(where?: Where<AuditTrailFile>, options?: Options): Promise<Count>;
    deleteById(id: number, options?: Options): Promise<void>;
    count(where?: Where<AuditTrailFile>, options?: Options): Promise<Count>;
    exists(id: number, options?: Options): Promise<boolean>;
}
