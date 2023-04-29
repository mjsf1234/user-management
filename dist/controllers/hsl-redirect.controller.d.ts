import { HSLRedirectFacade } from '../facades/hsl-redirect.facade';
/**
 * A simple controller to get HSL redirect url.
 */
export declare class HSLRedirectController {
    hslRedirectFacade: HSLRedirectFacade;
    constructor(hslRedirectFacade: HSLRedirectFacade);
    /**
     *
     * @param tag - Requires to identify redirect url
     * @returns
     */
    hslRedirect(tag: string): Promise<string | object>;
}
