import { Count, DataObject, Filter, FilterExcludingWhere, Options, Where } from '@loopback/repository';
import { OverseesAddress, OverseesAddressRelations, OverseesAddressRepository } from 'common';
export declare class OverseesAddressFacade {
    private overseesAddressRepository;
    constructor(overseesAddressRepository: OverseesAddressRepository);
    create(entity: DataObject<OverseesAddress>, options?: Options): Promise<OverseesAddress>;
    createAll(entities: DataObject<OverseesAddress>[], options?: Options): Promise<OverseesAddress[]>;
    save(entity: OverseesAddress, options?: Options): Promise<OverseesAddress>;
    find(filter?: Filter<OverseesAddress>, options?: Options): Promise<(OverseesAddress & OverseesAddressRelations)[]>;
    findOne(filter?: Filter<OverseesAddress>, options?: Options): Promise<(OverseesAddress & OverseesAddressRelations) | null>;
    findById(id: number, filter?: FilterExcludingWhere<OverseesAddress>, options?: Options): Promise<OverseesAddress & OverseesAddressRelations>;
    update(entity: OverseesAddress, options?: Options): Promise<void>;
    delete(entity: OverseesAddress, options?: Options): Promise<void>;
    updateAll(data: DataObject<OverseesAddress>, where?: Where<OverseesAddress>, options?: Options): Promise<Count>;
    updateById(id: number, data: DataObject<OverseesAddress>, options?: Options): Promise<void>;
    replaceById(id: number, data: DataObject<OverseesAddress>, options?: Options): Promise<void>;
    deleteAll(where?: Where<OverseesAddress>, options?: Options): Promise<Count>;
    deleteById(id: number, options?: Options): Promise<void>;
    count(where?: Where<OverseesAddress>, options?: Options): Promise<Count>;
    exists(id: number, options?: Options): Promise<boolean>;
}
