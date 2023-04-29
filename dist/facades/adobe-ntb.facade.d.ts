import { DataObject, Options } from '@loopback/repository';
import { AdobeNtbRepository, AdobeNtbUser } from 'common';
import { AppUserFacade } from './app-user.facade';
import { AccountFacade } from './account.facade';
import { InvestorDetailsRepository, AccountRepository, AppUserRepository } from 'common';
export declare class AdobNtbFacade {
    private adobentbRepository;
    appUserFacade: AppUserFacade;
    accountFacade: AccountFacade;
    private investorDetailsRepository;
    private appUserRepository;
    private accountRepository;
    constructor(adobentbRepository: AdobeNtbRepository, appUserFacade: AppUserFacade, accountFacade: AccountFacade, investorDetailsRepository: InvestorDetailsRepository, appUserRepository: AppUserRepository, accountRepository: AccountRepository);
    create(entity: DataObject<AdobeNtbUser>, options?: Options): Promise<{
        status: string;
    }>;
}
