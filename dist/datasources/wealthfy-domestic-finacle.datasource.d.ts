import { LifeCycleObserver } from '@loopback/core';
import { juggler } from '@loopback/repository';
export declare class WealthfyDomesticFinacleDataSource extends juggler.DataSource implements LifeCycleObserver {
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
        operations: {
            template: {
                method: string;
                url: string;
                query: {
                    userCode: string;
                };
                headers: {
                    accepts: string;
                    'content-type': string;
                    'api-key': string | undefined;
                    source: string;
                    version: string;
                };
            };
            functions: {
                fetchUserSegmentDetailsFinacle: string[];
            };
        }[];
    };
    constructor(dsConfig?: object);
}
