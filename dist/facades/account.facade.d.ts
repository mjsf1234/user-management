/// <reference types="express" />
import { Response } from '@loopback/rest';
import { Count, DataObject, Filter, FilterExcludingWhere, Options, Where } from '@loopback/repository';
import { Account, AccountRelations, AccountRepository, InvestorNominee, RiskProfileHistoryRepository, RiskProfileQuestionSubmittedAnswer, RiskProfileQuestionSubmittedAnswerRepository, RiskProfileRepository, StateRepository, CountryRepository, InvestorDetailsRepository, InvestorNomineeRepository, AddressRepository, RelationshipRepository, AppUserRepository, ServiceProviderAccountRepository, Option, TransactionRepository, HoldingRepository, InstrumentRepository, IStorageService, UserManagementAppFileRepository, AccountAppFileMappingRepository, DocumentUploadRepository } from 'common';
import { CoreBankingRepository } from '../repositories/core-banking.repository';
import { ConsolidatedDocumentGenerationEngine } from '../engines/consolidated-document-generation.engine';
export declare type skippedNomineeType = {
    skippedNominee: boolean;
};
export declare class AccountFacade {
    private riskProfileRepository;
    private riskProfileHistoryRepository;
    private riskProfileQuestionSubmittedAnswerRepository;
    private accountRepository;
    private stateRepository;
    private countryRepository;
    private investorDetailsRepository;
    private investorNomineeRepository;
    private addressRepository;
    private relationshipRepository;
    private appUserRepository;
    private serviceProviderAccountRepository;
    private transactionRepository;
    private coreBankingRepository;
    private holdingRepository;
    private instrumentRepository;
    private fileStorageService;
    private userManagementAppFileRepository;
    private accountAppFileMappingRepository;
    private documentUploadRepository;
    private consolidatedDocumentGenerationEngine;
    constructor(riskProfileRepository: RiskProfileRepository, riskProfileHistoryRepository: RiskProfileHistoryRepository, riskProfileQuestionSubmittedAnswerRepository: RiskProfileQuestionSubmittedAnswerRepository, accountRepository: AccountRepository, stateRepository: StateRepository, countryRepository: CountryRepository, investorDetailsRepository: InvestorDetailsRepository, investorNomineeRepository: InvestorNomineeRepository, addressRepository: AddressRepository, relationshipRepository: RelationshipRepository, appUserRepository: AppUserRepository, serviceProviderAccountRepository: ServiceProviderAccountRepository, transactionRepository: TransactionRepository, coreBankingRepository: CoreBankingRepository, holdingRepository: HoldingRepository, instrumentRepository: InstrumentRepository, fileStorageService: IStorageService, userManagementAppFileRepository: UserManagementAppFileRepository, accountAppFileMappingRepository: AccountAppFileMappingRepository, documentUploadRepository: DocumentUploadRepository, consolidatedDocumentGenerationEngine: ConsolidatedDocumentGenerationEngine);
    getAge(dateString: string): number;
    create(entity: DataObject<Account>, options?: Options): Promise<Account>;
    generateAOF(id: number | undefined, aofType: string, callback: any, options?: Options): Promise<any>;
    createAll(entities: DataObject<Account>[], options?: Options): Promise<Account[]>;
    save(entity: Account, options?: Options): Promise<Account>;
    find(filter?: Filter<Account>, options?: Options): Promise<(Account & AccountRelations)[]>;
    findOne(filter?: Filter<Account>, options?: Options): Promise<(Account & AccountRelations) | null>;
    findById(id: number, filter?: FilterExcludingWhere<Account>, options?: Options): Promise<Account & AccountRelations>;
    update(entity: Account, options?: Options): Promise<void>;
    delete(entity: Account, options?: Options): Promise<void>;
    updateAll(data: DataObject<Account>, where?: Where<Account>, options?: Options): Promise<Count>;
    updateById(id: number, data: DataObject<Account>, options?: Options): Promise<void>;
    replaceById(id: number, data: DataObject<Account>, options?: Options): Promise<void>;
    deleteAll(where?: Where<Account>, options?: Options): Promise<Count>;
    deleteById(id: number, options?: Options): Promise<void>;
    count(where?: Where<Account>, options?: Options): Promise<Count>;
    exists(id: number, options?: Options): Promise<boolean>;
    calculateRiskProfile(accountId: number, options?: Options): Promise<Account>;
    submitRiskProfileAnswers(accountId: number, riskProfileAnswers: Array<RiskProfileQuestionSubmittedAnswer>, options?: Options): Promise<Account>;
    fetchNomineeDetailsById(id: number, isOnboardedNominee: boolean, options?: Options): Promise<object>;
    fetchNomineeByAccountIdNew(accountId: number, isOnboardedNominee: boolean, options?: Options): Promise<object>;
    updateNomineeDetailsById(id: number, nomineeAppUserId: number, nominee: DataObject<InvestorNominee>): Promise<Object>;
    getBankDetailsById(id: number, options?: Options): Promise<object>;
    getBankBalanceByAccountId(accountId: number, transactionId: string, options?: Options): Promise<object>;
    getNomineesById(id: number, options?: Options): Promise<object>;
    getBankAccountsByAccountId(id: number, options?: Options): Promise<object>;
    fetchFolioByAccountId(accountId: number, instrumentId: number, options?: Options): Promise<any>;
    updateRiskProfileByAccountId(accountId: number, riskProfileId: number, options?: Options): Promise<Account>;
    updateSkippedNomineeById(id: number, skippedNomineeRequest: skippedNomineeType, options: Option): Promise<any>;
    /**
     * Method to send message to transcation refresher Queue
     * @param id
     * @returns
     */
    dataRefreshByAccountId(id: number): Promise<any>;
    /**
     * Method to send message to Fatca generation Queue
     * @param id
     * @returns
     */
    fatcaGenerationByAccountId(id: number): Promise<any>;
    exportInvestorMaster(filter: Filter<Account>, exportFormat: string, res: Response, options?: Options): Promise<any>;
    /**
     * Method to send message to transcation refresher Queue
     * @param id
     * @returns
     */
    orderItemsRepotingReplicatorByAccountId(id: number): Promise<any>;
    generateZipForDocuments(AccountIDs: Array<number>, rtaId: number, options: Options): Promise<any>;
    investorMasterDetails(filterObject: any, options: Options): Promise<any>;
    mfrtaGetBankDetailsById(id: number, options?: Options): Promise<object>;
    markNomineeDetailsAsUpdated(id: number, options: Option): Promise<any>;
    sendInvestorAccountCreationNotification(id: number, options?: Option): Promise<any>;
}
