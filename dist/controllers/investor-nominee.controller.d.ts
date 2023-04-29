import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { InvestorNominee } from 'common';
import { InvestorNomineeFacade } from '../facades';
export declare class InvestorNomineeController {
    investorNomineeFacade: InvestorNomineeFacade;
    private additionalHeaders;
    constructor(investorNomineeFacade: InvestorNomineeFacade, additionalHeaders: any);
    create(investorNominee: Omit<InvestorNominee, 'id'>): Promise<InvestorNominee>;
    count(where?: Where<InvestorNominee>): Promise<Count>;
    find(filter?: Filter<InvestorNominee>): Promise<InvestorNominee[]>;
    findById(id: number, filter?: FilterExcludingWhere<InvestorNominee>): Promise<InvestorNominee>;
    deleteById(id: number): Promise<void>;
    createNomineeByAccountId(accountId: number, investorNominee: Object): Promise<InvestorNominee>;
    saveOnboardingSelectedNominees(accountId: number, investorNominee: Array<Partial<InvestorNominee>>): Promise<object>;
    updateAll(investorNominee: InvestorNominee, where?: Where<InvestorNominee>): Promise<Count>;
    updateById(id: number, investorNominee: InvestorNominee): Promise<void>;
}
