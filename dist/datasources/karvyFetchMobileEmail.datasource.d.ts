import { LifeCycleObserver } from '@loopback/core';
import { juggler } from '@loopback/repository';
export declare class KarvyDataSource extends juggler.DataSource implements LifeCycleObserver {
    static dataSourceName: string;
    static readonly defaultConfig: {
        name: string;
        connector: string;
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
                url: string | undefined;
                headers: {};
                query: {};
                body: {
                    Appid: string;
                    Apppwd: string;
                    AppIden: string;
                    AgentCode: string;
                    BranchCode: string;
                    AMC_Code: string;
                    Folio_No: string;
                    Contact_Details_Request?: undefined;
                };
            };
            functions: {
                KarvyGetMobileAndEmailBasedOnFolio: string[];
                CamsGetMobileAndEmailBasedOnFolio?: undefined;
            };
        } | {
            template: {
                method: string;
                url: string | undefined;
                headers: {};
                query: {};
                body: {
                    Contact_Details_Request: {
                        AMCCode: string;
                        ApplicationID: string;
                        Password: string;
                        FolioNo: string;
                        PAN: string;
                    };
                    Appid?: undefined;
                    Apppwd?: undefined;
                    AppIden?: undefined;
                    AgentCode?: undefined;
                    BranchCode?: undefined;
                    AMC_Code?: undefined;
                    Folio_No?: undefined;
                };
            };
            functions: {
                CamsGetMobileAndEmailBasedOnFolio: string[];
                KarvyGetMobileAndEmailBasedOnFolio?: undefined;
            };
        })[];
    };
    constructor(dsConfig?: object);
}
