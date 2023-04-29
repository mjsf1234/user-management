import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { OverseesAddress } from 'common';
import { OverseesAddressFacade } from '../facades';
export declare class OverseesAddressController {
    overseesAddressFacade: OverseesAddressFacade;
    constructor(overseesAddressFacade: OverseesAddressFacade);
    create(overseesAddress: Omit<OverseesAddress, 'id'>): Promise<OverseesAddress>;
    count(where?: Where<OverseesAddress>): Promise<Count>;
    find(filter?: Filter<OverseesAddress>): Promise<OverseesAddress[]>;
    updateAll(overseesAddress: OverseesAddress, where?: Where<OverseesAddress>): Promise<Count>;
    findById(id: number, filter?: FilterExcludingWhere<OverseesAddress>): Promise<OverseesAddress>;
    updateById(id: number, overseesAddress: OverseesAddress): Promise<void>;
    replaceById(id: number, overseesAddress: OverseesAddress): Promise<void>;
    deleteById(id: number): Promise<void>;
}
