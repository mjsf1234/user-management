"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KravyRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const common_1 = require("common");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let KravyRepository = class KravyRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource) {
        super(models_1.Karvy, dataSource);
    }
    //fetch kra kyc
    async KarvyGetMobileAndEmailBasedOnFolio(Appid, Apppwd, AppIden, AgentCode, BranchCode, AMC_Code, Folio_No, transactionId) {
        // console.log(Appid, Apppwd, AppIden,AgentCode,BranchCode,AMC_Code,Folio_No);
        let response;
        const urls = this.dataSource.settings.operations.filter((temp) => Object.keys(temp.functions)[0] == 'KarvyGetMobileAndEmailBasedOnFolio')[0];
        try {
            response = await this.dataSource.DataAccessObject.KarvyGetMobileAndEmailBasedOnFolio(Appid, Apppwd, AppIden, AgentCode, BranchCode, AMC_Code, Folio_No);
            common_1.LogApiCallUtils.sendMessageOutgoingApiCall({
                url: urls.template.url,
                request: {
                    Appid: Appid,
                    Apppwd: Apppwd,
                    AppIden: AppIden,
                    AgentCode: AgentCode,
                    BranchCode: BranchCode,
                    AMC_Code: AMC_Code,
                    Folio_No: Folio_No
                },
                response: response,
                success: true,
                transactionId: transactionId,
                externalSystemName: common_1.Option.GLOBALOPTIONS.EXTERNALAPISYSTEMNAME.KARVY
            });
            return response;
        }
        catch (error) {
            common_1.LogApiCallUtils.sendMessageOutgoingApiCall({
                url: urls.template.url,
                request: {
                    Appid: Appid,
                    Apppwd: Apppwd,
                    AppIden: AppIden,
                    AgentCode: AgentCode,
                    BranchCode: BranchCode,
                    AMC_Code: AMC_Code,
                    Folio_No: Folio_No
                },
                response: error.message,
                success: false,
                transactionId: transactionId,
                externalSystemName: common_1.Option.GLOBALOPTIONS.EXTERNALAPISYSTEMNAME.KARVY,
            });
            throw error;
        }
    }
    async CamsGetMobileAndEmailBasedOnFolio(AMCCode, ApplicationID, Password, FolioNo, PAN, transactionId) {
        // console.log(AMCCode, ApplicationID, Password,FolioNo,PAN);
        let response;
        AMCCode = process.env.NODE_ENV != 'production' ? `T${AMCCode}` : AMCCode;
        const urls = this.dataSource.settings.operations.filter((temp) => Object.keys(temp.functions)[0] == 'CamsGetMobileAndEmailBasedOnFolio')[0];
        try {
            response = await this.dataSource.DataAccessObject.CamsGetMobileAndEmailBasedOnFolio(AMCCode, ApplicationID, Password, FolioNo, PAN);
            common_1.LogApiCallUtils.sendMessageOutgoingApiCall({
                url: urls.template.url,
                request: {
                    AMCCode: AMCCode,
                    ApplicationID: ApplicationID,
                    Password: Password,
                    FolioNo: FolioNo,
                    PAN: PAN
                },
                response: response,
                success: true,
                transactionId: transactionId,
                externalSystemName: common_1.Option.GLOBALOPTIONS.EXTERNALAPISYSTEMNAME.KARVY
            });
            return response;
        }
        catch (error) {
            common_1.LogApiCallUtils.sendMessageOutgoingApiCall({
                url: urls.template.url,
                request: {
                    AMCCode: AMCCode,
                    ApplicationID: ApplicationID,
                    Password: Password,
                    FolioNo: FolioNo,
                    PAN: PAN
                },
                response: error.message,
                success: false,
                transactionId: transactionId,
                externalSystemName: common_1.Option.GLOBALOPTIONS.EXTERNALAPISYSTEMNAME.KARVY,
            });
            throw error;
        }
    }
};
KravyRepository = (0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, core_1.inject)('datasources.karvy')),
    (0, tslib_1.__metadata)("design:paramtypes", [datasources_1.KarvyDataSource])
], KravyRepository);
exports.KravyRepository = KravyRepository;
//# sourceMappingURL=karvyFetchMobileEmail.repository.js.map