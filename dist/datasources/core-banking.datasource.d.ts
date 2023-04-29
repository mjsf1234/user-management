import { LifeCycleObserver } from '@loopback/core';
import { juggler } from '@loopback/repository';
export declare class CoreBankingDataSource extends juggler.DataSource implements LifeCycleObserver {
    static dataSourceName: string;
    static readonly defaultConfig: {
        name: string;
        connector: string;
        baseUrl: string | undefined;
        crud: boolean;
        debug: boolean;
        options: {
            headers: {
                accepts: string;
                'content-type': string;
                'api-key': string | undefined;
            };
            agentOptions: {
                ca: string;
                cert: string;
                key: string;
                ciphers: string;
            };
            strictSSL: boolean;
            timeout: number;
            proxy: string;
        };
        operations: ({
            template: {
                method: string;
                url: string;
                query: {};
                body: {
                    FetchCustomerAccountAmlFatcaDetailsRequestDTO: {
                        mobileNumber: string;
                        pan: string;
                        customerID: string;
                        dob: string;
                        accountNumber: string;
                        isAMLDetailsRequired: string;
                        isFATCADetailsRequired: string;
                        isRelationshipRequired: string;
                        isDemogDetailsRequired: string;
                        isAcctountDetailsRequired: string;
                    };
                    sessionContext: {
                        channel: string | undefined;
                        userId: string | undefined;
                        externalReferenceNo: string;
                        bankCode: string | undefined;
                        transactionBranch: string | undefined;
                        transactingPartyCode?: undefined;
                        serviceCode?: undefined;
                        userReferenceNumber?: undefined;
                    };
                    DemographicDetailsInquiryDTO?: undefined;
                    CASADetailBalanceInquiryRequestDTO?: undefined;
                    GenerateOTPRestRequestDTO?: undefined;
                    VerifyOTPRestRequestDTO?: undefined;
                    PublishExternalAlertV2RequestDTO?: undefined;
                };
            };
            functions: {
                fetchCustomerAccountAmlFatcaDetails: string[];
                doDemographicDetailsInquiry?: undefined;
                fetchCASADetailBalanceInquiry?: undefined;
                doGenerateOTPRest?: undefined;
                doVerifyOTPRest?: undefined;
                doPublishExternalAlertV2?: undefined;
            };
        } | {
            template: {
                method: string;
                url: string;
                query: {};
                body: {
                    DemographicDetailsInquiryDTO: {
                        customerId: string;
                    };
                    sessionContext: {
                        channel: string | undefined;
                        bankCode: string;
                        userId: string | undefined;
                        transactionBranch: string;
                        externalReferenceNo: string;
                        transactingPartyCode?: undefined;
                        serviceCode?: undefined;
                        userReferenceNumber?: undefined;
                    };
                    FetchCustomerAccountAmlFatcaDetailsRequestDTO?: undefined;
                    CASADetailBalanceInquiryRequestDTO?: undefined;
                    GenerateOTPRestRequestDTO?: undefined;
                    VerifyOTPRestRequestDTO?: undefined;
                    PublishExternalAlertV2RequestDTO?: undefined;
                };
            };
            functions: {
                doDemographicDetailsInquiry: string[];
                fetchCustomerAccountAmlFatcaDetails?: undefined;
                fetchCASADetailBalanceInquiry?: undefined;
                doGenerateOTPRest?: undefined;
                doVerifyOTPRest?: undefined;
                doPublishExternalAlertV2?: undefined;
            };
        } | {
            template: {
                method: string;
                url: string;
                query: {};
                body: {
                    CASADetailBalanceInquiryRequestDTO: {
                        accountNo: string;
                        customerId: string;
                        partnerId: string;
                    };
                    sessionContext: {
                        bankCode: string | undefined;
                        channel: string | undefined;
                        userId: string | undefined;
                        transactionBranch: string | undefined;
                        externalReferenceNo: string;
                        transactingPartyCode: string;
                        serviceCode: string;
                        userReferenceNumber: string;
                    };
                    FetchCustomerAccountAmlFatcaDetailsRequestDTO?: undefined;
                    DemographicDetailsInquiryDTO?: undefined;
                    GenerateOTPRestRequestDTO?: undefined;
                    VerifyOTPRestRequestDTO?: undefined;
                    PublishExternalAlertV2RequestDTO?: undefined;
                };
            };
            functions: {
                fetchCASADetailBalanceInquiry: string[];
                fetchCustomerAccountAmlFatcaDetails?: undefined;
                doDemographicDetailsInquiry?: undefined;
                doGenerateOTPRest?: undefined;
                doVerifyOTPRest?: undefined;
                doPublishExternalAlertV2?: undefined;
            };
        } | {
            template: {
                method: string;
                url: string;
                query: {};
                body: {
                    GenerateOTPRestRequestDTO: {
                        requestString: {
                            instanceId: string | undefined;
                            apiUser: string | undefined;
                            forceNew: string | undefined;
                            linkData: string;
                            refNo: string;
                            messageHash: string;
                        };
                        headerParams: {
                            key: string;
                            value: string | undefined;
                        }[];
                    };
                    sessionContext: {
                        channel: string | undefined;
                        userId: string | undefined;
                        externalReferenceNo: string;
                        bankCode: string | undefined;
                        transactionBranch: string | undefined;
                        transactingPartyCode: string;
                        serviceCode?: undefined;
                        userReferenceNumber?: undefined;
                    };
                    FetchCustomerAccountAmlFatcaDetailsRequestDTO?: undefined;
                    DemographicDetailsInquiryDTO?: undefined;
                    CASADetailBalanceInquiryRequestDTO?: undefined;
                    VerifyOTPRestRequestDTO?: undefined;
                    PublishExternalAlertV2RequestDTO?: undefined;
                };
            };
            functions: {
                doGenerateOTPRest: string[];
                fetchCustomerAccountAmlFatcaDetails?: undefined;
                doDemographicDetailsInquiry?: undefined;
                fetchCASADetailBalanceInquiry?: undefined;
                doVerifyOTPRest?: undefined;
                doPublishExternalAlertV2?: undefined;
            };
        } | {
            template: {
                method: string;
                url: string;
                query: {};
                body: {
                    VerifyOTPRestRequestDTO: {
                        requestString: {
                            instanceId: string | undefined;
                            passwordValue: string;
                            apiUser: string | undefined;
                            linkData: string;
                            refNo: string;
                            txnId: string;
                            messageHash: string;
                        };
                        headerParams: {
                            key: string;
                            value: string | undefined;
                        }[];
                    };
                    sessionContext: {
                        channel: string | undefined;
                        bankCode: string | undefined;
                        userId: string | undefined;
                        transactionBranch: string | undefined;
                        transactingPartyCode: string;
                        externalReferenceNo: string;
                        serviceCode?: undefined;
                        userReferenceNumber?: undefined;
                    };
                    FetchCustomerAccountAmlFatcaDetailsRequestDTO?: undefined;
                    DemographicDetailsInquiryDTO?: undefined;
                    CASADetailBalanceInquiryRequestDTO?: undefined;
                    GenerateOTPRestRequestDTO?: undefined;
                    PublishExternalAlertV2RequestDTO?: undefined;
                };
            };
            functions: {
                doVerifyOTPRest: string[];
                fetchCustomerAccountAmlFatcaDetails?: undefined;
                doDemographicDetailsInquiry?: undefined;
                fetchCASADetailBalanceInquiry?: undefined;
                doGenerateOTPRest?: undefined;
                doPublishExternalAlertV2?: undefined;
            };
        } | {
            template: {
                method: string;
                url: string;
                query: {};
                body: {
                    PublishExternalAlertV2RequestDTO: {
                        requestString: {
                            userid: string;
                            pwd: string;
                            ctype: string;
                            sender: string;
                            pno: string;
                            dcode: string;
                            msgtxt: string;
                            submitdate: string;
                            brd: string;
                            intflag: string;
                            msgid: string;
                            msgtype: string;
                            priority: string;
                            otpflag: string;
                            alert: string;
                            tag: string;
                            countrycode: string;
                            languageid: string;
                            subjectLine: string;
                            attachment: string;
                            txId: string;
                            ornid: string;
                            tempid: string;
                        };
                    };
                    sessionContext: {
                        channel: string | undefined;
                        bankCode: string;
                        userId: string | undefined;
                        transactionBranch: string;
                        transactingPartyCode: string;
                        externalReferenceNo: string;
                        serviceCode?: undefined;
                        userReferenceNumber?: undefined;
                    };
                    FetchCustomerAccountAmlFatcaDetailsRequestDTO?: undefined;
                    DemographicDetailsInquiryDTO?: undefined;
                    CASADetailBalanceInquiryRequestDTO?: undefined;
                    GenerateOTPRestRequestDTO?: undefined;
                    VerifyOTPRestRequestDTO?: undefined;
                };
            };
            functions: {
                doPublishExternalAlertV2: string[];
                fetchCustomerAccountAmlFatcaDetails?: undefined;
                doDemographicDetailsInquiry?: undefined;
                fetchCASADetailBalanceInquiry?: undefined;
                doGenerateOTPRest?: undefined;
                doVerifyOTPRest?: undefined;
            };
        })[];
    };
    constructor(dsConfig?: object);
}
