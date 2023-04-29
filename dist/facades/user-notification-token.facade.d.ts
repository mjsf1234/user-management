import { Count, DataObject, Options } from '@loopback/repository';
import { UserNotificationToken, UserNotificationTokenRepository } from 'common';
export declare class UserNotificationTokenFacade {
    private userNotificationTokenRepository;
    constructor(userNotificationTokenRepository: UserNotificationTokenRepository);
    create(entity: DataObject<UserNotificationToken>, options?: Options): Promise<UserNotificationToken>;
    deactivatToken(appUserId: number, where?: Pick<UserNotificationToken, 'registrationToken'>, options?: Options): Promise<Count>;
}
