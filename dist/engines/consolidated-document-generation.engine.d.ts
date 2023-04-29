import { ConsolidatedDocumentRepository, IStorageService, TransactionFeedLogRepository, KarvyAnnexureFeedRepository, AccountRepository, UserManagementAppFileRepository, OrderItemRepository, OrderRepository } from 'common';
import { Options } from '@loopback/repository';
export declare class ConsolidatedDocumentGenerationEngine {
    private consolidatedDocumentRepository;
    private transactionFeedLogRepository;
    private karvyAnnexureFeedRepository;
    private accountRepository;
    private orderItemRepository;
    private fileStorageService;
    private userManagementAppFileRepository;
    private orderRepository;
    constructor(consolidatedDocumentRepository: ConsolidatedDocumentRepository, transactionFeedLogRepository: TransactionFeedLogRepository, karvyAnnexureFeedRepository: KarvyAnnexureFeedRepository, accountRepository: AccountRepository, orderItemRepository: OrderItemRepository, fileStorageService: IStorageService, userManagementAppFileRepository: UserManagementAppFileRepository, orderRepository: OrderRepository);
    generateZipForDocuments(accountIds: Array<number>, rtaId: number, options: Options): Promise<unknown>;
}
