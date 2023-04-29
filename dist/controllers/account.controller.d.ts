/// <reference types="express" />
import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Response } from '@loopback/rest';
import { Account, InvestorNominee, RiskProfileQuestionSubmittedAnswer } from 'common';
import { AccountFacade, skippedNomineeType, AppUserFacade } from '../facades';
export declare class AccountController {
    accountFacade: AccountFacade;
    appUserFacade: AppUserFacade;
    private additionalHeaders;
    private userProfile;
    private res;
    constructor(accountFacade: AccountFacade, appUserFacade: AppUserFacade, additionalHeaders: any, userProfile: any, res: Response);
    create(account: Omit<Account, 'id'>): Promise<Account>;
    createPdf(id: number, data: {
        aofType: string;
    }): Promise<any>;
    count(where?: Where<Account>): Promise<Count>;
    find(filter?: Filter<Account>): Promise<Account[]>;
    fetchAccounts(filter?: Filter<Account>): Promise<Account[]>;
    updateAll(account: Account, where?: Where<Account>): Promise<Count>;
    findById(id: number, filter?: FilterExcludingWhere<Account>): Promise<Account>;
    updateById(id: number, account: Account): Promise<void>;
    replaceById(id: number, account: Account): Promise<void>;
    deleteById(id: number): Promise<void>;
    submitRiskProfileAnswers(id: number, answers: Array<RiskProfileQuestionSubmittedAnswer>): Promise<Account>;
    fetchNomineeDetailsById(accountId: number, isOnboardedNominee: boolean): Promise<object>;
    updateNomineeDetailsById(id: number, nomineeAppUserId: number, nomineeDetails: InvestorNominee): Promise<Object>;
    getBankDetailsById(accountId: number): Promise<object>;
    getBankBalanceByAccountNo(accountId: number): Promise<object>;
    getNomineesById(accountId: number): Promise<object>;
    getBankAccountsById(accountId: number): Promise<object>;
    fetchFolioByAccountId(accountId: number, instrumentId: number): Promise<any>;
    updateRiskProfileByAccountId(accountId: number, details: any): Promise<Account>;
    updateSkippedNomineeFlag(id: number, skipNomineeRequest: skippedNomineeType): Promise<any>;
    dataRefreshByAccountId(id: number): Promise<any>;
    fatcaGenerationByAccountId(id: number): Promise<any>;
    exportInvestorMaster(exportFormat: string, filterObject: object): Promise<Account[]>;
    orderItemsRepotingReplicatorByAccountId(id: number): Promise<any>;
    fetchMobileEmailRta(fetchRta: {
        serviceProviderAccountID: number;
        refreshFlag: boolean;
    }, id: number): Promise<object>;
    generateZipForDocuments(generatedDocuments: {
        accountIDs: Array<number>;
        rtaId: number;
    }): Promise<object>;
    investorMasterDetails(filterObject: object): Promise<Account[]>;
}
