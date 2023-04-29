import { DefaultCrudRepository } from '@loopback/repository';
import { IdcomDataSource } from '../datasources';
import { Idcom, IdcomRelations } from '../models';
export declare class IdcomRepository extends DefaultCrudRepository<Idcom, typeof Idcom.prototype.id, IdcomRelations> implements IdcomRepository {
    constructor(dataSource: IdcomDataSource);
    fetchAuthCodeWithRedirectUrl(RequestEncryptedValue: string, SymmetricKeyEncryptedValue: string, Scope: string, TransactionId: string, transactionId: string): Promise<any>;
    fetchIdToken(RequestEncryptedValue: string, SymmetricKeyEncryptedValue: string, Scope: string, TransactionId: string, transactionId: string): Promise<any>;
    decryptIdToken(RequestEncryptedValue: string, SymmetricKeyEncryptedValue: string, Scope: string, TransactionId: string, IDCOM_Token: string, transactionId: string): Promise<any>;
}
