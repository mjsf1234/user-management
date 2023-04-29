import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Feedback } from 'common';
import { FeedbackFacade } from '../facades';
export declare class FeedbackController {
    feedbackFacade: FeedbackFacade;
    constructor(feedbackFacade: FeedbackFacade);
    create(feedback: Omit<Feedback, 'id'>): Promise<Feedback>;
    count(where?: Where<Feedback>): Promise<Count>;
    find(filter?: Filter<Feedback>): Promise<Feedback[]>;
    updateAll(feedback: Feedback, where?: Where<Feedback>): Promise<Count>;
    findById(id: number, filter?: FilterExcludingWhere<Feedback>): Promise<Feedback>;
    updateById(id: number, feedback: Feedback): Promise<void>;
    replaceById(id: number, feedback: Feedback): Promise<void>;
    deleteById(id: number): Promise<void>;
}
