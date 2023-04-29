import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { AdvisoryClientMaster } from 'common';
import { AdvisoryClientMasterFacade } from '../facades';
export declare class AdvisoryClientMasterController {
    advisoryClientMasterFacade: AdvisoryClientMasterFacade;
    constructor(advisoryClientMasterFacade: AdvisoryClientMasterFacade);
    create(advisoryClientMaster: Omit<AdvisoryClientMaster, 'id'>): Promise<AdvisoryClientMaster>;
    count(where?: Where<AdvisoryClientMaster>): Promise<Count>;
    find(filter?: Filter<AdvisoryClientMaster>): Promise<AdvisoryClientMaster[]>;
    updateAll(advisoryClientMaster: AdvisoryClientMaster, where?: Where<AdvisoryClientMaster>): Promise<Count>;
    findById(id: number, filter?: FilterExcludingWhere<AdvisoryClientMaster>): Promise<AdvisoryClientMaster>;
    updateById(id: number, advisoryClientMaster: AdvisoryClientMaster): Promise<void>;
    replaceById(id: number, advisoryClientMaster: AdvisoryClientMaster): Promise<void>;
    deleteById(id: number): Promise<void>;
}
