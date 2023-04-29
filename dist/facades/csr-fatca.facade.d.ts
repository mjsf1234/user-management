import { Count, DataObject, Filter, FilterExcludingWhere, Options, Where } from '@loopback/repository';
import { CsrFatca, CsrFatcaRepository, CsrFatcaWithRelations, UserManagementAppFileRepository } from 'common';
export declare class CsrFatcaFacade {
    private csrFatcaRepository;
    private userManagementAppFileRepository;
    constructor(csrFatcaRepository: CsrFatcaRepository, userManagementAppFileRepository: UserManagementAppFileRepository);
    create(entity: DataObject<CsrFatca>, options?: Options): Promise<CsrFatca>;
    createAll(entities: DataObject<CsrFatca>[], options?: Options): Promise<CsrFatca[]>;
    save(entity: CsrFatca, options?: Options): Promise<CsrFatca>;
    find(filter?: Filter<CsrFatca>, options?: Options): Promise<(CsrFatca & CsrFatcaWithRelations)[]>;
    findOne(filter?: Filter<CsrFatca>, options?: Options): Promise<(CsrFatca & CsrFatcaWithRelations) | null>;
    findById(id: number, filter?: FilterExcludingWhere<CsrFatca>, options?: Options): Promise<CsrFatca & CsrFatcaWithRelations>;
    update(entity: CsrFatca, options?: Options): Promise<void>;
    delete(entity: CsrFatca, options?: Options): Promise<void>;
    updateAll(data: DataObject<CsrFatca>, where?: Where<CsrFatca>, options?: Options): Promise<Count>;
    updateById(id: number, data: DataObject<CsrFatca>, options?: Options): Promise<void>;
    replaceById(id: number, data: DataObject<CsrFatca>, options?: Options): Promise<void>;
    deleteAll(where?: Where<CsrFatca>, options?: Options): Promise<Count>;
    deleteById(id: number, options?: Options): Promise<void>;
    count(where?: Where<CsrFatca>, options?: Options): Promise<Count>;
    exists(id: number, options?: Options): Promise<boolean>;
    updatecsrFatcaStatus(data: DataObject<CsrFatca>, options?: Options): Promise<Count>;
    generateFatca(options?: Options): Promise<any>;
    fetchFatca(paginator: any, options?: Options): Promise<any>;
}
