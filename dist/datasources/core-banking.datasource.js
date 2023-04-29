"use strict";
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreBankingDataSource = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const fs = (0, tslib_1.__importStar)(require("fs"));
const pwdDoPublishV2 = Buffer.from(process.env.USR_MGMT_DO_PUBLISH_EXTERNAL_ALERT_V2_PASSWORD, 'base64').toString('utf8');
const userIdDoPublishV2 = ((_a = process.env.USR_MGMT_DO_PUBLISH_EXTERNAL_ALERT_V2_USERID) !== null && _a !== void 0 ? _a : 'wmshlotp');
const dcodeDoPublishV2 = ((_b = process.env.USR_MGMT_DO_PUBLISH_EXTERNAL_ALERT_V2_DCODE) !== null && _b !== void 0 ? _b : 'WMSHLOTP');
const ornDoPublishV2 = ((_c = process.env.USR_MGMT_DO_PUBLISH_EXTERNAL_ALERT_V2_ORN) !== null && _c !== void 0 ? _c : '04123041220012');
const sslCrt = process.env.COMMON_DOMAIN_CERT ? fs.readFileSync(process.env.COMMON_DOMAIN_CERT, { encoding: 'utf8' }) : '';
const sslCrtKey = process.env.COMMON_DOMAIN_KEY ? fs.readFileSync(process.env.COMMON_DOMAIN_KEY, { encoding: 'utf8' }) : '';
const sslCa = process.env.COMMON_OBP_ROOT_CA ? fs.readFileSync(process.env.COMMON_OBP_ROOT_CA, { encoding: 'utf8' }) : '';
const config = {
    name: 'core_banking',
    connector: 'rest',
    baseUrl: process.env.USR_MGMT_CRBNK_DS_BASE_URL,
    crud: false,
    debug: true,
    options: {
        headers: {
            accepts: 'application/json',
            'content-type': 'application/json',
            'api-key': process.env.USR_MGMT_CRBNK_DS_API_KEY
        },
        agentOptions: {
            ca: sslCa,
            cert: sslCrt,
            key: sslCrtKey,
            ciphers: 'DEFAULT:@SECLEVEL=1'
        },
        strictSSL: false,
        timeout: 1200000,
        proxy: ''
    },
    operations: [
        {
            template: {
                method: 'POST',
                url: `/com.ofss.fc.cz.hdfc.obp.webservice/FetchCustomerAccountAmlFatcaDetailsRestWrapper/fetchCustomerAccountAmlFatcaDetails`,
                query: {},
                body: {
                    FetchCustomerAccountAmlFatcaDetailsRequestDTO: {
                        mobileNumber: '{mobileNumber}',
                        pan: '{pan}',
                        customerID: '{customerID}',
                        dob: '{dob}',
                        accountNumber: '',
                        isAMLDetailsRequired: 'Y',
                        isFATCADetailsRequired: 'Y',
                        isRelationshipRequired: 'N',
                        isDemogDetailsRequired: 'Y',
                        isAcctountDetailsRequired: 'Y'
                    },
                    sessionContext: {
                        channel: process.env.COMMON_API_CHANNEL,
                        userId: process.env.COMMON_API_CHANNEL_USER_ID,
                        externalReferenceNo: '{refNumber}',
                        bankCode: process.env.USR_MGMT_CRBNK_DS_FTCA_BANK_CODE,
                        transactionBranch: process.env.USR_MGMT_CRBNK_DS_FTCA_TRNSC_BRANCH
                    }
                }
            },
            functions: {
                fetchCustomerAccountAmlFatcaDetails: ['mobileNumber', 'pan', 'customerID', 'dob', 'refNumber']
            }
        },
        {
            template: {
                method: 'POST',
                url: `/com.ofss.fc.cz.hdfc.obp.webservice/DemographicDetailsInquiryRest/doDemographicDetailsInquiry`,
                query: {},
                body: {
                    DemographicDetailsInquiryDTO: {
                        customerId: '{customerId}'
                    },
                    sessionContext: {
                        channel: process.env.COMMON_API_CHANNEL,
                        bankCode: '08',
                        userId: process.env.COMMON_API_CHANNEL_USER_ID,
                        transactionBranch: '089999',
                        externalReferenceNo: '{externalReferenceNo}'
                    }
                }
            },
            functions: {
                doDemographicDetailsInquiry: [
                    'customerId',
                    'externalReferenceNo',
                ]
            }
        },
        {
            template: {
                method: 'POST',
                url: `/com.ofss.fc.cz.hdfc.obp.webservice/CASADetailBalanceInquiryRestService/CASADetailBalanceInquiryRestWrapper`,
                query: {},
                body: {
                    CASADetailBalanceInquiryRequestDTO: {
                        accountNo: '{accountNo}',
                        customerId: '',
                        partnerId: ''
                    },
                    sessionContext: {
                        bankCode: process.env.USR_MGMT_CRBNK_DS_CASA_BANK_CODE,
                        channel: process.env.COMMON_API_CHANNEL,
                        userId: process.env.COMMON_API_CHANNEL_USER_ID,
                        transactionBranch: process.env.USR_MGMT_CRBNK_DS_CASA_TRNSC_BRANCH,
                        externalReferenceNo: '{refNumber}',
                        transactingPartyCode: '50000012',
                        serviceCode: 'CHAPI10907',
                        userReferenceNumber: 'BALINQ001'
                    }
                }
            },
            functions: {
                fetchCASADetailBalanceInquiry: ['accountNo', 'refNumber']
            }
        },
        {
            template: {
                method: 'POST',
                url: `/com.ofss.fc.cz.hdfc.obp.webservice/GenerateOneTimePasswordRest/doGenerateOTPRest`,
                query: {},
                body: {
                    GenerateOTPRestRequestDTO: {
                        requestString: {
                            instanceId: process.env.GENERATE_OTP_INSTANCE_ID,
                            apiUser: process.env.GENERATE_OTP_API_USER,
                            forceNew: process.env.GENERATE_OTP_FORCE_NEW,
                            linkData: '{linkData}',
                            refNo: '{refNoGenerateOTP}',
                            messageHash: 'static:genpwdreq:06:{messageHash}'
                        },
                        headerParams: [
                            {
                                key: 'apiUser',
                                value: process.env.GENERATE_OTP_API_USER
                            },
                            {
                                key: 'apiKey',
                                value: process.env.GENERATE_OTP_API_KEY
                            }
                        ]
                    },
                    sessionContext: {
                        channel: process.env.COMMON_API_CHANNEL,
                        userId: process.env.COMMON_API_CHANNEL_USER_ID,
                        externalReferenceNo: '{refNumber}',
                        bankCode: process.env.USR_MGMT_CRBNK_DS_GNRT_OTP_BANK_CODE,
                        transactionBranch: process.env.USR_MGMT_CRBNK_DS_GNRT_OTP_TRNSC_BRANCH,
                        transactingPartyCode: '50000010'
                    }
                }
            },
            functions: {
                doGenerateOTPRest: ['refNumber', 'refNoGenerateOTP', 'messageHash', 'linkData']
            }
        },
        {
            template: {
                method: 'POST',
                url: `/com.ofss.fc.cz.hdfc.obp.webservice/VerifyOneTimePasswordRest/doVerifyOTPRest`,
                query: {},
                body: {
                    VerifyOTPRestRequestDTO: {
                        requestString: {
                            instanceId: process.env.GENERATE_OTP_INSTANCE_ID,
                            passwordValue: '{otp}',
                            apiUser: process.env.GENERATE_OTP_API_USER,
                            linkData: '{linkData}',
                            refNo: '{refNoGenerateOTP}',
                            txnId: '',
                            messageHash: 'static:verpwdreq:06:{messageHash}'
                        },
                        headerParams: [
                            {
                                key: 'apiUser',
                                value: process.env.GENERATE_OTP_API_USER
                            },
                            {
                                key: 'apiKey',
                                value: process.env.GENERATE_OTP_API_KEY
                            }
                        ]
                    },
                    sessionContext: {
                        channel: process.env.COMMON_API_CHANNEL,
                        bankCode: process.env.USR_MGMT_CRBNK_DS_VRFY_OTP_BANK_CODE,
                        userId: process.env.COMMON_API_CHANNEL_USER_ID,
                        transactionBranch: process.env.USR_MGMT_CRBNK_DS_VRFY_OTP_TRNSC_BRANCH,
                        transactingPartyCode: '50000010',
                        externalReferenceNo: '{refNumber}'
                    }
                }
            },
            functions: {
                doVerifyOTPRest: ['otp', 'refNumber', 'refNoGenerateOTP', 'messageHash', 'linkData']
            }
        },
        {
            template: {
                method: 'POST',
                url: `/ACLAxiom/PublishExternalAlertV2Rest/doPublishExternalAlertV2`,
                query: {},
                body: {
                    PublishExternalAlertV2RequestDTO: {
                        requestString: {
                            userid: userIdDoPublishV2,
                            pwd: pwdDoPublishV2,
                            ctype: '',
                            sender: 'HDFCBank',
                            pno: '{pno}',
                            dcode: dcodeDoPublishV2,
                            msgtxt: '{otp}',
                            submitdate: '',
                            brd: '',
                            intflag: '',
                            msgid: '{msgId}',
                            msgtype: '{msgType}',
                            priority: '1',
                            otpflag: '1',
                            alert: '',
                            tag: '',
                            countrycode: '',
                            languageid: '',
                            subjectLine: '{subjectLine}',
                            attachment: '',
                            txId: '',
                            ornid: ornDoPublishV2,
                            tempid: '{tempId}'
                        }
                    },
                    sessionContext: {
                        channel: process.env.COMMON_API_CHANNEL,
                        bankCode: '08',
                        userId: process.env.COMMON_API_CHANNEL_USER_ID,
                        transactionBranch: '089999',
                        transactingPartyCode: '50000010',
                        externalReferenceNo: '{refNumber}'
                    }
                }
            },
            functions: {
                doPublishExternalAlertV2: ['pno', 'refNumber', 'otp', 'msgType', 'msgId', 'tempId', 'subjectLine']
            }
        }
    ]
};
// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
let CoreBankingDataSource = class CoreBankingDataSource extends repository_1.juggler.DataSource {
    constructor(dsConfig = config) {
        super(dsConfig);
    }
};
CoreBankingDataSource.dataSourceName = 'core_banking';
CoreBankingDataSource.defaultConfig = config;
CoreBankingDataSource = (0, tslib_1.__decorate)([
    (0, core_1.lifeCycleObserver)('datasource'),
    (0, tslib_1.__param)(0, (0, core_1.inject)('datasources.config.core_banking', { optional: true })),
    (0, tslib_1.__metadata)("design:paramtypes", [Object])
], CoreBankingDataSource);
exports.CoreBankingDataSource = CoreBankingDataSource;
//# sourceMappingURL=core-banking.datasource.js.map