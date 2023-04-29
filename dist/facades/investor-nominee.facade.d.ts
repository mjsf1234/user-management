import { Count, DataObject, Filter, FilterExcludingWhere, Options, Where } from '@loopback/repository';
import { InvestorNominee, InvestorNomineeRelations, InvestorNomineeRepository, AccountRepository, Account, AppUserRepository, InvestorDetailsRepository, Address, AddressRepository } from 'common';
export declare class InvestorNomineeFacade {
    private investorNomineeRepository;
    private accountRepository;
    private appUserRepository;
    private investorDetailsRepository;
    private addressRepository;
    constructor(investorNomineeRepository: InvestorNomineeRepository, accountRepository: AccountRepository, appUserRepository: AppUserRepository, investorDetailsRepository: InvestorDetailsRepository, addressRepository: AddressRepository);
    getAge(dateString: string): number;
    create(entity: DataObject<InvestorNominee>, options?: Options): Promise<InvestorNominee>;
    find(filter?: Filter<InvestorNominee>, options?: Options): Promise<(InvestorNominee & InvestorNomineeRelations)[]>;
    updateAll(data: DataObject<InvestorNominee>, where?: Where<InvestorNominee>, options?: Options): Promise<Count>;
    updateById(id: number, data: DataObject<InvestorNominee>, options?: Options): Promise<void>;
    findById(id: number, filter?: FilterExcludingWhere<InvestorNominee>, options?: Options): Promise<InvestorNominee & InvestorNomineeRelations>;
    count(where?: Where<InvestorNominee>, options?: Options): Promise<Count>;
    delete(entity: InvestorNominee, options?: Options): Promise<void>;
    deleteAll(where?: Where<InvestorNominee>, options?: Options): Promise<Count>;
    deleteById(id: number, options?: Options): Promise<void>;
    exists(id: number, options?: Options): Promise<boolean>;
    createNomineeByAccountId(accountId: number, nominee: DataObject<InvestorNominee & {
        dateOfBirth: string;
        nomineeAddress: DataObject<Address>;
    }>, options?: Options): Promise<InvestorNominee>;
    saveOnboardingSelectedNominees(accountId: number, nomineeDetails: Array<Partial<InvestorNominee>>, options?: Options): Promise<object>;
    duplicateSelectedNominees(investorNominees: Array<DataObject<InvestorNominee>>, account: Partial<Account>): Promise<object>;
}
