import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { RiskProfileQuestionSubmittedAnswer } from 'common';
import { RiskProfileQuestionSubmittedAnswerFacade } from '../facades';
export declare class RiskProfileQuestionSubmittedAnswerController {
    riskProfileQuestionSubmittedAnswerFacade: RiskProfileQuestionSubmittedAnswerFacade;
    private additionalHeaders;
    constructor(riskProfileQuestionSubmittedAnswerFacade: RiskProfileQuestionSubmittedAnswerFacade, additionalHeaders: any);
    create(riskProfileQuestionSubmittedAnswer: Omit<RiskProfileQuestionSubmittedAnswer, 'id'>): Promise<RiskProfileQuestionSubmittedAnswer>;
    count(where?: Where<RiskProfileQuestionSubmittedAnswer>): Promise<Count>;
    find(filter?: Filter<RiskProfileQuestionSubmittedAnswer>): Promise<RiskProfileQuestionSubmittedAnswer[]>;
    updateAll(riskProfileQuestionSubmittedAnswer: RiskProfileQuestionSubmittedAnswer, where?: Where<RiskProfileQuestionSubmittedAnswer>): Promise<Count>;
    findById(id: number, filter?: FilterExcludingWhere<RiskProfileQuestionSubmittedAnswer>): Promise<RiskProfileQuestionSubmittedAnswer>;
    updateById(id: number, riskProfileQuestionSubmittedAnswer: RiskProfileQuestionSubmittedAnswer): Promise<void>;
    replaceById(id: number, riskProfileQuestionSubmittedAnswer: RiskProfileQuestionSubmittedAnswer): Promise<void>;
    deleteById(id: number): Promise<void>;
}
