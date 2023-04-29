import { AppUserRepository, IdcomDetailsRepository } from 'common';
import { IdcomInternalRepository, IdcomRepository } from '../repositories';
export declare class IdcomIntegrationFacade {
    private appUserRepository;
    private idcomRepository;
    private idcomInternalRepository;
    private idcomDetailsRepository;
    constructor(appUserRepository: AppUserRepository, idcomRepository: IdcomRepository, idcomInternalRepository: IdcomInternalRepository, idcomDetailsRepository: IdcomDetailsRepository);
    /**
     *
     * @param userId
     * @param idcomProps
     * @returns
     */
    getAuthCodeExternal(userId: number, deviceId: number, transactionId: string): Promise<any>;
    /**
     *
     * @param idcomProps
     * @returns
     */
    getIdTokenExternal(idcomProps: any, transactionId: string): Promise<any>;
    decryptIdTokenExternal(idcomProps: any, transactionId: string): Promise<any>;
    /**
     *
     * @param userId
     * @param idcomProps
     * @returns
     */
    getAuthCodeInternal(userId: number, deviceId: number, transactionId: string): Promise<any>;
    /**
     *
     * @param idcomProps
     * @returns
     */
    getIdTokenInternal(idcomProps: any, transactionId: string): Promise<any>;
    decryptIdTokenInternal(idcomProps: any, transactionId: string): Promise<any>;
    getAuthCode(userId: number, deviceId: number, transactionId: string): Promise<any>;
    getIdToken(idcomProps: any, transactionId: string): Promise<any>;
    decryptIdToken(idcomProps: any, transactionId: string): Promise<any>;
}
