/// <reference types="express" />
import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Request, Response } from '@loopback/rest';
import { UserManagementAppFile } from 'common';
import { UserManagementAppFileFacade } from '../facades';
export declare class UserManagementAppFileController {
    userManagementAppFileFacade: UserManagementAppFileFacade;
    response: Response;
    private additionalHeaders;
    constructor(userManagementAppFileFacade: UserManagementAppFileFacade, response: Response, additionalHeaders: any);
    create(appFile: Omit<UserManagementAppFile, 'id'>): Promise<UserManagementAppFile>;
    count(where?: Where<UserManagementAppFile>): Promise<Count>;
    find(filter?: Filter<UserManagementAppFile>): Promise<UserManagementAppFile[]>;
    updateAll(appFile: UserManagementAppFile, where?: Where<UserManagementAppFile>): Promise<Count>;
    findById(id: number, filter?: FilterExcludingWhere<UserManagementAppFile>): Promise<UserManagementAppFile>;
    updateById(id: number, appFile: UserManagementAppFile): Promise<void>;
    replaceById(id: number, appFile: UserManagementAppFile): Promise<void>;
    deleteById(id: number): Promise<void>;
    getContainerDetails(ContainerFilter: {
        containerName: string;
        originalFileName: string;
    }): Promise<object>;
    userManagementDownloadFile(ContainerFilter: {
        containerName: string;
        fileName: string;
        request: Request;
        response: Response;
    }): Promise<object>;
    downloadMultipleuserManagementDownloadFile(ContainerFilter: any): Promise<object>;
    userManagementAppFileDetails(filter: any, where: any): Promise<any>;
}
