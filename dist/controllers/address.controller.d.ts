import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Address } from 'common';
import { AddressFacade } from '../facades';
export declare class AddressController {
    addressFacade: AddressFacade;
    constructor(addressFacade: AddressFacade);
    create(address: Omit<Address, 'id'>): Promise<Address>;
    count(where?: Where<Address>): Promise<Count>;
    find(filter?: Filter<Address>): Promise<Address[]>;
    updateAll(address: Address, where?: Where<Address>): Promise<Count>;
    findById(id: number, filter?: FilterExcludingWhere<Address>): Promise<Address>;
    updateById(id: number, address: Address): Promise<void>;
    replaceById(id: number, address: Address): Promise<void>;
    deleteById(id: number): Promise<void>;
}
