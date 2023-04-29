import { DefaultCrudRepository } from '@loopback/repository';
import { IdcomInternalDataSource } from '../datasources';
import { Idcom, IdcomRelations } from '../models';
export declare class IdcomInternalRepository extends DefaultCrudRepository<Idcom, typeof Idcom.prototype.id, IdcomRelations> implements IdcomInternalRepository {
    constructor(dataSource: IdcomInternalDataSource);
    fetchAuthCodeWithRedirectUrl(FintechID: string, Identifiers: any, ProductCode: string, ClientSecret: string, ClientID: string, transactionId: string): Promise<any>;
    fetchIdToken(authCode: string, transactionId: string): Promise<any>;
    decryptIdToken(IDCOM_Token: string, transactionId: string): Promise<any>;
}
