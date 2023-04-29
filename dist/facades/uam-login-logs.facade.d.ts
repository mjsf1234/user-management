import { AnyObject, Count, DataObject, Filter, FilterExcludingWhere, Options, Where } from '@loopback/repository';
import { UamLoginLogs, UamLoginLogsRepository, UamLoginLogsRelations } from 'common';
export declare class UamLoginLogsFacade {
    private uamLoginLogsRepository;
    constructor(uamLoginLogsRepository: UamLoginLogsRepository);
    create(entity: DataObject<UamLoginLogs>, options?: Options): Promise<UamLoginLogs>;
    createAll(entities: DataObject<UamLoginLogs>[], options?: Options): Promise<UamLoginLogs[]>;
    save(entity: UamLoginLogs, options?: Options): Promise<UamLoginLogs>;
    find(filter?: any, options?: Options): Promise<(UamLoginLogs & UamLoginLogsRelations)[]>;
    findOne(filter?: Filter<UamLoginLogs>, options?: Options): Promise<(UamLoginLogs & UamLoginLogsRelations) | null>;
    findById(id: number, filter?: FilterExcludingWhere<UamLoginLogs>, options?: Options): Promise<UamLoginLogs & UamLoginLogsRelations>;
    update(entity: UamLoginLogs, options?: Options): Promise<void>;
    delete(entity: UamLoginLogs, options?: Options): Promise<void>;
    updateAll(data: DataObject<UamLoginLogs>, where?: Where<UamLoginLogs>, options?: Options): Promise<Count>;
    updateById(id: number, data: DataObject<UamLoginLogs>, options?: Options): Promise<void>;
    replaceById(id: number, data: DataObject<UamLoginLogs>, options?: Options): Promise<void>;
    deleteAll(where?: Where<UamLoginLogs>, options?: Options): Promise<Count>;
    deleteById(id: number, options?: Options): Promise<void>;
    count(where?: Where<UamLoginLogs>, options?: Options): Promise<Count>;
    exists(id: number, options?: Options): Promise<boolean>;
    fetchLoginLogs(filter?: Filter<UamLoginLogs>, options?: Options): Promise<AnyObject[]>;
    createUamLoginLogs(input: DataObject<UamLoginLogs> | null, type: string, token: string | null): Promise<undefined>;
    downloadLoginLogsReport(res: any, filter?: any, options?: Options): Promise<any>;
}
