export declare class HSLRedirectFacade {
    constructor();
    /**
     * @description Bussiness logic to generate redirect url for given tag
     * @param tag - Requires to identify redirect url
     * @returns
     */
    getRedirectURL(tag: string): Promise<string | object>;
}
