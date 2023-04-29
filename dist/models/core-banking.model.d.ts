import { Entity } from '@loopback/repository';
export declare class CoreBanking extends Entity {
    id?: number;
    [prop: string]: any;
    constructor(data?: Partial<CoreBanking>);
}
export interface CoreBankingRelations {
}
export declare type CoreBankingWithRelations = CoreBanking & CoreBankingRelations;
