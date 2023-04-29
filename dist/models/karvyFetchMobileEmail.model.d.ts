import { Entity } from '@loopback/repository';
export declare class Karvy extends Entity {
    id?: number;
    [prop: string]: any;
    constructor(data?: Partial<Karvy>);
}
export interface KarvyRelations {
}
export declare type KarvyWithRelations = Karvy & KarvyRelations;
