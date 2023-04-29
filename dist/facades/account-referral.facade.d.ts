import { Count, DataObject, Filter, FilterExcludingWhere, Options, Where } from '@loopback/repository';
import { AccountReferral, AccountReferralRepository, AccountReferralWithRelations } from 'common';
export declare class AccountReferralFacade {
    private accountReferralRepository;
    constructor(accountReferralRepository: AccountReferralRepository);
    create(entity: DataObject<AccountReferral>, options?: Options): Promise<AccountReferral>;
    createAll(entities: DataObject<AccountReferral>[], options?: Options): Promise<AccountReferral[]>;
    save(entity: AccountReferral, options?: Options): Promise<AccountReferral>;
    find(filter?: Filter<AccountReferral>, options?: Options): Promise<(AccountReferral & AccountReferralWithRelations)[]>;
    findOne(filter?: Filter<AccountReferral>, options?: Options): Promise<(AccountReferral & AccountReferralWithRelations) | null>;
    findById(id: number, filter?: FilterExcludingWhere<AccountReferral>, options?: Options): Promise<AccountReferral & AccountReferralWithRelations>;
    update(entity: AccountReferral, options?: Options): Promise<void>;
    delete(entity: AccountReferral, options?: Options): Promise<void>;
    updateAll(data: DataObject<AccountReferral>, where?: Where<AccountReferral>, options?: Options): Promise<Count>;
    updateById(id: number, data: DataObject<AccountReferral>, options?: Options): Promise<void>;
    replaceById(id: number, data: DataObject<AccountReferral>, options?: Options): Promise<void>;
    deleteAll(where?: Where<AccountReferral>, options?: Options): Promise<Count>;
    deleteById(id: number, options?: Options): Promise<void>;
    count(where?: Where<AccountReferral>, options?: Options): Promise<Count>;
    exists(id: number, options?: Options): Promise<boolean>;
    postReferralCode(accountId: number, referralcode: AccountReferral): Promise<any>;
    getAccountReferrals(accountId: number, referralcode: string): Promise<any>;
}
