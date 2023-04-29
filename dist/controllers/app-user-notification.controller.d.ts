import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { AppUserNotification } from 'common';
import { AppUserNotificationFacade } from '../facades';
export declare class AppUserNotificationController {
    AppUserNotificationFacade: AppUserNotificationFacade;
    private additionalHeaders;
    constructor(AppUserNotificationFacade: AppUserNotificationFacade, additionalHeaders: any);
    create(AppUserNotification: Omit<AppUserNotification, 'id'>): Promise<AppUserNotification>;
    count(where?: Where<AppUserNotification>): Promise<Count>;
    find(filter?: Filter<AppUserNotification>): Promise<AppUserNotification[]>;
    findById(id: number, filter?: FilterExcludingWhere<AppUserNotification>): Promise<AppUserNotification>;
    deleteById(id: number): Promise<void>;
    createNomineeByAccountId(appUserId: number, AppUserNotification: AppUserNotification): Promise<AppUserNotification>;
    findUserNotification(appUserId: number): Promise<AppUserNotification | any>;
}
