import { LifeCycleObserver } from '@loopback/core';
import { juggler } from '@loopback/repository';
export declare class LocalDataSource extends juggler.DataSource implements LifeCycleObserver {
    static dataSourceName: string;
    static readonly defaultConfig: {
        name: string | undefined;
        connector: string;
        host: string | undefined;
        port: string | undefined;
        user: string | undefined;
        password: string | undefined;
        database: string | undefined;
        min: string | undefined;
        max: string | undefined;
        idleTimeoutMillis: number;
        connectionTimeoutMillis: number;
        ssl: any;
        debug: any;
    };
    constructor(dsConfig?: object);
}
