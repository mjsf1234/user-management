import { DefaultCrudRepository } from '@loopback/repository';
import { EkycDataSource } from '../datasources';
import { Ekyc, EkycRelations } from '../models';
export declare class EkycRepository extends DefaultCrudRepository<Ekyc, typeof Ekyc.prototype.id, EkycRelations> implements EkycRepository {
    constructor(dataSource: EkycDataSource);
    fetchKRAKYC(request: string, checksum: number, token: string, transactionId: string): Promise<object>;
    updateKRAKYC(request: string, checksum: number, token: string, transactionId: string): Promise<object>;
}
