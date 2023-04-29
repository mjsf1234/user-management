import { Count, DataObject, Filter, FilterExcludingWhere, Options, Where } from '@loopback/repository';
import { Mandate, MandateRelations, MandateRepository } from 'common';
export declare class MandateFacade {
    private mandateRepository;
    constructor(mandateRepository: MandateRepository);
    create(entity: DataObject<Mandate>, options?: Options): Promise<Mandate>;
    createAll(entities: DataObject<Mandate>[], options?: Options): Promise<Mandate[]>;
    save(entity: Mandate, options?: Options): Promise<Mandate>;
    find(filter?: Filter<Mandate>, options?: Options): Promise<(Mandate & MandateRelations)[]>;
    findOne(filter?: Filter<Mandate>, options?: Options): Promise<(Mandate & MandateRelations) | null>;
    findById(id: number, filter?: FilterExcludingWhere<Mandate>, options?: Options): Promise<Mandate & MandateRelations>;
    update(entity: Mandate, options?: Options): Promise<void>;
    delete(entity: Mandate, options?: Options): Promise<void>;
    updateAll(data: DataObject<Mandate>, where?: Where<Mandate>, options?: Options): Promise<Count>;
    updateById(id: number, data: DataObject<Mandate>, options?: Options): Promise<void>;
    replaceById(id: number, data: DataObject<Mandate>, options?: Options): Promise<void>;
    deleteAll(where?: Where<Mandate>, options?: Options): Promise<Count>;
    deleteById(id: number, options?: Options): Promise<void>;
    count(where?: Where<Mandate>, options?: Options): Promise<Count>;
    exists(id: number, options?: Options): Promise<boolean>;
}
