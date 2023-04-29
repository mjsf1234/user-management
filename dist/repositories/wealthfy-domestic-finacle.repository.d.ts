import { DefaultCrudRepository } from '@loopback/repository';
import { WealthfyDomesticFinacleDataSource } from '../datasources';
import { WealthfyDomesticFinacle, WealthfyDomesticFinacleRelations } from '../models';
export declare class WealthfyDomesticFinacleRepository extends DefaultCrudRepository<WealthfyDomesticFinacle, typeof WealthfyDomesticFinacle.prototype.id, WealthfyDomesticFinacleRelations> implements WealthfyDomesticFinacleRepository {
    constructor(dataSource: WealthfyDomesticFinacleDataSource);
    fetchUserSegmentDetailsFinacle(customerId: string, transactionId: string): Promise<any>;
}
