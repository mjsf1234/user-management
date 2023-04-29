/// <reference types="express" />
import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Response } from '@loopback/rest';
import { UamIntegration, UamLoginAttemptsConfig } from 'common';
import { UamIntegrationFacade } from '../facades';
export declare class UamIntegrationController {
    uamIntegrationFacade: UamIntegrationFacade;
    private res;
    private additionalHeaders;
    private userProfile;
    constructor(uamIntegrationFacade: UamIntegrationFacade, res: Response, additionalHeaders: any, userProfile: any);
    create(uamIntegration: Omit<UamIntegration, 'id'>): Promise<UamIntegration>;
    count(where?: Where<UamIntegration>): Promise<Count>;
    find(filter?: Filter<UamIntegration>): Promise<UamIntegration[]>;
    updateAll(UamIntegration: UamIntegration, where?: Where<UamIntegration>): Promise<Count>;
    findById(id: number, filter?: FilterExcludingWhere<UamIntegration>): Promise<UamIntegration>;
    updateById(id: number, UamIntegration: UamIntegration): Promise<void>;
    replaceById(id: number, UamIntegration: UamIntegration): Promise<void>;
    deleteById(id: number): Promise<void>;
    createUserUsingUAM(uamIntegrationFacade: {
        requestXML: string;
    }): Promise<any>;
    disableUserUsingUAM(uamIntegrationFacade: {
        requestXML: string;
    }): Promise<any>;
    enableUserUsingUAM(uamIntegrationFacade: {
        requestXML: string;
    }): Promise<any>;
    deleteUserUsingUAM(uamIntegrationFacade: {
        requestXML: string;
    }): Promise<any>;
    reopenUserUsingUAM(uamIntegrationFacade: {
        requestXML: string;
    }): Promise<any>;
    unlockUserUsingUAM(uamIntegrationFacade: {
        requestXML: string;
    }): Promise<any>;
    updateUserUsingUAM(uamIntegrationFacade: {
        requestXML: string;
    }): Promise<any>;
    fetchUserIdPopulationReport(offset: number, limit: number, searchFilter?: object, orderBy?: Array<any>): Promise<any>;
    exportUserIdPopulationReport(exportFormat: string, fromDate?: Date | string, toDate?: Date | string, searchFilter?: object, orderBy?: Array<any>): Promise<any>;
    changeAppUserStatus(details: any): Promise<any>;
    changeAppUserDetails(details: any): Promise<any>;
    createUser(details: any): Promise<any>;
    downloadAdminActivityReport(filter?: Filter<UamIntegration>): Promise<any>;
    updateMaxAllowedLoginAttempts(uamLoginAttemptsConfig: UamLoginAttemptsConfig): Promise<void>;
    fetchConfigurations(): Promise<Partial<UamLoginAttemptsConfig>>;
    downloadRoleRightsReport(filter?: Filter<UamIntegration>): Promise<any>;
}
