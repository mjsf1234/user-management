import { DefaultCrudRepository } from '@loopback/repository';
import { WealthfyDomesticFCPBDataSource } from '../datasources';
import { WealthfyDomesticFCPB, WealthfyDomesticFCPBRelations } from '../models';
export declare class WealthfyDomesticFCPRepository extends DefaultCrudRepository<WealthfyDomesticFCPB, typeof WealthfyDomesticFCPB.prototype.id, WealthfyDomesticFCPBRelations> implements WealthfyDomesticFCPRepository {
    constructor(dataSource: WealthfyDomesticFCPBDataSource);
    fetchUserSegmentDetailsFCPB(customerId: string, transactionId: string): Promise<any>;
}
