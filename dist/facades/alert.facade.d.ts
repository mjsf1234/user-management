import { Count, DataObject, Filter, FilterExcludingWhere, Options, Where } from '@loopback/repository';
import { Alert, AlertRelations, AlertRepository } from 'common';
export declare class AlertFacade {
    private alertRepository;
    constructor(alertRepository: AlertRepository);
    create(entity: DataObject<Alert>, options?: Options): Promise<Alert>;
    createAll(entities: DataObject<Alert>[], options?: Options): Promise<Alert[]>;
    save(entity: Alert, options?: Options): Promise<Alert>;
    find(filter?: Filter<Alert>, options?: Options): Promise<(Alert & AlertRelations)[]>;
    findOne(filter?: Filter<Alert>, options?: Options): Promise<(Alert & AlertRelations) | null>;
    findById(id: number, filter?: FilterExcludingWhere<Alert>, options?: Options): Promise<Alert & AlertRelations>;
    update(entity: Alert, options?: Options): Promise<void>;
    delete(entity: Alert, options?: Options): Promise<void>;
    updateAll(data: DataObject<Alert>, where?: Where<Alert>, options?: Options): Promise<Count>;
    updateById(id: number, data: DataObject<Alert>, options?: Options): Promise<void>;
    replaceById(id: number, data: DataObject<Alert>, options?: Options): Promise<void>;
    deleteAll(where?: Where<Alert>, options?: Options): Promise<Count>;
    deleteById(id: number, options?: Options): Promise<void>;
    count(where?: Where<Alert>, options?: Options): Promise<Count>;
    exists(id: number, options?: Options): Promise<boolean>;
}
