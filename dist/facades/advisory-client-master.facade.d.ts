import { Count, DataObject, Filter, FilterExcludingWhere, Options, Where } from '@loopback/repository';
import { AdvisoryClientMaster, AdvisoryClientMasterRelations, AdvisoryClientMasterRepository, AppUserRepository } from 'common';
export declare class AdvisoryClientMasterFacade {
    private advisoryClientMasterRepository;
    private appUserRepository;
    constructor(advisoryClientMasterRepository: AdvisoryClientMasterRepository, appUserRepository: AppUserRepository);
    create(entity: DataObject<AdvisoryClientMaster>, options?: Options): Promise<AdvisoryClientMaster>;
    createAll(entities: DataObject<AdvisoryClientMaster>[], options?: Options): Promise<AdvisoryClientMaster[]>;
    save(entity: AdvisoryClientMaster, options?: Options): Promise<AdvisoryClientMaster>;
    find(filter?: Filter<AdvisoryClientMaster>, options?: Options): Promise<(AdvisoryClientMaster & AdvisoryClientMasterRelations)[]>;
    findOne(filter?: Filter<AdvisoryClientMaster>, options?: Options): Promise<(AdvisoryClientMaster & AdvisoryClientMasterRelations) | null>;
    findById(id: number, filter?: FilterExcludingWhere<AdvisoryClientMaster>, options?: Options): Promise<AdvisoryClientMaster & AdvisoryClientMasterRelations>;
    update(entity: AdvisoryClientMaster, options?: Options): Promise<void>;
    delete(entity: AdvisoryClientMaster, options?: Options): Promise<void>;
    updateAll(data: DataObject<AdvisoryClientMaster>, where?: Where<AdvisoryClientMaster>, options?: Options): Promise<Count>;
    updateById(id: number, data: DataObject<AdvisoryClientMaster>, options?: Options): Promise<void>;
    replaceById(id: number, data: DataObject<AdvisoryClientMaster>, options?: Options): Promise<void>;
    deleteAll(where?: Where<AdvisoryClientMaster>, options?: Options): Promise<Count>;
    deleteById(id: number, options?: Options): Promise<void>;
    count(where?: Where<AdvisoryClientMaster>, options?: Options): Promise<Count>;
    exists(id: number, options?: Options): Promise<boolean>;
}
