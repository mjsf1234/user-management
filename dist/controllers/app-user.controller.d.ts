/// <reference types="express" />
import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Request, Response } from '@loopback/rest';
import { AppUser, AdobeNtbUser } from 'common';
import { AppUserFacade, FamilyMappingFacade, AdobNtbFacade } from '../facades';
import { ContactDetails, PANAndDOBDetails, VerifyOtpContactDetails } from '../facades';
export declare class AppUserController {
    appUserFacade: AppUserFacade;
    adobNtbFacade: AdobNtbFacade;
    private userProfile;
    private additionalHeaders;
    response: Response;
    familyMappingFacade: FamilyMappingFacade;
    private res;
    constructor(appUserFacade: AppUserFacade, adobNtbFacade: AdobNtbFacade, userProfile: any, additionalHeaders: any, response: Response, familyMappingFacade: FamilyMappingFacade, res: Response);
    create(appUser: Omit<AppUser, 'id'>): Promise<AppUser>;
    adobeAnalyticsSA(adobeNtbUser: Omit<AdobeNtbUser, 'id'>): Promise<any>;
    count(where?: Where<AppUser>): Promise<Count>;
    find(filter?: Filter<AppUser>): Promise<AppUser[]>;
    fetchAppUsers(filter?: Filter<AppUser>): Promise<AppUser[]>;
    updateAll(appUser: AppUser, where?: Where<AppUser>): Promise<Count>;
    findById(id: number, filter?: FilterExcludingWhere<AppUser>): Promise<AppUser>;
    updateById(id: number, appUser: AppUser): Promise<void>;
    replaceById(id: number, appUser: AppUser): Promise<void>;
    deleteById(id: number): Promise<void>;
    fetchUserDetailsByToken(request: Request): Promise<object>;
    logout(id: number, crendentials: any, request: Request): Promise<object>;
    loginWithMpin(crendentials: any, request: Request): Promise<Record<string, string>>;
    loginWithBiometric(crendentials: any, request: Request): Promise<Record<string, string>>;
    loginWithPassword(crendentials: any, request: Request): Promise<Record<string, string>>;
    loginWithPasswordMock(crendentials: any, request: Request): Promise<Record<string, string>>;
    getPersonalDetailsById(userId: number): Promise<object>;
    reviewUserDetails(userId: number): Promise<object>;
    updatePersonalDetailsById(id: number, personalDetails: AppUser): Promise<object>;
    getAddressDetailsById(userId: number): Promise<object>;
    fetchCorrespondenceAddressDetails(userId: number): Promise<object>;
    getProfessionalDetailsById(userId: number): Promise<object>;
    updateProfessionalDetailsById(id: number, professionalDetails: object): Promise<object>;
    updateAddressDetailsById(id: number, addressDetails: object): Promise<object>;
    setupMpin(request: Request, id: number, data: any): Promise<any>;
    resetMpin(id: number, data: any): Promise<any>;
    setupBiometric(id: number, data: any): Promise<any>;
    disableBiometric(id: number, data: any): Promise<any>;
    generateOTP(contactDetails: ContactDetails): Promise<object>;
    updatePANOrDOB(id: number, panAndDOBDetails: PANAndDOBDetails): Promise<object>;
    verifyOTP(contactDetails: VerifyOtpContactDetails, request: Request): Promise<object>;
    checkIfExistingWealthfyCustomer(customerId: string): Promise<boolean>;
    handleIdcomCallback(authCode: string, success: boolean, errorCode: number, errorMessage: string): Promise<any>;
    handleEkycCallback(data: {
        errDescription: string;
        sessId: string;
        ekycCompleted: string;
        ekycMessage: string | null;
    }): Promise<any>;
    pollCallBackStatus(userId: number, idcomProps: any): Promise<object>;
    updateContactDetails(id: number, deviceId: number, contactInfo: any): Promise<object>;
    sendRequestforFamilyAddition(id: number, memberDetails: any): Promise<any>;
    approveRejectFamilyRequest(id: number, parentDetails: any): Promise<any>;
    getParents(id: number): Promise<any>;
    getChildren(id: number): Promise<any>;
    removeChild(id: number, childDetails: any): Promise<any>;
    removeParent(id: number, parentDetails: any): Promise<any>;
    getPendingRequests(id: number): Promise<any>;
    getSentRequestsPending(id: number): Promise<any>;
    processEmail(id: number): Promise<any>;
    getDematAcc(id: number, customerId: number): Promise<any>;
    getSignature(id: number): Promise<any>;
    uploadCamsRtaFile(rtaId: number, request: Request): Promise<object>;
    exportSampleFile(rtaId: number): Promise<any>;
    exportAuditTrial(auditTrailFileId: number): Promise<any>;
    uploadSignature(id: number, request: Request): Promise<object>;
    mfrta(id: number): Promise<any[]>;
    investmentAccountCreated(id: number): Promise<object>;
    fetchExistingNominee(id: number): Promise<object>;
    logoutInternalUser(id: number, request: Request): Promise<object>;
    generateOTPForTransaction(id: number, cartDetails: any): Promise<object>;
    verifyOTPForTransaction(id: number, contactDetails: VerifyOtpContactDetails, request: Request): Promise<object>;
    updateDecleration(id: number, data: any): Promise<any>;
}
