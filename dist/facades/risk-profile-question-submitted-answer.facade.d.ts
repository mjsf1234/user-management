import { Count, DataObject, Filter, FilterExcludingWhere, Options, Where } from '@loopback/repository';
import { RiskProfileQuestionSubmittedAnswer, RiskProfileQuestionSubmittedAnswerRelations, RiskProfileQuestionSubmittedAnswerRepository } from 'common';
export declare class RiskProfileQuestionSubmittedAnswerFacade {
    private riskProfileQuestionSubmittedAnswerRepository;
    constructor(riskProfileQuestionSubmittedAnswerRepository: RiskProfileQuestionSubmittedAnswerRepository);
    create(entity: DataObject<RiskProfileQuestionSubmittedAnswer>, options?: Options): Promise<RiskProfileQuestionSubmittedAnswer>;
    createAll(entities: DataObject<RiskProfileQuestionSubmittedAnswer>[], options?: Options): Promise<RiskProfileQuestionSubmittedAnswer[]>;
    save(entity: RiskProfileQuestionSubmittedAnswer, options?: Options): Promise<RiskProfileQuestionSubmittedAnswer>;
    find(filter?: Filter<RiskProfileQuestionSubmittedAnswer>, options?: Options): Promise<(RiskProfileQuestionSubmittedAnswer & RiskProfileQuestionSubmittedAnswerRelations)[]>;
    findOne(filter?: Filter<RiskProfileQuestionSubmittedAnswer>, options?: Options): Promise<(RiskProfileQuestionSubmittedAnswer & RiskProfileQuestionSubmittedAnswerRelations) | null>;
    findById(id: number, filter?: FilterExcludingWhere<RiskProfileQuestionSubmittedAnswer>, options?: Options): Promise<RiskProfileQuestionSubmittedAnswer & RiskProfileQuestionSubmittedAnswerRelations>;
    update(entity: RiskProfileQuestionSubmittedAnswer, options?: Options): Promise<void>;
    delete(entity: RiskProfileQuestionSubmittedAnswer, options?: Options): Promise<void>;
    updateAll(data: DataObject<RiskProfileQuestionSubmittedAnswer>, where?: Where<RiskProfileQuestionSubmittedAnswer>, options?: Options): Promise<Count>;
    updateById(id: number, data: DataObject<RiskProfileQuestionSubmittedAnswer>, options?: Options): Promise<void>;
    replaceById(id: number, data: DataObject<RiskProfileQuestionSubmittedAnswer>, options?: Options): Promise<void>;
    deleteAll(where?: Where<RiskProfileQuestionSubmittedAnswer>, options?: Options): Promise<Count>;
    deleteById(id: number, options?: Options): Promise<void>;
    count(where?: Where<RiskProfileQuestionSubmittedAnswer>, options?: Options): Promise<Count>;
    exists(id: number, options?: Options): Promise<boolean>;
}
