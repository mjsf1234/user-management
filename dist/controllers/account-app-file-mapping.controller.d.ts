import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { AccountAppFileMapping } from 'common';
import { AccountAppFileMappingFacade } from '../facades';
export declare class AccountAppFileMappingController {
    accountAppFileMappingFacade: AccountAppFileMappingFacade;
    private additionalHeaders;
    constructor(accountAppFileMappingFacade: AccountAppFileMappingFacade, additionalHeaders: any);
    create(accountAppFileMapping: Omit<AccountAppFileMapping, 'id'>): Promise<AccountAppFileMapping>;
    count(where?: Where<AccountAppFileMapping>): Promise<Count>;
    find(filter?: Filter<AccountAppFileMapping>): Promise<AccountAppFileMapping[]>;
    updateAll(accountAppFileMapping: AccountAppFileMapping, where?: Where<AccountAppFileMapping>): Promise<Count>;
    findById(id: number, filter?: FilterExcludingWhere<AccountAppFileMapping>): Promise<AccountAppFileMapping>;
    updateById(id: number, accountAppFileMapping: AccountAppFileMapping): Promise<void>;
    replaceById(id: number, accountAppFileMapping: AccountAppFileMapping): Promise<void>;
    deleteById(id: number): Promise<void>;
    accountAppFileMappingDetails(filter: any, where: any): Promise<any>;
}
