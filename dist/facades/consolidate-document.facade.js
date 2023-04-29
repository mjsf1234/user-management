"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsolidatedDocumentFacade = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const bluebird_1 = require("bluebird");
const common_1 = require("common");
const common_2 = require("common");
const app_constant_1 = (0, tslib_1.__importDefault)(require("common/dist/constants/app-constant"));
const moment_1 = (0, tslib_1.__importDefault)(require("moment"));
const _ = require("underscore");
// All business loigc goes inside Facade layer
let ConsolidatedDocumentFacade = class ConsolidatedDocumentFacade {
    constructor(ConsolidatedDocumentRepository, transactionFeedLogRepository) {
        this.ConsolidatedDocumentRepository = ConsolidatedDocumentRepository;
        this.transactionFeedLogRepository = transactionFeedLogRepository;
    }
    async create(entity, options) {
        return this.ConsolidatedDocumentRepository.create(entity, options);
    }
    async createAll(entities, options) {
        return this.ConsolidatedDocumentRepository.createAll(entities, options);
    }
    async save(entity, options) {
        return this.ConsolidatedDocumentRepository.save(entity, options);
    }
    async find(filter, options) {
        return this.ConsolidatedDocumentRepository.find(filter, options);
    }
    async findOne(filter, options) {
        return this.ConsolidatedDocumentRepository.findOne(filter, options);
    }
    async findById(id, filter, options) {
        return this.ConsolidatedDocumentRepository.findById(id, filter, options);
    }
    async update(entity, options) {
        return this.ConsolidatedDocumentRepository.update(entity, options);
    }
    async delete(entity, options) {
        return this.ConsolidatedDocumentRepository.delete(entity, options);
    }
    async updateAll(data, where, options) {
        return this.ConsolidatedDocumentRepository.updateAll(data, where, options);
    }
    async updateById(id, data, options) {
        return this.ConsolidatedDocumentRepository.updateById(id, data, options);
    }
    async replaceById(id, data, options) {
        return this.ConsolidatedDocumentRepository.replaceById(id, data, options);
    }
    async deleteAll(where, options) {
        return this.ConsolidatedDocumentRepository.deleteAll(where, options);
    }
    async deleteById(id, options) {
        return this.ConsolidatedDocumentRepository.deleteById(id, options);
    }
    async count(where, options) {
        return this.ConsolidatedDocumentRepository.count(where, options);
    }
    async exists(id, options) {
        return this.ConsolidatedDocumentRepository.exists(id, options);
    }
    async ConsolidatedDocumentMapping(ConsolidatedDocument, options) {
        try {
            //get the ConsolidatedDocument by ids
            const ConsolidatedDocumentIds = ConsolidatedDocument.map(element => element.ConsolidatedDocumentId);
            const asset = [];
            const product = [];
            const ConsolidatedDocumentCategory = [];
            const ConsolidatedDocumentCategoryGroup = [];
            let ConsolidatedDocumentData = await this.ConsolidatedDocumentRepository.find({
                where: {
                    id: { inq: ConsolidatedDocumentIds }
                },
                include: [
                    { relation: 'asset' },
                    { relation: 'product' },
                    { relation: 'ConsolidatedDocumentCategory' },
                    { relation: 'ConsolidatedDocumentCategoryGroup' }
                ]
            }, options);
            //loop over the ConsolidatedDocument and add the weight from the request to the object
            for (let i = 0; i < ConsolidatedDocumentData.length; i++) {
                for (let j = 0; j < ConsolidatedDocument.length; j++) {
                    if (ConsolidatedDocumentData[i].id == ConsolidatedDocument[j].ConsolidatedDocumentId) {
                        //check if assets exist
                        if (ConsolidatedDocumentData[i].asset) {
                            asset.push({
                                ...ConsolidatedDocumentData[i].asset,
                                ConsolidatedDocumentweight: ConsolidatedDocument[j].ConsolidatedDocumentweight
                            });
                        }
                        //check if product exist
                        if (ConsolidatedDocumentData[i].product) {
                            product.push({
                                ...ConsolidatedDocumentData[i].product,
                                ConsolidatedDocumentweight: ConsolidatedDocument[j].ConsolidatedDocumentweight
                            });
                        }
                        //check if ConsolidatedDocumentCategory exist
                        if (ConsolidatedDocumentData[i].ConsolidatedDocumentCategory) {
                            ConsolidatedDocumentCategory.push({
                                ...ConsolidatedDocumentData[i].ConsolidatedDocumentCategory,
                                ConsolidatedDocumentweight: ConsolidatedDocument[j].ConsolidatedDocumentweight
                            });
                        }
                        //check if ConsolidatedDocumentCategory exist
                        if (ConsolidatedDocumentData[i].ConsolidatedDocumentCategoryGroup) {
                            ConsolidatedDocumentCategoryGroup.push({
                                ...ConsolidatedDocumentData[i].ConsolidatedDocumentCategoryGroup,
                                ConsolidatedDocumentweight: ConsolidatedDocument[j].ConsolidatedDocumentweight
                            });
                        }
                    }
                }
            }
            let asssetGrouping = _.groupBy(asset, ele => `asset-${ele.id}`);
            let productGrouping = _.groupBy(product, ele => `product-${ele.id}`);
            let ConsolidatedDocumentCategoryGrouping = _.groupBy(ConsolidatedDocumentCategory, ele => `ConsolidatedDocumentCategory-${ele.id}`);
            let ConsolidatedDocumentCategoryGroupGrouping = _.groupBy(ConsolidatedDocumentCategoryGroup, ele => `ConsolidatedDocumentCategoryGroupGrouping-${ele.id}`);
            let assestFinal = [];
            let productFinal = [];
            let ConsolidatedDocumentCategoryFinal = [];
            let ConsolidatedDocumentCategoryGroupFinal = [];
            //lopp over the grouping to add the weight for asset
            const assetsKeys = Object.keys(asssetGrouping);
            for (let key of assetsKeys) {
                let weight = 0;
                _.each(asssetGrouping[key], data => (weight = weight + data.ConsolidatedDocumentweight));
                assestFinal.push({
                    assetId: asssetGrouping[key][0].id,
                    assetName: asssetGrouping[key][0].name,
                    weightage: weight
                });
            }
            //lopp over the grouping to add the weight for product
            const productKeys = Object.keys(productGrouping);
            for (let key of productKeys) {
                let weight = 0;
                _.each(productGrouping[key], data => (weight = weight + data.ConsolidatedDocumentweight));
                productFinal.push({
                    productId: productGrouping[key][0].id,
                    productName: productGrouping[key][0].name,
                    weightage: weight
                });
            }
            //  //lopp over the grouping to add the weight for ConsolidatedDocumentCategoryFinal
            const ConsolidatedDocumentCategoryKeys = Object.keys(ConsolidatedDocumentCategoryGrouping);
            for (let key of ConsolidatedDocumentCategoryKeys) {
                let weight = 0;
                _.each(ConsolidatedDocumentCategoryGrouping[key], data => (weight = weight + data.ConsolidatedDocumentweight));
                ConsolidatedDocumentCategoryFinal.push({
                    ConsolidatedDocumentCategoryId: ConsolidatedDocumentCategoryGrouping[key][0].id,
                    ConsolidatedDocumentCategoryName: ConsolidatedDocumentCategoryGrouping[key][0].name,
                    weightage: weight
                });
            }
            // //lopp over the grouping to add the weight for ConsolidatedDocumentCategoryGroupGrouping
            const ConsolidatedDocumentCategoryGroupKeys = Object.keys(ConsolidatedDocumentCategoryGroupGrouping);
            for (let key of ConsolidatedDocumentCategoryGroupKeys) {
                let weight = 0;
                _.each(ConsolidatedDocumentCategoryGrouping[key], data => (weight = weight + data.ConsolidatedDocumentweight));
                ConsolidatedDocumentCategoryGroupFinal.push({
                    ConsolidatedDocumentCategoryGroupId: ConsolidatedDocumentCategoryGroupGrouping[key][0].id,
                    ConsolidatedDocumentCategoryGroupName: ConsolidatedDocumentCategoryGroupGrouping[key][0].name,
                    weightage: weight
                });
            }
            return {
                asset: assestFinal,
                product: productFinal,
                category: ConsolidatedDocumentCategoryFinal,
                categoryGrouping: ConsolidatedDocumentCategoryGroupFinal
            };
        }
        catch (error) {
            return Promise.reject(new common_1.RestError(400, 'Request Failes', { systemcode: 1098 }));
        }
    }
    async createConsolidatedDocumentEntry(appUserId, accountId, options) {
        const methodName = 'createConsolidatedDocumentEntry';
        try {
            const constExistingConsolidatedDoc = await this.ConsolidatedDocumentRepository.find({
                where: { appUserId: appUserId, isActive: true }
            }, options);
            if (constExistingConsolidatedDoc && constExistingConsolidatedDoc.length === 0) {
                const constConsolidatedDocCams = {
                    accountId: accountId,
                    status: common_1.Option.GLOBALOPTIONS.CONSOLIDATEDDOCUMENTSTATUS.pending.value,
                    rtaId: app_constant_1.default.RTA_CAMS,
                    appUserId: appUserId,
                };
                const constConsolidatedDocKarvy = {
                    accountId: accountId,
                    status: common_1.Option.GLOBALOPTIONS.CONSOLIDATEDDOCUMENTSTATUS.pending.value,
                    rtaId: app_constant_1.default.RTA_KARVY,
                    appUserId: appUserId,
                };
                const createConsolidatedDoc = await this.ConsolidatedDocumentRepository.createAll([
                    constConsolidatedDocCams,
                    constConsolidatedDocKarvy
                ], options);
                if (!createConsolidatedDoc) {
                    throw new Error('Error while creating Consolidated Document records');
                }
            }
            else if (constExistingConsolidatedDoc.length === 1) {
                let consolidatedDoc = {};
                if (constExistingConsolidatedDoc[0].rtaId == app_constant_1.default.RTA_KARVY) {
                    consolidatedDoc = {
                        accountId: accountId,
                        status: common_1.Option.GLOBALOPTIONS.CONSOLIDATEDDOCUMENTSTATUS.pending.value,
                        rtaId: app_constant_1.default.RTA_KARVY,
                        appUserId: appUserId,
                        generatedDate: new Date()
                    };
                }
                else {
                    consolidatedDoc = {
                        accountId: accountId,
                        status: common_1.Option.GLOBALOPTIONS.CONSOLIDATEDDOCUMENTSTATUS.pending.value,
                        rtaId: app_constant_1.default.RTA_CAMS,
                        appUserId: appUserId,
                        generatedDate: new Date()
                    };
                }
                const createConsolidatedDoc = await this.ConsolidatedDocumentRepository.createAll([consolidatedDoc], options);
                if (!createConsolidatedDoc) {
                    throw new Error('Error while creating Consolidated Document records');
                }
            }
        }
        catch (error) {
            common_1.LoggingUtils.error(error, methodName);
            throw error;
        }
    }
    async consolidateStatusUpdate(rtaId, accountId, status, options) {
        return this.ConsolidatedDocumentRepository.updateAll({
            status: status
        }, {
            rtaId: rtaId,
            accountId: { inq: accountId }
        }, options);
    }
    async fetchRtaPendingConsolidatedDocuments(rtaNumber, filterObject, options) {
        const methodName = 'fetchRtaPendingConsolidatedDocuments';
        try {
            let customerAccountIds = [];
            let finalCustomerAccountIds = [];
            let data = [];
            let consolidatedDocuments = await this.ConsolidatedDocumentRepository.find({
                order: filterObject.order,
                where: {
                    isActive: true,
                    rtaId: rtaNumber,
                    status: common_1.Option.GLOBALOPTIONS.CONSOLIDATEDDOCUMENTSTATUS.pending.value
                },
                include: [
                    {
                        relation: "appUser"
                    },
                    {
                        relation: "appFile"
                    },
                    {
                        relation: "account",
                        scope: {
                            include: [
                                {
                                    relation: "accountAppFileMapping",
                                    scope: {
                                        where: {
                                            isActive: true
                                        },
                                        include: [
                                            {
                                                relation: "userManagementAppFile"
                                            }
                                        ]
                                    }
                                },
                                {
                                    relation: "primaryHolder",
                                    scope: {
                                        include: [
                                            {
                                                relation: "investorDetails",
                                                scope: {
                                                    include: [
                                                        {
                                                            relation: "panImageFile"
                                                        },
                                                        {
                                                            relation: "kycImageFile"
                                                        }
                                                    ]
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    },
                    {
                        relation: "rta"
                    },
                    {
                        relation: "bankAccount",
                        scope: {
                            include: [
                                {
                                    relation: "chequeImageFile"
                                }
                            ]
                        }
                    }
                ]
            }, options);
            if (!consolidatedDocuments || consolidatedDocuments.length === 0) {
                return data;
            }
            customerAccountIds = _.uniq(_.pluck(consolidatedDocuments, 'accountId'));
            let transactionFeedLogs = await this.transactionFeedLogRepository.find({
                where: {
                    rtaId: rtaNumber,
                    and: [
                        {
                            generatedDate: {
                                gte: (0, moment_1.default)().startOf('day')
                            }
                        },
                        {
                            generatedDate: {
                                lte: (0, moment_1.default)().endOf('day')
                            }
                        }
                    ]
                },
                include: [
                    {
                        relation: 'orderItems',
                        scope: {
                            include: [
                                {
                                    relation: 'order',
                                    scope: {
                                        where: {
                                            accountId: {
                                                inq: customerAccountIds
                                            }
                                        }
                                    }
                                }
                            ]
                        }
                    }
                ]
            }, options);
            if (!transactionFeedLogs) {
                return data;
            }
            else {
                transactionFeedLogs.forEach((item) => {
                    if (item && item.orderItems) {
                        item.orderItems.forEach((orderItems) => {
                            if (orderItems && orderItems.order && orderItems.order.accountId) {
                                finalCustomerAccountIds.push(orderItems.order.accountId);
                            }
                        });
                    }
                });
                finalCustomerAccountIds = _.uniq(finalCustomerAccountIds);
                consolidatedDocuments.filter((value) => {
                    finalCustomerAccountIds.forEach((item) => {
                        if (value.accountId === item) {
                            data.push(value);
                        }
                    });
                });
                data = _.uniq(data);
                return data;
            }
        }
        catch (error) {
            common_1.LoggingUtils.error(error, methodName);
            return Promise.reject(new common_1.RestError(400, 'Error occured while fetching Consolidated Documents!', { systemcode: 1372 }));
        }
    }
    async rtaGeneratedConsolidatedDocuments(filterObject, options) {
        const methodName = 'rtaGeneratedConsolidatedDocuments';
        let rtaGeneratedConsolidatedDocuments = [];
        let response = {};
        try {
            if (filterObject.status === common_1.Option.GLOBALOPTIONS.CONSOLIDATEDDOCUMENTSTATUS.pending.value) {
                rtaGeneratedConsolidatedDocuments = await this.fetchRtaPendingConsolidatedDocuments(filterObject.rtaId, filterObject, options);
            }
            else {
                let filter = {
                    where: {
                        isActive: true,
                        rtaId: filterObject.rtaId,
                        status: filterObject.status
                    },
                    include: [
                        {
                            relation: 'appUser'
                        },
                        {
                            relation: 'appFile'
                        },
                        {
                            relation: 'account',
                            scope: {
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
                                                    relation: 'investorDetails',
                                                    scope: {
                                                        include: [
                                                            {
                                                                relation: 'panImageFile'
                                                            },
                                                            {
                                                                relation: 'kycImageFile'
                                                            }
                                                        ]
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            relation: 'rta'
                        },
                        {
                            relation: 'bankAccount',
                            scope: {
                                include: [
                                    {
                                        relation: 'chequeImageFile'
                                    }
                                ]
                            }
                        }
                    ]
                };
                if (filterObject.order) {
                    filter.order = [filterObject.order];
                }
                rtaGeneratedConsolidatedDocuments = await this.ConsolidatedDocumentRepository.find({ ...filter }, options);
            }
            if (rtaGeneratedConsolidatedDocuments && rtaGeneratedConsolidatedDocuments.length !== 0) {
                rtaGeneratedConsolidatedDocuments.forEach((consolidatedDocument) => {
                    if (consolidatedDocument.appUser && consolidatedDocument.appUser.name) {
                        consolidatedDocument.appUserName = consolidatedDocument.appUser.name;
                    }
                    else {
                        consolidatedDocument.appUserName = null;
                    }
                    if (consolidatedDocument.account &&
                        consolidatedDocument.account.primaryHolder &&
                        consolidatedDocument.account.primaryHolder.investorDetails &&
                        consolidatedDocument.account.primaryHolder.investorDetails.panCardNumber) {
                        consolidatedDocument.panCardNumber = consolidatedDocument.account.primaryHolder.investorDetails.panCardNumber;
                    }
                    else {
                        consolidatedDocument.panCardNumber = null;
                    }
                    if (consolidatedDocument.account && consolidatedDocument.account.uniqueId) {
                        consolidatedDocument.accountId = consolidatedDocument.account.uniqueId;
                    }
                    else {
                        consolidatedDocument.accountId = null;
                    }
                    if (consolidatedDocument.account &&
                        consolidatedDocument.account.accountAppFileMapping &&
                        consolidatedDocument.account.accountAppFileMapping[0] &&
                        consolidatedDocument.account.accountAppFileMapping[0].userManagementAppFile &&
                        consolidatedDocument.account.accountAppFileMapping[0].userManagementAppFile.name) {
                        consolidatedDocument.aof = consolidatedDocument.account.accountAppFileMapping[0].userManagementAppFile.name;
                    }
                    else {
                        consolidatedDocument.aof = null;
                    }
                });
            }
            else {
                return (0, bluebird_1.resolve)(response = {
                    data: rtaGeneratedConsolidatedDocuments,
                    count: rtaGeneratedConsolidatedDocuments.length
                });
            }
            let searchCriteria = new Map();
            let valueToSearch;
            filterObject.where.find((data) => {
                searchCriteria.set(Object.keys(data)[0], Object.values(data)[0]);
            });
            let updatedArray = rtaGeneratedConsolidatedDocuments.filter((data) => {
                if (searchCriteria.has('appUserName')) {
                    if (data.appUserName) {
                        valueToSearch = searchCriteria.get('appUserName').toLowerCase();
                        if (!data.appUserName.toLowerCase().includes(valueToSearch)) {
                            return false;
                        }
                    }
                    else
                        return false;
                }
                if (searchCriteria.has('panCardNumber')) {
                    if (data.panCardNumber) {
                        valueToSearch = searchCriteria.get('panCardNumber').toLowerCase();
                        if (!data.panCardNumber.toLowerCase().includes(valueToSearch)) {
                            return false;
                        }
                    }
                    else
                        return false;
                }
                if (searchCriteria.has('accountId')) {
                    if (data.accountId) {
                        valueToSearch = searchCriteria.get('accountId').toLowerCase();
                        if (!data.accountId.toLowerCase().includes(valueToSearch)) {
                            return false;
                        }
                    }
                    else
                        return false;
                }
                if (searchCriteria.has('aof')) {
                    if (data.aof) {
                        valueToSearch = searchCriteria.get('aof').toLowerCase();
                        if (!data.aof.toLowerCase().includes(valueToSearch)) {
                            return false;
                        }
                    }
                    else
                        return false;
                }
                if (searchCriteria.has('generatedDate')) {
                    if (data.generatedDate) {
                        if (!((0, moment_1.default)(data.generatedDate).format('YYYY-MM-DD') ===
                            (0, moment_1.default)(searchCriteria.get('generatedDate')).format('YYYY-MM-DD'))) {
                            return false;
                        }
                    }
                    else
                        return false;
                }
                return true;
            });
            const data = updatedArray.slice(filterObject.offset, filterObject.limit + filterObject.offset);
            response = {
                data: data,
                count: updatedArray.length
            };
            return (0, bluebird_1.resolve)(response);
        }
        catch (error) {
            common_1.LoggingUtils.error(error, methodName);
            return Promise.reject(new common_1.RestError(400, 'Error occured while fetching Consolidated Documents!', { systemcode: 1372 }));
        }
    }
};
ConsolidatedDocumentFacade = (0, tslib_1.__decorate)([
    (0, core_1.injectable)({ scope: core_1.BindingScope.APPLICATION }),
    (0, tslib_1.__param)(0, (0, repository_1.repository)(common_2.ConsolidatedDocumentRepository)),
    (0, tslib_1.__param)(1, (0, repository_1.repository)(common_1.TransactionFeedLogRepository)),
    (0, tslib_1.__metadata)("design:paramtypes", [common_2.ConsolidatedDocumentRepository,
        common_1.TransactionFeedLogRepository])
], ConsolidatedDocumentFacade);
exports.ConsolidatedDocumentFacade = ConsolidatedDocumentFacade;
//# sourceMappingURL=consolidate-document.facade.js.map