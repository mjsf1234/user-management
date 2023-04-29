import { Count, DataObject, Filter, FilterExcludingWhere, Options, Where } from '@loopback/repository';
import { InvestorDetails, InvestorDetailsRelations, InvestorDetailsRepository } from 'common';
export declare class InvestorDetailsFacade {
    private investorDetailsRepository;
    constructor(investorDetailsRepository: InvestorDetailsRepository);
    create(entity: DataObject<InvestorDetails>, options?: Options): Promise<InvestorDetails>;
    createAll(entities: DataObject<InvestorDetails>[], options?: Options): Promise<InvestorDetails[]>;
    save(entity: InvestorDetails, options?: Options): Promise<InvestorDetails>;
    find(filter?: Filter<InvestorDetails>, options?: Options): Promise<(InvestorDetails & InvestorDetailsRelations)[]>;
    findOne(filter?: Filter<InvestorDetails>, options?: Options): Promise<(InvestorDetails & InvestorDetailsRelations) | null>;
    findById(id: number, filter?: FilterExcludingWhere<InvestorDetails>, options?: Options): Promise<InvestorDetails & InvestorDetailsRelations>;
    update(entity: InvestorDetails, options?: Options): Promise<void>;
    delete(entity: InvestorDetails, options?: Options): Promise<void>;
    updateAll(data: DataObject<InvestorDetails>, where?: Where<InvestorDetails>, options?: Options): Promise<Count>;
    updateById(id: number, data: DataObject<InvestorDetails>, options?: Options): Promise<void>;
    replaceById(id: number, data: DataObject<InvestorDetails>, options?: Options): Promise<void>;
    deleteAll(where?: Where<InvestorDetails>, options?: Options): Promise<Count>;
    deleteById(id: number, options?: Options): Promise<void>;
    count(where?: Where<InvestorDetails>, options?: Options): Promise<Count>;
    exists(id: number, options?: Options): Promise<boolean>;
}
