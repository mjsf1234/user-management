"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UamLoginLogsFacade = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const common_1 = require("common");
const moment_timezone_1 = (0, tslib_1.__importDefault)(require("moment-timezone"));
// All business loigc goes inside Facade layer
let UamLoginLogsFacade = class UamLoginLogsFacade {
    constructor(uamLoginLogsRepository) {
        this.uamLoginLogsRepository = uamLoginLogsRepository;
    }
    async create(entity, options) {
        return this.uamLoginLogsRepository.create(entity, options);
    }
    async createAll(entities, options) {
        return this.uamLoginLogsRepository.createAll(entities, options);
    }
    async save(entity, options) {
        return this.uamLoginLogsRepository.save(entity, options);
    }
    async find(filter, options) {
        if (filter &&
            filter.where &&
            filter.where.and &&
            filter.where.and.length === 2 &&
            filter.where.and[1].loginDate &&
            filter.where.and[1].loginDate.lte) {
            let lteDate = new Date(filter.where.and[1].loginDate.lte);
            let gteDate = new Date(filter.where.and[0].loginDate.gte);
            gteDate.setHours(gteDate.getHours() - 5);
            gteDate.setMinutes(gteDate.getMinutes() - 30);
            lteDate.setDate(lteDate.getDate() + 1);
            lteDate.setHours(lteDate.getHours() - 5);
            lteDate.setMinutes(lteDate.getMinutes() - 30);
            filter.where.and[1].loginDate.lte = lteDate;
            filter.where.and[0].loginDate.gte = gteDate;
        }
        return this.uamLoginLogsRepository.find(filter, options);
    }
    async findOne(filter, options) {
        return this.uamLoginLogsRepository.findOne(filter, options);
    }
    async findById(id, filter, options) {
        return this.uamLoginLogsRepository.findById(id, filter, options);
    }
    async update(entity, options) {
        return this.uamLoginLogsRepository.update(entity, options);
    }
    async delete(entity, options) {
        return this.uamLoginLogsRepository.delete(entity, options);
    }
    async updateAll(data, where, options) {
        return this.uamLoginLogsRepository.updateAll(data, where, options);
    }
    async updateById(id, data, options) {
        return this.uamLoginLogsRepository.updateById(id, data, options);
    }
    async replaceById(id, data, options) {
        return this.uamLoginLogsRepository.replaceById(id, data, options);
    }
    async deleteAll(where, options) {
        return this.uamLoginLogsRepository.deleteAll(where, options);
    }
    async deleteById(id, options) {
        return this.uamLoginLogsRepository.deleteById(id, options);
    }
    async count(where, options) {
        return this.uamLoginLogsRepository.count(where, options);
    }
    async exists(id, options) {
        return this.uamLoginLogsRepository.exists(id, options);
    }
    async fetchLoginLogs(filter, options) {
        const results = await this.find(filter, options);
        return results;
    }
    async createUamLoginLogs(input, type, token) {
        if (type == "login") {
            if (!input)
                return Promise.reject(new common_1.RestError(465, "There was an issue with the request"));
            await this.uamLoginLogsRepository.create(input);
        }
        if (type == "logout") {
            const currentDate = new Date();
            const uamUamLoginLogsRecord = await this.uamLoginLogsRepository.findOne({
                where: {
                    token: token
                }
            });
            if (uamUamLoginLogsRecord && uamUamLoginLogsRecord.id)
                await this.uamLoginLogsRepository.updateById(uamUamLoginLogsRecord === null || uamUamLoginLogsRecord === void 0 ? void 0 : uamUamLoginLogsRecord.id, { logoutTime: currentDate.toLocaleTimeString() });
        }
    }
    async downloadLoginLogsReport(res, filter, options) {
        let headers = [
            { header: 'User Id', key: 'userId', width: 32 },
            { header: 'Employee Code', key: 'employeeCode', width: 32 },
            { header: 'Employee Name', key: 'employeeName', width: 32 },
            { header: 'Login Date', key: 'loginDate', width: 32 },
            { header: 'Login Time', key: 'loginTime', width: 32 },
            { header: 'Logout Time', key: 'logoutTime', width: 32 },
            { header: 'Application Name', key: 'applicationName', width: 32 },
            { header: 'IP Address', key: 'ipAddress', width: 32 },
            { header: 'Asset Details', key: 'assetDetails', width: 32 },
        ];
        try {
            const data = await this.find(filter, options);
            //   // Create a new Intl.DateTimeFormat object
            // const formatter = new Intl.DateTimeFormat("en-US", {
            //   day: "2-digit",
            //   month: "short",
            //   year: "numeric"
            // });
            data.forEach((record) => {
                if (record && record.loginDate && record.loginDate != undefined) {
                    record.loginDate = (0, moment_timezone_1.default)(record.loginDate, 'YYYY-MM-DD HH:mm:ss').format('DD-MMM-YYYY');
                }
            });
            let excelSheet = common_1.ExcelUtils.createExcel(null, 'Login Logs Report', headers, data, null);
            const result = await excelSheet.xlsx.writeBuffer();
            return result;
        }
        catch (error) {
            common_1.LoggingUtils.error('Some Error Occured');
            return new common_1.RestError(400, 'Error occured while exporting Login Logs Report');
        }
    }
};
UamLoginLogsFacade = (0, tslib_1.__decorate)([
    (0, core_1.injectable)({ scope: core_1.BindingScope.APPLICATION }),
    (0, tslib_1.__param)(0, (0, repository_1.repository)(common_1.UamLoginLogsRepository)),
    (0, tslib_1.__metadata)("design:paramtypes", [common_1.UamLoginLogsRepository])
], UamLoginLogsFacade);
exports.UamLoginLogsFacade = UamLoginLogsFacade;
//# sourceMappingURL=uam-login-logs.facade.js.map