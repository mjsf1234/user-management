import { NomineeDocumentRepository, IStorageService, TransactionFeedLogRepository, AccountRepository, UserManagementAppFileRepository, OrderItem, OrderItemRepository } from 'common';
import { Options } from '@loopback/repository';
export declare class NomineeDocumentGenerationEngine {
    private nomineeDocumentRepository;
    private transactionFeedLogRepository;
    private accountRepository;
    private orderItemRepository;
    private fileStorageService;
    private userManagementAppFileRepository;
    constructor(nomineeDocumentRepository: NomineeDocumentRepository, transactionFeedLogRepository: TransactionFeedLogRepository, accountRepository: AccountRepository, orderItemRepository: OrderItemRepository, fileStorageService: IStorageService, userManagementAppFileRepository: UserManagementAppFileRepository);
    generateZipForNomineeDocuments(obj: any, options: Options): Promise<any>;
    generateNomineeDocument(orderItem: OrderItem, options?: Options): Promise<unknown>;
    private headers_dbf;
    private createEmptyRecord;
}
