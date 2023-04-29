/// <reference types="express" />
/// <reference types="node" />
import { Count, DataObject, Filter, FilterExcludingWhere, Options, Where } from '@loopback/repository';
import { UserManagementAppFile, UserManagementAppFileRelations, UserManagementAppFileRepository, AccountRepository, IStorageService, DocumentUploadRepository, MandateRepository, BankAccountRepository, InvestorDetailsRepository } from 'common';
import { Request, Response } from '@loopback/rest';
declare type ContainerFilter = {
    containerName: string;
    originalFileName: string;
};
export declare class UserManagementAppFileFacade {
    private userManagementAppFileRepository;
    private accountRepository;
    private fileStorageService;
    private documentUploadRepository;
    private mandateRepository;
    private bankAccountRepository;
    private investorDetailsRepository;
    constructor(userManagementAppFileRepository: UserManagementAppFileRepository, accountRepository: AccountRepository, fileStorageService: IStorageService, documentUploadRepository: DocumentUploadRepository, mandateRepository: MandateRepository, bankAccountRepository: BankAccountRepository, investorDetailsRepository: InvestorDetailsRepository);
    create(entity: DataObject<UserManagementAppFile>, options?: Options): Promise<UserManagementAppFile>;
    createAll(entities: DataObject<UserManagementAppFile>[], options?: Options): Promise<UserManagementAppFile[]>;
    save(entity: UserManagementAppFile, options?: Options): Promise<UserManagementAppFile>;
    find(filter?: Filter<UserManagementAppFile>, options?: Options): Promise<(UserManagementAppFile & UserManagementAppFileRelations)[]>;
    findOne(filter?: Filter<UserManagementAppFile>, options?: Options): Promise<(UserManagementAppFile & UserManagementAppFileRelations) | null>;
    findById(id: number, filter?: FilterExcludingWhere<UserManagementAppFile>, options?: Options): Promise<UserManagementAppFile & UserManagementAppFileRelations>;
    update(entity: UserManagementAppFile, options?: Options): Promise<void>;
    delete(entity: UserManagementAppFile, options?: Options): Promise<void>;
    updateAll(data: DataObject<UserManagementAppFile>, where?: Where<UserManagementAppFile>, options?: Options): Promise<Count>;
    updateById(id: number, data: DataObject<UserManagementAppFile>, options?: Options): Promise<void>;
    replaceById(id: number, data: DataObject<UserManagementAppFile>, options?: Options): Promise<void>;
    deleteAll(where?: Where<UserManagementAppFile>, options?: Options): Promise<Count>;
    deleteById(id: number, options?: Options): Promise<void>;
    count(where?: Where<UserManagementAppFile>, options?: Options): Promise<Count>;
    exists(id: number, options?: Options): Promise<boolean>;
    getContainerDetails(containerDetails: ContainerFilter): Promise<object>;
    uploadDocument(accountId: number, docType: number, request?: Request, response?: Response): Promise<object>;
    userManagementDownloadFile(containerName: string | any, fileName: string | any, request?: Request, response?: Response): Promise<any>;
    downloadMultipleuserManagementDownloadFile(containerFilter: any): Promise<Buffer>;
    userManagementAppFileMappingDetails(filter: any, filterObject: any, options: Options): Promise<any>;
}
export {};
