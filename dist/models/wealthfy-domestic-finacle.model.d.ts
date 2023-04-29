import { Entity } from '@loopback/repository';
export declare class WealthfyDomesticFinacle extends Entity {
    id?: number;
    [prop: string]: any;
    constructor(data?: Partial<WealthfyDomesticFinacle>);
}
export interface WealthfyDomesticFinacleRelations {
}
export declare type WealthfyDomesticFinacleWithRelations = WealthfyDomesticFinacle & WealthfyDomesticFinacleRelations;
