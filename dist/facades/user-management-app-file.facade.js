"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserManagementAppFileFacade = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const common_1 = require("common");
const util_1 = require("util");
const bluebird_1 = (0, tslib_1.__importDefault)(require("bluebird"));
const path = (0, tslib_1.__importStar)(require("path"));
const fs = (0, tslib_1.__importStar)(require("fs"));
const common_2 = require("common");
const jszip_1 = (0, tslib_1.__importDefault)(require("jszip"));
// All business logic goes inside Facade layer
let UserManagementAppFileFacade = class UserManagementAppFileFacade {
    constructor(userManagementAppFileRepository, accountRepository, fileStorageService, documentUploadRepository, mandateRepository, bankAccountRepository, investorDetailsRepository) {
        this.userManagementAppFileRepository = userManagementAppFileRepository;
        this.accountRepository = accountRepository;
        this.fileStorageService = fileStorageService;
        this.documentUploadRepository = documentUploadRepository;
        this.mandateRepository = mandateRepository;
        this.bankAccountRepository = bankAccountRepository;
        this.investorDetailsRepository = investorDetailsRepository;
    }
    async create(entity, options) {
        return this.userManagementAppFileRepository.create(entity, options);
    }
    async createAll(entities, options) {
        return this.userManagementAppFileRepository.createAll(entities, options);
    }
    async save(entity, options) {
        return this.userManagementAppFileRepository.save(entity, options);
    }
    async find(filter, options) {
        return this.userManagementAppFileRepository.find(filter, options);
    }
    async findOne(filter, options) {
        return this.userManagementAppFileRepository.findOne(filter, options);
    }
    async findById(id, filter, options) {
        return this.userManagementAppFileRepository.findById(id, filter, options);
    }
    async update(entity, options) {
        return this.userManagementAppFileRepository.update(entity, options);
    }
    async delete(entity, options) {
        return this.userManagementAppFileRepository.delete(entity, options);
    }
    async updateAll(data, where, options) {
        return this.userManagementAppFileRepository.updateAll(data, where, options);
    }
    async updateById(id, data, options) {
        return this.userManagementAppFileRepository.updateById(id, data, options);
    }
    async replaceById(id, data, options) {
        return this.userManagementAppFileRepository.replaceById(id, data, options);
    }
    async deleteAll(where, options) {
        return this.userManagementAppFileRepository.deleteAll(where, options);
    }
    async deleteById(id, options) {
        return this.userManagementAppFileRepository.deleteById(id, options);
    }
    async count(where, options) {
        return this.userManagementAppFileRepository.count(where, options);
    }
    async exists(id, options) {
        return this.userManagementAppFileRepository.exists(id, options);
    }
    async getContainerDetails(containerDetails) {
        return new Promise((resolve, reject) => {
            if (!(containerDetails && containerDetails.containerName)) {
                return reject(new common_1.RestError(400, 'Container name cannot be blank or empty!', { systemcode: 1233 }));
            }
            let filter = {};
            if (containerDetails && containerDetails.containerName === common_1.FileStorageContainerConfig.getGcpContainerName('signatures')) {
                filter = {
                    where: {
                        containerName: containerDetails.containerName,
                        isActive: true
                    },
                    include: [
                        {
                            relation: 'investorDetailsForSignature',
                            scope: {
                                include: ['appUser']
                            }
                        }
                    ]
                };
            }
            else {
                return reject(new common_1.RestError(400, 'Please provide a valid container name!', { systemcode: 1233 }));
            }
            this.userManagementAppFileRepository
                .find(filter)
                .then((responseData) => {
                return resolve(responseData);
            })
                .catch((err) => {
                common_1.LoggingUtils.error(err);
                return reject(err);
            });
        });
    }
    async uploadDocument(accountId, docType, request, response) {
        const documentUploadType = {
            [common_1.Option.GLOBALOPTIONS.DOCUMENTUPLOADTYPE.pancards.value]: {
                containerName: 'pancards',
                columnName: 'fk_id_pan_image_file',
                dbModelName: 'panImageFileId',
                tableNames: ['investorDetails']
            },
            [common_1.Option.GLOBALOPTIONS.DOCUMENTUPLOADTYPE.kyc.value]: {
                containerName: 'kyc',
                columnName: 'fk_id_kyc_image_file',
                dbModelName: 'kycImageFileId',
                tableNames: ['investorDetails']
            },
            [common_1.Option.GLOBALOPTIONS.DOCUMENTUPLOADTYPE.signatures.value]: {
                containerName: 'signatures',
                columnName: 'fk_id_signature_image_file',
                dbModelName: 'signatureImageFileId',
                tableNames: ['investorDetails']
            },
            [common_1.Option.GLOBALOPTIONS.DOCUMENTUPLOADTYPE.relationshipdocuments.value]: {
                containerName: 'relationshipdocuments',
                columnName: 'fk_id_rel_document_file',
                dbModelName: 'relationshipDocumentImageFileId',
                tableNames: ['investorDetails']
            },
            [common_1.Option.GLOBALOPTIONS.DOCUMENTUPLOADTYPE.cheques.value]: {
                containerName: 'cheques',
                bankAccountColumnName: 'fk_id_cheque_image_file',
                dbModelName: 'chequeImageFileId',
                tableNames: ['bankAccount']
            },
            // [Option.GLOBALOPTIONS.DOCUMENTUPLOADTYPE.aadharback.value]: {
            //   containerName: 'aadharback',
            //   columnName: 'fk_id_aadhar_back_image_file',
            //   dbModelName: 'aadharBackImageFileId',
            //   tableNames: ['kycEntryLog']
            // },
            // [Option.GLOBALOPTIONS.DOCUMENTUPLOADTYPE.aadharfront.value]: {
            //   containerName: 'aadharfront',
            //   columnName: 'fk_id_aadhar_front_image_file',
            //   dbModelName: 'aadharFrontImageFileId',
            //   tableNames: ['kycEntryLog']
            // },
            [common_1.Option.GLOBALOPTIONS.DOCUMENTUPLOADTYPE.aof.value]: {
                containerName: 'aof',
                columnName: 'fk_id_file',
                dbModelName: 'userManagementAppFileId',
                tableNames: ['documentUpload']
            },
            [common_1.Option.GLOBALOPTIONS.DOCUMENTUPLOADTYPE.mandates.value]: {
                containerName: 'mandates',
                columnName: 'fk_id_file',
                dbModelName: 'userManagementAppFileId',
                tableNames: ['mandate']
            }
        };
        let file_paths = [];
        return new Promise((resolve, reject) => {
            let accountDetails;
            const documentType = documentUploadType[docType] || {};
            const container = common_1.FileStorageContainerConfig.getGcpContainerName(documentType.containerName);
            const tablesTobeUpdated = documentType.tableNames;
            const dbModelName = documentType.dbModelName;
            this.accountRepository
                .findOne({
                where: {
                    id: accountId
                },
                include: [
                    {
                        relation: 'primaryHolder',
                        scope: {
                            include: [
                                {
                                    relation: 'investorDetails'
                                }
                            ]
                        }
                    },
                    {
                        relation: 'bankAccounts',
                        scope: {
                            include: [
                                {
                                    relation: 'mandates'
                                }
                            ]
                        }
                    }
                ]
            })
                .then(result => {
                accountDetails = result;
                if (!accountDetails) {
                    return Promise.reject(new common_1.RestError(404, `Account not found !`, { systemcode: 1086 }));
                }
                const uploadPromise = (0, util_1.promisify)(this.fileStorageService.upload);
                // file upload.
                return uploadPromise(container, request, response, {}).then((data) => {
                    if (!data) {
                        return Promise.reject(new common_1.RestError(400, 'File not uploaded', { systemcode: 1026 }));
                    }
                    return data;
                });
            })
                .then((data) => common_1.ContainerUtils.checkMimeType(this.fileStorageService, data, common_1.MimeTypesConfig.MimeTypes.png.name))
                .then(async (filesData) => {
                if (!(filesData === null || filesData === void 0 ? void 0 : filesData.files) || Object.keys(filesData.files).length == 0) {
                    return Promise.reject(new common_1.RestError(404, `No files found!`, { systemcode: 1027 }));
                }
                else {
                    const file = filesData.files.file[0];
                    const downloadFile = await common_1.ContainerUtils.downloadFileToServer(this.fileStorageService, container, file.name, path.resolve(__dirname, '../../.tmp/', file.name));
                    file_paths.push(downloadFile);
                    const content = await fs.promises.readFile(downloadFile);
                    const fileChecksum = await common_2.CryptoUtils.generateFileChecksum(content);
                    const isValidFileType = await common_1.ContainerUtils.validateFileType(downloadFile, common_1.MimeTypesConfig.MimeTypes.msExcel.possibleExtensions, content);
                    await fs.promises.unlink(downloadFile);
                    if (!isValidFileType) {
                        return Promise.reject(new common_1.RestError(465, "The file format is invalid. Please upload the file in correct format.", { systemcode: 1008 }));
                    }
                    return this.userManagementAppFileRepository.create({
                        containerName: container,
                        path: file.name,
                        originalFileName: file.originalFilename,
                        name: file.name,
                        size: file.size,
                        extension: file.name.split('.')[file.name.split('.').length - 1],
                        mimeType: file.type,
                        checksum: fileChecksum
                    });
                }
            })
                .then(appFile => {
                if (appFile) {
                    return bluebird_1.default.map(tablesTobeUpdated, (tableName) => {
                        var _a;
                        if (accountDetails && tableName === 'bankAccount') {
                            const bankAccounts = accountDetails === null || accountDetails === void 0 ? void 0 : accountDetails.bankAccounts;
                            let bankAccountInstance = bankAccounts && bankAccounts[0];
                            return this.bankAccountRepository.updateById(bankAccountInstance === null || bankAccountInstance === void 0 ? void 0 : bankAccountInstance.id, { chequeImageFileId: appFile.id });
                        }
                        else if (accountDetails && tableName === 'investorDetails') {
                            const investorDetails = (_a = accountDetails === null || accountDetails === void 0 ? void 0 : accountDetails.primaryHolder) === null || _a === void 0 ? void 0 : _a.investorDetails;
                            return this.investorDetailsRepository.updateById(investorDetails === null || investorDetails === void 0 ? void 0 : investorDetails.id, {
                                [dbModelName]: appFile.id
                            });
                        }
                        //@todo will implement after dependency clearence
                        // else if (tableName === 'documentUpload') {
                        //   return Bluebird.map([AppConstant.RTA_KARVY, AppConstant.RTA_CAMS], (rta: any) => {
                        //     return this.documentUploadRepository
                        //       .findOne({
                        //         where: {
                        //           accountId: accountId, // map accountid
                        //           rtaId: rta
                        //         }
                        //       })
                        //       .then(documentUpload => {
                        //         if (documentUpload) {
                        //           documentUpload.aofFileId = appFile.id;
                        //           return documentUpload.save();
                        //         } else {
                        //           return this.documentUploadRepository.create({
                        //             accountId: accountId,
                        //             rtaId: rta,
                        //             documentSatus: Option.GLOBALOPTIONS.DOCUMENTSTATUS.pending.value,
                        //             aofFileId: appFile.id
                        //           });
                        //         }
                        //       });
                        //   });
                        // }
                        else if (tableName === 'mandate') {
                            return this.mandateRepository
                                .findOne({
                                where: {
                                    accountId: accountId
                                }
                            })
                                .then(accountMandate => {
                                if (accountMandate) {
                                    return this.mandateRepository.updateById(accountMandate === null || accountMandate === void 0 ? void 0 : accountMandate.id, { userManagementAppFileId: appFile.id });
                                }
                                else {
                                    return Promise.reject(new common_1.RestError(404, 'Mandate not found!', { systemcode: 1366 }));
                                }
                            });
                        }
                    });
                }
            })
                // .then(() => {
                //   return Operation.app.engines.DocumentUploadReplicator.replicateAllDocumentsForAccountAndRTA([accountId], [RTA.KARVY, RTA.CAMS]);
                // })
                .then(() => {
                resolve({ success: true });
            })
                .catch(async (err) => {
                common_1.LoggingUtils.error(err);
                for (let item of file_paths) {
                    // we are using existSync as exist is deprecated and this is the only function exist to check the Existing of the File
                    let val = fs.existsSync(item);
                    if (val)
                        await fs.promises.unlink(item);
                }
                return reject(err);
            });
        });
    }
    async userManagementDownloadFile(containerName, fileName, request, response) {
        try {
            const gcpContainerName = common_1.FileStorageContainerConfig.getGcpContainerName(containerName);
            if (containerName && fileName) {
                const result = await common_1.ContainerUtils.loadFileAsBuffer(this.fileStorageService, gcpContainerName, fileName);
                const fetchChecksum = await this.userManagementAppFileRepository.findOne({
                    where: {
                        containerName: gcpContainerName,
                        name: fileName,
                        isActive: true,
                    }
                });
                if (fetchChecksum && fetchChecksum.checksum) {
                    if (result.checksum == fetchChecksum.checksum) {
                        return result.file;
                    }
                    else {
                        return Promise.reject(new common_1.RestError(465, 'Checksum invalid', { systemcode: 1025 }));
                    }
                }
                else {
                    return Promise.reject(new common_1.RestError(465, 'Checksum not found', { systemcode: 1025 }));
                }
            }
            else {
                return Promise.reject(new common_1.RestError(404, 'Container name or file name is missing!', { systemcode: 1233 }));
            }
        }
        catch (err) {
            common_1.LoggingUtils.error(err);
            return Promise.reject();
        }
    }
    async downloadMultipleuserManagementDownloadFile(containerFilter) {
        try {
            let zip = new jszip_1.default();
            for (const container of containerFilter) {
                if (container.containerName && container.fileName) {
                    const result = await common_1.ContainerUtils.loadFileAsBuffer(this.fileStorageService, container.containerName, container.fileName);
                    const fetchChecksum = await this.userManagementAppFileRepository.findOne({
                        where: {
                            containerName: container.containerName,
                            name: container.fileName,
                            isActive: true,
                        }
                    });
                    if (fetchChecksum.checksum == result.checksum) {
                        zip.file(fetchChecksum.originalFileName, result.file);
                    }
                }
            }
            return zip.generateAsync({ type: 'nodebuffer' });
        }
        catch (err) {
            common_1.LoggingUtils.error(err);
            throw err;
        }
    }
    async userManagementAppFileMappingDetails(filter, filterObject, options) {
        return new Promise(async (resolve, reject) => {
            let count;
            let response = {};
            count = await this.userManagementAppFileRepository.count(filter, options);
            return this.userManagementAppFileRepository
                .find({ ...filter }, options)
                .then(async (result) => {
                let searchCriteria = new Map();
                let valueToSearch;
                filterObject.where.find((data) => {
                    searchCriteria.set(Object.keys(data)[0], Object.values(data)[0]);
                });
                let updatedArray = result.filter(data => {
                    if (searchCriteria.has('accountUniqueId')) {
                        if (data.investorDetailsForSignature &&
                            data.investorDetailsForSignature.appUser &&
                            data.investorDetailsForSignature.appUser.primaryAccounts &&
                            data.investorDetailsForSignature.appUser.primaryAccounts.length &&
                            data.investorDetailsForSignature.appUser.primaryAccounts[0].uniqueId) {
                            valueToSearch = searchCriteria.get('accountUniqueId').toLowerCase();
                            if (!data.investorDetailsForSignature.appUser.primaryAccounts[0].uniqueId.toLowerCase().includes(valueToSearch)) {
                                return false;
                            }
                        }
                        else {
                            return false;
                        }
                    }
                    if (searchCriteria.has('accountName')) {
                        if (data.investorDetailsForSignature &&
                            data.investorDetailsForSignature.appUser &&
                            data.investorDetailsForSignature.appUser.primaryAccounts &&
                            data.investorDetailsForSignature.appUser.primaryAccounts.length &&
                            data.investorDetailsForSignature.appUser.primaryAccounts[0].name) {
                            valueToSearch = searchCriteria.get('accountName').toLowerCase();
                            if (!data.investorDetailsForSignature.appUser.primaryAccounts[0].name.toLowerCase().includes(valueToSearch)) {
                                return false;
                            }
                        }
                        else {
                            return false;
                        }
                    }
                    if (searchCriteria.has('email')) {
                        if (data.investorDetailsForSignature &&
                            data.investorDetailsForSignature.appUser &&
                            data.investorDetailsForSignature.appUser.email) {
                            valueToSearch = searchCriteria.get('email').toLowerCase();
                            if (!data.investorDetailsForSignature.appUser.email.toLowerCase().includes(valueToSearch)) {
                                return false;
                            }
                        }
                        else {
                            return false;
                        }
                    }
                    return true;
                });
                const data = updatedArray.slice(filterObject.offset, filterObject.limit + filterObject.offset);
                response = {
                    data: data,
                    count: updatedArray.length
                };
                return resolve(response);
            })
                .catch((error) => {
                common_1.LoggingUtils.error(error);
                return reject(error);
            });
        });
    }
};
UserManagementAppFileFacade = (0, tslib_1.__decorate)([
    (0, core_1.injectable)({ scope: core_1.BindingScope.APPLICATION }),
    (0, tslib_1.__param)(0, (0, repository_1.repository)(common_1.UserManagementAppFileRepository)),
    (0, tslib_1.__param)(1, (0, repository_1.repository)(common_1.AccountRepository)),
    (0, tslib_1.__param)(2, (0, core_1.inject)('services.fileStorageComponent')),
    (0, tslib_1.__param)(3, (0, repository_1.repository)(common_1.DocumentUploadRepository)),
    (0, tslib_1.__param)(4, (0, repository_1.repository)(common_1.MandateRepository)),
    (0, tslib_1.__param)(5, (0, repository_1.repository)(common_1.BankAccountRepository)),
    (0, tslib_1.__param)(6, (0, repository_1.repository)(common_1.InvestorDetailsRepository)),
    (0, tslib_1.__metadata)("design:paramtypes", [common_1.UserManagementAppFileRepository,
        common_1.AccountRepository, Object, common_1.DocumentUploadRepository,
        common_1.MandateRepository,
        common_1.BankAccountRepository,
        common_1.InvestorDetailsRepository])
], UserManagementAppFileFacade);
exports.UserManagementAppFileFacade = UserManagementAppFileFacade;
//# sourceMappingURL=user-management-app-file.facade.js.map