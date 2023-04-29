import { Count, DataObject, Filter, FilterExcludingWhere, Options, Where } from '@loopback/repository';
import { AccountAppFileMapping, AccountAppFileMappingRelations, AccountAppFileMappingRepository } from 'common';
export declare class AccountAppFileMappingFacade {
    private accountAppFileMappingRepository;
    constructor(accountAppFileMappingRepository: AccountAppFileMappingRepository);
    create(entity: DataObject<AccountAppFileMapping>, options?: Options): Promise<AccountAppFileMapping>;
    createAll(entities: DataObject<AccountAppFileMapping>[], options?: Options): Promise<AccountAppFileMapping[]>;
    save(entity: AccountAppFileMapping, options?: Options): Promise<AccountAppFileMapping>;
    find(filter?: Filter<AccountAppFileMapping>, options?: Options): Promise<(AccountAppFileMapping & AccountAppFileMappingRelations)[]>;
    findOne(filter?: Filter<AccountAppFileMapping>, options?: Options): Promise<(AccountAppFileMapping & AccountAppFileMappingRelations) | null>;
    findById(id: number, filter?: FilterExcludingWhere<AccountAppFileMapping>, options?: Options): Promise<AccountAppFileMapping & AccountAppFileMappingRelations>;
    update(entity: AccountAppFileMapping, options?: Options): Promise<void>;
    delete(entity: AccountAppFileMapping, options?: Options): Promise<void>;
    updateAll(data: DataObject<AccountAppFileMapping>, where?: Where<AccountAppFileMapping>, options?: Options): Promise<Count>;
    updateById(id: number, data: DataObject<AccountAppFileMapping>, options?: Options): Promise<void>;
    replaceById(id: number, data: DataObject<AccountAppFileMapping>, options?: Options): Promise<void>;
    deleteAll(where?: Where<AccountAppFileMapping>, options?: Options): Promise<Count>;
    deleteById(id: number, options?: Options): Promise<void>;
    count(where?: Where<AccountAppFileMapping>, options?: Options): Promise<Count>;
    exists(id: number, options?: Options): Promise<boolean>;
    accountAppFileMappingDetails(filter: any, filterObject: any, options: Options): Promise<any>;
}
