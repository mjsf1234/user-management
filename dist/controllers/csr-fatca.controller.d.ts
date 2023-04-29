import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { CsrFatca } from 'common';
import { CsrFatcaFacade } from '../facades';
export declare class CsrFatcaController {
    csrFatcaFacade: CsrFatcaFacade;
    private additionalHeaders;
    constructor(csrFatcaFacade: CsrFatcaFacade, additionalHeaders: any);
    create(csrFatca: Omit<CsrFatca, 'id'>): Promise<CsrFatca>;
    count(where?: Where<CsrFatca>): Promise<Count>;
    find(filter?: Filter<CsrFatca>): Promise<CsrFatca[]>;
    updateAll(csrFatca: CsrFatca, where?: Where<CsrFatca>): Promise<Count>;
    updatecsrFatcaStatus(csrFatca: CsrFatca, where?: Where<CsrFatca>): Promise<Count>;
    findById(id: number, filter?: FilterExcludingWhere<CsrFatca>): Promise<CsrFatca>;
    updateById(id: number, csrFatca: CsrFatca): Promise<void>;
    replaceById(id: number, csrFatca: CsrFatca): Promise<void>;
    deleteById(id: number): Promise<void>;
    generateFatca(): Promise<any>;
    fetchFatca(paginator: any): Promise<any>;
}
