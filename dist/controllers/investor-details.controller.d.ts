import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { InvestorDetails } from 'common';
import { InvestorDetailsFacade } from '../facades';
export declare class InvestorDetailsController {
    investorDetailsFacade: InvestorDetailsFacade;
    constructor(investorDetailsFacade: InvestorDetailsFacade);
    create(investorDetails: Omit<InvestorDetails, 'id'>): Promise<InvestorDetails>;
    count(where?: Where<InvestorDetails>): Promise<Count>;
    find(filter?: Filter<InvestorDetails>): Promise<InvestorDetails[]>;
    updateAll(investorDetails: InvestorDetails, where?: Where<InvestorDetails>): Promise<Count>;
    findById(id: number, filter?: FilterExcludingWhere<InvestorDetails>): Promise<InvestorDetails>;
    updateById(id: number, investorDetails: InvestorDetails): Promise<void>;
    replaceById(id: number, investorDetails: InvestorDetails): Promise<void>;
    deleteById(id: number): Promise<void>;
}
