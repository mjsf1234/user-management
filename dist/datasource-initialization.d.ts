import { UserManagementService } from './application';
export declare abstract class DatasourceInitialization {
    static init(app: UserManagementService): Promise<void>;
}
