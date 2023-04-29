import { LifeCycleObserver } from '@loopback/core';
import { juggler } from '@loopback/repository';
export declare class IdcomInternalDataSource extends juggler.DataSource implements LifeCycleObserver {
    static dataSourceName: string;
    static readonly defaultConfig: {
        name: string;
        connector: string;
        baseUrl: string | undefined;
        crud: boolean;
        options: {
            strictSSL: boolean;
            timeout: number;
            proxy: string;
        };
        operations: ({
            template: {
                method: string;
                url: string;
                query: {};
                headers: {
                    accepts: string;
                    'content-type': string;
                    apikey: string;
                    scope: string | undefined;
                };
                options: {};
                body: {
                    FintechID: string;
                    Identifiers: string;
                    ProductCode: string;
                    ClientSecret: string;
                    ClientID: string;
                    Filler1: string;
                    Filler2: string;
                    Filler3: string;
                    Filler4: string;
                    Filler5: string;
                    Filler6: string;
                    Filler7: string;
                    Filler8: string;
                    Filler9: string;
                    Filler10: string;
                    authCode?: undefined;
                    IDCOM_Token?: undefined;
                };
            };
            functions: {
                fetchAuthCodeWithRedirectUrl: string[];
                fetchIdToken?: undefined;
                decryptIdToken?: undefined;
            };
        } | {
            template: {
                method: string;
                url: string;
                query: {};
                headers: {
                    accepts: string;
                    'content-type': string;
                    apikey: string;
                    scope: string | undefined;
                };
                options: {};
                body: {
                    authCode: string;
                    FintechID?: undefined;
                    Identifiers?: undefined;
                    ProductCode?: undefined;
                    ClientSecret?: undefined;
                    ClientID?: undefined;
                    Filler1?: undefined;
                    Filler2?: undefined;
                    Filler3?: undefined;
                    Filler4?: undefined;
                    Filler5?: undefined;
                    Filler6?: undefined;
                    Filler7?: undefined;
                    Filler8?: undefined;
                    Filler9?: undefined;
                    Filler10?: undefined;
                    IDCOM_Token?: undefined;
                };
            };
            functions: {
                fetchIdToken: string[];
                fetchAuthCodeWithRedirectUrl?: undefined;
                decryptIdToken?: undefined;
            };
        } | {
            template: {
                method: string;
                url: string;
                query: {};
                headers: {
                    accepts: string;
                    'content-type': string;
                    apikey: string;
                    scope: string | undefined;
                };
                options: {};
                body: {
                    IDCOM_Token: string;
                    FintechID?: undefined;
                    Identifiers?: undefined;
                    ProductCode?: undefined;
                    ClientSecret?: undefined;
                    ClientID?: undefined;
                    Filler1?: undefined;
                    Filler2?: undefined;
                    Filler3?: undefined;
                    Filler4?: undefined;
                    Filler5?: undefined;
                    Filler6?: undefined;
                    Filler7?: undefined;
                    Filler8?: undefined;
                    Filler9?: undefined;
                    Filler10?: undefined;
                    authCode?: undefined;
                };
            };
            functions: {
                decryptIdToken: string[];
                fetchAuthCodeWithRedirectUrl?: undefined;
                fetchIdToken?: undefined;
            };
        })[];
    };
    constructor(dsConfig?: object);
}
