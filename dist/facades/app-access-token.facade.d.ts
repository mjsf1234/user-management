/// <reference types="express" />
import { Count, DataObject, Filter, FilterExcludingWhere, Options, Where } from '@loopback/repository';
import { Request } from '@loopback/rest';
import { AppAccessToken, AppAccessTokenRelations, AppAccessTokenRepository, AppUser, AppUserRepository, DeviceRepository, UamLoginLogs, UamLoginLogsRepository } from 'common';
export declare class AppAccessTokenFacade {
    private appAccessTokenRepository;
    private appUserRepository;
    private deviceRepository;
    private uamLoginLogsRepository;
    constructor(appAccessTokenRepository: AppAccessTokenRepository, appUserRepository: AppUserRepository, deviceRepository: DeviceRepository, uamLoginLogsRepository: UamLoginLogsRepository);
    create(entity: DataObject<AppAccessToken>, options?: Options): Promise<AppAccessToken>;
    createAll(entities: DataObject<AppAccessToken>[], options?: Options): Promise<AppAccessToken[]>;
    save(entity: AppAccessToken, options?: Options): Promise<AppAccessToken>;
    find(filter?: Filter<AppAccessToken>, options?: Options): Promise<(AppAccessToken & AppAccessTokenRelations)[]>;
    findOne(filter?: Filter<AppAccessToken>, options?: Options): Promise<(AppAccessToken & AppAccessTokenRelations) | null>;
    findById(id: number, filter?: FilterExcludingWhere<AppAccessToken>, options?: Options): Promise<AppAccessToken & AppAccessTokenRelations>;
    update(entity: AppAccessToken, options?: Options): Promise<void>;
    delete(entity: AppAccessToken, options?: Options): Promise<void>;
    updateAll(data: DataObject<AppAccessToken>, where?: Where<AppAccessToken>, options?: Options): Promise<Count>;
    updateById(id: number, data: DataObject<AppAccessToken>, options?: Options): Promise<void>;
    replaceById(id: number, data: DataObject<AppAccessToken>, options?: Options): Promise<void>;
    deleteAll(where?: Where<AppAccessToken>, options?: Options): Promise<Count>;
    deleteById(id: number, options?: Options): Promise<void>;
    count(where?: Where<AppAccessToken>, options?: Options): Promise<Count>;
    exists(id: number, options?: Options): Promise<boolean>;
    fetchUserDetailsByToken(token: string | undefined | null): Promise<AppUser | any>;
    logout(appUserId: number, deviceUniqueId: string | undefined | null, token: string | undefined | null, req: Request, options?: Options): Promise<any>;
    logoutInternalUser(appUserId: number, token: string, options?: Options): Promise<any>;
    recreateTokenWithRereshToken(refreshToken: string | undefined | null, request: Request): Promise<any>;
    createToken(appUserId: number, request: Request, isVerifyOTPRequest?: boolean): Promise<Partial<AppAccessToken>>;
    createUamLoginLogs(input: DataObject<UamLoginLogs> | null, type: string, token: string | null): Promise<undefined>;
    recreateTokenData(appUserId: number): Promise<any[]>;
}
