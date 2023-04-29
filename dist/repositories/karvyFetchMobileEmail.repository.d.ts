import { DefaultCrudRepository } from '@loopback/repository';
import { KarvyDataSource } from '../datasources';
import { Karvy, KarvyRelations } from '../models';
export declare class KravyRepository extends DefaultCrudRepository<Karvy, typeof Karvy.prototype.id, KarvyRelations> implements KravyRepository {
    constructor(dataSource: KarvyDataSource);
    KarvyGetMobileAndEmailBasedOnFolio(Appid: string, Apppwd: string, AppIden: string, AgentCode: string, BranchCode: string, AMC_Code: string, Folio_No: string, transactionId: string): Promise<object>;
    CamsGetMobileAndEmailBasedOnFolio(AMCCode: string, ApplicationID: string, Password: string, FolioNo: string, PAN: string, transactionId: string): Promise<object>;
}
