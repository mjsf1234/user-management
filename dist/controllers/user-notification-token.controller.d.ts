import { Count } from '@loopback/repository';
import { UserNotificationToken, CommunicationQueueMessage } from 'common';
import { UserNotificationTokenFacade } from '../facades';
export declare class UserNotificationTokenController {
    userNotificationTokenFacade: UserNotificationTokenFacade;
    constructor(userNotificationTokenFacade: UserNotificationTokenFacade);
    create(appUserId: number, userNotificationToken: Omit<UserNotificationToken, 'id'>): Promise<UserNotificationToken>;
    deactivateToken(appUserId: number, where: Pick<UserNotificationToken, 'registrationToken'>): Promise<Count>;
    sendTestNoficationMessage(content: CommunicationQueueMessage): Promise<Count>;
}
