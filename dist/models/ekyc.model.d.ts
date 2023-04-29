import { Entity } from '@loopback/repository';
export declare class Ekyc extends Entity {
    id?: number;
    [prop: string]: any;
    constructor(data?: Partial<Ekyc>);
}
export interface EkycRelations {
}
export declare type EkycWithRelations = Ekyc & EkycRelations;
