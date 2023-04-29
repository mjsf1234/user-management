import { IdcomIntegrationFacade } from '../facades/idcom-integration.facade';
/**
 * Controller for IDCOM Integration.
 */
export declare class IdcomIntegrationController {
    idcomIntegrationFacade: IdcomIntegrationFacade;
    private userProfile;
    constructor(idcomIntegrationFacade: IdcomIntegrationFacade, userProfile: any);
    /**
     *  This Endpoint fetch auth coe and redirect url
     * @param idcomProps
     * @returns
     */
    getAuthCode(device: any): Promise<any>;
    getIdToken(idcomProps: any): Promise<any>;
    decryptIdToken(idcomProps: any): Promise<any>;
}
