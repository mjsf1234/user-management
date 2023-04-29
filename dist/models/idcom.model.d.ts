import { Entity } from '@loopback/repository';
export declare class Idcom extends Entity {
    id?: number;
    [prop: string]: any;
    constructor(data?: Partial<Idcom>);
}
export interface IdcomRelations {
}
export declare type IdcomWithRelations = Idcom & IdcomRelations;
