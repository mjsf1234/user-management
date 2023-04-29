import { Options } from '@loopback/repository';
import { CoreBankingRepository, OtpMessages } from '../repositories/core-banking.repository';
import { CountryRepository, OccupationRepository, WealthSourceRepository, PoliticallyExposureTypeRepository, StateRepository, AddressRepository, OverseesAddressRepository, AppUserRepository, InvestorDetailsRepository, IncomeSlabRepository, HoldingTypeRepository, InvestorTypeRepository, BankAccountTypeRepository, BankBranchRepository, AccountRepository, InvestorNomineeRepository, BankAccountRepository, IdentificationTypeRepository, CommunicationMatrixRepository, CommunicationTopicRepository } from 'common';
export declare type fetchCustomerAccountAmlFatcaDetailsType = {
    success: boolean;
    code: string;
    bankErrorCode?: string | number;
    errorCode?: string | number;
};
export declare class CoreBankingFacade {
    private coreBankingRepository;
    private countryRepository;
    private occupationRepository;
    private wealthSourceRepository;
    private politicallyExposureTypeRepository;
    private stateRepository;
    private addressRepository;
    private overseesAddressRepository;
    private appUserRepository;
    private investorDetailsRepository;
    private incomeSlabRepository;
    private holdingTypeRepository;
    private investorTypeRepository;
    private bankAccountTypeRepository;
    private bankBranchRepository;
    private accountRepository;
    private investorNomineeRepository;
    private bankAccountRepository;
    private identificationTypeRepository;
    private communicationMatrixRepository;
    private communicationTopicRepository;
    constructor(coreBankingRepository: CoreBankingRepository, countryRepository: CountryRepository, occupationRepository: OccupationRepository, wealthSourceRepository: WealthSourceRepository, politicallyExposureTypeRepository: PoliticallyExposureTypeRepository, stateRepository: StateRepository, addressRepository: AddressRepository, overseesAddressRepository: OverseesAddressRepository, appUserRepository: AppUserRepository, investorDetailsRepository: InvestorDetailsRepository, incomeSlabRepository: IncomeSlabRepository, holdingTypeRepository: HoldingTypeRepository, investorTypeRepository: InvestorTypeRepository, bankAccountTypeRepository: BankAccountTypeRepository, bankBranchRepository: BankBranchRepository, accountRepository: AccountRepository, investorNomineeRepository: InvestorNomineeRepository, bankAccountRepository: BankAccountRepository, identificationTypeRepository: IdentificationTypeRepository, communicationMatrixRepository: CommunicationMatrixRepository, communicationTopicRepository: CommunicationTopicRepository);
    fetchCustomerAccountAmlFatcaDetails(pan: string | undefined, dob: string | undefined, mobileNumber: string | undefined, customerId: string | undefined, transactionId: string, userId?: number, options?: Options): Promise<fetchCustomerAccountAmlFatcaDetailsType | void>;
    convertToCamelCase(value: string): any;
    generateAccountUniqueId(id: number | undefined): string;
    getHoldingType(holdingPattern: string, options?: Options): Promise<(import("common").HoldingType & import("common").HoldingTypeRelations) | undefined>;
    getCountryData(countryValue: string | null, options?: Options): Promise<(import("common").Country & import("common").CountryRelations) | null>;
    getOTP(transactionId: string, linkData: string): Promise<any>;
    verifyOTP(otp: string, refNo: string, transactionId: string, linkData: string): Promise<any>;
    doPublishOTP(contactNumber: string, otp: OtpMessages, transactionId: string, msgType?: string): Promise<any>;
    addCommunicationMatrix(accountId: number | undefined, options?: Options): Promise<void>;
    fetchMaritalStatus(bankCode: string | number | any): Promise<any>;
}
