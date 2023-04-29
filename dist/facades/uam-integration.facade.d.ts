/// <reference types="express" />
import { AnyObject, Count, DataObject, Filter, FilterExcludingWhere, Options, Where } from '@loopback/repository';
import { Response } from '@loopback/rest';
import { UamIntegrationRepository, AppRoleRepository, AppUser, AppUserRepository, UAMLogRepository, AppUserRoleMappingRepository, OperationRepository, UamIntegration, UamIntegrationRelations, UamLoginAttemptsConfig, UamLoginAttemptsConfigRepository, AppAccessTokenRepository, RoleRightsRepository, RoleRights } from 'common';
declare type saveNonRMUserDetailsFields = {
    name: string;
    email: string;
    dob: string | null;
    profile: string;
    userCode: string;
    activity: string;
    category: number;
    gender: number;
    salutation: number | undefined;
    contactNumber: string | undefined;
    userType: number;
    appUserStatus: string;
};
export declare class UamIntegrationFacade {
    private uamIntegrationRepository;
    private appRoleRepository;
    private appUserRepository;
    private uamLogRepository;
    private appUserRoleMappingRepository;
    private operationRepository;
    private uamLoginAttemptsConfigRepository;
    private appAccessTokenRepository;
    private roleRightsRepository;
    constructor(uamIntegrationRepository: UamIntegrationRepository, appRoleRepository: AppRoleRepository, appUserRepository: AppUserRepository, uamLogRepository: UAMLogRepository, appUserRoleMappingRepository: AppUserRoleMappingRepository, operationRepository: OperationRepository, uamLoginAttemptsConfigRepository: UamLoginAttemptsConfigRepository, appAccessTokenRepository: AppAccessTokenRepository, roleRightsRepository: RoleRightsRepository);
    create(entity: DataObject<UamIntegration>, options?: Options): Promise<UamIntegration>;
    createAll(entities: DataObject<UamIntegration>[], options?: Options): Promise<UamIntegration[]>;
    save(entity: UamIntegration, options?: Options): Promise<UamIntegration>;
    find(filter?: any, options?: Options): Promise<(UamIntegration & UamIntegrationRelations)[]>;
    findOne(filter?: Filter<UamIntegration>, options?: Options): Promise<(UamIntegration & UamIntegrationRelations) | null>;
    findById(id: number, filter?: FilterExcludingWhere<UamIntegration>, options?: Options): Promise<UamIntegration & UamIntegrationRelations>;
    update(entity: UamIntegration, options?: Options): Promise<void>;
    delete(entity: UamIntegration, options?: Options): Promise<void>;
    updateAll(data: DataObject<UamIntegration>, where?: Where<UamIntegration>, options?: Options): Promise<Count>;
    updateById(id: number, data: DataObject<UamIntegration>, options?: Options): Promise<void>;
    replaceById(id: number, data: DataObject<UamIntegration>, options?: Options): Promise<void>;
    deleteAll(where?: Where<UamIntegration>, options?: Options): Promise<Count>;
    deleteById(id: number, options?: Options): Promise<void>;
    count(where?: any, options?: Options): Promise<Count>;
    exists(id: number, options?: Options): Promise<boolean>;
    isValidRequest(type: string, xmlToJsonObj: any): Promise<boolean>;
    createUamLog(body: any): Promise<any>;
    xmlResponse(body: any, previous?: boolean): Promise<any>;
    parameterize(column: any): any;
    parseSoapToJSONParam(index: any, xmlToJsonObj: any): Promise<any>;
    isDuplicateRequest(uniqueNumber: string): Promise<any>;
    saveNonRMUserDetails(req: any, details: saveNonRMUserDetailsFields, appRoleId: number): Promise<AppUser | undefined>;
    createUserUsingUAM(requestData: string): Promise<any>;
    disableUserUsingUAM(requestData: string): Promise<any>;
    enableUserUsingUAM(requestData: string): Promise<any>;
    deleteUserUsingUAM(requestData: string): Promise<any>;
    reopenUserUsingUAM(requestData: string): Promise<any>;
    unlockUserUsingUAM(requestData: string): Promise<any>;
    updateUserUsingUAM(requestData: string): Promise<any>;
    fetchUserIdPopulationReport(searchFilter?: any, offset?: number, limit?: number, orderBy?: Array<any>): Promise<any>;
    exportUserIdPopulationReport(exportFormat: string, res: Response, fromDate: Date | string | undefined, toDate: Date | string | undefined, searchFilter?: any, orderBy?: Array<any>): Promise<unknown>;
    updateActiveUserDetails(appUserId: number, details: any): Promise<unknown>;
    saveExistingNonRMUserDetails(isExisted: boolean, appUserId: number, details: any, appRoleId: number): Promise<unknown>;
    changeAppUserStatus(details: any, uniqueNumber: string, userProfile: {
        appUserId: number;
    }): Promise<{
        success: boolean;
    }>;
    createUser(details: any, uniqueNumber: string, userProfile: {
        appUserId: number;
    }): Promise<{
        success: boolean;
    }>;
    downloadAdminActivityReport(res: any, filter?: any, options?: Options): Promise<any>;
    updateMaxAllowedLoginAttempts(configs: UamLoginAttemptsConfig): Promise<{
        success: boolean;
    }>;
    getAllParamsFromRequest(jsonObject: any, operation: string): void;
    removeEmptyParams(jsonObject: any): void;
    fetchConfigurations(): Promise<{
        maxLoginAttempts: number;
    }>;
    returnAppUserStatusLabel(appUserStatus: number): Promise<any>;
    downloadRoleRightsReport(res: any, filter?: any, options?: Options): Promise<any>;
    addDepartmentToResults(data: Array<Partial<RoleRights>>): Promise<({
        department: any;
        profile?: string | undefined;
        roleDescription?: string | undefined;
        rights?: string | undefined;
        rightsDescription?: string | undefined;
        read?: boolean | undefined;
        write?: boolean | undefined;
        roleStatus?: string | undefined;
        rightsStatus?: string | undefined;
        typeOfAccess?: string | undefined;
        isActive?: boolean | undefined;
        createdDate?: Date | undefined;
        lastModifiedDate?: Date | undefined;
        id?: number | undefined;
        getId?: (() => any) | undefined;
        getIdObject?: (() => Object) | undefined;
        toJSON?: (() => Object) | undefined;
        toObject?: ((options?: AnyObject | undefined) => Object) | undefined;
    } | {
        [x: string]: any;
        profile?: string | undefined;
        roleDescription?: string | undefined;
        rights?: string | undefined;
        rightsDescription?: string | undefined;
        read?: boolean | undefined;
        write?: boolean | undefined;
        roleStatus?: string | undefined;
        rightsStatus?: string | undefined;
        department?: string | null | undefined;
        typeOfAccess?: string | undefined;
        isActive?: boolean | undefined;
        createdDate?: Date | undefined;
        lastModifiedDate?: Date | undefined;
        id?: number | undefined;
        getId?: (() => any) | undefined;
        getIdObject?: (() => Object) | undefined;
        toJSON?: (() => Object) | undefined;
        toObject?: ((options?: AnyObject | undefined) => Object) | undefined;
    })[]>;
}
export {};
