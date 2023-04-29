/// <reference types="express" />
import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Response } from '@loopback/rest';
import { AuditTrailFile } from 'common';
import { AuditTrailFileFacade } from '../facades';
export declare class AuditTrailFileController {
    AuditTrailFileFacade: AuditTrailFileFacade;
    private additionalHeaders;
    res: Response;
    private userProfile;
    constructor(AuditTrailFileFacade: AuditTrailFileFacade, additionalHeaders: any, res: Response, userProfile: any);
    create(AuditTrailFile: Omit<AuditTrailFile, 'id'>): Promise<AuditTrailFile>;
    count(where?: Where<AuditTrailFile>): Promise<Count>;
    find(filter?: Filter<AuditTrailFile>): Promise<AuditTrailFile[]>;
    updateAll(AuditTrailFile: AuditTrailFile, where?: Where<AuditTrailFile>): Promise<Count>;
    findById(id: number, filter?: FilterExcludingWhere<AuditTrailFile>): Promise<AuditTrailFile>;
    updateById(id: number, AuditTrailFile: AuditTrailFile): Promise<void>;
    replaceById(id: number, AuditTrailFile: AuditTrailFile): Promise<void>;
    deleteById(id: number): Promise<void>;
}
