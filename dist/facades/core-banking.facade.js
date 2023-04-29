"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreBankingFacade = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const core_banking_repository_1 = require("../repositories/core-banking.repository");
const moment_timezone_1 = (0, tslib_1.__importDefault)(require("moment-timezone"));
const underscore_1 = (0, tslib_1.__importStar)(require("underscore"));
const common_1 = require("common");
const app_constant_1 = (0, tslib_1.__importDefault)(require("common/dist/constants/app-constant"));
let CoreBankingFacade = class CoreBankingFacade {
    constructor(coreBankingRepository, countryRepository, occupationRepository, wealthSourceRepository, politicallyExposureTypeRepository, stateRepository, addressRepository, overseesAddressRepository, appUserRepository, investorDetailsRepository, incomeSlabRepository, holdingTypeRepository, investorTypeRepository, bankAccountTypeRepository, bankBranchRepository, accountRepository, investorNomineeRepository, bankAccountRepository, identificationTypeRepository, communicationMatrixRepository, communicationTopicRepository) {
        this.coreBankingRepository = coreBankingRepository;
        this.countryRepository = countryRepository;
        this.occupationRepository = occupationRepository;
        this.wealthSourceRepository = wealthSourceRepository;
        this.politicallyExposureTypeRepository = politicallyExposureTypeRepository;
        this.stateRepository = stateRepository;
        this.addressRepository = addressRepository;
        this.overseesAddressRepository = overseesAddressRepository;
        this.appUserRepository = appUserRepository;
        this.investorDetailsRepository = investorDetailsRepository;
        this.incomeSlabRepository = incomeSlabRepository;
        this.holdingTypeRepository = holdingTypeRepository;
        this.investorTypeRepository = investorTypeRepository;
        this.bankAccountTypeRepository = bankAccountTypeRepository;
        this.bankBranchRepository = bankBranchRepository;
        this.accountRepository = accountRepository;
        this.investorNomineeRepository = investorNomineeRepository;
        this.bankAccountRepository = bankAccountRepository;
        this.identificationTypeRepository = identificationTypeRepository;
        this.communicationMatrixRepository = communicationMatrixRepository;
        this.communicationTopicRepository = communicationTopicRepository;
    }
    async fetchCustomerAccountAmlFatcaDetails(pan = '', dob = '', mobileNumber = '', customerId = '', transactionId, userId, options) {
        var _a;
        const methodName = 'fetchCustomerAccountAmlFatcaDetails';
        try {
            if (!(0, underscore_1.isEmpty)(dob)) {
                dob = dob.replace(/-/g, '');
            }
            common_1.LoggingUtils.debug('Step 1 etb sync initialize ', methodName);
            let customerDetails = {
                userId: userId,
                pan: pan,
                dob: dob,
                customerID: customerId,
                mobileNumber: mobileNumber
            };
            // customerDetails['mobileNumber'] = mobileNumber;
            // customerDetails['customerID'] = customerId;
            // customerDetails['pan'] = pan;
            // customerDetails['dob'] = dob;
            common_1.LoggingUtils.debug('Step 2 validating etb request body ', methodName);
            if (!customerDetails.mobileNumber && !customerDetails.pan && !customerDetails.dob && !customerDetails.customerID) {
                common_1.LoggingUtils.debug('Step 3 etb request body validation failed', methodName);
                return {
                    success: false,
                    code: 'NO_DETAILS_PROVIDED'
                };
            }
            common_1.LoggingUtils.debug('Step 4 Invoking fetchCustomerAccountFatcaDetails repo method', methodName);
            // perform error handling. for this
            const responseData = await this.coreBankingRepository.fetchCustomerAccountAmlFatcaDetails(customerDetails.mobileNumber, customerDetails.pan, customerDetails.dob, customerDetails.customerID, transactionId);
            const { status } = responseData;
            //adding check for this reply code. Not mentioned in the sheet (DL-97)
            //We are diverting as NTB customer as no data received
            if (status.errorCode == '12301' || status.replyCode == 12301) {
                common_1.LoggingUtils.debug(`Step 4-A Path for NTB customer `, methodName);
                return {
                    success: false,
                    code: 'NO_DATA'
                };
            }
            //Error handling for the ETB SYNC
            if (status.replyCode != 0) {
                common_1.LoggingUtils.debug(`Step 4-B etb response `, methodName);
                return { success: false, bankErrorCode: status.replyCode, code: status.replyText };
            }
            common_1.LoggingUtils.debug(`Step 5 etb response `, methodName);
            if (responseData &&
                responseData.responseString &&
                responseData.responseString.customerDetailsDTO &&
                responseData.responseString.customerDetailsDTO.length > 0) {
                const customerData = responseData.responseString.customerDetailsDTO;
                let investorDetailsArray = [];
                if (customerData.length > 1) {
                    common_1.LoggingUtils.debug('Step 6 flow end multiple customer data', methodName);
                    return {
                        success: false,
                        code: 'MULTIPLE_CUSTOMER_DATA'
                    };
                }
                common_1.LoggingUtils.debug('Step 7 single customer flow initiated', methodName);
                const element = customerData[0];
                common_1.LoggingUtils.debug('Step 8 fetching existing app user ', methodName);
                const checkUniqueUser = await this.appUserRepository.findOne({
                    where: {
                        bosCode: element === null || element === void 0 ? void 0 : element.customerId,
                        isActive: true
                    }
                });
                common_1.LoggingUtils.debug(`Step 8 existing app user response `, methodName);
                if (!checkUniqueUser) {
                    //if(pan === element?.refCustItNum){ //@todo when update pan will work uncomment it
                    common_1.LoggingUtils.debug('Step 9 ETB sync started', methodName);
                    let userObject = {};
                    let investorDetailsObj = {};
                    let addressObj = {};
                    let permanentAddrObj = {};
                    let overseasAddrObj = {};
                    let bankAccountObj = {};
                    let accountObj = {};
                    let nomineeObj = {};
                    let nomineeUser = {};
                    let custId;
                    userObject.name = element === null || element === void 0 ? void 0 : element.customerFullName;
                    // userObject.contactNumber = mobileNumber.substring(2) || element?.refPhoneMobile.substring(2); // remove 91 and compare
                    // userObject.contactNumberCountryCode = element?.refPhoneMobile ? '+' + element?.refPhoneMobile.substring(0, 2) : null
                    userObject.email = element === null || element === void 0 ? void 0 : element.refCustEmail;
                    userObject.bosCode = element === null || element === void 0 ? void 0 : element.customerId;
                    custId = element.customerId;
                    if (userId) {
                        if (!(element === null || element === void 0 ? void 0 : element.refCustItNum)) {
                            await this.appUserRepository.updateAll({
                                panAadharLinkStatus: common_1.Option.GLOBALOPTIONS.PANAADHARLINKSTATUS.notFound.value
                            }, {
                                id: userId
                            });
                            return Promise.reject(new common_1.RestError(400, 'PAN not found!', { systemcode: 1398 }));
                        }
                    }
                    //exiting if no customer id
                    if (custId == undefined) {
                        common_1.LoggingUtils.debug('Step 10 customer id not found', methodName);
                        throw new Error('Customer ID not present');
                    }
                    // userObject.userCode = ''; //@todo should have unique value
                    // userObject.appUserStatus = Option.GLOBALOPTIONS.APPUSERSTATUS.singleCustomerID.value; //@todo need to change acc to bank api
                    if (element.txtCustSex === 'F') {
                        userObject.gender = common_1.Option.GLOBALOPTIONS.GENDER.female.value;
                        investorDetailsObj.gender = common_1.Option.GLOBALOPTIONS.GENDER.female.value;
                    }
                    if (element.txtCustSex === 'M') {
                        userObject.gender = common_1.Option.GLOBALOPTIONS.GENDER.male.value;
                        investorDetailsObj.gender = common_1.Option.GLOBALOPTIONS.GENDER.male.value;
                    }
                    if (element.txtCustSex === 'T') {
                        userObject.gender = common_1.Option.GLOBALOPTIONS.GENDER.transgender.value;
                        investorDetailsObj.gender = common_1.Option.GLOBALOPTIONS.GENDER.transgender.value;
                    }
                    common_1.LoggingUtils.debug(`Step 11 updating appuser data ${userId}`, methodName);
                    await this.appUserRepository.updateById(userId, userObject).catch(err => {
                        throw new Error('Error occurred while updating user');
                    });
                    common_1.LoggingUtils.debug('Step 12 fetching investor object for etb sync', methodName);
                    const checkUniquePan = await this.investorDetailsRepository.findOne({
                        where: {
                            or: [
                                { panCardNumber: pan || (element === null || element === void 0 ? void 0 : element.refCustItNum) },
                                {
                                    and: [
                                        {
                                            birthDate: (dob && (0, moment_timezone_1.default)(dob).format('YYYY-MM-DD')) ||
                                                ((element === null || element === void 0 ? void 0 : element.datBirthCust) && (0, moment_timezone_1.default)(element.datBirthCust).format('YYYY-MM-DD')),
                                            appUserId: userId
                                        }
                                    ]
                                },
                                { appUserId: userId }
                            ],
                            isActive: true
                        }
                    });
                    common_1.LoggingUtils.debug(`Step 13 investor detail response `, methodName);
                    if (!(0, underscore_1.isEmpty)(checkUniquePan)) {
                        common_1.LoggingUtils.debug('Step 14 syncing investor object', methodName);
                        investorDetailsObj.birthDate =
                            (dob && (0, moment_timezone_1.default)(dob).format('YYYY-MM-DD')) || ((element === null || element === void 0 ? void 0 : element.datBirthCust) && (0, moment_timezone_1.default)(element.datBirthCust).format('YYYY-MM-DD'));
                        investorDetailsObj.panCardNumber = pan || (element === null || element === void 0 ? void 0 : element.refCustItNum);
                        investorDetailsObj.appUserId = userId;
                        common_1.LoggingUtils.debug('Step 15 syncing address details', methodName);
                        const otherState = await this.stateRepository.findOne({
                            where: {
                                name: 'Others',
                                bseCode: 'XX',
                                isActive: true
                            }
                        }, options);
                        if (element.txtCustadrAdd1) {
                            addressObj.addressLine1 = element.txtCustadrAdd1;
                            addressObj.addressLine2 = element.txtCustadrAdd2;
                            addressObj.addressLine3 = element.txtCustadrAdd3;
                            addressObj.landmark = element.txtCustadrAdd3;
                            addressObj.city = element.namCustadrCity;
                            addressObj.pincode = element.txtCustadrZip;
                            // Removing default value
                            //addressObj.addressTypeId = 2; //@todo change address type (now residential) from api (when info available)
                            overseasAddrObj.addressLine1 = element.txtCustadrAdd1;
                            overseasAddrObj.addressLine2 = element.txtCustadrAdd2;
                            overseasAddrObj.addressLine3 = element.txtCustadrAdd3;
                            overseasAddrObj.landmark = element.txtCustadrAdd3;
                            overseasAddrObj.city = element.namCustadrCity;
                            overseasAddrObj.pincode = element.txtCustadrZip;
                            // Removing default value
                            //overseasAddrObj.addressTypeId = 2; //@todo change address type (now residential) from api (when info available)
                            const state = this.convertToCamelCase(element.namCustadrState);
                            const stateData = await this.stateRepository.findOne({
                                where: {
                                    name: state,
                                    isActive: true
                                }
                            }, options);
                            const overseeCountryCode = (_a = element.namCustadrCntry) !== null && _a !== void 0 ? _a : element.namCustadrCntryDescription;
                            const overseeCountry = await this.getCountryData(overseeCountryCode, options);
                            addressObj.stateId = (stateData && stateData.id) || (otherState && otherState.id) || 36; // set other if state not match
                            overseasAddrObj.state = element.namCustadrState;
                            overseasAddrObj.countryId = overseeCountry && overseeCountry.id;
                            common_1.LoggingUtils.debug('Step 16 creating correspondence address ', methodName);
                            const corressAddr = await this.addressRepository.create(addressObj);
                            common_1.LoggingUtils.debug('Step 17 creating overseaAddress', methodName);
                            const overseasAddr = await this.overseesAddressRepository.create(overseasAddrObj);
                            investorDetailsObj.correspondenceAddressId = corressAddr && corressAddr.id;
                            investorDetailsObj.overseesAddressId = overseasAddr && overseasAddr.id;
                        }
                        let permanentAddr;
                        if (element.txtPermadrAdd1) {
                            permanentAddrObj.addressLine1 = element.txtPermadrAdd1;
                            permanentAddrObj.addressLine2 = element.txtPermadrAdd2;
                            permanentAddrObj.addressLine3 = element.txtPermadrAdd3 ? element.txtPermadrAdd3 : null;
                            permanentAddrObj.landmark = element.txtPermadrAdd3;
                            permanentAddrObj.city = element.namPermadrCity;
                            permanentAddrObj.state = element.namPermadrState;
                            permanentAddrObj.pincode = element.txtPermadrZip;
                            // Removing default value
                            //permanentAddrObj.addressTypeId = 2; //@todo change address type (now residential) from api (when info available)
                            const permanentstate = this.convertToCamelCase(element.namPermadrState);
                            const permanentStateData = await this.stateRepository.findOne({
                                where: {
                                    name: permanentstate,
                                    isActive: true
                                }
                            }, options);
                            permanentAddrObj.stateId = (permanentStateData && permanentStateData.id) || (otherState && otherState.id) || 36; // set other if state not match;
                            common_1.LoggingUtils.debug('Step 18 creating permanent address', methodName);
                            permanentAddr = await this.addressRepository.create(permanentAddrObj);
                            investorDetailsObj.permanentAddressId = permanentAddr && permanentAddr.id;
                        }
                        //fix for marital status
                        //---------
                        const maritialStatus = await this.fetchMaritalStatus(element.codCustMarstat);
                        if (maritialStatus) {
                            investorDetailsObj.maritalStatus = maritialStatus;
                        }
                        //---------
                        //We're picking the 1stb occurence for bank account to create account
                        common_1.LoggingUtils.debug('Step 19 Syncing account and Bank account details', methodName);
                        const customerAccountDetails = underscore_1.default.find(element.customerAccountDetailsDTO, function (item) {
                            return item.customerId === element.customerId;
                        });
                        common_1.LoggingUtils.debug(`Step 20 fetching customer account details `, methodName);
                        // Empty check from Account details from etb
                        if (customerAccountDetails == undefined) {
                            common_1.LoggingUtils.debug('Step 20-b customerAccountDetails not found', methodName);
                            throw new Error('Customer ID not present');
                        }
                        // finding app user based on fetch etb details based on bos code --- need fix this section. getting wrong data change with customer id
                        // resolved
                        const holderData = await this.appUserRepository.findOne({
                            where: {
                                bosCode: custId,
                                isActive: true
                            }
                        });
                        common_1.LoggingUtils.debug(`Step 21 fetching holder data  `, methodName);
                        if (app_constant_1.default.ALLOWED_BANK_ACCOUNT_TYPES.includes(customerAccountDetails === null || customerAccountDetails === void 0 ? void 0 : customerAccountDetails.codAcctCustRel)) {
                            //we're only setting bos code for sow ?
                            common_1.LoggingUtils.debug('Step 22 Setting Holding Data for SOW, JOF and JOO', methodName);
                            accountObj.primaryHolderId = holderData && holderData.id;
                            accountObj.bosCode = custId;
                            const holdingType = await this.getHoldingType(customerAccountDetails === null || customerAccountDetails === void 0 ? void 0 : customerAccountDetails.codAcctCustRel, options);
                            const activeAccountStatus = common_1.Option.GLOBALOPTIONS.BANKACCOUNTSTATUS.active.bankCode;
                            if (activeAccountStatus.includes(customerAccountDetails === null || customerAccountDetails === void 0 ? void 0 : customerAccountDetails.accountStatus)) {
                                accountObj.holdingTypeId = holdingType && holdingType.id;
                            }
                        }
                        // if (customerAccountDetails?.codAcctCustRel === 'JOF') {
                        //   LoggingUtils.debug('Step 23 JOF', methodName);
                        //   accountObj.primaryHolderId = holderData && holderData.id;
                        //   accountObj.bosCode = custId;
                        // }
                        // if (customerAccountDetails?.codAcctCustRel === 'JOO') {
                        //   //we're not setting primary account holder ? need to verify with pranav
                        //   // tag with primaryAccountholder
                        //   // resolved
                        //   LoggingUtils.debug('Step 24 JOO', methodName);
                        //   accountObj.primaryHolderId = holderData && holderData.id;
                        //   accountObj.bosCode = custId;
                        // }
                        // if (customerAccountDetails?.codAcctCustRel === 'GUR') {
                        //   //@todo this will be as a guardian user
                        // }
                        accountObj.name = element.customerFullName;
                        common_1.LoggingUtils.debug('Step 25 checking for existing account', methodName);
                        //need to check that bos code should not be undefined change with customer id
                        //resolved
                        let isAccountExist = await this.accountRepository.findOne({
                            where: {
                                bosCode: custId,
                                isActive: true
                            }
                        });
                        common_1.LoggingUtils.debug(`Step 26 existing account deatils  `, methodName);
                        // need to understand logic behind this account ?
                        if (!isAccountExist) {
                            accountObj.accountStatus = common_1.Option.GLOBALOPTIONS.ACCOUNTSTATUS.pendingRegistration.value;
                            accountObj.accountOpeningDate = (0, moment_timezone_1.default)().toDate();
                            accountObj.bosCode = custId;
                            accountObj.primaryHolderId = holderData && holderData.id;
                            common_1.LoggingUtils.debug('Step 27 creating new Account', methodName);
                            const isAccountExist = await this.accountRepository.create(accountObj);
                            common_1.LoggingUtils.debug(`Step 28 created Account `, methodName);
                            const accountId = isAccountExist && isAccountExist.id;
                            await this.addCommunicationMatrix(accountId, options);
                            const uniqueId = this.generateAccountUniqueId(accountId);
                            await this.accountRepository.updateById(accountId, { uniqueId: uniqueId });
                        }
                        else {
                            common_1.LoggingUtils.debug('Step 29 updating existing account', methodName);
                            await this.accountRepository.updateAll(accountObj, { id: isAccountExist.id });
                        }
                        common_1.LoggingUtils.debug('Step 30 fetching updated account data ', methodName);
                        // need to revisit getting wrong data when finding --->>>> since we're setting bos code for sow why we're searching with bos code ? pass customer id
                        //resolved
                        let accountDatas = await this.accountRepository.find({
                            where: { or: [{ bosCode: custId }, { primaryHolderId: userId }], isActive: true }
                        });
                        if (accountDatas.length > 1) {
                            throw 'User can not have Multiple account';
                        }
                        let accountData = accountDatas[0];
                        bankAccountObj.accountId = accountData.id;
                        common_1.LoggingUtils.debug(`Step 31 setting fk_id_account for bank account record `, methodName);
                        const investorTypes = await this.investorTypeRepository.find({
                            where: {
                                isActive: true
                            }
                        }, options);
                        common_1.LoggingUtils.debug('Step 32 Fetching investor type', methodName);
                        //Finding investor type & setting its id to investorTypeId
                        // need to verify this function.----------------------------------------------
                        let investorTypeData = underscore_1.default.find(investorTypes, function (item) {
                            const coreBankCodes = item.coreBankCode;
                            if (coreBankCodes === null || coreBankCodes === void 0 ? void 0 : coreBankCodes.includes(element === null || element === void 0 ? void 0 : element.flgCustTyp.trim())) {
                                return item;
                            }
                        });
                        //-----------------------------------------------------------------------------
                        common_1.LoggingUtils.debug(`Step 33 investor type data `, methodName);
                        if (investorTypeData) {
                            common_1.LoggingUtils.debug('Step 34 setting investor type key', methodName);
                            investorDetailsObj.investorTypeId = investorTypeData.id;
                        }
                        common_1.LoggingUtils.debug('Step 35 Sync bank and nominee data', methodName);
                        //creating bank account & nomineee
                        const customerAccountDetailsDTO = element.customerAccountDetailsDTO;
                        // never enter in this code...... need to check
                        if (customerAccountDetailsDTO && Array.isArray(customerAccountDetailsDTO)) {
                            const checkDefaultBankAccount = customerAccountDetailsDTO.length > 1 ? false : true;
                            common_1.LoggingUtils.debug(`Step 36 default bank account check `, methodName);
                            for (const data of customerAccountDetailsDTO) {
                                common_1.LoggingUtils.debug('Step 37 bank account loop ', methodName);
                                if (app_constant_1.default.ALLOWED_BANK_ACCOUNT_TYPES.includes(data.codAcctCustRel)) {
                                    let bankAccountData;
                                    common_1.LoggingUtils.debug('Step 38 only sync saving bank account', methodName);
                                    if (data.prodTypeDesc === 'SAVING') {
                                        common_1.LoggingUtils.debug('Saving account ', methodName);
                                        //@todo for now storing only saving accounts
                                        const statusObj = common_1.Option.GLOBALOPTIONS.BANKACCOUNTSTATUS;
                                        Object.entries(statusObj).forEach((value) => {
                                            let [key, values] = value;
                                            const bankCodes = values.bankCode;
                                            if (bankCodes.includes(data.accountStatus)) {
                                                bankAccountObj.bankAccountStatus = values.value;
                                            }
                                        });
                                        // we re not creating blocked bank account
                                        common_1.LoggingUtils.debug(`Bankaccount object `, methodName);
                                        if (bankAccountObj.bankAccountStatus !== 2) {
                                            let investorDetailsNomineeObj = {};
                                            common_1.LoggingUtils.debug('Finding bank account ', methodName);
                                            // Removing unique account no check as we can tag multiple bank accounts to one account
                                            // const checkUniqueAccountNo = await this.bankAccountRepository.findOne({
                                            //   where: {
                                            //     accountNumber: data?.accountNumber,
                                            //     isActive: true
                                            //   }
                                            // });
                                            // if (!checkUniqueAccountNo) {
                                            bankAccountObj.isDefault = checkDefaultBankAccount;
                                            bankAccountObj.accountNumber = data.accountNumber;
                                            bankAccountObj.accountName = data.accountTitle;
                                            common_1.LoggingUtils.debug('get holding type ', methodName);
                                            const holdingTypeData = await this.getHoldingType(data === null || data === void 0 ? void 0 : data.codAcctCustRel, options);
                                            bankAccountObj.holdingTypeId = holdingTypeData && holdingTypeData.id;
                                            if (investorTypeData) {
                                                common_1.LoggingUtils.debug('investor type key ', methodName);
                                                bankAccountObj.investorTypeId = investorTypeData.id;
                                            }
                                            let bankAccountType;
                                            if (data.productTypeDescription && ['NRE', 'NRO'].includes(data.productTypeDescription.toUpperCase())) {
                                                bankAccountType = `${data.productTypeDescription}-${data.prodTypeDesc}`.toUpperCase();
                                            }
                                            else {
                                                bankAccountType = `${data.prodTypeDesc}-${data.productTypeDescription}`.toUpperCase();
                                            }
                                            common_1.LoggingUtils.debug('finding bank account type repo', methodName);
                                            const bankAccountTypeData = await this.bankAccountTypeRepository.findOne({
                                                where: {
                                                    bosCode: bankAccountType,
                                                    isActive: true
                                                }
                                            }, options);
                                            bankAccountObj.bankAccountTypeId = bankAccountTypeData && bankAccountTypeData.id;
                                            common_1.LoggingUtils.debug('fetching bank branch details ', methodName);
                                            const bankBranchData = await this.bankBranchRepository.findOne({
                                                where: {
                                                    ifscCode: data.ifscCode,
                                                    isActive: true
                                                }
                                            }, options);
                                            bankAccountObj.bankBranchId = bankBranchData && bankBranchData.id;
                                            common_1.LoggingUtils.debug('creating bank account', methodName);
                                            //finally creating banch
                                            bankAccountData = await this.bankAccountRepository.create(bankAccountObj);
                                            //setting investor type for nri
                                            if ((element === null || element === void 0 ? void 0 : element.flgCustTyp.trim()) == 'O') {
                                                if (checkDefaultBankAccount) {
                                                    if (bankAccountType == 'NRE-SAVING') {
                                                        //Finding NRE investor type & setting its id to investorTypeId
                                                        let NREinvestorTypeData = underscore_1.default.find(investorTypes, function (item) {
                                                            if (item.bseCode == '21') {
                                                                return item;
                                                            }
                                                        });
                                                        common_1.LoggingUtils.debug(`Step-- NRE investor type data `, methodName);
                                                        if (NREinvestorTypeData) {
                                                            common_1.LoggingUtils.debug('Step-- NRE setting investor type key', methodName);
                                                            investorDetailsObj.investorTypeId = NREinvestorTypeData.id;
                                                        }
                                                    }
                                                    if (bankAccountType == 'NRO-SAVING') {
                                                        //Finding NRO investor type & setting its id to investorTypeId
                                                        let NROinvestorTypeData = underscore_1.default.find(investorTypes, function (item) {
                                                            if (item.bseCode == '24') {
                                                                return item;
                                                            }
                                                        });
                                                        common_1.LoggingUtils.debug(`Step-- NRO investor type data `, methodName);
                                                        if (NROinvestorTypeData) {
                                                            common_1.LoggingUtils.debug('Step-- NRO setting investor type key', methodName);
                                                            investorDetailsObj.investorTypeId = NROinvestorTypeData.id;
                                                        }
                                                    }
                                                }
                                            }
                                            common_1.LoggingUtils.debug(`bank account repo obj  `, methodName);
                                        }
                                    }
                                }
                                common_1.LoggingUtils.debug('Step - Skipping bank account sync as only saving (SOW, JOF or JOO) bank accounts ', methodName);
                                continue;
                            }
                            common_1.LoggingUtils.debug('Step 39 bank account and nominee sync done ', methodName);
                        }
                        common_1.LoggingUtils.debug('Step 40 fetching occupation details', methodName);
                        const occupations = await this.occupationRepository.find({
                            where: {
                                isActive: true
                            }
                        }, options);
                        const incomeSources = await this.wealthSourceRepository.find({
                            where: {
                                isActive: true
                            }
                        }, options);
                        const grossIncomes = await this.incomeSlabRepository.find({
                            where: {
                                isActive: true
                            }
                        }, options);
                        const customerAMLDetailsDTO = element.customerAMLDetailsDTO;
                        if (customerAMLDetailsDTO && Array.isArray(customerAMLDetailsDTO)) {
                            common_1.LoggingUtils.debug('Step 41 sync occupation', methodName);
                            for (const data of customerAMLDetailsDTO) {
                                let occupationData = underscore_1.default.find(occupations, function (item) {
                                    var _a, _b;
                                    const coreBankCodes = (_a = item.coreBankCode) === null || _a === void 0 ? void 0 : _a.map(element => element === null || element === void 0 ? void 0 : element.toLowerCase());
                                    if (coreBankCodes === null || coreBankCodes === void 0 ? void 0 : coreBankCodes.includes((_b = data.txtOccupDesc) === null || _b === void 0 ? void 0 : _b.toLowerCase().trim())) {
                                        return item;
                                    }
                                });
                                investorDetailsObj.occupationId = occupationData && occupationData.id;
                                let incomeSourceData = underscore_1.default.find(incomeSources, function (item) {
                                    var _a, _b;
                                    const coreBankCodes = (_a = item.coreBankCode) === null || _a === void 0 ? void 0 : _a.map(element => element === null || element === void 0 ? void 0 : element.toLowerCase());
                                    if (coreBankCodes === null || coreBankCodes === void 0 ? void 0 : coreBankCodes.includes((_b = data.incSrcDesc) === null || _b === void 0 ? void 0 : _b.toLowerCase().trim())) {
                                        return item;
                                    }
                                });
                                investorDetailsObj.wealthSourceId = incomeSourceData && incomeSourceData.id;
                                //Need to verify this piece of code ------------------------------------------------------
                                let grossIncomeData = underscore_1.default.find(grossIncomes, function (item) {
                                    const coreBankCodes = item.coreBankCode;
                                    if (coreBankCodes === null || coreBankCodes === void 0 ? void 0 : coreBankCodes.includes(data.grossIncDesc.trim())) {
                                        return item;
                                    }
                                });
                                investorDetailsObj.incomeSlabId = grossIncomeData && grossIncomeData.id;
                                //-----------------------------------------------------------------------------------------
                                common_1.LoggingUtils.debug('Step 42 checking for politically exposure', methodName);
                                const politicalExposureData = await this.politicallyExposureTypeRepository.findOne({
                                    where: {
                                        bosCode: data.amlCod1,
                                        isActive: true
                                    }
                                }, options);
                                investorDetailsObj.employerName = data.txtEmployerDesc;
                                investorDetailsObj.employerCategory = data.typEmployer;
                                investorDetailsObj.politicallyExposureTypeId = politicalExposureData && politicalExposureData.id;
                            }
                        }
                        const customerFATCADtlsDTOData = element.customerFATCADtlsDTO;
                        if (customerFATCADtlsDTOData && Array.isArray(customerFATCADtlsDTOData)) {
                            common_1.LoggingUtils.debug('Step 43 sync personal details ', methodName);
                            for (const data of customerFATCADtlsDTOData) {
                                investorDetailsObj.birthCity = data === null || data === void 0 ? void 0 : data.namCityBirth;
                                investorDetailsObj.fatherName = data === null || data === void 0 ? void 0 : data.namCustFather;
                                investorDetailsObj.spouseName = data === null || data === void 0 ? void 0 : data.namCustSpouse;
                                const countryData = await this.getCountryData(data === null || data === void 0 ? void 0 : data.codTaxCntry1, options);
                                const birthCountry = await this.getCountryData(data === null || data === void 0 ? void 0 : data.codCntryBirth, options);
                                investorDetailsObj.countryOfBirthId = birthCountry && birthCountry.id;
                                investorDetailsObj.taxResidentCountryId = countryData && countryData.id;
                            }
                        }
                        investorDetailsObj.motherName = element.namMotherMaiden;
                        // creating nominee investor details
                        if (investorDetailsArray.length > 0) {
                            const nomineeInvestor = await this.investorDetailsRepository.createAll(investorDetailsArray);
                            common_1.LoggingUtils.debug(`Step 44 creating records for investor nominee  `, methodName);
                        }
                        common_1.LoggingUtils.debug(`Step 45 updating app user investor object `, methodName);
                        //Keeping fk_identification_type = 3(for PAN BSE_CODE = C)
                        const identificationTypes = await this.identificationTypeRepository.findOne({
                            where: {
                                bseCode: 'C',
                                isActive: true
                            }
                        }, options);
                        if (identificationTypes) {
                            investorDetailsObj.identificationTypeId = identificationTypes.id;
                        }
                        await this.investorDetailsRepository.updateById(checkUniquePan.id, investorDetailsObj).catch(err => {
                            throw new Error('Error occurred when updating Investor details');
                        });
                        await this.appUserRepository.updateById(userId, { appUserStatus: common_1.Option.GLOBALOPTIONS.APPUSERSTATUS.singleCustomerID.value });
                    }
                    common_1.LoggingUtils.debug('Step 46 ETB SYNC DONE', methodName);
                    return { success: true, code: 'SUCCESS' };
                }
                else {
                    common_1.LoggingUtils.debug(`Step 47 User already exists with this customerId -  ${element === null || element === void 0 ? void 0 : element.customerId}`, methodName);
                    return { success: false, code: 'USER_EXIST' };
                }
            }
            else {
                common_1.LoggingUtils.debug('Step 48 No data to process', methodName);
                return {
                    success: false,
                    code: 'NO_DATA'
                };
            }
        }
        catch (err) {
            common_1.LoggingUtils.error(err.message, methodName);
            return { success: false, errorCode: 'ETB_SYNC_FAILED', code: err.message }; //@todo need to finalized error code
        }
    }
    convertToCamelCase(value) {
        let newArray = [];
        const splitedValue = value.split(' ');
        underscore_1.default.each(splitedValue, function (item) {
            if (item !== ('and' || 'AND' || '&')) {
                let convertedValue = item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
                newArray.push(convertedValue);
            }
            else {
                newArray.push(item);
            }
        });
        newArray = newArray.join(' ');
        return newArray;
    }
    generateAccountUniqueId(id) {
        const seriesStarts = 10000000;
        return seriesStarts + id + '';
    }
    async getHoldingType(holdingPattern, options) {
        const holdingTypes = await this.holdingTypeRepository.find({
            where: {
                isActive: true
            }
        }, options);
        return underscore_1.default.find(holdingTypes, function (item) {
            const coreBankCodes = item.coreBankCode;
            if (coreBankCodes === null || coreBankCodes === void 0 ? void 0 : coreBankCodes.includes(holdingPattern)) {
                return item;
            }
        });
    }
    async getCountryData(countryValue, options) {
        return await this.countryRepository.findOne({
            where: {
                bseCodeForNationality: countryValue,
                isActive: true
            }
        }, options);
    }
    async getOTP(transactionId, linkData) {
        try {
            const otpResponse = await this.coreBankingRepository.doGenerateOTP(transactionId, linkData);
            if (otpResponse && otpResponse.responseString) {
                return otpResponse.responseString;
            }
        }
        catch (err) {
            common_1.LoggingUtils.error(err);
            throw err;
        }
    }
    async verifyOTP(otp, refNo, transactionId, linkData) {
        try {
            const response = await this.coreBankingRepository.doVerifyOTP(otp, refNo, transactionId, linkData);
            if (response && response.responseString) {
                return response.responseString;
            }
        }
        catch (err) {
            common_1.LoggingUtils.error(err);
            throw err;
        }
    }
    async doPublishOTP(contactNumber, otp, transactionId, msgType = 'S') {
        try {
            const response = await this.coreBankingRepository.doPublishOTP(contactNumber, otp, transactionId, msgType);
            if (response && response.divisionCode && response.errorMsg == null) {
                return response.divisionCode;
            }
        }
        catch (err) {
            common_1.LoggingUtils.error(err);
            throw err;
        }
    }
    async addCommunicationMatrix(accountId, options) {
        try {
            if (accountId == undefined)
                throw 'USER ACCOUNT ID IS IN VALID';
            const communicationTopic = await this.communicationTopicRepository.find({ where: { isActive: true } }, options);
            const communicationTopicMap = communicationTopic.map(data => {
                return {
                    accountId: accountId,
                    communicationTopicId: data.id,
                    modeEmail: data.modeEmail,
                    modeSms: data.modeSms,
                    modePush: data.modePush,
                    toggleNotification: data.toggleNotification
                };
            });
            await this.communicationMatrixRepository.createAll(communicationTopicMap);
            return;
        }
        catch (error) {
            common_1.LoggingUtils.error(error);
            throw error;
        }
    }
    async fetchMaritalStatus(bankCode) {
        const options = [];
        const maritalStatus = common_1.Option.GLOBALOPTIONS.MARITALSTATUS;
        for (let i of Object.keys(maritalStatus)) {
            options.push(maritalStatus[i]);
        }
        const filter = options.filter(ele => ele.bankCode == bankCode)[0];
        if (filter) {
            return filter.value;
        }
        else {
            return null;
        }
    }
};
CoreBankingFacade = (0, tslib_1.__decorate)([
    (0, core_1.injectable)({ scope: core_1.BindingScope.APPLICATION }),
    (0, tslib_1.__param)(0, (0, repository_1.repository)(core_banking_repository_1.CoreBankingRepository)),
    (0, tslib_1.__param)(1, (0, repository_1.repository)(common_1.CountryRepository)),
    (0, tslib_1.__param)(2, (0, repository_1.repository)(common_1.OccupationRepository)),
    (0, tslib_1.__param)(3, (0, repository_1.repository)(common_1.WealthSourceRepository)),
    (0, tslib_1.__param)(4, (0, repository_1.repository)(common_1.PoliticallyExposureTypeRepository)),
    (0, tslib_1.__param)(5, (0, repository_1.repository)(common_1.StateRepository)),
    (0, tslib_1.__param)(6, (0, repository_1.repository)(common_1.AddressRepository)),
    (0, tslib_1.__param)(7, (0, repository_1.repository)(common_1.OverseesAddressRepository)),
    (0, tslib_1.__param)(8, (0, repository_1.repository)(common_1.AppUserRepository)),
    (0, tslib_1.__param)(9, (0, repository_1.repository)(common_1.InvestorDetailsRepository)),
    (0, tslib_1.__param)(10, (0, repository_1.repository)(common_1.IncomeSlabRepository)),
    (0, tslib_1.__param)(11, (0, repository_1.repository)(common_1.HoldingTypeRepository)),
    (0, tslib_1.__param)(12, (0, repository_1.repository)(common_1.InvestorTypeRepository)),
    (0, tslib_1.__param)(13, (0, repository_1.repository)(common_1.BankAccountTypeRepository)),
    (0, tslib_1.__param)(14, (0, repository_1.repository)(common_1.BankBranchRepository)),
    (0, tslib_1.__param)(15, (0, repository_1.repository)(common_1.AccountRepository)),
    (0, tslib_1.__param)(16, (0, repository_1.repository)(common_1.InvestorNomineeRepository)),
    (0, tslib_1.__param)(17, (0, repository_1.repository)(common_1.BankAccountRepository)),
    (0, tslib_1.__param)(18, (0, repository_1.repository)(common_1.IdentificationTypeRepository)),
    (0, tslib_1.__param)(19, (0, repository_1.repository)(common_1.CommunicationMatrixRepository)),
    (0, tslib_1.__param)(20, (0, repository_1.repository)(common_1.CommunicationTopicRepository)),
    (0, tslib_1.__metadata)("design:paramtypes", [core_banking_repository_1.CoreBankingRepository,
        common_1.CountryRepository,
        common_1.OccupationRepository,
        common_1.WealthSourceRepository,
        common_1.PoliticallyExposureTypeRepository,
        common_1.StateRepository,
        common_1.AddressRepository,
        common_1.OverseesAddressRepository,
        common_1.AppUserRepository,
        common_1.InvestorDetailsRepository,
        common_1.IncomeSlabRepository,
        common_1.HoldingTypeRepository,
        common_1.InvestorTypeRepository,
        common_1.BankAccountTypeRepository,
        common_1.BankBranchRepository,
        common_1.AccountRepository,
        common_1.InvestorNomineeRepository,
        common_1.BankAccountRepository,
        common_1.IdentificationTypeRepository,
        common_1.CommunicationMatrixRepository,
        common_1.CommunicationTopicRepository])
], CoreBankingFacade);
exports.CoreBankingFacade = CoreBankingFacade;
//# sourceMappingURL=core-banking.facade.js.map