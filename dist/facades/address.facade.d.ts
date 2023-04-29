import { Count, DataObject, Filter, FilterExcludingWhere, Options, Where } from '@loopback/repository';
import { Address, AddressRelations, AddressRepository } from 'common';
export declare class AddressFacade {
    private addressRepository;
    constructor(addressRepository: AddressRepository);
    create(entity: DataObject<Address>, options?: Options): Promise<Address>;
    createAll(entities: DataObject<Address>[], options?: Options): Promise<Address[]>;
    save(entity: Address, options?: Options): Promise<Address>;
    find(filter?: Filter<Address>, options?: Options): Promise<(Address & AddressRelations)[]>;
    findOne(filter?: Filter<Address>, options?: Options): Promise<(Address & AddressRelations) | null>;
    findById(id: number, filter?: FilterExcludingWhere<Address>, options?: Options): Promise<Address & AddressRelations>;
    update(entity: Address, options?: Options): Promise<void>;
    delete(entity: Address, options?: Options): Promise<void>;
    updateAll(data: DataObject<Address>, where?: Where<Address>, options?: Options): Promise<Count>;
    updateById(id: number, data: DataObject<Address>, options?: Options): Promise<void>;
    replaceById(id: number, data: DataObject<Address>, options?: Options): Promise<void>;
    deleteAll(where?: Where<Address>, options?: Options): Promise<Count>;
    deleteById(id: number, options?: Options): Promise<void>;
    count(where?: Where<Address>, options?: Options): Promise<Count>;
    exists(id: number, options?: Options): Promise<boolean>;
}
