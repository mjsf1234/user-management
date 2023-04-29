import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { BankAccount } from 'common';
import { BankAccountFacade } from '../facades';
export declare class BankAccountController {
    bankAccountFacade: BankAccountFacade;
    private additionalHeaders;
    constructor(bankAccountFacade: BankAccountFacade, additionalHeaders: any);
    create(bankAccount: Omit<BankAccount, 'id'>): Promise<BankAccount>;
    count(where?: Where<BankAccount>): Promise<Count>;
    find(filter?: Filter<BankAccount>): Promise<BankAccount[]>;
    updateAll(bankAccount: BankAccount, where?: Where<BankAccount>): Promise<Count>;
    findById(id: number, filter?: FilterExcludingWhere<BankAccount>): Promise<BankAccount>;
    updateById(id: number, bankAccount: BankAccount): Promise<void>;
    updateBankAccount(id: number, accountId: number, bankAccount: BankAccount): Promise<Object>;
    replaceById(id: number, bankAccount: BankAccount): Promise<void>;
    deleteById(id: number): Promise<void>;
    fetchBankAccountDetailsById(bankAccountId: number, accountId: number): Promise<BankAccount>;
}
