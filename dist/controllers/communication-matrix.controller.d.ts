import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { CommunicationMatrix, RestError } from 'common';
import { CommunicationMatrixFacade } from '../facades/communication-matrix.facade';
export declare class CommunicationMatrixController {
    communicationMatrixFacade: CommunicationMatrixFacade;
    private additionalHeaders;
    constructor(communicationMatrixFacade: CommunicationMatrixFacade, additionalHeaders: any);
    create(communicationMatrix: Omit<CommunicationMatrix, 'id'>): Promise<CommunicationMatrix>;
    count(where?: Where<CommunicationMatrix>): Promise<Count>;
    find(filter?: Filter<CommunicationMatrix>): Promise<CommunicationMatrix[]>;
    updateAll(CommunicationMatrix: CommunicationMatrix, where?: Where<CommunicationMatrix>): Promise<Count>;
    findById(id: number, filter?: FilterExcludingWhere<CommunicationMatrix>): Promise<CommunicationMatrix>;
    updateById(id: number, communicationMatrix: CommunicationMatrix): Promise<void>;
    replaceById(id: number, communicationMatrix: CommunicationMatrix): Promise<void>;
    deleteById(id: number): Promise<void>;
    findByAccountId(id: number): Promise<CommunicationMatrix[] | RestError>;
    updateModeOfNotificationByAccountId(accountId: number, settings: any): Promise<{
        success: boolean;
    } | RestError>;
    addCommunicationMatrix(accountId: number): Promise<Count>;
    testNotification(accountId: number): Promise<Count>;
}
