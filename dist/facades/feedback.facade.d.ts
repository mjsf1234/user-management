import { Count, DataObject, Filter, FilterExcludingWhere, Options, Where } from '@loopback/repository';
import { Feedback, FeedbackRelations, FeedbackRepository } from 'common';
export declare class FeedbackFacade {
    private feedbackRepository;
    constructor(feedbackRepository: FeedbackRepository);
    create(entity: DataObject<Feedback>, options?: Options): Promise<Feedback>;
    createAll(entities: DataObject<Feedback>[], options?: Options): Promise<Feedback[]>;
    save(entity: Feedback, options?: Options): Promise<Feedback>;
    find(filter?: Filter<Feedback>, options?: Options): Promise<(Feedback & FeedbackRelations)[]>;
    findOne(filter?: Filter<Feedback>, options?: Options): Promise<(Feedback & FeedbackRelations) | null>;
    findById(id: number, filter?: FilterExcludingWhere<Feedback>, options?: Options): Promise<Feedback & FeedbackRelations>;
    update(entity: Feedback, options?: Options): Promise<void>;
    delete(entity: Feedback, options?: Options): Promise<void>;
    updateAll(data: DataObject<Feedback>, where?: Where<Feedback>, options?: Options): Promise<Count>;
    updateById(id: number, data: DataObject<Feedback>, options?: Options): Promise<void>;
    replaceById(id: number, data: DataObject<Feedback>, options?: Options): Promise<void>;
    deleteAll(where?: Where<Feedback>, options?: Options): Promise<Count>;
    deleteById(id: number, options?: Options): Promise<void>;
    count(where?: Where<Feedback>, options?: Options): Promise<Count>;
    exists(id: number, options?: Options): Promise<boolean>;
}
