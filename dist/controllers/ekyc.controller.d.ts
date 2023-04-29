/// <reference types="express" />
import { Request } from '@loopback/rest';
import { EkycFacade } from '../facades';
export declare class EkycController {
    ekycFacade: EkycFacade;
    private userProfile;
    private additionalHeaders;
    constructor(ekycFacade: EkycFacade, userProfile: any, additionalHeaders: any);
    fetchKRAKYC(request: Request): Promise<object>;
    fetchKRAKYCBYID(data: {
        userId: any;
    }): Promise<object>;
    updateKRAKYC(request: Request): Promise<any>;
    kycCompleted(id: number): Promise<object>;
}
