import { LifeCycleObserver } from '@loopback/core';
import { juggler } from '@loopback/repository';
export declare class EkycDataSource extends juggler.DataSource implements LifeCycleObserver {
    static dataSourceName: string;
    static readonly defaultConfig: {
        name: string;
        connector: string;
        baseUrl: string | undefined;
        crud: boolean;
        options: {
            headers: {
                accepts: string;
                'Content-Type': string;
            };
            strictSSL: boolean;
            timeout: number;
            proxy: string;
        };
        operations: ({
            template: {
                method: string;
                url: string;
                headers: {
                    token: string;
                };
                query: {};
                body: {
                    request: string;
                    checksum: string;
                };
            };
            functions: {
                verifyKycFunction: string[];
                getPanEkycFunction?: undefined;
            };
        } | {
            template: {
                method: string;
                url: string;
                headers: {
                    token: string;
                };
                query: {};
                body: {
                    request: string;
                    checksum: string;
                };
            };
            functions: {
                getPanEkycFunction: string[];
                verifyKycFunction?: undefined;
            };
        })[];
    };
    constructor(dsConfig?: object);
}
