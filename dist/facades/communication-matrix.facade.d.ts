import { Count, DataObject, Filter, FilterExcludingWhere, Options, Where } from '@loopback/repository';
import { CommunicationMatrix, CommunicationMatrixRelations, CommunicationMatrixRepository, RestError, CommunicationTopicRepository } from 'common';
export declare class CommunicationMatrixFacade {
    private communicationMatrixRepository;
    private communicationTopicRepository;
    constructor(communicationMatrixRepository: CommunicationMatrixRepository, communicationTopicRepository: CommunicationTopicRepository);
    create(entity: DataObject<CommunicationMatrix>, options?: Options): Promise<CommunicationMatrix>;
    createAll(entities: DataObject<CommunicationMatrix>[], options?: Options): Promise<CommunicationMatrix[]>;
    save(entity: CommunicationMatrix, options?: Options): Promise<CommunicationMatrix>;
    find(filter?: Filter<CommunicationMatrix>, options?: Options): Promise<(CommunicationMatrix & CommunicationMatrixRelations)[]>;
    findOne(filter?: Filter<CommunicationMatrix>, options?: Options): Promise<(CommunicationMatrix & CommunicationMatrixRelations) | null>;
    findById(id: number, filter?: FilterExcludingWhere<CommunicationMatrix>, options?: Options): Promise<CommunicationMatrix & CommunicationMatrixRelations>;
    update(entity: CommunicationMatrix, options?: Options): Promise<void>;
    delete(entity: CommunicationMatrix, options?: Options): Promise<void>;
    updateAll(data: DataObject<CommunicationMatrix>, where?: Where<CommunicationMatrix>, options?: Options): Promise<Count>;
    updateById(id: number, data: DataObject<CommunicationMatrix>, options?: Options): Promise<void>;
    replaceById(id: number, data: DataObject<CommunicationMatrix>, options?: Options): Promise<void>;
    deleteAll(where?: Where<CommunicationMatrix>, options?: Options): Promise<Count>;
    deleteById(id: number, options?: Options): Promise<void>;
    count(where?: Where<CommunicationMatrix>, options?: Options): Promise<Count>;
    exists(id: number, options?: Options): Promise<boolean>;
    findByAccountId(id: number, options?: Options): Promise<CommunicationMatrix[] | RestError>;
    updateModeOfNotification(id: number, settings: any, options: Options): Promise<{
        success: boolean;
    } | RestError>;
    addCommunicationMatrix(accountId: number | undefined, options?: Options): Promise<any>;
    testNotification(accountId: number | undefined, options?: Options): Promise<any>;
}
