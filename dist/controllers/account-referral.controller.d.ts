import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { AccountReferral } from 'common';
import { AccountReferralFacade } from '../facades/account-referral.facade';
export declare class AccountReferralController {
    accountReferralFacade: AccountReferralFacade;
    constructor(accountReferralFacade: AccountReferralFacade);
    create(accountReferral: Omit<AccountReferral, 'id'>): Promise<AccountReferral>;
    count(where?: Where<AccountReferral>): Promise<Count>;
    find(filter?: Filter<AccountReferral>): Promise<AccountReferral[]>;
    updateAll(AccountReferral: AccountReferral, where?: Where<AccountReferral>): Promise<Count>;
    findById(id: number, filter?: FilterExcludingWhere<AccountReferral>): Promise<AccountReferral>;
    updateById(id: number, accountReferral: AccountReferral): Promise<void>;
    replaceById(id: number, accountReferral: AccountReferral): Promise<void>;
    deleteById(id: number): Promise<void>;
    postAccountReferral(ReferralCode: AccountReferral, accountId: number): Promise<any>;
    findByAccountID(accountID: number, referralCode: string): Promise<AccountReferral>;
}
