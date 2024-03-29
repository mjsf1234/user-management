"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FamilyMappingFacade = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const common_1 = require("common");
const moment_timezone_1 = (0, tslib_1.__importDefault)(require("moment-timezone"));
// All business loigc goes inside Facade layer
let FamilyMappingFacade = class FamilyMappingFacade {
    constructor(familyMappingRepository, appUserRepository, accountRepository) {
        this.familyMappingRepository = familyMappingRepository;
        this.appUserRepository = appUserRepository;
        this.accountRepository = accountRepository;
    }
    async create(entity, options) {
        return this.familyMappingRepository.create(entity, options);
    }
    async createAll(entities, options) {
        return this.familyMappingRepository.createAll(entities, options);
    }
    async save(entity, options) {
        return this.familyMappingRepository.save(entity, options);
    }
    async find(filter, options) {
        return this.familyMappingRepository.find(filter, options);
    }
    async findOne(filter, options) {
        return this.familyMappingRepository.findOne(filter, options);
    }
    async findById(id, filter, options) {
        return this.familyMappingRepository.findById(id, filter, options);
    }
    async update(entity, options) {
        return this.familyMappingRepository.update(entity, options);
    }
    async delete(entity, options) {
        return this.familyMappingRepository.delete(entity, options);
    }
    async updateAll(data, where, options) {
        return this.familyMappingRepository.updateAll(data, where, options);
    }
    async updateById(id, data, options) {
        return this.familyMappingRepository.updateById(id, data, options);
    }
    async replaceById(id, data, options) {
        return this.familyMappingRepository.replaceById(id, data, options);
    }
    async deleteAll(where, options) {
        return this.familyMappingRepository.deleteAll(where, options);
    }
    async deleteById(id, options) {
        return this.familyMappingRepository.deleteById(id, options);
    }
    async count(where, options) {
        return this.familyMappingRepository.count(where, options);
    }
    async exists(id, options) {
        return this.familyMappingRepository.exists(id, options);
    }
    async getChildren(id) {
        let returnObject = {
            success: true
        };
        let parentId = id;
        return new Promise((resolve, reject) => {
            this.familyMappingRepository
                .find({
                where: {
                    parentId: parentId,
                    familyRequestStatus: common_1.Option.GLOBALOPTIONS.FAMILYREQUESTSTATUS.approved.value,
                    isActive: true
                },
                include: [
                    {
                        relation: 'childAppUser',
                        scope: {
                            where: {
                                isActive: true
                            },
                            fields: { id: true, name: true }
                        }
                    }
                ]
            })
                .then((familyData) => {
                if (!familyData) {
                    return Promise.reject(new common_1.RestError(400, 'No families found for given userId.', { systemcode: 1310 }));
                }
                else {
                    if (familyData.length > 0) {
                        returnObject.families = familyData;
                    }
                    else {
                        //return Promise.reject(new RestError(400, 'No families found.'));
                        returnObject = {
                            success: true,
                            message: 'No families found.'
                        };
                        returnObject.families = [];
                    }
                }
                resolve(returnObject);
            })
                .catch(reject);
        });
    }
    async getParents(id) {
        let returnObject = {
            success: true
        };
        let childId = id;
        return new Promise((resolve, reject) => {
            this.familyMappingRepository
                .find({
                where: {
                    childId: childId,
                    familyRequestStatus: common_1.Option.GLOBALOPTIONS.FAMILYREQUESTSTATUS.approved.value,
                    isActive: true
                },
                include: [
                    {
                        relation: 'parentAppUser',
                        scope: {
                            where: {
                                isActive: true
                            },
                            fields: { id: true, name: true }
                        }
                    }
                ]
            })
                .then((familyData) => {
                if (!familyData) {
                    return Promise.reject(new common_1.RestError(400, 'No parents found for given userId.', { systemcode: 1311 }));
                }
                else {
                    if (familyData.length > 0) {
                        returnObject.parents = familyData;
                    }
                    else {
                        //return Promise.reject(new RestError(400, 'No parents found.'));
                        returnObject = {
                            success: true,
                            message: 'No parents found.'
                        };
                        returnObject.parents = [];
                    }
                }
                resolve(returnObject);
            })
                .catch(reject);
        });
    }
    async getSentRequestsPending(id) {
        let returnObject = {
            success: true
        };
        let parentId = id;
        return new Promise((resolve, reject) => {
            //returns the pending or rejected requests
            this.familyMappingRepository
                .find({
                where: {
                    parentId: parentId,
                    familyRequestStatus: {
                        inq: [
                            common_1.Option.GLOBALOPTIONS.FAMILYREQUESTSTATUS.initiated.value,
                            common_1.Option.GLOBALOPTIONS.FAMILYREQUESTSTATUS.rejected.value,
                            common_1.Option.GLOBALOPTIONS.FAMILYREQUESTSTATUS.revoked.value
                        ]
                    },
                    isActive: true
                },
                include: [
                    {
                        relation: 'childAppUser',
                        scope: {
                            where: {
                                isActive: true
                            },
                            fields: { id: true, name: true }
                        }
                    }
                ]
            })
                .then((familyData) => {
                if (!familyData) {
                    return Promise.reject(new common_1.RestError(400, 'No pending requests found for given userId.', { systemcode: 1312 }));
                }
                else {
                    if (familyData.length > 0) {
                        returnObject.families = familyData;
                    }
                    else {
                        //return Promise.reject(new RestError(400, 'No pending child found.'));
                        returnObject = {
                            success: true,
                            message: 'No pending child found.'
                        };
                        returnObject.families = [];
                    }
                }
                resolve(returnObject);
            })
                .catch(reject);
        });
    }
    async getPendingRequests(id) {
        let returnObject = {
            success: true
        };
        let childId = id;
        return new Promise((resolve, reject) => {
            this.familyMappingRepository
                .find({
                where: {
                    childId: childId,
                    isActive: true,
                    familyRequestStatus: common_1.Option.GLOBALOPTIONS.FAMILYREQUESTSTATUS.initiated.value
                },
                include: [
                    {
                        relation: 'parentAppUser',
                        scope: {
                            where: {
                                isActive: true
                            },
                            fields: { id: true, name: true }
                        }
                    }
                ]
            })
                .then((familyData) => {
                if (!familyData) {
                    return Promise.reject(new common_1.RestError(400, 'No pending requests found for given userId.', { systemcode: 1312 }));
                }
                else {
                    if (familyData.length > 0) {
                        returnObject.parents = familyData;
                    }
                    else {
                        //return Promise.reject(new RestError(400, 'No pending parents found.'));
                        returnObject = {
                            success: true,
                            message: 'No pending parents found.'
                        };
                        returnObject.parents = [];
                    }
                }
                resolve(returnObject);
            })
                .catch(reject);
        });
    }
    async removeChild(id, childDetails) {
        //Remove child = cancel child
        //we will set it as reject
        let returnObject = {};
        let parentId;
        let childId;
        parentId = id;
        if (childDetails && childDetails.childId != undefined) {
            childId = childDetails.childId;
        }
        else {
            return Promise.reject(new common_1.RestError(400, 'Please provide child user Id.', { systemcode: 1313 }));
        }
        return new Promise((resolve, reject) => {
            this.familyMappingRepository
                .findOne({
                where: {
                    parentId: parentId,
                    childId: childId,
                    isActive: true
                }
            })
                .then((familyData) => {
                if (!familyData) {
                    return Promise.reject(new common_1.RestError(400, 'Family for given parent and member not found.', { systemcode: 1314 }));
                }
                else {
                    //update and increment reject status
                    let currentRejects = familyData.numberOfRejects ? familyData.numberOfRejects : 0;
                    return this.familyMappingRepository.updateById(familyData.id, {
                        familyRequestStatus: common_1.Option.GLOBALOPTIONS.FAMILYREQUESTSTATUS.revoked.value,
                        lastModifiedDate: new Date(),
                        numberOfRejects: currentRejects + 1,
                        lastRejectDate: new Date()
                    });
                }
            })
                .then(async (miscData) => {
                const child = await this.accountRepository.findOne({
                    where: {
                        primaryHolderId: childId,
                        isActive: true
                    },
                    fields: ['id', 'name']
                });
                const parent = await this.appUserRepository.findOne({
                    where: {
                        id: parentId,
                        isActive: true
                    },
                    fields: ['id', 'name']
                });
                await common_1.NotificationUtils.sendNotificationEvent({
                    accountId: child === null || child === void 0 ? void 0 : child.id,
                    topicId: common_1.NotificationTopics.TOPICS.familyDashboard.memberDeletion.value,
                    notificationType: common_1.NotificationTopics.TOPICS.familyDashboard.memberDeletion.topic,
                    templateKeys: {
                        customerName: child === null || child === void 0 ? void 0 : child.name,
                        X: parent === null || parent === void 0 ? void 0 : parent.name,
                        emailId: 'mailto:smartwealth@hdfcbank.com'
                    }
                });
                returnObject = {
                    success: true,
                    message: 'Membership is successfully cancelled.'
                };
                resolve(returnObject);
            })
                .catch(reject);
            /* removing delete and treating this as rejected...
            .then((familyData: FamilyMapping | null) => {
              if (!familyData){
                return Promise.reject(new RestError(400, 'Family for given parent and member not found.'));
              } else {
                //delete the row
                return this.familyMappingRepository.deleteById(familyData.id);
              }
            })
            .then((miscData: void) => {
              returnObject = {
                  'success': true,
                  'message': 'Child successfully removed'
              }
              resolve(returnObject);
            })
            .catch(reject)
            */
        });
    }
    async removeParent(id, parentDetails) {
        let returnObject = {};
        let parentId;
        let childId;
        childId = id;
        if (parentDetails && parentDetails.parentId != undefined && parentDetails.parentId > 0) {
            parentId = parentDetails.parentId;
        }
        else {
            return Promise.reject(new common_1.RestError(400, 'Please provide parent user Id.', { systemcode: 1315 }));
        }
        return new Promise((resolve, reject) => {
            this.familyMappingRepository
                .findOne({
                where: {
                    parentId: parentId,
                    childId: childId,
                    isActive: true
                }
            })
                .then((familyData) => {
                if (!familyData) {
                    return Promise.reject(new common_1.RestError(400, 'Family for given parent and member not found.', { systemcode: 1314 }));
                }
                else {
                    //delete the row
                    // return this.familyMappingRepository.deleteById(familyData.id);
                    let currentRejects = familyData.numberOfRejects ? familyData.numberOfRejects : 0;
                    return this.familyMappingRepository.updateById(familyData.id, {
                        familyRequestStatus: common_1.Option.GLOBALOPTIONS.FAMILYREQUESTSTATUS.rejected.value,
                        lastModifiedDate: new Date(),
                        numberOfRejects: currentRejects + 1,
                        lastRejectDate: new Date()
                    });
                }
            })
                .then(async (miscData) => {
                const parent = await this.accountRepository.findOne({
                    where: {
                        primaryHolderId: parentId,
                        isActive: true
                    },
                    fields: ['id', 'name']
                });
                const child = await this.appUserRepository.findOne({
                    where: {
                        id: childId,
                        isActive: true
                    },
                    fields: ['id', 'name']
                });
                await common_1.NotificationUtils.sendNotificationEvent({
                    accountId: parent === null || parent === void 0 ? void 0 : parent.id,
                    topicId: common_1.NotificationTopics.TOPICS.familyDashboard.selfDeletion.value,
                    notificationType: common_1.NotificationTopics.TOPICS.familyDashboard.selfDeletion.topic,
                    templateKeys: {
                        customerName: parent === null || parent === void 0 ? void 0 : parent.name,
                        X: child === null || child === void 0 ? void 0 : child.name,
                        emailId: 'mailto:smartwealth@hdfcbank.com'
                    }
                });
                returnObject = {
                    success: true,
                    message: 'Parent successfully removed'
                };
                resolve(returnObject);
            })
                .catch(reject);
        });
    }
    async approveRejectFamilyRequest(id, parentDetails) {
        let returnObject = {};
        let parentId;
        let childId;
        let isApproved = false;
        childId = id;
        if (parentDetails && parentDetails.parentId != undefined && parentDetails.parentId > 0) {
            parentId = parentDetails.parentId;
        }
        else {
            return Promise.reject(new common_1.RestError(400, 'Please provide parent user Id.', { systemcode: 1315 }));
        }
        if (parentDetails && parentDetails.isApproved != undefined) {
            isApproved = parentDetails.isApproved;
        }
        else {
            return Promise.reject(new common_1.RestError(400, 'Please provide approval status.', { systemcode: 1316 }));
        }
        let approvalStatus;
        if (isApproved) {
            approvalStatus = common_1.Option.GLOBALOPTIONS.FAMILYREQUESTSTATUS.approved.value;
        }
        else {
            approvalStatus = common_1.Option.GLOBALOPTIONS.FAMILYREQUESTSTATUS.rejected.value;
        }
        return new Promise((resolve, reject) => {
            this.familyMappingRepository
                .findOne({
                where: {
                    parentId: parentId,
                    childId: childId,
                    isActive: true
                }
            })
                .then(async (familyData) => {
                if (!familyData) {
                    return Promise.reject(new common_1.RestError(400, 'Family for given parent and member not found.', { systemcode: 1314 }));
                }
                else {
                    //update status
                    if (isApproved) {
                        const child = await this.accountRepository.findOne({
                            where: {
                                primaryHolderId: childId,
                                isActive: true
                            },
                            fields: ['id', 'name']
                        });
                        const parent = await this.appUserRepository.findOne({
                            where: {
                                id: parentId,
                                isActive: true
                            },
                            fields: ['id', 'name']
                        });
                        await common_1.NotificationUtils.sendNotificationEvent({
                            accountId: child === null || child === void 0 ? void 0 : child.id,
                            topicId: common_1.NotificationTopics.TOPICS.familyDashboard.memberAddition.value,
                            notificationType: common_1.NotificationTopics.TOPICS.familyDashboard.memberAddition.topic,
                            templateKeys: {
                                customerName: child === null || child === void 0 ? void 0 : child.name,
                                X: parent === null || parent === void 0 ? void 0 : parent.name,
                                emailId: 'mailto:smartwealth@hdfcbank.com'
                            }
                        });
                        return this.familyMappingRepository.updateById(familyData.id, {
                            familyRequestStatus: approvalStatus,
                            lastModifiedDate: new Date()
                        });
                    }
                    else {
                        let currentRejects = familyData.numberOfRejects ? familyData.numberOfRejects : 0;
                        return this.familyMappingRepository.updateById(familyData.id, {
                            familyRequestStatus: approvalStatus,
                            lastModifiedDate: new Date(),
                            numberOfRejects: currentRejects + 1,
                            lastRejectDate: new Date()
                        });
                    }
                }
            })
                .then((miscData) => {
                returnObject = {
                    success: true,
                    message: isApproved ? 'Family addition request is successfully approved' : 'Family addition request is successfully rejected'
                };
                resolve(returnObject);
            })
                .catch(reject);
        });
    }
    async sendRequestforFamilyAddition(id, memberDetails) {
        let memberInfo = {};
        let parentId;
        let userCode;
        parentId = id;
        if (memberDetails && memberDetails.userCode && memberDetails.userCode != undefined && memberDetails.userCode.length > 0) {
            userCode = memberDetails.userCode;
        }
        else {
            return Promise.reject(new common_1.RestError(400, 'Please provide member user code.', { systemcode: 1317 }));
        }
        return new Promise((resolve, reject) => {
            this.getDetailsforFamily(parentId, userCode)
                .then((memberDetails) => {
                //valid user and child
                //child doesn't have existing relation
                //add in family
                //checks subsequently
                //console.log('got back - ', memberDetails);
                let memberName = memberDetails.name;
                let parentName = memberDetails.parentInfo.name;
                let relationName = parentName + ' - ' + memberName;
                let familyObj = {
                    parentId: parentId,
                    childId: memberDetails.id,
                    isActive: true,
                    createdDate: new Date(),
                    lastModifiedDate: new Date(),
                    name: relationName,
                    familyRequestStatus: common_1.Option.GLOBALOPTIONS.FAMILYREQUESTSTATUS.initiated.value,
                    numberOfRejects: 0
                };
                memberInfo = memberDetails;
                if (memberDetails.resendRequest) {
                    //row updated
                    return this.familyMappingRepository.updateById(memberDetails.updateRowId, {
                        familyRequestStatus: common_1.Option.GLOBALOPTIONS.FAMILYREQUESTSTATUS.initiated.value,
                        lastModifiedDate: new Date(),
                        newRequestDate: new Date()
                    });
                }
                else {
                    return this.familyMappingRepository.create(familyObj);
                }
            })
                .then((familyMappingItem) => {
                let familyItem = {};
                if (!familyMappingItem) {
                    familyItem.success = true;
                    familyItem.message = 'Family mapping request resent. Ask member to authenticate on app.';
                    familyItem.familyItem = memberInfo.childRow;
                    familyItem.parentDetails = memberInfo.parentInfo;
                }
                else {
                    familyItem.success = true;
                    familyItem.message = 'Family mapping request sent. Ask member to authenticate on app.';
                    familyItem.familyItem = familyMappingItem;
                    familyItem.parentDetails = memberInfo.parentInfo;
                }
                //return Promise.resolve(familyItem);
                resolve(familyItem);
            })
                //.then(resolve)
                .catch(reject);
        });
    }
    async getDetailsforFamily(parentId, userCode) {
        let userInfo = {};
        let parentInfo = {};
        return new Promise((resolve, reject) => {
            this.appUserRepository
                .findOne({
                where: {
                    id: parentId,
                    isActive: true
                },
                fields: { id: true, name: true, userCode: true }
            })
                .then((parentData) => {
                if (parentData && parentData.id != undefined && parentData.id != undefined) {
                    parentInfo.id = parentId;
                    parentInfo.name = parentData.name;
                    parentInfo.userCode = parentData.userCode;
                    //check if user hasn't passed his own userCode
                    if (parentInfo.userCode == userCode) {
                        return Promise.reject(new common_1.RestError(416, 'You can not add yourself as a member.', { systemcode: 1318 }));
                    }
                }
                else {
                    return Promise.reject(new common_1.RestError(400, 'Parent user not found', { systemcode: 1319 }));
                }
                return this.appUserRepository.findOne({
                    where: {
                        userCode: userCode,
                        isActive: true
                    },
                    fields: { id: true, name: true, email: true, userCode: true, contactNumber: true, contactNumberCountryCode: true },
                    include: [
                        {
                            relation: 'childIds',
                            scope: {
                                where: {
                                    parentId: parentId,
                                    isActive: true
                                }
                            }
                        }
                    ]
                });
            })
                .then((userData) => {
                if (!userData) {
                    return Promise.reject(new common_1.RestError(412, 'Member not found', { systemcode: 1320 }));
                }
                else {
                    if (userData.contactNumber && userData.contactNumberCountryCode) {
                        if (userData.email) {
                            userInfo.contactNumber = userData.contactNumber;
                            userInfo.countryCode = userData.contactNumberCountryCode;
                            userInfo.email = userData.email;
                            userInfo.id = userData.id;
                            userInfo.userCode = userData.userCode;
                            userInfo.name = userData.name;
                            //add parent data
                            userInfo.parentInfo = parentInfo;
                            if (userData.childIds && userData.childIds != undefined && userData.childIds.length > 0) {
                                if (userData.childIds.length != 1) {
                                    //multiple active relations is not possible
                                    return Promise.reject(new common_1.RestError(400, 'Raise ticket. Multiple active mappings for this user-member', { systemcode: 1040 }));
                                }
                                else {
                                    let familyMappingRow = userData.childIds[0];
                                    let status = familyMappingRow.familyRequestStatus;
                                    let requestDate = familyMappingRow.newRequestDate ? familyMappingRow.newRequestDate : familyMappingRow.createdDate;
                                    let createdDataInErrorMessage = (0, moment_timezone_1.default)(requestDate).format('DD MMM YY');
                                    // let momentNextRequestDate = moment(familyMappingRow.newRequestDate).format('DD MMM YY')
                                    if (status == common_1.Option.GLOBALOPTIONS.FAMILYREQUESTSTATUS.initiated.value) {
                                        const maskedUserCode = userData.userCode.toString().replace(/\d(?=\d{4})/g, 'X');
                                        return Promise.reject(new common_1.RestError(413, `You already have an active request for adding ${userData.name} (Customer ID: ${maskedUserCode}), which was raised on ${createdDataInErrorMessage}. Please remind ${userData.name} to accept the request, to be added to your family dashboard`, { systemcode: 1041 }));
                                    }
                                    else {
                                        if (status == common_1.Option.GLOBALOPTIONS.FAMILYREQUESTSTATUS.approved.value) {
                                            return Promise.reject(new common_1.RestError(415, `${userData.name}`, { systemcode: 1042 }));
                                        }
                                        else if (status == common_1.Option.GLOBALOPTIONS.FAMILYREQUESTSTATUS.revoked.value) {
                                            let currentTime = new Date();
                                            let lastRejectDate = familyMappingRow.lastRejectDate ? familyMappingRow.lastRejectDate : currentTime;
                                            let lastRejectDateInErrorMessage = (0, moment_timezone_1.default)(lastRejectDate).format('DD MMM YY');
                                            let nextRequestDate = (0, moment_timezone_1.default)(lastRejectDate); // new Date();
                                            let daysGapAfterFamilyRevoke = common_1.Option.GLOBALOPTIONS.FAMILYREQUESTREVOKES.daysgapafterrevoke.value;
                                            nextRequestDate.add('days', daysGapAfterFamilyRevoke); //(lastRejectDate.getDate() + );
                                            let momentNextDate = nextRequestDate.format('DD-MMM-YY');
                                            let currRejectCount = familyMappingRow.numberOfRejects ? familyMappingRow.numberOfRejects : 0;
                                            let statusUpdated = status;
                                            if (currentTime.getTime() < new Date(momentNextDate).getTime()) {
                                                let errObj = {
                                                    message: `Your request to revoke has been successfully completed on ${lastRejectDateInErrorMessage}, You can request again after 5 Day (${momentNextDate})`,
                                                    rejectionCount: currRejectCount
                                                };
                                                return Promise.reject(new common_1.RestError(417, `Your request to revoke has been successfully completed on ${lastRejectDateInErrorMessage}, You can request again after 5 Day (${momentNextDate})`, { systemcode: 1042 }));
                                            }
                                            else {
                                                //update the status, prepare to send request
                                                //console.log('resending request');
                                                statusUpdated = common_1.Option.GLOBALOPTIONS.FAMILYREQUESTSTATUS.initiated.value;
                                                userInfo.resendRequest = true;
                                                userInfo.updateRowId = familyMappingRow.id;
                                                userInfo.childRow = familyMappingRow;
                                                //resolve(userInfo);
                                            }
                                        }
                                        else {
                                            if (status == common_1.Option.GLOBALOPTIONS.FAMILYREQUESTSTATUS.rejected.value) {
                                                let maxRejects = common_1.Option.GLOBALOPTIONS.FAMILYREQUESTREJECTS.maxrejects.value;
                                                let currRejectCount = familyMappingRow.numberOfRejects ? familyMappingRow.numberOfRejects : 0;
                                                //rejected status
                                                //check if user can resend
                                                if (currRejectCount < maxRejects) {
                                                    let currentTime = new Date();
                                                    let lastRejectDate = familyMappingRow.lastRejectDate ? familyMappingRow.lastRejectDate : currentTime;
                                                    let nextRequestDate = new Date(lastRejectDate.getTime());
                                                    let daysGapAfterFamilyReject = common_1.Option.GLOBALOPTIONS.FAMILYREQUESTREJECTS.daysgapafterreject.value;
                                                    nextRequestDate.setDate(lastRejectDate.getDate() + daysGapAfterFamilyReject);
                                                    let statusUpdated = status;
                                                    let momentNextDate = (0, moment_timezone_1.default)(nextRequestDate).format('DD-MMM-YY');
                                                    let lastRejectDateInErrorMessage = (0, moment_timezone_1.default)(lastRejectDate).format('DD MMM YY');
                                                    if (currentTime.getTime() < nextRequestDate.getTime()) {
                                                        const maskedUserCode = userData.userCode.toString().replace(/\d(?=\d{4})/g, 'X');
                                                        let errObj = {
                                                            message: `Your request has been declined or you have recently exited from the family group on ${lastRejectDateInErrorMessage} for customer ID ${maskedUserCode}. You can request again after five days (${momentNextDate})`,
                                                            rejectionCount: currRejectCount
                                                        };
                                                        return Promise.reject(new common_1.RestError(414, JSON.stringify(errObj), { systemcode: 1039 }));
                                                    }
                                                    else {
                                                        //update the status, prepare to send request
                                                        //console.log('resending request');
                                                        statusUpdated = common_1.Option.GLOBALOPTIONS.FAMILYREQUESTSTATUS.initiated.value;
                                                        userInfo.resendRequest = true;
                                                        userInfo.updateRowId = familyMappingRow.id;
                                                        userInfo.childRow = familyMappingRow;
                                                        //resolve(userInfo);
                                                    }
                                                }
                                                else {
                                                    return Promise.reject(new common_1.RestError(411, 'The request to join the family has been rejected/cancelled. You have exceeded maximum attempts for this member.', { systemcode: 1039 }));
                                                }
                                            }
                                            else {
                                                return Promise.reject(new common_1.RestError(400, 'Raise ticket. Status of request not clear.', { systemcode: 1040 }));
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        else {
                            return Promise.reject(new common_1.RestError(400, 'Email of member not found', { systemcode: 1321 }));
                        }
                    }
                    else {
                        return Promise.reject(new common_1.RestError(400, 'Phone number and Country code of member not found', { systemcode: 1322 }));
                    }
                }
                resolve(userInfo);
            })
                .catch(err => {
                common_1.LoggingUtils.error(err);
                reject(err);
            });
        });
    }
};
FamilyMappingFacade = (0, tslib_1.__decorate)([
    (0, core_1.injectable)({ scope: core_1.BindingScope.APPLICATION }),
    (0, tslib_1.__param)(0, (0, repository_1.repository)(common_1.FamilyMappingRepository)),
    (0, tslib_1.__param)(1, (0, repository_1.repository)(common_1.AppUserRepository)),
    (0, tslib_1.__param)(2, (0, repository_1.repository)(common_1.AccountRepository)),
    (0, tslib_1.__metadata)("design:paramtypes", [common_1.FamilyMappingRepository,
        common_1.AppUserRepository,
        common_1.AccountRepository])
], FamilyMappingFacade);
exports.FamilyMappingFacade = FamilyMappingFacade;
//# sourceMappingURL=family-mapping.facade.js.map