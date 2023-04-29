"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NomineeDocumentGenerationEngine = void 0;
const tslib_1 = require("tslib");
const bluebird_1 = (0, tslib_1.__importDefault)(require("bluebird"));
const underscore_1 = (0, tslib_1.__importDefault)(require("underscore"));
const core_1 = require("@loopback/core");
const common_1 = require("common");
const repository_1 = require("@loopback/repository");
const jszip_1 = (0, tslib_1.__importDefault)(require("jszip"));
const moment_timezone_1 = (0, tslib_1.__importDefault)(require("moment-timezone"));
const app_constant_1 = (0, tslib_1.__importDefault)(require("common/dist/constants/app-constant"));
var PDFImage = require('pdf-image').PDFImage;
const path_1 = (0, tslib_1.__importDefault)(require("path"));
const fs_1 = (0, tslib_1.__importDefault)(require("fs"));
const dbffile_1 = require("dbffile");
let NomineeDocumentGenerationEngine = class NomineeDocumentGenerationEngine {
    constructor(nomineeDocumentRepository, transactionFeedLogRepository, accountRepository, orderItemRepository, fileStorageService, userManagementAppFileRepository) {
        this.nomineeDocumentRepository = nomineeDocumentRepository;
        this.transactionFeedLogRepository = transactionFeedLogRepository;
        this.accountRepository = accountRepository;
        this.orderItemRepository = orderItemRepository;
        this.fileStorageService = fileStorageService;
        this.userManagementAppFileRepository = userManagementAppFileRepository;
    }
    async generateZipForNomineeDocuments(obj, options) {
        const methodName = 'generateZipForDocuments';
        // return new Promise((resolve, reject) => {
        return new Promise(async (resolve, reject) => {
            // resolve({})
            let startDate = obj.date ? (0, moment_timezone_1.default)(new Date(obj.date)).startOf('day') : (0, moment_timezone_1.default)().startOf('day');
            let endDate = obj.date ? (0, moment_timezone_1.default)(new Date(obj.date)).endOf('day') : (0, moment_timezone_1.default)().endOf('day');
            common_1.LoggingUtils.debug('1 fetching records and files', methodName);
            const transactionFeedLogWhere = {
                and: [
                    {
                        generatedDate: {
                            gte: startDate
                        }
                    },
                    {
                        generatedDate: {
                            lte: endDate
                        }
                    }
                ]
            };
            if (obj.rtaId) {
                transactionFeedLogWhere.rtaId = obj.rtaId;
            }
            this.transactionFeedLogRepository
                .find({
                where: transactionFeedLogWhere,
                include: [
                    {
                        relation: 'orderItems',
                        scope: {
                            include: [
                                {
                                    relation: 'paymentDetails',
                                    scope: {
                                        where: {
                                            paymentStatus: {
                                                inq: [
                                                    common_1.Option.GLOBALOPTIONS.PAYMENTSTATUS.successful.value,
                                                    common_1.Option.GLOBALOPTIONS.PAYMENTSTATUS.sentToPG.value,
                                                    common_1.Option.GLOBALOPTIONS.PAYMENTSTATUS.fundsSettled.value //to include transactions settled on 2nd and 4th Saturday
                                                ]
                                            }
                                        },
                                        include: [
                                            {
                                                relation: 'bankAccount',
                                                scope: {
                                                    include: [
                                                        {
                                                            relation: 'bankBranch',
                                                            scope: {
                                                                include: [
                                                                    {
                                                                        relation: 'bank'
                                                                    },
                                                                    {
                                                                        relation: 'address'
                                                                    }
                                                                ]
                                                            }
                                                        },
                                                        {
                                                            relation: 'bankAccountType'
                                                        },
                                                        {
                                                            relation: 'holdingType'
                                                        }
                                                    ]
                                                }
                                            }
                                        ]
                                    }
                                },
                                { relation: 'transaction' },
                                { relation: 'systematicMethod' },
                                { relation: 'serviceProviderAccount' },
                                { relation: 'transactionType' },
                                {
                                    relation: 'instrument',
                                    scope: {
                                        where: obj.serviceProviderId ? { serviceProviderId: obj.serviceProviderId } : {},
                                        include: [
                                            {
                                                relation: 'serviceProvider',
                                                scope: {
                                                    include: [
                                                        {
                                                            relation: 'bankBranch',
                                                            scope: {
                                                                include: [{ relation: 'bank' }]
                                                            }
                                                        },
                                                        {
                                                            relation: 'rta'
                                                        }
                                                    ]
                                                }
                                            },
                                            { relation: 'mutualFundDetails' }
                                        ]
                                    }
                                },
                                {
                                    relation: 'secondaryInstrument',
                                    scope: {
                                        include: [
                                            {
                                                relation: 'serviceProvider'
                                            },
                                            { relation: 'mutualFundDetails' }
                                        ]
                                    }
                                },
                                {
                                    relation: 'order',
                                    scope: {
                                        where: {
                                            isActive: true
                                        },
                                        include: [
                                            {
                                                relation: 'account',
                                                scope: {
                                                    where: obj.accountId ? { id: obj.accountId } : {},
                                                    include: [
                                                        {
                                                            relation: 'bankAccounts',
                                                            scope: {
                                                                where: {
                                                                    isDefault: true //@todo - need to check this wrt Delta app
                                                                },
                                                                include: [
                                                                    {
                                                                        relation: 'bankAccountType'
                                                                    },
                                                                    {
                                                                        relation: 'bankBranch',
                                                                        scope: {
                                                                            include: [
                                                                                {
                                                                                    relation: 'bank'
                                                                                },
                                                                                {
                                                                                    relation: 'address' //@todo - need to check this wrt Delta app
                                                                                }
                                                                            ]
                                                                        }
                                                                    },
                                                                    {
                                                                        relation: 'holdingType'
                                                                    }
                                                                ]
                                                            }
                                                        },
                                                        {
                                                            relation: 'primaryHolder',
                                                            scope: {
                                                                include: [
                                                                    {
                                                                        relation: 'investorDetails',
                                                                        scope: {
                                                                            include: [
                                                                                {
                                                                                    relation: 'permanentAddress',
                                                                                    scope: {
                                                                                        include: [{ relation: 'state' }]
                                                                                    }
                                                                                },
                                                                                {
                                                                                    relation: 'overseesAddress',
                                                                                    scope: {
                                                                                        include: [{ relation: 'country' }]
                                                                                    }
                                                                                },
                                                                                { relation: 'occupation' },
                                                                                { relation: 'politicallyExposureType' },
                                                                                { relation: 'incomeSlab' },
                                                                                { relation: 'investorType' }
                                                                            ]
                                                                        }
                                                                    }
                                                                ]
                                                            }
                                                        },
                                                        {
                                                            relation: 'secondaryHolder',
                                                            scope: {
                                                                include: [
                                                                    {
                                                                        relation: 'investorDetails',
                                                                        scope: {
                                                                            include: [{ relation: 'politicallyExposureType' }, { relation: 'incomeSlab' }]
                                                                        }
                                                                    }
                                                                ]
                                                            }
                                                        },
                                                        {
                                                            relation: 'tertiaryHolder',
                                                            scope: {
                                                                include: [
                                                                    {
                                                                        relation: 'investorDetails',
                                                                        scope: {
                                                                            include: [{ relation: 'politicallyExposureType' }, { relation: 'incomeSlab' }]
                                                                        }
                                                                    }
                                                                ]
                                                            }
                                                        },
                                                        {
                                                            relation: 'primaryNominee',
                                                            scope: {
                                                                include: [{ relation: 'investorDetails' }]
                                                            }
                                                        },
                                                        { relation: 'secondaryNominee' },
                                                        { relation: 'tertiaryNominee' },
                                                        {
                                                            relation: 'nomineeGuardian',
                                                            scope: {
                                                                include: [
                                                                    {
                                                                        relation: 'investorDetails',
                                                                        scope: {
                                                                            include: [{ relation: 'investorType' }]
                                                                        }
                                                                    }
                                                                ]
                                                            }
                                                        },
                                                        {
                                                            relation: 'guardian',
                                                            scope: {
                                                                include: [
                                                                    {
                                                                        relation: 'investorDetails',
                                                                        scope: {
                                                                            include: [{ relation: 'politicallyExposureType' }, { relation: 'incomeSlab' }]
                                                                        }
                                                                    }
                                                                ]
                                                            }
                                                        },
                                                        { relation: 'primaryNomineeRelationship' },
                                                        { relation: 'secondaryNomineeRelationship' },
                                                        { relation: 'tertiaryNomineeRelationship' },
                                                        { relation: 'guardianRelationship' },
                                                        //{relation: 'nomineeGuardianRelationship'}, // not working
                                                        { relation: 'holdingType' },
                                                        { relation: 'distributor' },
                                                        {
                                                            relation: 'investorNominees',
                                                            scope: {
                                                                include: [
                                                                    {
                                                                        relation: 'appUser',
                                                                        scope: {
                                                                            include: [
                                                                                {
                                                                                    relation: 'investorDetails'
                                                                                }
                                                                            ]
                                                                        }
                                                                    },
                                                                    {
                                                                        relation: 'relationship'
                                                                    },
                                                                    {
                                                                        relation: 'address',
                                                                        scope: {
                                                                            include: [
                                                                                {
                                                                                    relation: 'state',
                                                                                    scope: {
                                                                                        include: [
                                                                                            {
                                                                                                relation: 'country'
                                                                                            }
                                                                                        ]
                                                                                    }
                                                                                }
                                                                            ]
                                                                        }
                                                                    }
                                                                    // {
                                                                    //   relation : 'account',
                                                                    //   scope : {
                                                                    //     include : [
                                                                    //       {
                                                                    //         relation : 'guardianRelationship'
                                                                    //       }
                                                                    //     ]
                                                                    //   }
                                                                    // },
                                                                ]
                                                            }
                                                        }
                                                    ]
                                                }
                                            }
                                        ]
                                    }
                                }
                            ],
                            where: {
                                and: [{ transactionTypeId: { inq: [1, 2] } }, { serviceProviderAccountId: null }, { isNomineeDocumentGenerated: false }]
                            }
                        }
                    }
                ]
            }, options)
                .then((transactionFeedLog) => {
                if (!transactionFeedLog || !transactionFeedLog.length) {
                    common_1.LoggingUtils.debug('No orders found for accounts! ', methodName);
                    // add logs
                    return reject({ success: false });
                }
                common_1.LoggingUtils.debug('Fetched records order item ', methodName);
                let promises = [];
                transactionFeedLog.forEach(tflData => {
                    if (tflData.orderItems) {
                        tflData.orderItems.forEach(oiData => {
                            if (oiData.order.account && oiData.instrument) {
                                promises.push(this.generateNomineeDocument(oiData, options));
                            }
                        });
                    }
                });
                return Promise.allSettled(promises);
                //    resolve({})
            })
                .then(data => {
                // fsExtra.emptyDirSync(path.resolve(__dirname, `../../.tmp/`));
                return resolve(data);
            })
                .catch(err => {
                common_1.LoggingUtils.error(err);
                return reject(err);
            });
        });
    }
    generateNomineeDocument(orderItem, options) {
        const methodName = 'generateZipForDocuments';
        let rtaId = orderItem.rtaId;
        let account = orderItem.order.accountId;
        let accounts, zip;
        const accountWisetiffFiles = [];
        let zipPath = '';
        let fileName = '';
        let filepaths = [];
        common_1.LoggingUtils.debug('data of orderItem', JSON.stringify({
            orderItem: orderItem.id,
            account: account
        }));
        let accountZipFolderName, accountWiseZipFolder, zipContainerFileName, doc_filename, zipContainerFileNameZip, nomineeDocument;
        return new Promise((resolve, reject) => {
            this.accountRepository
                .find({
                where: {
                    id: {
                        inq: [account]
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
                                    inq: [account]
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
                common_1.LoggingUtils.debug('account aof details', accountInstances);
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
                common_1.LoggingUtils.debug('data of generatedAPPFiles line 525', JSON.stringify({
                    orderItem: orderItem.id,
                    uniqueId: orderItem.uniqueId,
                    generatedAPPFiles: JSON.stringify(generatedAPPFiles),
                    account: account
                }));
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
                common_1.LoggingUtils.debug('data of files line 542', JSON.stringify({
                    orderItem: orderItem.id,
                    uniqueId: orderItem.uniqueId,
                    filess: JSON.stringify(files),
                    account: account
                }));
                return Promise.resolve(files);
            })
                //---- processing processing files
                .then(allAccountsDocumentsTobeUploaded => {
                common_1.LoggingUtils.debug('data of allAccountsDocumentsTobeUploaded line 552', JSON.stringify({
                    orderItem: orderItem.id,
                    uniqueId: orderItem.uniqueId,
                    filess: JSON.stringify(allAccountsDocumentsTobeUploaded),
                    account: account
                }));
                common_1.LoggingUtils.debug('9 downloading files to server ', methodName);
                return bluebird_1.default.map(allAccountsDocumentsTobeUploaded, (documentsTobeUploaded) => {
                    return bluebird_1.default.map(documentsTobeUploaded, (document) => {
                        let downloadPath = path_1.default.resolve(__dirname, '../../.tmp/', document.name + new Date().getTime());
                        return common_1.ContainerUtils.downloadFileToServer(this.fileStorageService, document.containerName, document.name, downloadPath);
                    });
                });
            })
                //--- downloading file to service .tmp
                .then(async (accountWiseDownloadedFiles) => {
                common_1.LoggingUtils.debug('data of accountWiseDownloadedFiles line 568', JSON.stringify({
                    orderItem: orderItem.id,
                    uniqueId: orderItem.uniqueId,
                    filess: JSON.stringify(accountWiseDownloadedFiles),
                    account: account
                }));
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
                        let pdfImage = await new PDFImage(downloadedFiles[0], {
                            combinedImage: true,
                            adjoinImage: true,
                            convertExtension: 'tiff',
                            graphicsMagick: true,
                            convertOptions: {
                                '-quality': '100',
                                '-units': 'PixelsPerInch',
                                '-density': '144',
                                '-compress': 'LZW'
                            }
                        });
                        filepaths.push(downloadedFiles[0]);
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
                common_1.LoggingUtils.debug('data of accountWiseTiffFilesArr line 611', JSON.stringify({
                    orderItem: orderItem.id,
                    uniqueId: orderItem.uniqueId,
                    filess: JSON.stringify(accountWiseTiffFilesArr),
                    account: account
                }));
                common_1.LoggingUtils.debug('14 mapping tiff files with acc ', methodName);
                underscore_1.default.each(accountWiseTiffFilesArr, (tiffFilesArr, index) => {
                    accountWisetiffFiles.push(tiffFilesArr);
                });
                common_1.LoggingUtils.debug('15 resolving  accountwiseTiffArr', methodName);
                common_1.LoggingUtils.debug('data of accountWisetiffFiles line 622', JSON.stringify({
                    orderItem: orderItem.id,
                    uniqueId: orderItem.uniqueId,
                    filess: JSON.stringify(accountWisetiffFiles),
                    account: account
                }));
                return Promise.resolve(accountWiseTiffFilesArr);
            })
                // ----  mapping tiff with account and pushing to global.
                // fatch batch and sequence for karvay and annexure
                .then(async () => {
                common_1.LoggingUtils.debug('17 calculating batch and sequence ', methodName);
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
                        pancardHolders.push(accountDetails.primaryHolder);
                    }
                    if (accountDetails.secondaryHolder && accountDetails.secondaryHolder.investorDetails.panCardNumber) {
                        pancardHolders.push(accountDetails.secondaryHolder);
                    }
                    if (accountDetails.tertiaryHolder && accountDetails.tertiaryHolder.investorDetails.panCardNumber) {
                        pancardHolders.push(accountDetails.tertiaryHolder);
                    }
                    let accIndex = -1;
                    for (const accountHolder of pancardHolders) {
                        accIndex = accIndex + 1;
                        // _.each(pancardHolders, async (accountHolder, accIndex) => {
                        const panCardNumber = accountHolder.investorDetails.panCardNumber;
                        let startDate = (0, moment_timezone_1.default)().startOf('day');
                        let endDate = (0, moment_timezone_1.default)().endOf('day');
                        let data = await this.nomineeDocumentRepository.count({
                            and: [
                                {
                                    generatedDate: {
                                        gte: startDate
                                    }
                                },
                                {
                                    generatedDate: {
                                        lte: endDate
                                    }
                                }
                            ]
                        }, options).catch((err) => {
                            reject(err);
                        });
                        const count = String(data.count + 1).padStart(4, '0');
                        nomineeDocument = await this.nomineeDocumentRepository.create({
                            isActive: false,
                            accountId: orderItem.order.accountId,
                            rtaId: orderItem.rtaId,
                            generatedDate: new Date(),
                            serviceProviderId: orderItem.instrument.serviceProviderId,
                            remarks: `${orderItem.uniqueId}`
                        }, options);
                        if (rtaId === app_constant_1.default.RTA_KARVY) {
                            accountWiseZipFolder = zip;
                            zipContainerFileNameZip = `${orderItem.instrument.serviceProvider.primaryAMCCode}TRXN${count}`; // `AMCcodeTRXNNNN`; //`{}
                            zipContainerFileName = zipContainerFileNameZip + String(new Date().getTime());
                            zipPath = await path_1.default.resolve(__dirname, '../../.tmp/', zipContainerFileName);
                            doc_filename = `${orderItem.instrument.serviceProvider.primaryAMCCode}~0005~${orderItem.uniqueId}.tif`;
                        }
                        else if (rtaId === app_constant_1.default.RTA_CAMS) {
                            let headers = this.headers_dbf();
                            const record = this.createEmptyRecord();
                            accountZipFolderName = `NOM_${(0, moment_timezone_1.default)().format('DDMMYYYY')}_${panCardNumber}`;
                            accountWiseZipFolder = zip.folder(accountZipFolderName);
                            let documentName = `NOM_${(0, moment_timezone_1.default)().format('DDMMYYYY')}_${panCardNumber}.dbf`;
                            //zipContainerFileName = `Text_${AppConstant.ARN_RIA}${moment().format('DDMMYYYY')}`;
                            zipContainerFileNameZip = `${orderItem.instrument.serviceProvider.primaryAMCCode}TRXN${count}`;
                            zipContainerFileName = zipContainerFileNameZip + String(new Date().getTime());
                            const inputFilePath = path_1.default.resolve(__dirname, `../../.tmp/${String(new Date().getTime())}${documentName}`);
                            common_1.LoggingUtils.debug('step 1 - doc_name before DBF', JSON.stringify({
                                orderItem: orderItem.id,
                                transactionNumber: orderItem.uniqueId,
                                serviceProvider: orderItem.instrument.serviceProvider.primaryAMCCode,
                                inputFilePath: inputFilePath,
                                doc_filename: doc_filename,
                                zipContainerFileNameZip: zipContainerFileNameZip
                            }));
                            doc_filename = `FN$${orderItem.instrument.serviceProvider.primaryAMCCode}$${app_constant_1.default.ARN_USER_CODE}$${orderItem.uniqueId}.tif`;
                            record.AMC_CODE = orderItem.instrument.serviceProvider.primaryAMCCode;
                            record.USER_CODE = app_constant_1.default.ARN_USER_CODE;
                            record.USR_TRXNN = Number(orderItem.uniqueId);
                            record.PAN = panCardNumber;
                            record.FH_NAME = orderItem.order.account.primaryHolder.name;
                            record.DOC_FILEN = doc_filename.split(".")[0];
                            record.DOC_ID = '';
                            record.DOC_TYPE = 'NOM';
                            // var buff = dbf.structure([requiredFileds]);
                            await fs_1.default.promises.unlink(inputFilePath).catch(err => {
                                common_1.LoggingUtils.error(err, 'generateNomineeDocuments');
                            });
                            var buff_dbffile = await dbffile_1.DBFFile.create(inputFilePath, headers);
                            common_1.LoggingUtils.debug('step 2 - doc_name after DBF', JSON.stringify({
                                orderItem: orderItem.id,
                                transactionNumber: orderItem.uniqueId,
                                serviceProvider: orderItem.instrument.serviceProvider.primaryAMCCode,
                                inputFilePath: inputFilePath,
                                doc_filename: doc_filename,
                                zipContainerFileNameZip: zipContainerFileNameZip
                            }));
                            await buff_dbffile.appendRecords([record]);
                            const options = {
                                flags: 'wx',
                                encoding: 'utf8',
                                fd: null,
                                mode: 0o666,
                                autoClose: true
                            };
                            zipPath = path_1.default.resolve(__dirname, '../../.tmp/', zipContainerFileName);
                            let filesData = await fs_1.default.readFileSync(inputFilePath);
                            await zip.file(documentName, filesData);
                            filepaths.push(inputFilePath);
                        }
                        common_1.LoggingUtils.debug('20 reading tiff files ', methodName);
                        const tiffFiles = accountWisetiffFiles[index];
                        // fileName =
                        //   rtaId === 1
                        //     ? `${orderItem.instrument.serviceProvider.primaryAMCCode!}~0005~${orderItem.uniqueId!}.tif`
                        //     : rtaId === 2
                        //     ? `FN$${orderItem.instrument.serviceProvider.primaryAMCCode!}$${AppConstant.ARN_USER_CODE}$${orderItem.uniqueId!}.tif`
                        //     : '';
                        fileName = doc_filename ? doc_filename : '';
                        let filesData = await fs_1.default.readFileSync(tiffFiles);
                        await accountWiseZipFolder.file(fileName, filesData);
                        common_1.LoggingUtils.debug('step 3 - doc_name after Tiff', JSON.stringify({
                            orderItem: orderItem.id,
                            transactionNumber: orderItem.uniqueId,
                            serviceProvider: orderItem.instrument.serviceProvider.primaryAMCCode,
                            doc_filename: doc_filename,
                            zipContainerFileNameZip: zipContainerFileNameZip
                        }));
                        filepaths.push(tiffFiles);
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
                    const inputFilePath = path_1.default.resolve(__dirname, `../../.tmp/${containerFileName}`);
                    common_1.LoggingUtils.debug('22 uploading to container ', methodName);
                    const zipUploaded = await common_1.ContainerUtils.uploadFileFromServer(this.fileStorageService, common_1.FileStorageContainerConfig.getGcpContainerName('nomineedoc'), containerFileName, inputFilePath);
                    filepaths.push(inputFilePath);
                    await this.fileStorageService.getFile(common_1.FileStorageContainerConfig.getGcpContainerName('nomineedoc'), containerFileName, async (err, reply) => {
                        if (err) {
                            return err;
                        }
                        common_1.LoggingUtils.debug('Logging User Management AppFile', reply);
                        let fileObj = {
                            containerName: common_1.FileStorageContainerConfig.getGcpContainerName('nomineedoc'),
                            path: reply.name,
                            originalFileName: zipContainerFileNameZip + '.zip',
                            name: reply.name,
                            size: reply.size,
                            extension: 'zip',
                            mimeType: 'application/zip',
                            checksum: zipUploaded.checksum
                        };
                        const zipFile = await this.userManagementAppFileRepository.create(fileObj, options);
                        common_1.LoggingUtils.debug('24 app file entry done ', methodName);
                        await this.nomineeDocumentRepository.updateById(nomineeDocument.id, {
                            isActive: true,
                            status: common_1.Option.GLOBALOPTIONS.NOMINEEDOCUMENTSTATUS.pending.value,
                            aofFileName: fileName,
                            appFileId: zipFile.id,
                        }, options);
                        await this.orderItemRepository.updateById(orderItem.id, {
                            isNomineeDocumentGenerated: true
                        }, options);
                        common_1.LoggingUtils.debug('zip written.');
                        common_1.LoggingUtils.debug('23 unkink tmp files ', methodName);
                        for (let item of filepaths) {
                            await fs_1.default.promises.unlink(item).catch(err => {
                                common_1.LoggingUtils.error(err, 'generateNomineeDocuments');
                            });
                        }
                        // fsExtra.emptyDirSync(path.resolve(__dirname, `../../.tmp/`));
                        return resolve({ success: true });
                    });
                });
            })
                .catch((error) => {
                common_1.LoggingUtils.error(error, methodName);
                reject(error);
            });
        });
    }
    headers_dbf() {
        let headers = [
            { name: 'AMC_CODE', type: 'C', size: 3 },
            { name: 'USER_CODE', type: 'C', size: 10 },
            { name: 'USR_TRXNN', type: 'N', size: 15 },
            { name: 'PAN', type: 'C', size: 40 },
            { name: 'FH_NAME', type: 'C', size: 70 },
            { name: 'DOC_FILEN', type: 'C', size: 40 },
            { name: 'DOC_ID', type: 'C', size: 150 },
            { name: 'DOC_TYPE', type: 'C', size: 3 }
        ];
        return headers;
    }
    createEmptyRecord() {
        const record = {
            AMC_CODE: null,
            USER_CODE: null,
            USR_TRXNN: null,
            PAN: null,
            FH_NAME: 0,
            DOC_FILEN: null,
            DOC_ID: null,
            DOC_TYPE: null
        };
        return record;
    }
};
NomineeDocumentGenerationEngine = (0, tslib_1.__decorate)([
    (0, core_1.injectable)({ scope: core_1.BindingScope.APPLICATION }),
    (0, tslib_1.__param)(0, (0, repository_1.repository)(common_1.NomineeDocumentRepository)),
    (0, tslib_1.__param)(1, (0, repository_1.repository)(common_1.TransactionFeedLogRepository)),
    (0, tslib_1.__param)(2, (0, repository_1.repository)(common_1.AccountRepository)),
    (0, tslib_1.__param)(3, (0, repository_1.repository)(common_1.OrderItemRepository)),
    (0, tslib_1.__param)(4, (0, core_1.inject)('services.fileStorageComponent')),
    (0, tslib_1.__param)(5, (0, repository_1.repository)(common_1.UserManagementAppFileRepository)),
    (0, tslib_1.__metadata)("design:paramtypes", [common_1.NomineeDocumentRepository,
        common_1.TransactionFeedLogRepository,
        common_1.AccountRepository,
        common_1.OrderItemRepository, Object, common_1.UserManagementAppFileRepository])
], NomineeDocumentGenerationEngine);
exports.NomineeDocumentGenerationEngine = NomineeDocumentGenerationEngine;
//# sourceMappingURL=nominee-document-generation.engine.js.map