import { Options } from '@loopback/repository';
import { EkycRepository } from '../repositories/ekyc.repository';
import { AppUserFacade } from './app-user.facade';
import { AccountFacade } from './account.facade';
import { InvestorDetailsRepository, AccountRepository, AppUserRepository } from 'common';
import { ConsolidatedDocumentFacade } from './consolidate-document.facade';
export declare class EkycFacade {
    private ekycRepository;
    appUserFacade: AppUserFacade;
    accountFacade: AccountFacade;
    private investorDetailsRepository;
    private appUserRepository;
    private accountRepository;
    private consolidatedDocumentFacade;
    constructor(ekycRepository: EkycRepository, appUserFacade: AppUserFacade, accountFacade: AccountFacade, investorDetailsRepository: InvestorDetailsRepository, appUserRepository: AppUserRepository, accountRepository: AccountRepository, consolidatedDocumentFacade: ConsolidatedDocumentFacade);
    fetchKRAKYC(token: string | undefined | null, isTokenId: boolean | undefined, transactionId: string, options?: Options): Promise<any>;
    updateKRAKYC(appUserId: string | undefined | null, transactionId: string): Promise<any>;
    encryptRequest(cmd: string, randomNumber: Number): Promise<unknown>;
    decryptRsponse(cmd: any): Promise<unknown>;
    generateUniqueNumber(): Promise<number>;
    kycCompleted(id: number): Promise<import("@loopback/repository").Count>;
}
