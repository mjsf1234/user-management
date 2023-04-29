/// <reference types="express" />
import { Count, DataObject, Filter, FilterExcludingWhere, Options, Where } from '@loopback/repository';
import { Request, Response } from '@loopback/rest';
import { AppUser, AppUserRelations, AppUserRepository, InvestorDetailsRepository, BankAccountRepository, StateRepository, CountryRepository, OccupationRepository, WealthSourceRepository, IncomeSlabRepository, PoliticallyExposureTypeRepository, InvestorTypeRepository, AccountRepository, InvestorDetails, IdentificationTypeRepository, AddressTypeRepository, AddressRepository, RelationshipRepository, InvestorNomineeRepository, OverseesAddressRepository, MpinHistoryRepository, AppAccessTokenRepository, DeviceRepository, IdcomDetailsRepository, CsrFatcaRepository, RtaRepository, IStorageService, UserManagementAppFileRepository, ServiceProviderAccountRepository, UamIntegrationRepository, InvestorDetailsWithRelations, AuditTrailRepository, UamLoginAttemptsConfigRepository, UamLoginLogs, UamLoginLogsRepository, CartItemRepository, AuditTrailFileRepository } from 'common';
import { WealthfyDomesticFCPRepository, WealthfyDomesticFinacleRepository, KravyRepository, OtpMessages } from '../repositories';
import { AccountFacade, AdvisoryClientMasterFacade, AppAccessTokenFacade } from '.';
import { CoreBankingFacade } from './core-banking.facade';
import { IdcomIntegrationFacade } from './idcom-integration.facade';
/******************************** */
export declare type ContactDetails = {
    contactNumber: string;
    email: string;
    countryCode: string;
};
export declare type PANAndDOBDetails = {
    PAN: string;
    DOB: string;
    deviceId: number;
};
export declare type VerifyOtpContactDetails = {
    contactNumber: string;
    deviceUniqueId: string;
    countryCode: string;
    otp: string;
    cartItemId?: number;
};
declare type UserAddressType = {
    data: any;
    metaData: any;
};
declare type UserPersonalDetailsType = {
    data: any;
    metaData: any;
};
declare type UserProfessionalDetailsType = {
    data: any;
    metaData: any;
};
export declare class AppUserFacade {
    private appUserRepository;
    private uamLoginLogsRepository;
    private wealthfyDomesticFCPRepository;
    private wealthfyDomesticFinacleRepository;
    private investorDetailsRepository;
    private bankAccountRepository;
    private stateRepository;
    private countryRepository;
    private occupationRepository;
    private wealthSourceRepository;
    private incomeSlabRepository;
    private politicallyExposureTypeRepository;
    private investorTypeRepository;
    private accountRepository;
    private identificationTypeRepository;
    private addressTypeRepository;
    private addressRepository;
    private relationshipRepository;
    private investorNomineeRepository;
    private overseesAddressRepository;
    private mpinHistoryRepository;
    private appAccessTokenRepository;
    private deviceRepository;
    private idcomDetailsRepository;
    private csrFatcaRepository;
    private rtaRepository;
    private kravyRepository;
    private appUserRoleMappingRepository;
    private serviceProviderAccountRepository;
    private uamLoginAttemptsConfigRepository;
    private appAccessTokenFacade;
    private coreBankingFacade;
    private idComIntegrationFacade;
    private advisoryClientMasterFacade;
    private accountFacade;
    private fileStorageService;
    private userManagementAppFileRepository;
    private uamIntegrationRepository;
    private auditTrailRepository;
    private cartItemRepository;
    private auditTrailFileRepository;
    constructor(appUserRepository: AppUserRepository, uamLoginLogsRepository: UamLoginLogsRepository, wealthfyDomesticFCPRepository: WealthfyDomesticFCPRepository, wealthfyDomesticFinacleRepository: WealthfyDomesticFinacleRepository, investorDetailsRepository: InvestorDetailsRepository, bankAccountRepository: BankAccountRepository, stateRepository: StateRepository, countryRepository: CountryRepository, occupationRepository: OccupationRepository, wealthSourceRepository: WealthSourceRepository, incomeSlabRepository: IncomeSlabRepository, politicallyExposureTypeRepository: PoliticallyExposureTypeRepository, investorTypeRepository: InvestorTypeRepository, accountRepository: AccountRepository, identificationTypeRepository: IdentificationTypeRepository, addressTypeRepository: AddressTypeRepository, addressRepository: AddressRepository, relationshipRepository: RelationshipRepository, investorNomineeRepository: InvestorNomineeRepository, overseesAddressRepository: OverseesAddressRepository, mpinHistoryRepository: MpinHistoryRepository, appAccessTokenRepository: AppAccessTokenRepository, deviceRepository: DeviceRepository, idcomDetailsRepository: IdcomDetailsRepository, csrFatcaRepository: CsrFatcaRepository, rtaRepository: RtaRepository, kravyRepository: KravyRepository, appUserRoleMappingRepository: RtaRepository, serviceProviderAccountRepository: ServiceProviderAccountRepository, uamLoginAttemptsConfigRepository: UamLoginAttemptsConfigRepository, appAccessTokenFacade: AppAccessTokenFacade, coreBankingFacade: CoreBankingFacade, idComIntegrationFacade: IdcomIntegrationFacade, advisoryClientMasterFacade: AdvisoryClientMasterFacade, accountFacade: AccountFacade, fileStorageService: IStorageService, userManagementAppFileRepository: UserManagementAppFileRepository, uamIntegrationRepository: UamIntegrationRepository, auditTrailRepository: AuditTrailRepository, cartItemRepository: CartItemRepository, auditTrailFileRepository: AuditTrailFileRepository);
    convertToCamelCase(value: string): any;
    create(entity: DataObject<AppUser>, options?: Options): Promise<AppUser>;
    createAll(entities: DataObject<AppUser>[], options?: Options): Promise<AppUser[]>;
    save(entity: AppUser, options?: Options): Promise<AppUser>;
    find(filter?: Filter<AppUser>, options?: Options): Promise<(AppUser & AppUserRelations)[]>;
    findOne(filter?: Filter<AppUser>, options?: Options): Promise<(AppUser & AppUserRelations) | null>;
    findById(id: number, filter?: FilterExcludingWhere<AppUser>, options?: Options): Promise<AppUser & AppUserRelations>;
    update(entity: AppUser, options?: Options): Promise<void>;
    delete(entity: AppUser, options?: Options): Promise<void>;
    updateAll(data: DataObject<AppUser>, where?: Where<AppUser>, options?: Options): Promise<Count>;
    updateById(id: number, data: DataObject<AppUser>, options?: Options): Promise<void>;
    replaceById(id: number, data: DataObject<AppUser>, options?: Options): Promise<void>;
    deleteAll(where?: Where<AppUser>, options?: Options): Promise<Count>;
    deleteById(id: number, options?: Options): Promise<void>;
    count(where?: Where<AppUser>, options?: Options): Promise<Count>;
    exists(id: number, options?: Options): Promise<boolean>;
    fetchUserDetailsByToken(token: string | undefined | null): Promise<AppUser | any>;
    logout(id: number, deviceUniqueId: string | undefined | null, token: string | undefined | null, req: Request, options?: Options): Promise<AppUser>;
    logoutInternalUser(id: number, token: string, options?: Options): Promise<AppUser>;
    loginWithMpin(deviceUniqueId: string, mpin: string, request: Request, options?: Options): Promise<Record<string, string>>;
    loginWithBiometric(deviceUniqueId: string, biometricSignature: string, request: Request, options?: Options): Promise<Record<string, string>>;
    loginWithPassword(userCode: string, password: string, request: Request, options?: Options): Promise<Record<string, string>>;
    loginWithPasswordMock(userCode: string, password: string, request: Request, options?: Options): Promise<Record<string, string>>;
    loginWithPasswordMock2(userCode: string, password: string): Promise<any>;
    checkIfExistingWealthfyCustomer(customerId: string, transactionId: string): Promise<boolean>;
    getPersonalDetailsById(id: number, options?: Options): Promise<UserPersonalDetailsType>;
    updatePersonalDetailsById(id: number, personalDetails: any, options?: Options): Promise<object>;
    getAddressDetailsById(id: number, options?: Options): Promise<UserAddressType>;
    reviewUserDetails(id: number, isMfrta?: boolean, options?: Options): Promise<{
        userAddress: {
            data: any;
            metaData: any;
        };
        userPersonalDetails: {
            data: any;
            metaData: any;
        };
        userProfessionalDetails: {
            data: any;
            metaData: any;
        };
        userBankAccountsDetails: any;
    }>;
    getProfessionalDetailsById(id: number, options?: Options): Promise<UserProfessionalDetailsType>;
    updateProfessionalDetailsById(id: number, professionalDetails: any, options?: Options): Promise<object>;
    updateAddressDetailsById(id: number, addressDetails: any, options?: Options): Promise<object>;
    setupMpin(id: number, data: any, request: Request): Promise<any>;
    resetMpin(id: number, data: any): Promise<any>;
    setupBiometric(id: number, data: {
        deviceUniqueId: string;
        pubKey: string;
    }): Promise<any>;
    disableBiometric(id: number, data: {
        deviceUniqueId: string;
    }): Promise<any>;
    generateOTP(contactDetails: ContactDetails, transactionId: string, ipAddress: string): Promise<Object>;
    generateOTPMock(contactDetails: ContactDetails, transactionId: string, ipAddress: string): Promise<Object>;
    updatePANOrDOB(id: number, panAndDOBDetails: PANAndDOBDetails, userProfile: any, options: Options): Promise<any>;
    verifyOTP(contactDetails: VerifyOtpContactDetails, request: Request, transactionId: string): Promise<Object>;
    verifyOTPMock(contactDetails: VerifyOtpContactDetails, request: Request, transactionId: string): Promise<Object>;
    getOTP(transactionId: string, linkData: string): Promise<any>;
    getOTPMock(transactionId: string, linkData: string): Promise<{
        passwordValue: string;
        errorDetail: string;
        refNo: string;
        datetimeExpire: Date;
        datatimeGen: Date;
    }>;
    doVerifyOTP(otp: string, refNo: string, transactionId: string, linkData: string): Promise<any>;
    doVerifyOTPMock(otp: string, refNo: string, transactionId: string, linkData: string): Promise<{
        statusCode: string;
        errorDetail: string;
    }>;
    getETBCustomerDetails(panAndDOBDetails?: PANAndDOBDetails, customerId?: string): Promise<any>;
    /**
     * Check if customer is advisory customer or not.
     * @param customerId
     * @returns
     */
    checkIfAdvisoryCustomer(customerId: string): Promise<boolean>;
    /**
     * Pancard validation test
     * @param panCardNumber
     * @returns
     */
    validatePAN(panCardNumber: string): Promise<boolean>;
    /**
     * This method will be used to handle callback form idocm
     * @param authCode
     * @param success
     * @param errorCode
     * @param errorMessage
     * @returns
     */
    handleIdcomCallback(authCode: string, success: boolean, userProfile: any, options: Options, errorCode?: number, errorMessage?: string): Promise<any>;
    /**
     * Device binding method
     * @param userId
     * @param deviceId
     * @param options
     * @returns
     */
    deviceBind(userId: number, deviceId: number, options?: Options): Promise<any>;
    handleEkycCallback(data: {
        errDescription: string;
        sessId: string;
        ekycCompleted: string;
        ekycMessage: string | null;
    }): Promise<any>;
    /**
     * AppUserStatus Polling Endpoint
     * @param id
     * @param options
     * @returns
     */
    getCallBackStatus(id: number, authCode: string, options?: Options): Promise<any>;
    /**
     *This function updates used contact details and also perform device binding
     * @param id
     * @param userDeviceId
     * @param emailId
     * @param panNo
     * @returns
     */
    updateContactDetails(id: number, userDeviceId: number, emailId: string, panNo?: string): Promise<any>;
    doPublishOTP(contactNumber: string, otp: OtpMessages, transactionId: string): Promise<any>;
    doPublishOTPMock(contactNumber: string, otp: OtpMessages, transactionId: string): Promise<boolean>;
    processEmail(id: number): Promise<{
        success: boolean;
    }>;
    validateMfRtaFields(userId: number, options?: Options): Promise<any>;
    getDematLandingReqXML(customerId?: string | number): Promise<string>;
    getDematAcc(id: number, customerId: number, transactionId: string): Promise<any>;
    mockGetDematAcc(id: number, customerId: number, transactionId: string): Promise<any>;
    getSignatureReqXML(customerId?: string | number): Promise<string>;
    getSignature(id: number, transactionId: string): Promise<any>;
    uploadRtaFile(userId: number, rtaId: number, request?: Request, response?: Response, options?: Options): Promise<object>;
    auditTrail(data: any, userManagementAppFileData: any, options?: Options): Promise<void>;
    exportAuditTrail(res: Response, auditTrailFileId: number, options?: Options): Promise<any>;
    uploadFileToGcpAndStoreDetails(containerName: string, fileName: string, inputFilePath: string): Promise<any>;
    exportSampleFile(rtaId: number, options?: Options): Promise<any>;
    kavyCamsFetchingMobileEmail(serviceProviderAccountID: Number, accountId: Number, refreshFlag: boolean | undefined, transactionId: string, Options?: Options): Promise<{
        email: any;
        mobile: any;
    }>;
    fetchRta(data: {
        serviceProviderAccountID: number;
        refreshFlag: boolean;
    }, accountId: number, transactionId: string, Options?: Options): Promise<Object>;
    uploadSignature(id: number, request?: Request, response?: Response): Promise<object>;
    checkLoginAttemps(appUserId: number, loginWithAD?: boolean, isInternalUser?: boolean): Promise<true | undefined>;
    checkLoginAttempsMock(appUserId: number, loginWithAD?: boolean, isInternalUser?: boolean): Promise<true | undefined>;
    checkLastMpinReset(appUser: AppUser): Promise<boolean>;
    helperOnboarding(id: number, panAndDOBDetails: PANAndDOBDetails, existingUser: InvestorDetailsWithRelations, transactionId: string, userProfile: any, options: Options): Promise<any>;
    investmentAccountCreated(id: number): Promise<Count>;
    fetchExistingNominee(appUserId: number, transactionId: string, options?: Options): Promise<any>;
    getExistingNomineeReqXml(customerId: String, accountNumber: String): Promise<string>;
    fetchCorrespondenceAddressDetails(appUserid: number, options?: Options): Promise<any>;
    blockedCountries(userDetails: InvestorDetails, options?: Options): Promise<boolean>;
    createUamLoginLogs(input: DataObject<UamLoginLogs> | null, type: string, token: string | null): Promise<undefined>;
    markUserAsLocked(uamIntegrationInstance: any, appUser: AppUser): any;
    /**
     * OTP generation form Transaction
     * @param appUserId
     * @param cartItemId
     * @param options
     * @returns
     */
    generateOTPForTransaction(appUserId: number, cartItemId: number, options: Options): Promise<any>;
    /**
     * OTP Verification for Transaction
     * @param appUserId
     * @param contactDetails
     * @param request
     * @param options
     * @returns
     */
    verifyOTPForTransaction(appUserId: number, contactDetails: VerifyOtpContactDetails, request: Request, options: Options): Promise<any>;
    generateOTPForTransactionMock(appUserId: number, cartItemId: number, options: Options): Promise<any>;
    verifyOTPForTransactionMock(appUserId: number, contactDetails: VerifyOtpContactDetails, request: Request, options: Options): Promise<any>;
    /**
     * Update the decleration of mobile and email
     *
     */
    updateDecleration(appUserId: number, data: any, options: Options): Promise<{
        success: boolean;
    }>;
}
export {};
