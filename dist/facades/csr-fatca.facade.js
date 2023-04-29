"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsrFatcaFacade = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const common_1 = require("common");
const underscore_1 = (0, tslib_1.__importDefault)(require("underscore"));
// All business loigc goes inside Facade layer
let CsrFatcaFacade = class CsrFatcaFacade {
    constructor(csrFatcaRepository, userManagementAppFileRepository) {
        this.csrFatcaRepository = csrFatcaRepository;
        this.userManagementAppFileRepository = userManagementAppFileRepository;
    }
    async create(entity, options) {
        return this.csrFatcaRepository.create(entity, options);
    }
    async createAll(entities, options) {
        return this.csrFatcaRepository.createAll(entities, options);
    }
    async save(entity, options) {
        return this.csrFatcaRepository.save(entity, options);
    }
    async find(filter, options) {
        return this.csrFatcaRepository.find(filter, options);
    }
    async findOne(filter, options) {
        return this.csrFatcaRepository.findOne(filter, options);
    }
    async findById(id, filter, options) {
        return this.csrFatcaRepository.findById(id, filter, options);
    }
    async update(entity, options) {
        return this.csrFatcaRepository.update(entity, options);
    }
    async delete(entity, options) {
        return this.csrFatcaRepository.delete(entity, options);
    }
    async updateAll(data, where, options) {
        return this.csrFatcaRepository.updateAll(data, where, options);
    }
    async updateById(id, data, options) {
        return this.csrFatcaRepository.updateById(id, data, options);
    }
    async replaceById(id, data, options) {
        return this.csrFatcaRepository.replaceById(id, data, options);
    }
    async deleteAll(where, options) {
        return this.csrFatcaRepository.deleteAll(where, options);
    }
    async deleteById(id, options) {
        return this.csrFatcaRepository.deleteById(id, options);
    }
    async count(where, options) {
        return this.csrFatcaRepository.count(where, options);
    }
    async exists(id, options) {
        return this.csrFatcaRepository.exists(id, options);
    }
    async updatecsrFatcaStatus(data, options) {
        try {
            const count = await this.csrFatcaRepository.updateAll({
                status: common_1.Option.GLOBALOPTIONS.FATCAGENERATIONSTATUS.success.value,
                uploadedDate: new Date()
            }, {
                and: [
                    {
                        rtaId: data.rtaId
                    },
                    {
                        accountId: { inq: data.accountIds }
                    }
                ]
            });
            return count;
        }
        catch (err) {
            throw err;
        }
    }
    async generateFatca(options) {
        try {
            let message = new common_1.TransactionalDataRefreshingQueueMessage();
            message.eventType = common_1.TransactionalDataRefreshingQueueMessageEventType.FATCA_FILE_GENERATION_CRON;
            await common_1.QueueProducer.sendMessageInTransactionalDataRefreshingQueue(message).catch(err => {
                throw new Error(err);
            });
            return { success: true, message: 'Currently, No FATCA available for generation' };
        }
        catch (error) {
            common_1.LoggingUtils.error('Some Error Occurred');
            throw error;
        }
    }
    async fetchFatca(paginator, options) {
        var _a, _b, _c;
        try {
            const result = [];
            const filter = underscore_1.default.isEmpty(paginator.where) ? null : paginator.where;
            let countRes, groupdata;
            // Query without filter
            const countQuery = `
      select count(distinct fk_id_fatca_doc_file)
      from csr_fatca
      where fk_id_fatca_doc_file is not null and is_active=$1
      `;
            // Query with rta filter
            const countQueryRta = `
      select count(distinct fk_id_fatca_doc_file)
      from csr_fatca
      where fk_id_fatca_doc_file is not null and is_active=$1
      and fk_id_rta = $2
      `;
            // Query with date filter
            const countQuerygGenDate = `
      select count(distinct fk_id_fatca_doc_file)
      from csr_fatca
      where fk_id_fatca_doc_file is not null and is_active=$1
      and generated_date::text ilike $2
      `;
            // Query with filter
            const countQueryFilter = `
      select count(distinct fk_id_fatca_doc_file)
      from csr_fatca
      where fk_id_fatca_doc_file is not null and is_active=$1
      and fk_id_rta = $2
      and generated_date::text ilike $3
      `;
            const query = `
        select * from (
        select count(*) noofrecords, fk_id_fatca_doc_file usermanagementappfileid FROM csr_fatca
        where is_active = $1
        and fk_id_fatca_doc_file is not null
        group by fk_id_fatca_doc_file
        ) as grp order by  userManagementAppFileId DESC
        offset $2 limit $3
      `;
            const queryRta = `
        select * from (
        select count(*) noofrecords, fk_id_fatca_doc_file usermanagementappfileid FROM csr_fatca
        where is_active = $1
        and fk_id_fatca_doc_file is not null
        and fk_id_rta = $4
        group by fk_id_fatca_doc_file
        ) as grp order by  userManagementAppFileId DESC
        offset $2 limit $3
    `;
            const queryGenDate = `
       select * from (
       select count(*) noofrecords, fk_id_fatca_doc_file usermanagementappfileid FROM csr_fatca
       where is_active = $1
       and fk_id_fatca_doc_file is not null
       and generated_date::text ilike $4
       group by fk_id_fatca_doc_file
       ) as grp order by  userManagementAppFileId DESC
       offset $2 limit $3
     `;
            const queryfilter = `
       select * from (
       select count(*) noofrecords, fk_id_fatca_doc_file usermanagementappfileid FROM csr_fatca
       where is_active = $1
       and fk_id_fatca_doc_file is not null
       and fk_id_rta = $4
       and generated_date::text ilike $5
       group by fk_id_fatca_doc_file
       ) as grp order by  userManagementAppFileId DESC
       offset $2 limit $3
     `;
            //  Fetching count
            if (underscore_1.default.isEmpty(filter)) {
                countRes = await this.csrFatcaRepository.execute(countQuery, [true], options);
            }
            else {
                if (filter.rtaId && filter.generatedDate) {
                    countRes = await this.csrFatcaRepository.execute(countQueryFilter, [true, filter.rtaId, filter.generatedDate], options);
                }
                else if (filter.generatedDate && filter.generatedDate !== null && filter.generatedDate !== undefined) {
                    countRes = await this.csrFatcaRepository.execute(countQuerygGenDate, [true, filter.generatedDate], options);
                }
                else if (filter.rtaId && filter.rtaId !== null && filter.rtaId !== undefined) {
                    countRes = await this.csrFatcaRepository.execute(countQueryRta, [true, filter.rtaId], options);
                }
            }
            if (underscore_1.default.isEmpty(countRes)) {
                return { count: 0, data: [] };
            }
            //  Fetching data with pagination
            if (underscore_1.default.isEmpty(filter)) {
                groupdata = await this.csrFatcaRepository.execute(query, [true, paginator.offset, paginator.limit], options);
            }
            else {
                if (filter.rtaId && filter.generatedDate) {
                    groupdata = await this.csrFatcaRepository.execute(queryfilter, [true, paginator.offset, paginator.limit, filter.rtaId, filter.generatedDate], options);
                }
                else if (filter.generatedDate && filter.generatedDate !== null && filter.generatedDate !== undefined) {
                    groupdata = await this.csrFatcaRepository.execute(queryGenDate, [true, paginator.offset, paginator.limit, filter.generatedDate], options);
                }
                else if (filter.rtaId && filter.rtaId !== null && filter.rtaId !== undefined) {
                    groupdata = await this.csrFatcaRepository.execute(queryRta, [true, paginator.offset, paginator.limit, filter.rtaId], options);
                }
            }
            if (underscore_1.default.isEmpty(groupdata)) {
                return { count: 0, data: [] };
            }
            const ids = groupdata.map((ele) => ele.usermanagementappfileid);
            const appFiles = await this.userManagementAppFileRepository.find({
                where: {
                    isActive: true,
                    containerName: common_1.FileStorageContainerConfig.getGcpContainerName('fatca'),
                    id: {
                        inq: ids
                    }
                },
                include: ['csrFatca']
            }, options);
            for (let files of appFiles) {
                const csrFile = groupdata.filter((ele) => ele.usermanagementappfileid == files.id)[0];
                result.push({
                    status: (_a = files.csrFatca) === null || _a === void 0 ? void 0 : _a.status,
                    noOfRecords: csrFile.noofrecords,
                    dateGenerated: (_b = files.csrFatca) === null || _b === void 0 ? void 0 : _b.generatedDate,
                    rtaId: (_c = files.csrFatca) === null || _c === void 0 ? void 0 : _c.rtaId,
                    userManagementAppFile: files
                });
            }
            return { count: countRes[0].count, data: result };
        }
        catch (error) {
            throw error;
        }
    }
};
CsrFatcaFacade = (0, tslib_1.__decorate)([
    (0, core_1.injectable)({ scope: core_1.BindingScope.APPLICATION }),
    (0, tslib_1.__param)(0, (0, repository_1.repository)(common_1.CsrFatcaRepository)),
    (0, tslib_1.__param)(1, (0, repository_1.repository)(common_1.UserManagementAppFileRepository)),
    (0, tslib_1.__metadata)("design:paramtypes", [common_1.CsrFatcaRepository,
        common_1.UserManagementAppFileRepository])
], CsrFatcaFacade);
exports.CsrFatcaFacade = CsrFatcaFacade;
//# sourceMappingURL=csr-fatca.facade.js.map