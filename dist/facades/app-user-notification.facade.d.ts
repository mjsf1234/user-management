import { Count, DataObject, Filter, FilterExcludingWhere, Options, Where } from '@loopback/repository';
import { AppUserNotification, AppUserNotificationRelations, AppUserNotificationRepository } from 'common';
export declare class AppUserNotificationFacade {
    private AppUserNotificationRepository;
    constructor(AppUserNotificationRepository: AppUserNotificationRepository);
    create(entity: DataObject<AppUserNotification>, options?: Options): Promise<AppUserNotification>;
    createAll(entities: DataObject<AppUserNotification>[], options?: Options): Promise<AppUserNotification[]>;
    save(entity: AppUserNotification, options?: Options): Promise<AppUserNotification>;
    find(filter?: Filter<AppUserNotification>, options?: Options): Promise<(AppUserNotification & AppUserNotificationRelations)[]>;
    findOne(filter?: Filter<AppUserNotification>, options?: Options): Promise<(AppUserNotification & AppUserNotificationRelations) | null>;
    findById(id: number, filter?: FilterExcludingWhere<AppUserNotification>, options?: Options): Promise<AppUserNotification & AppUserNotificationRelations>;
    update(entity: AppUserNotification, options?: Options): Promise<void>;
    delete(entity: AppUserNotification, options?: Options): Promise<void>;
    updateAll(data: DataObject<AppUserNotification>, where?: Where<AppUserNotification>, options?: Options): Promise<Count>;
    updateById(id: number, data: DataObject<AppUserNotification>, options?: Options): Promise<void>;
    replaceById(id: number, data: DataObject<AppUserNotification>, options?: Options): Promise<void>;
    deleteAll(where?: Where<AppUserNotification>, options?: Options): Promise<Count>;
    deleteById(id: number, options?: Options): Promise<void>;
    count(where?: Where<AppUserNotification>, options?: Options): Promise<Count>;
    exists(id: number, options?: Options): Promise<boolean>;
    createAppUserNotification(appUserId: number, entity: DataObject<AppUserNotification>): Promise<any>;
    findUserNotification(appUserId: number, options: Options): Promise<any>;
}
