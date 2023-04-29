import { CoreBankingFacade } from '../facades';
export declare class CoreBankingController {
    coreBankingFacade: CoreBankingFacade;
    private additionalHeaders;
    private userProfile;
    constructor(coreBankingFacade: CoreBankingFacade, additionalHeaders: any, userProfile: any);
    storeCustomerAccountAmlFatcaDetailsIntoDB(customerDetails: {
        mobileNumber: '';
        pan: '';
        dob: '';
        customerID: '';
    }): Promise<any>;
}
