"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NomineeDocumentFacade = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const common_1 = require("common");
const common_2 = require("common");
const nominee_document_generation_engine_1 = require("../engines/nominee-document-generation.engine");
// All business loigc goes inside Facade layer
let NomineeDocumentFacade = class NomineeDocumentFacade {
    constructor(nomineeDocumentRepository, nomineeDocumentGenerationEngine, requestToEngineRepository) {
        this.nomineeDocumentRepository = nomineeDocumentRepository;
        this.nomineeDocumentGenerationEngine = nomineeDocumentGenerationEngine;
        this.requestToEngineRepository = requestToEngineRepository;
    }
    async create(entity, options) {
        return this.nomineeDocumentRepository.create(entity, options);
    }
    async createAll(entities, options) {
        return this.nomineeDocumentRepository.createAll(entities, options);
    }
    async save(entity, options) {
        return this.nomineeDocumentRepository.save(entity, options);
    }
    async find(filter, options) {
        return this.nomineeDocumentRepository.find(filter, options);
    }
    async findOne(filter, options) {
        return this.nomineeDocumentRepository.findOne(filter, options);
    }
    async findById(id, filter, options) {
        return this.nomineeDocumentRepository.findById(id, filter, options);
    }
    async update(entity, options) {
        return this.nomineeDocumentRepository.update(entity, options);
    }
    async delete(entity, options) {
        return this.nomineeDocumentRepository.delete(entity, options);
    }
    async updateAll(data, where, options) {
        return this.nomineeDocumentRepository.updateAll(data, where, options);
    }
    async updateById(id, data, options) {
        return this.nomineeDocumentRepository.updateById(id, data, options);
    }
    async replaceById(id, data, options) {
        return this.nomineeDocumentRepository.replaceById(id, data, options);
    }
    async deleteAll(where, options) {
        return this.nomineeDocumentRepository.deleteAll(where, options);
    }
    async deleteById(id, options) {
        return this.nomineeDocumentRepository.deleteById(id, options);
    }
    async count(where, options) {
        return this.nomineeDocumentRepository.count(where, options);
    }
    async exists(id, options) {
        return this.nomineeDocumentRepository.exists(id, options);
    }
    async generateNomineeDocuments(obj, options) {
        return new Promise(async (resolve, reject) => {
            let data = await this.requestToEngineRepository.create({
                eventType: 'NOMINEEDOCUMENTGENERATION',
                requestedDate: new Date(),
                status: common_1.Option.GLOBALOPTIONS['REQUESTTOENGINESTATUS']['initaited'].value,
                parameters: obj
            });
            let message = new common_1.TransactionalDataRefreshingQueueMessage();
            message.eventType = common_1.TransactionalDataRefreshingQueueMessageEventType.ENGINE_REQUEST_FROM_SERVICE;
            message.rowId = data.id;
            //@todo -- need to remove the logs
            common_1.LoggingUtils.debug('sending message in Transaction Queue', message);
            await common_1.QueueProducer.sendMessageInTransactionalDataRefreshingMediumPriorityQueue(message);
            resolve({
                message: 'Process started to Generate Nominee Documents Please Check in Some Time.'
            });
        });
    }
    async nomineeDocumentDetails(filter, filterObject, options) {
        return new Promise(async (resolve, reject) => {
            let count;
            let response = {};
            count = await this.nomineeDocumentRepository.count(filter, options);
            return this.nomineeDocumentRepository
                .find({ ...filter }, options)
                .then(async (result) => {
                let searchCriteria = new Map();
                let valueToSearch;
                filterObject.where.find((data) => {
                    searchCriteria.set(Object.keys(data)[0], Object.values(data)[0]);
                });
                let updatedArray = result.filter(data => {
                    if (searchCriteria.has('amcCode')) {
                        if (data.serviceProvider) {
                            valueToSearch = searchCriteria.get('amcCode').toLowerCase();
                            if (!data.serviceProvider.primaryAMCCode.toLowerCase().includes(valueToSearch)) {
                                return false;
                            }
                        }
                    }
                    if (searchCriteria.has('accountUniqueId')) {
                        if (data.account) {
                            valueToSearch = searchCriteria.get('accountUniqueId').toLowerCase();
                            if (!data.account.uniqueId.toLowerCase().includes(valueToSearch)) {
                                return false;
                            }
                        }
                    }
                    if (searchCriteria.has('panNumber')) {
                        if (data.account) {
                            valueToSearch = searchCriteria.get('panNumber').toLowerCase();
                            if (!data.account.primaryHolder.investorDetails.panCardNumber.toLowerCase().includes(valueToSearch)) {
                                return false;
                            }
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
    async nomineeDocumentStatusUpdate(ids, status, options) {
        return this.nomineeDocumentRepository.updateAll({
            status: status
        }, {
            id: { inq: ids }
        }, options);
    }
};
NomineeDocumentFacade = (0, tslib_1.__decorate)([
    (0, core_1.injectable)({ scope: core_1.BindingScope.APPLICATION }),
    (0, tslib_1.__param)(0, (0, repository_1.repository)(common_2.NomineeDocumentRepository)),
    (0, tslib_1.__param)(1, (0, core_1.service)(nominee_document_generation_engine_1.NomineeDocumentGenerationEngine)),
    (0, tslib_1.__param)(2, (0, repository_1.repository)(common_2.RequestToEngineRepository)),
    (0, tslib_1.__metadata)("design:paramtypes", [common_2.NomineeDocumentRepository,
        nominee_document_generation_engine_1.NomineeDocumentGenerationEngine,
        common_2.RequestToEngineRepository])
], NomineeDocumentFacade);
exports.NomineeDocumentFacade = NomineeDocumentFacade;
//# sourceMappingURL=nominee-document.facade.js.map