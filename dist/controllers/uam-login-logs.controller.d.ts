/// <reference types="express" />
import { AnyObject, Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Response } from '@loopback/rest';
import { UamLoginLogs } from 'common';
import { UamLoginLogsFacade } from '../facades';
export declare class UamLoginLogsController {
    uamLoginLogsFacade: UamLoginLogsFacade;
    private res;
    private additionalHeaders;
    constructor(uamLoginLogsFacade: UamLoginLogsFacade, res: Response, additionalHeaders: any);
    create(UamLoginLogs: Omit<UamLoginLogs, 'id'>): Promise<UamLoginLogs>;
    count(where?: Where<UamLoginLogs>): Promise<Count>;
    find(filter?: Filter<UamLoginLogs>): Promise<UamLoginLogs[]>;
    updateAll(UamLoginLogs: UamLoginLogs, where?: Where<UamLoginLogs>): Promise<Count>;
    findById(id: number, filter?: FilterExcludingWhere<UamLoginLogs>): Promise<UamLoginLogs>;
    updateById(id: number, UamLoginLogs: UamLoginLogs): Promise<void>;
    replaceById(id: number, UamLoginLogs: UamLoginLogs): Promise<void>;
    deleteById(id: number): Promise<void>;
    fetchLoginLogs(filter?: Filter<UamLoginLogs>): Promise<AnyObject[]>;
    downloadLoginLogsReport(filter?: Filter<UamLoginLogs>): Promise<any>;
}
