"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsolidatedDocumentGenerationEngine = void 0;
const tslib_1 = require("tslib");
const bluebird_1 = (0, tslib_1.__importDefault)(require("bluebird"));
const underscore_1 = (0, tslib_1.__importDefault)(require("underscore"));
const core_1 = require("@loopback/core");
const common_1 = require("common");
const repository_1 = require("@loopback/repository");
const jszip_1 = (0, tslib_1.__importDefault)(require("jszip"));
const moment_1 = (0, tslib_1.__importDefault)(require("moment"));
const app_constant_1 = (0, tslib_1.__importDefault)(require("common/dist/constants/app-constant"));
const dbf = require('dbf');
var PDFImage = require('pdf-image').PDFImage;
const path_1 = (0, tslib_1.__importDefault)(require("path"));
const fs_1 = (0, tslib_1.__importDefault)(require("fs"));
const util_1 = require("util");
const readFile = (0, util_1.promisify)(fs_1.default.readFile);
const fsExtra = (0, tslib_1.__importStar)(require("fs-extra"));
const CAMS_ARN = 'ARN-0005';
let ConsolidatedDocumentGenerationEngine = class ConsolidatedDocumentGenerationEngine {
    constructor(consolidatedDocumentRepository, transactionFeedLogRepository, karvyAnnexureFeedRepository, accountRepository, orderItemRepository, fileStorageService, userManagementAppFileRepository, orderRepository) {
        this.consolidatedDocumentRepository = consolidatedDocumentRepository;
        this.transactionFeedLogRepository = transactionFeedLogRepository;
        this.karvyAnnexureFeedRepository = karvyAnnexureFeedRepository;
        this.accountRepository = accountRepository;
        this.orderItemRepository = orderItemRepository;
        this.fileStorageService = fileStorageService;
        this.userManagementAppFileRepository = userManagementAppFileRepository;
        this.orderRepository = orderRepository;
    }
    async generateZipForDocuments(accountIds, rtaId, options) {
        const methodName = 'generateZipForDocuments';
        return new Promise((resolve, reject) => {
            let accounts, zip;
            const accountWisetiffFiles = [];
            let zipPath = '';
            let accountZipFolderName, accountWiseZipFolder, zipContainerFileName;
            common_1.LoggingUtils.debug('1 fetching records and files', methodName);
            let orderData = [];
            this.orderRepository.find({
                where: {
                    accountId: {
                        inq: accountIds
                    },
                    isActive: true
                }
            }, options)
                .then((data) => {
                orderData = data;
                return this.orderItemRepository
                    .find({
                    where: {
                        rtaId: rtaId,
                        txnFeedLogId: {
                            neq: null
                        }
                    }
                }, options);
            })
                .then((orderItems) => {
                if (!orderItems || !orderItems.length) {
                    common_1.LoggingUtils.debug('No orders found for accounts! ', methodName);
                    // add logs
                    return reject({ success: false });
                }
                common_1.LoggingUtils.debug('Fetched records order item', methodName);
                let accountIds = [];
                let uniqAccountIds = [];
                orderItems.forEach(oiData => {
                    let relavantOrder = underscore_1.default.find(orderData, ele => { return oiData.orderId === ele.id; });
                    if (oiData.orderId && relavantOrder && relavantOrder.id && relavantOrder.accountId) {
                        accountIds.push(relavantOrder.accountId);
                    }
                });
                return (uniqAccountIds = underscore_1.default.uniq(accountIds));
            })
                .then(uniqAccountIds => {
                if (!uniqAccountIds || !uniqAccountIds.length) {
                    common_1.LoggingUtils.debug('No account found! ', methodName);
                    return reject(new common_1.RestError(400, `{success: false}`));
                }
                this.accountRepository
                    .find({
                    where: {
                        id: {
                            inq: uniqAccountIds
                        }
                    },
                    include: [
                        {
                            relation: 'accountAppFileMapping',
                            scope: {
                                where: {
                                    isActive: true
                                },
                                include: [
                                    {
                                        relation: 'userManagementAppFile'
                                    }
                                ]
                            }
                        },
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
                            relation: 'secondaryHolder',
                            scope: {
                                include: [
                                    {
                                        relation: 'investorDetails'
                                    }
                                ]
                            }
                        },
                        {
                            relation: 'tertiaryHolder',
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
                                where: {
                                    accountId: {
                                        inq: uniqAccountIds
                                    },
                                    isActive: true
                                },
                                include: [
                                    // {
                                    //   relation: 'chequeImageFile'
                                    // },
                                    {
                                        relation: 'bankBranch',
                                        scope: {
                                            include: [
                                                {
                                                    relation: 'bank'
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }, options)
                    //--- fetching details from consolidated dcouments
                    .then(accountInstances => {
                    accounts = accountInstances;
                    if (accountInstances.length === 0) {
                        common_1.LoggingUtils.debug('2 no records and files found', methodName);
                        Promise.reject(new common_1.RestError(400, `Accounts Details not found !`, { systemcode: 1368 }));
                    }
                    return bluebird_1.default.map(accountInstances, (accountDetails, index) => {
                        var _a;
                        common_1.LoggingUtils.debug('3 fetching files', methodName);
                        if (!accountDetails.primaryHolder &&
                            !accountDetails.primaryHolder.name &&
                            !accountDetails.primaryHolder.investorDetails &&
                            !accountDetails.primaryHolder.investorDetails.panCardNumber) {
                            common_1.LoggingUtils.debug('4 no files', methodName);
                            return Promise.resolve();
                        }
                        else {
                            if (accountDetails && accountDetails.accountAppFileMapping && accountDetails.accountAppFileMapping.length !== 0) {
                                common_1.LoggingUtils.debug('5 account app file present', methodName);
                                const userManagementAppFile = (_a = accountDetails === null || accountDetails === void 0 ? void 0 : accountDetails.accountAppFileMapping[0]) === null || _a === void 0 ? void 0 : _a.userManagementAppFile;
                                if (userManagementAppFile) {
                                    common_1.LoggingUtils.debug('6 returning files ', methodName);
                                    return userManagementAppFile;
                                }
                            }
                        }
                    });
                })
                    // ---- getting list of file
                    .then((generatedAPPFiles) => {
                    if (generatedAPPFiles && generatedAPPFiles.length <= 0) {
                        common_1.LoggingUtils.debug('7 files not found ', methodName);
                        Promise.reject(new common_1.RestError(400, 'App File not generated !', { systemcode: 1369 }));
                    }
                    common_1.LoggingUtils.debug('8 generating files ', methodName);
                    let files = [];
                    underscore_1.default.each(generatedAPPFiles, (file, index) => {
                        const currentAcccountFiles = [];
                        currentAcccountFiles.push(file);
                        files.push(currentAcccountFiles);
                    });
                    return Promise.resolve(files);
                })
                    //---- processing processing files
                    .then(allAccountsDocumentsTobeUploaded => {
                    common_1.LoggingUtils.debug('9 downloading files to server ', methodName);
                    return bluebird_1.default.map(allAccountsDocumentsTobeUploaded, (documentsTobeUploaded) => {
                        return bluebird_1.default.map(documentsTobeUploaded, (document) => {
                            let downloadPath = path_1.default.resolve(__dirname, '../../.temp/', document.name);
                            return common_1.ContainerUtils.downloadFileToServer(this.fileStorageService, document.containerName, document.name, downloadPath);
                        });
                    });
                })
                    //--- downloading file to service .temp
                    .then(async (accountWiseDownloadedFiles) => {
                    const promises = [];
                    for (let downloadedFiles of accountWiseDownloadedFiles) {
                        if (downloadedFiles.length < 0) {
                            common_1.LoggingUtils.debug('10 files not downloaded ', methodName);
                            Promise.reject(new common_1.RestError(400, `Files not downloaded`, { systemcode: 1370 }));
                        }
                        let fileExtention = path_1.default.extname(downloadedFiles[0]);
                        common_1.LoggingUtils.debug('11 extarcting file extension ', methodName);
                        if (fileExtention !== '.tif') {
                            common_1.LoggingUtils.debug('12 converting to tiff ', methodName);
                            let pdfImage = new PDFImage(downloadedFiles[0], {
                                combinedImage: true,
                                adjoinImage: true,
                                convertExtension: 'tiff',
                                graphicsMagick: true,
                                convertOptions: {
                                    '-colorspace': 'Gray',
                                    '-type': 'grayscale',
                                    '-quality': '100',
                                    '-density': '200',
                                    '-compress': 'LZW',
                                    '-depth': '4',
                                    '-units': 'PixelsPerInch'
                                }
                            });
                            promises.push(Promise.resolve(pdfImage.convertFile()));
                        }
                        else {
                            promises.push(Promise.resolve(null));
                        }
                    }
                    return Promise.all(promises).then(values => {
                        common_1.LoggingUtils.debug('13 files converted ', methodName);
                        return values;
                    });
                })
                    //--- conversion of file from pdf to tiff
                    .then(accountWiseTiffFilesArr => {
                    common_1.LoggingUtils.debug('14 mapping tiff files with acc ', methodName);
                    underscore_1.default.each(accountWiseTiffFilesArr, (tiffFilesArr, index) => {
                        const accountDetails = accounts[index];
                        accountWisetiffFiles.push(tiffFilesArr);
                    });
                    common_1.LoggingUtils.debug('15 resolving  accountwiseTiffArr', methodName);
                    return Promise.resolve(accountWiseTiffFilesArr);
                })
                    // ----  mapping tiff with account and pushing to global.
                    .then(() => {
                    common_1.LoggingUtils.debug('16 fetching from karvyAnexxurefeed ', methodName);
                    return this.karvyAnnexureFeedRepository.findOne({
                        where: {
                            and: [
                                {
                                    createdDate: {
                                        gte: (0, moment_1.default)().startOf('day')
                                    }
                                },
                                {
                                    createdDate: {
                                        lte: (0, moment_1.default)().endOf('day')
                                    }
                                }
                            ]
                        },
                        order: ['id DESC'],
                        limit: 1
                    }, options);
                })
                    // fatch batch and sequence for karvay and annexure
                    .then(async (latestRecordKarvyAnnexure) => {
                    common_1.LoggingUtils.debug('17 calculating batch and sequence ', methodName);
                    const nextBatchNumber = ((latestRecordKarvyAnnexure || {}).batchNumber || 0) + 1;
                    let nextBatchSequenceNumber = 0; //(latestRecordKarvyAnnexure || {}).batchSequenceNumber || 0;
                    const karvyAnnexureFeedData = [];
                    zip = new jszip_1.default();
                    const zipFiles = [];
                    const karvyDbFileData = [];
                    common_1.LoggingUtils.debug('18 data collection for DFB files ', methodName);
                    let index = -1;
                    for (const accountDetails of accounts) {
                        index = index + 1;
                        // }
                        // _.each(accounts, (accountDetails, index) => {
                        const pancardHolders = [];
                        if (accountDetails.primaryHolder && accountDetails.primaryHolder.investorDetails.panCardNumber) {
                            pancardHolders.push({ type: '1', data: accountDetails.primaryHolder });
                        }
                        if (accountDetails.secondaryHolder && accountDetails.secondaryHolder.investorDetails.panCardNumber) {
                            pancardHolders.push({ type: '2', data: accountDetails.secondaryHolder });
                        }
                        if (accountDetails.tertiaryHolder && accountDetails.tertiaryHolder.investorDetails.panCardNumber) {
                            pancardHolders.push({ type: '3', data: accountDetails.tertiaryHolder });
                        }
                        let accIndex = -1;
                        for (const itempancardHolders of pancardHolders) {
                            const accountHolder = itempancardHolders.data;
                            accIndex = accIndex + 1;
                            // _.each(pancardHolders, async (accountHolder, accIndex) => {
                            const panCardNumber = accountHolder.investorDetails.panCardNumber;
                            const investorId = String(accountDetails.uniqueId).padStart(12, '0');
                            nextBatchSequenceNumber++;
                            const karvyAnnexure = {
                                batchNumber: nextBatchNumber,
                                batchSequenceNumber: nextBatchSequenceNumber,
                                accountId: accountDetails === null || accountDetails === void 0 ? void 0 : accountDetails.id
                            };
                            karvyAnnexureFeedData.push(karvyAnnexure);
                            function toBuffer(ab) {
                                var buffer = Buffer.from(ab);
                                var view = new Uint8Array(ab);
                                for (var i = 0; i < buffer.length; ++i) {
                                    buffer[i] = view[i];
                                }
                                return buffer;
                            }
                            if (rtaId === app_constant_1.default.RTA_KARVY) {
                                accountZipFolderName = `INA${app_constant_1.default.RTA_DOC_KFINTECH}${(0, moment_1.default)().format('YYYYMMDD')}_${panCardNumber}_${nextBatchNumber}`;
                                //accountWiseZipFolder = await zip.folder(accountZipFolderName);
                                //zipContainerFileName = `DOC_${AppConstant.ARN_RIA}${moment().format('DDMMYYYY')}`;
                                zipContainerFileName = `0005${(0, moment_1.default)().format('DDMMYY')}${String(nextBatchNumber).padStart(3, '0')}`;
                                let requiredFileds = {
                                    FIELD1: `${(0, moment_1.default)().format('DDMMYY')}${String(nextBatchNumber).padStart(3, '0')}`,
                                    FIELD2: `${(0, moment_1.default)().format('DDMMYY')}${String(nextBatchNumber).padStart(3, '0')}${nextBatchSequenceNumber}`,
                                    FIELD3: `0005${investorId}`,
                                    FIELD4: '',
                                    FIELD5: app_constant_1.default.BROKER_CODE,
                                    FIELD6: `${app_constant_1.default.ARN_RIA}`,
                                    FIELD7: '',
                                    FIELD8: '',
                                    FIELD9: accountHolder.name,
                                    FIELD10: itempancardHolders.type,
                                    FIELD11: 'N',
                                    FIELD12: 'ON',
                                    FIELD13: 'AOF',
                                    FIELD14: panCardNumber,
                                    FIELD15: investorId,
                                    FIELD16: 'N'
                                };
                                common_1.LoggingUtils.debug(requiredFileds, 'generateZipForDocuments');
                                karvyDbFileData.push(requiredFileds);
                                if (index === accounts.length - 1) {
                                    common_1.LoggingUtils.debug('19 dbf file created ', methodName);
                                    var buff = await dbf.structure(karvyDbFileData);
                                    await zip.file(`DOC_ARN0005${(0, moment_1.default)().format('DDMMYYYY')}.dbf`, toBuffer(buff.buffer));
                                    zipPath = await path_1.default.resolve(__dirname, '../../.temp/', zipContainerFileName);
                                    await this.karvyAnnexureFeedRepository.createAll(karvyAnnexureFeedData, options).catch(err => {
                                        common_1.LoggingUtils.error(err);
                                        // throw new Error(err);
                                    });
                                }
                            }
                            else if (rtaId === app_constant_1.default.RTA_CAMS) {
                                accountZipFolderName = `INV_${(0, moment_1.default)().format('YYYYMMDD')}_${panCardNumber}`;
                                accountWiseZipFolder = zip.folder(accountZipFolderName);
                                //zipContainerFileName = `Text_${AppConstant.ARN_RIA}${moment().format('DDMMYYYY')}`;
                                zipContainerFileName = `DOC_${app_constant_1.default.RTA_DOC_CAMS}_${(0, moment_1.default)().format('DDMMYYYYHHmmss')}`;
                                let requiredFileds = {
                                    FIELD1: CAMS_ARN,
                                    FIELD2: panCardNumber,
                                    FIELD3: accountHolder.name,
                                    FIELD4: 'ALL',
                                    FIELD5: `${CAMS_ARN}$${panCardNumber}$ALL`,
                                    FIELD6: ''
                                };
                                let documentName = `Text_${(0, moment_1.default)().format('YYYYMMDD')}_${panCardNumber}`;
                                var buff = dbf.structure([requiredFileds]);
                                zipPath = path_1.default.resolve(__dirname, '../../.temp/', zipContainerFileName);
                                accountWiseZipFolder.file(documentName + `.dbf`, toBuffer(buff.buffer));
                            }
                            common_1.LoggingUtils.debug('20 reading tiff files ', methodName);
                            const tiffFiles = accountWisetiffFiles[index];
                            let fileName = rtaId === 1
                                ? `0005${investorId}.tif`
                                : rtaId === 2
                                    ? `${CAMS_ARN}$${panCardNumber}$ALL.tif`
                                    : '';
                            let filesData = await fs_1.default.readFileSync(tiffFiles);
                            if (rtaId === app_constant_1.default.RTA_KARVY) {
                                await zip.file(fileName, filesData);
                            }
                            else {
                                await accountWiseZipFolder.file(fileName, filesData);
                            }
                        }
                    }
                    return true;
                })
                    .then(() => {
                    zip
                        .generateNodeStream({ type: 'nodebuffer', streamFiles: true })
                        .pipe(fs_1.default.createWriteStream(zipPath + '.zip'))
                        .on('finish', async () => {
                        const containerFileName = zipContainerFileName + `.zip`;
                        const inputFilePath = path_1.default.resolve(__dirname, `../../.temp/${containerFileName}`);
                        common_1.LoggingUtils.debug('22 uploading to container ', methodName);
                        const zipUploaded = await common_1.ContainerUtils.uploadFileFromServer(this.fileStorageService, common_1.FileStorageContainerConfig.getGcpContainerName('rtaZipDoc'), containerFileName, inputFilePath);
                        this.fileStorageService.getFile(common_1.FileStorageContainerConfig.getGcpContainerName('rtaZipDoc'), containerFileName, async (err, reply) => {
                            if (err) {
                                reject(err);
                            }
                            common_1.LoggingUtils.debug('Logging User Management AppFile', reply);
                            let fileObj = {
                                containerName: common_1.FileStorageContainerConfig.getGcpContainerName('rtaZipDoc'),
                                path: reply.name,
                                originalFileName: reply.name,
                                name: reply.name,
                                size: reply.size,
                                extension: 'zip',
                                mimeType: 'application/zip',
                                checksum: zipUploaded.checksum
                            };
                            const zipFile = await this.userManagementAppFileRepository.create(fileObj, options);
                            common_1.LoggingUtils.debug('24 app file entry done ', methodName);
                            await this.consolidatedDocumentRepository.updateAll({ status: common_1.Option.GLOBALOPTIONS.CONSOLIDATEDDOCUMENTSTATUS.generated.value,
                                generatedDate: new Date(),
                                appFileId: zipFile.id }, {
                                isActive: true,
                                accountId: {
                                    inq: accountIds
                                },
                                rtaId: rtaId
                            }, options);
                        });
                        common_1.LoggingUtils.debug('zip written.');
                        common_1.LoggingUtils.debug('23 unkink tmp files ', methodName);
                        fsExtra.emptyDirSync(path_1.default.resolve(__dirname, `../../.temp/`));
                        return Promise.resolve();
                    });
                })
                    .catch((error) => {
                    common_1.LoggingUtils.error(error, methodName);
                    return reject(error);
                });
            })
                .then(data => {
                return resolve({ success: true });
            })
                .catch((error) => {
                console.trace(error);
                common_1.LoggingUtils.error(error.message, methodName);
                return reject(error);
            });
        });
    }
};
ConsolidatedDocumentGenerationEngine = (0, tslib_1.__decorate)([
    (0, core_1.injectable)({ scope: core_1.BindingScope.APPLICATION }),
    (0, tslib_1.__param)(0, (0, repository_1.repository)(common_1.ConsolidatedDocumentRepository)),
    (0, tslib_1.__param)(1, (0, repository_1.repository)(common_1.TransactionFeedLogRepository)),
    (0, tslib_1.__param)(2, (0, repository_1.repository)(common_1.KarvyAnnexureFeedRepository)),
    (0, tslib_1.__param)(3, (0, repository_1.repository)(common_1.AccountRepository)),
    (0, tslib_1.__param)(4, (0, repository_1.repository)(common_1.OrderItemRepository)),
    (0, tslib_1.__param)(5, (0, core_1.inject)('services.fileStorageComponent')),
    (0, tslib_1.__param)(6, (0, repository_1.repository)(common_1.UserManagementAppFileRepository)),
    (0, tslib_1.__param)(7, (0, repository_1.repository)(common_1.OrderRepository)),
    (0, tslib_1.__metadata)("design:paramtypes", [common_1.ConsolidatedDocumentRepository,
        common_1.TransactionFeedLogRepository,
        common_1.KarvyAnnexureFeedRepository,
        common_1.AccountRepository,
        common_1.OrderItemRepository, Object, common_1.UserManagementAppFileRepository,
        common_1.OrderRepository])
], ConsolidatedDocumentGenerationEngine);
exports.ConsolidatedDocumentGenerationEngine = ConsolidatedDocumentGenerationEngine;
//# sourceMappingURL=consolidated-document-generation.engine.js.map