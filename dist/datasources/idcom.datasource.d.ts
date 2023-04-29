import { LifeCycleObserver } from '@loopback/core';
import { juggler } from '@loopback/repository';
export declare class IdcomDataSource extends juggler.DataSource implements LifeCycleObserver {
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
                options: {
                    cert: string;
                    key: string;
                };
                body: {
                    RequestEncryptedValue: string;
                    SymmetricKeyEncryptedValue: string;
                    Scope: string;
                    TransactionId: string;
                    OAuthTokenValue: string;
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
                options: {
                    cert: string;
                    key: string;
                };
                body: {
                    RequestEncryptedValue: string;
                    SymmetricKeyEncryptedValue: string;
                    Scope: string;
                    TransactionId: string;
                    OAuthTokenValue: string;
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
                options: {
                    cert: string;
                    key: string;
                };
                body: {
                    IDCOM_Token: string;
                    RequestEncryptedValue?: undefined;
                    SymmetricKeyEncryptedValue?: undefined;
                    Scope?: undefined;
                    TransactionId?: undefined;
                    OAuthTokenValue?: undefined;
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
