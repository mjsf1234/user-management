/// <reference types="express" />
import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Request } from '@loopback/rest';
import { AppAccessToken } from 'common';
import { AppAccessTokenFacade } from '../facades';
export declare class AppAccessTokenController {
    appAccessTokenFacade: AppAccessTokenFacade;
    constructor(appAccessTokenFacade: AppAccessTokenFacade);
    create(appAccessToken: Omit<AppAccessToken, 'id'>): Promise<AppAccessToken>;
    refreshUsertToken(refreshTokenRequest: {
        refreshToken: string;
    }, request: Request): Promise<object>;
    count(where?: Where<AppAccessToken>): Promise<Count>;
    find(filter?: Filter<AppAccessToken>): Promise<AppAccessToken[]>;
    updateAll(appAccessToken: AppAccessToken, where?: Where<AppAccessToken>): Promise<Count>;
    findById(id: number, filter?: FilterExcludingWhere<AppAccessToken>): Promise<AppAccessToken>;
    updateById(id: number, appAccessToken: AppAccessToken): Promise<void>;
    replaceById(id: number, appAccessToken: AppAccessToken): Promise<void>;
    deleteById(id: number): Promise<void>;
}
