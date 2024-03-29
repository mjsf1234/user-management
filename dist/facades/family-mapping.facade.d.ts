import { Count, DataObject, Filter, FilterExcludingWhere, Options, Where } from '@loopback/repository';
import { FamilyMapping, FamilyMappingRelations, FamilyMappingRepository, AppUserRepository, AccountRepository } from 'common';
export declare class FamilyMappingFacade {
    private familyMappingRepository;
    private appUserRepository;
    private accountRepository;
    constructor(familyMappingRepository: FamilyMappingRepository, appUserRepository: AppUserRepository, accountRepository: AccountRepository);
    create(entity: DataObject<FamilyMapping>, options?: Options): Promise<FamilyMapping>;
    createAll(entities: DataObject<FamilyMapping>[], options?: Options): Promise<FamilyMapping[]>;
    save(entity: FamilyMapping, options?: Options): Promise<FamilyMapping>;
    find(filter?: Filter<FamilyMapping>, options?: Options): Promise<(FamilyMapping & FamilyMappingRelations)[]>;
    findOne(filter?: Filter<FamilyMapping>, options?: Options): Promise<(FamilyMapping & FamilyMappingRelations) | null>;
    findById(id: number, filter?: FilterExcludingWhere<FamilyMapping>, options?: Options): Promise<FamilyMapping & FamilyMappingRelations>;
    update(entity: FamilyMapping, options?: Options): Promise<void>;
    delete(entity: FamilyMapping, options?: Options): Promise<void>;
    updateAll(data: DataObject<FamilyMapping>, where?: Where<FamilyMapping>, options?: Options): Promise<Count>;
    updateById(id: number, data: DataObject<FamilyMapping>, options?: Options): Promise<void>;
    replaceById(id: number, data: DataObject<FamilyMapping>, options?: Options): Promise<void>;
    deleteAll(where?: Where<FamilyMapping>, options?: Options): Promise<Count>;
    deleteById(id: number, options?: Options): Promise<void>;
    count(where?: Where<FamilyMapping>, options?: Options): Promise<Count>;
    exists(id: number, options?: Options): Promise<boolean>;
    getChildren(id: number): Promise<Object>;
    getParents(id: number): Promise<Object>;
    getSentRequestsPending(id: number): Promise<Object>;
    getPendingRequests(id: number): Promise<Object>;
    removeChild(id: number, childDetails: any): Promise<Object>;
    removeParent(id: number, parentDetails: any): Promise<Object>;
    approveRejectFamilyRequest(id: number, parentDetails: any): Promise<Object>;
    sendRequestforFamilyAddition(id: number, memberDetails: any): Promise<Object>;
    getDetailsforFamily(parentId: number, userCode: string): Promise<any>;
}
