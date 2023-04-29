import { DefaultCrudRepository } from '@loopback/repository';
import { CoreBankingDataSource } from '../datasources';
import { CoreBanking, CoreBankingRelations } from '../models';
export declare type OtpMessages = {
    message: string;
    tempId: string;
    emailSubject?: string;
};
export declare class CoreBankingRepository extends DefaultCrudRepository<CoreBanking, typeof CoreBanking.prototype.id, CoreBankingRelations> implements CoreBankingRepository {
    constructor(dataSource: CoreBankingDataSource);
    doDemographicDetailsInquiry(customerId: string): Promise<object>;
    fetchCustomerAccountAmlFatcaDetails(mobileNumber: string, pan: string, dob: string, customerID: string, transactionId: string): Promise<object>;
    fetchCASADetailBalanceInquiry(accountNo: string, transactionId: string): Promise<object>;
    sha1HashGenerator(key: string): string;
    doGenerateOTP(transactionId: string, linkData: string): Promise<object>;
    doVerifyOTP(otp: string, refNo: string, transactionId: string, linkData: string): Promise<object>;
    doPublishOTP(contactNumber: string, otp: OtpMessages, transactionId: string, msgType?: string): Promise<object>;
}
