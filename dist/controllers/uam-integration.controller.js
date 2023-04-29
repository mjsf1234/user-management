"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UamIntegrationController = void 0;
const tslib_1 = require("tslib");
const authorization_1 = require("@loopback/authorization");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const common_1 = require("common");
const facades_1 = require("../facades");
const API_PREFIX = common_1.UamIntegration.modelName;
//Only REST related logic to be written inside a controller.
//Strictly no use of repositories
let UamIntegrationController = class UamIntegrationController {
    constructor(uamIntegrationFacade, res, additionalHeaders, userProfile) {
        this.uamIntegrationFacade = uamIntegrationFacade;
        this.res = res;
        this.additionalHeaders = additionalHeaders;
        this.userProfile = userProfile;
    }
    async create(uamIntegration) {
        return this.uamIntegrationFacade.create(uamIntegration);
    }
    async count(where) {
        return this.uamIntegrationFacade.count(where);
    }
    async find(filter) {
        return this.uamIntegrationFacade.find(filter);
    }
    async updateAll(UamIntegration, where) {
        return this.uamIntegrationFacade.updateAll(UamIntegration, where);
    }
    async findById(id, filter) {
        return this.uamIntegrationFacade.findById(id, filter);
    }
    async updateById(id, UamIntegration) {
        await this.uamIntegrationFacade.updateById(id, UamIntegration);
    }
    async replaceById(id, UamIntegration) {
        await this.uamIntegrationFacade.replaceById(id, UamIntegration);
    }
    async deleteById(id) {
        await this.uamIntegrationFacade.deleteById(id);
    }
    async createUserUsingUAM(uamIntegrationFacade) {
        return this.uamIntegrationFacade.createUserUsingUAM(uamIntegrationFacade.requestXML);
    }
    async disableUserUsingUAM(uamIntegrationFacade) {
        return this.uamIntegrationFacade.disableUserUsingUAM(uamIntegrationFacade.requestXML);
    }
    async enableUserUsingUAM(uamIntegrationFacade) {
        return this.uamIntegrationFacade.enableUserUsingUAM(uamIntegrationFacade.requestXML);
    }
    async deleteUserUsingUAM(uamIntegrationFacade) {
        return this.uamIntegrationFacade.deleteUserUsingUAM(uamIntegrationFacade.requestXML);
    }
    async reopenUserUsingUAM(uamIntegrationFacade) {
        return this.uamIntegrationFacade.reopenUserUsingUAM(uamIntegrationFacade.requestXML);
    }
    async unlockUserUsingUAM(uamIntegrationFacade) {
        return this.uamIntegrationFacade.unlockUserUsingUAM(uamIntegrationFacade.requestXML);
    }
    async updateUserUsingUAM(uamIntegrationFacade) {
        return this.uamIntegrationFacade.updateUserUsingUAM(uamIntegrationFacade.requestXML);
    }
    async fetchUserIdPopulationReport(offset, limit, searchFilter, 
    // @param.query.date('fromDate') fromDate?: Date,
    // @param.query.date('toDate') toDate?: Date,
    orderBy) {
        return this.uamIntegrationFacade.fetchUserIdPopulationReport(searchFilter, 
        // fromDate,
        // toDate,
        offset, limit, orderBy);
    }
    async exportUserIdPopulationReport(exportFormat, fromDate, toDate, searchFilter, orderBy) {
        return this.uamIntegrationFacade.exportUserIdPopulationReport(exportFormat, this.res, fromDate, toDate, searchFilter, orderBy);
    }
    async changeAppUserStatus(details) {
        return this.uamIntegrationFacade.changeAppUserStatus(details, this.userProfile.TrxId, this.userProfile);
    }
    async changeAppUserDetails(details) {
        return this.uamIntegrationFacade.changeAppUserStatus(details, this.userProfile.TrxId, this.userProfile);
    }
    async createUser(details) {
        return this.uamIntegrationFacade.createUser(details, this.userProfile.TrxId, this.userProfile);
    }
    async downloadAdminActivityReport(filter) {
        return this.uamIntegrationFacade.downloadAdminActivityReport(this.res, filter, this.additionalHeaders);
    }
    async updateMaxAllowedLoginAttempts(uamLoginAttemptsConfig) {
        await this.uamIntegrationFacade.updateMaxAllowedLoginAttempts(uamLoginAttemptsConfig);
    }
    async fetchConfigurations() {
        return this.uamIntegrationFacade.fetchConfigurations();
    }
    async downloadRoleRightsReport(filter) {
        return this.uamIntegrationFacade.downloadRoleRightsReport(this.res, filter, this.additionalHeaders);
    }
};
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'UamIntegration model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(common_1.UamIntegration) } }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.UamIntegration, {
                    title: 'New UamIntegration',
                    exclude: ['id']
                })
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UamIntegrationController.prototype, "create", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/count`),
    (0, rest_1.response)(200, {
        description: 'UamIntegration model count',
        content: { 'application/json': { schema: repository_1.CountSchema } }
    }),
    (0, tslib_1.__param)(0, rest_1.param.where(common_1.UamIntegration)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UamIntegrationController.prototype, "count", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'Array of UamIntegration model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(common_1.UamIntegration, { includeRelations: false })
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.filter(common_1.UamIntegration)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UamIntegrationController.prototype, "find", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)(`/${API_PREFIX}`),
    (0, rest_1.response)(200, {
        description: 'UamIntegration PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.UamIntegration, { partial: true })
            }
        }
    })),
    (0, tslib_1.__param)(1, rest_1.param.where(common_1.UamIntegration)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [common_1.UamIntegration, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UamIntegrationController.prototype, "updateAll", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(200, {
        description: 'UamIntegration model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.UamIntegration, { includeRelations: false })
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, rest_1.param.filter(common_1.UamIntegration, { exclude: 'where' })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UamIntegrationController.prototype, "findById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'UamIntegration PATCH success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(common_1.UamIntegration, { partial: true })
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, common_1.UamIntegration]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UamIntegrationController.prototype, "updateById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.put)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'UamIntegration PUT success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, common_1.UamIntegration]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UamIntegrationController.prototype, "replaceById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.del)(`/${API_PREFIX}/{id}`),
    (0, rest_1.response)(204, {
        description: 'UamIntegration DELETE success'
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UamIntegrationController.prototype, "deleteById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}/createUserUsingUAM`),
    (0, rest_1.response)(200, {
        description: 'Create user using UAM',
        content: {
            'application/xml': {
                schema: {
                    example: `<message>success</message>
          <statusCode>0</statusCode>
          <uniqueNumber>77jdghfj573</uniqueNumber>`
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/xml': {
                schema: {
                    example: `<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
            <s:Body xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xmlns:xsd="http://www.w3.org/2001/XMLSchema">
            <addUser xmlns="http://uamservice.tcs.com">
            <in>
            <last_Modified_Maker_Id
            xmlns="http://uamservice.tcs.com/xsd">80f92805d8f11020</last_Modified_Maker_Id>
            <last_Modified_Checker_Id
            xmlns="http://uamservice.tcs.com/xsd">80f92805d8f11020</last_Modified_Checker_Id>
            <last_Modified_Maker_Date_Time
            xmlns="http://uamservice.tcs.com/xsd">2019-09-09 12:00:00
            </last_Modified_Maker_Date_Time>
            <last_Modified_Checker_Date_Time xmlns="http://uamservice.tcs.com/xsd">
            2019-09-09 12:00:00</last_Modified_Checker_Date_Time>
            <email_Id xmlns="http://uamservice.tcs.com/xsd">gfdjh876@gmail.com</email_Id>
            <emp_Code xmlns="http://uamservice.tcs.com/xsd">INV23590</emp_Code>
            <mobile xmlns="http://uamservice.tcs.com/xsd">9673305847</mobile>
            <role_Id xmlns="http://uamservice.tcs.com/xsd">1</role_Id>
            <uniqueNumber xmlns="http://uamservice.tcs.com/xsd">77jdghfj573</uniqueNumber>
            <user_Id xmlns="http://uamservice.tcs.com/xsd">A2000</user_Id>
            <user_Name xmlns="http://uamservice.tcs.com/xsd">Abhay Verma</user_Name>
            <user_Type xmlns="http://uamservice.tcs.com/xsd">2</user_Type>
            <category xmlns="http://uamservice.tcs.com/xsd">2</category>
            <date_Of_Birth xmlns="http://uamservice.tcs.com/xsd">12/03/1999</date_Of_Birth>
            <salutation xmlns="http://uamservice.tcs.com/xsd">2</salutation>
            <gender xmlns="http://uamservice.tcs.com/xsd">2</gender>
            </in>
            </addUser>
            </s:Body>
            </s:Envelope>`
                }
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UamIntegrationController.prototype, "createUserUsingUAM", null);
(0, tslib_1.__decorate)([
    (0, rest_1.put)(`/${API_PREFIX}/disableUserUsingUAM`),
    (0, rest_1.response)(200, {
        description: 'Disable User using UAM',
        content: {
            'application/xml': {
                schema: {}
            }
        }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/xml': {
                example: `<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
            <s:Body xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xmlns:xsd="http://www.w3.org/2001/XMLSchema">
            <lockUser xmlns="http://uamservice.tcs.com">
            <in>
            <last_Modified_Maker_Id
            xmlns="http://uamservice.tcs.com/xsd">80f92805d8f11020</last_Modified_Maker_Id>
            <last_Modified_Checker_Id
            xmlns="http://uamservice.tcs.com/xsd">80f92805d8f11020</last_Modified_Checker_Id>
            <last_Modified_Maker_Date_Time
            xmlns="http://uamservice.tcs.com/xsd">2019-09-09 12:00:00
            </last_Modified_Maker_Date_Time>
            <last_Modified_Checker_Date_Time xmlns="http://uamservice.tcs.com/xsd">
            2019-09-09 12:00:00</last_Modified_Checker_Date_Time>
            <email_Id xmlns="http://uamservice.tcs.com/xsd">gfdjh876@gmail.com</email_Id>
            <emp_Code xmlns="http://uamservice.tcs.com/xsd">INV23590</emp_Code>
            <mobile xmlns="http://uamservice.tcs.com/xsd">9673305847</mobile>
            <role_Id xmlns="http://uamservice.tcs.com/xsd">1</role_Id>
            <uniqueNumber xmlns="http://uamservice.tcs.com/xsd">77jdghfj573</uniqueNumber>
            <user_Id xmlns="http://uamservice.tcs.com/xsd">A2000</user_Id>
            <user_Name xmlns="http://uamservice.tcs.com/xsd">Abhay Verma</user_Name>
            <user_Type xmlns="http://uamservice.tcs.com/xsd">2</user_Type>
            <category xmlns="http://uamservice.tcs.com/xsd">2</category>
            <date_Of_Birth xmlns="http://uamservice.tcs.com/xsd">12/03/1999</date_Of_Birth>
            <salutation xmlns="http://uamservice.tcs.com/xsd">2</salutation>
            <gender xmlns="http://uamservice.tcs.com/xsd">2</gender>
            </in>
            </lockUser>
            </s:Body>
            </s:Envelope>`
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UamIntegrationController.prototype, "disableUserUsingUAM", null);
(0, tslib_1.__decorate)([
    (0, rest_1.put)(`/${API_PREFIX}/enableUserUsingUAM`),
    (0, rest_1.response)(200, {
        description: 'Enable User using UAM',
        content: {
            'application/xml': {
                schema: {}
            }
        }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/xml': {
                example: `<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
            <s:Body xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xmlns:xsd="http://www.w3.org/2001/XMLSchema">
            <unlockUser xmlns="http://uamservice.tcs.com">
            <in>
            <last_Modified_Maker_Id
            xmlns="http://uamservice.tcs.com/xsd">80f92805d8f11020</last_Modified_Maker_Id>
            <last_Modified_Checker_Id
            xmlns="http://uamservice.tcs.com/xsd">80f92805d8f11020</last_Modified_Checker_Id>
            <last_Modified_Maker_Date_Time
            xmlns="http://uamservice.tcs.com/xsd">2019-09-09 12:00:00
            </last_Modified_Maker_Date_Time>
            <last_Modified_Checker_Date_Time xmlns="http://uamservice.tcs.com/xsd">
            2019-09-09 12:00:00</last_Modified_Checker_Date_Time>
            <email_Id xmlns="http://uamservice.tcs.com/xsd">gfdjh876@gmail.com</email_Id>
            <emp_Code xmlns="http://uamservice.tcs.com/xsd">INV23590</emp_Code>
            <mobile xmlns="http://uamservice.tcs.com/xsd">9673305847</mobile>
            <role_Id xmlns="http://uamservice.tcs.com/xsd">1</role_Id>
            <uniqueNumber xmlns="http://uamservice.tcs.com/xsd">77jdghfj573</uniqueNumber>
            <user_Id xmlns="http://uamservice.tcs.com/xsd">A2000</user_Id>
            <user_Name xmlns="http://uamservice.tcs.com/xsd">Abhay Verma</user_Name>
            <user_Type xmlns="http://uamservice.tcs.com/xsd">2</user_Type>
            <category xmlns="http://uamservice.tcs.com/xsd">2</category>
            <date_Of_Birth xmlns="http://uamservice.tcs.com/xsd">12/03/1999</date_Of_Birth>
            <salutation xmlns="http://uamservice.tcs.com/xsd">2</salutation>
            <gender xmlns="http://uamservice.tcs.com/xsd">2</gender>
            </in>
            </unlockUser>
            </s:Body>
            </s:Envelope>`
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UamIntegrationController.prototype, "enableUserUsingUAM", null);
(0, tslib_1.__decorate)([
    (0, rest_1.put)(`/${API_PREFIX}/deleteUserUsingUAM`),
    (0, rest_1.response)(200, {
        description: 'Delete User using UAM',
        content: {
            'application/xml': {
                schema: {}
            }
        }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/xml': {
                example: `<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
            <s:Body xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xmlns:xsd="http://www.w3.org/2001/XMLSchema">
            <deleteUser xmlns="http://uamservice.tcs.com">
            <in>
            <last_Modified_Maker_Id
            xmlns="http://uamservice.tcs.com/xsd">80f92805d8f11020</last_Modified_Maker_Id>
            <last_Modified_Checker_Id
            xmlns="http://uamservice.tcs.com/xsd">80f92805d8f11020</last_Modified_Checker_Id>
            <last_Modified_Maker_Date_Time
            xmlns="http://uamservice.tcs.com/xsd">2019-09-09 12:00:00
            </last_Modified_Maker_Date_Time>
            <last_Modified_Checker_Date_Time xmlns="http://uamservice.tcs.com/xsd">
            2019-09-09 12:00:00</last_Modified_Checker_Date_Time>
            <email_Id xmlns="http://uamservice.tcs.com/xsd">gfdjh876@gmail.com</email_Id>
            <emp_Code xmlns="http://uamservice.tcs.com/xsd">INV23590</emp_Code>
            <mobile xmlns="http://uamservice.tcs.com/xsd">9673305847</mobile>
            <role_Id xmlns="http://uamservice.tcs.com/xsd">1</role_Id>
            <uniqueNumber xmlns="http://uamservice.tcs.com/xsd">77jdghfj573</uniqueNumber>
            <user_Id xmlns="http://uamservice.tcs.com/xsd">A2000</user_Id>
            <user_Name xmlns="http://uamservice.tcs.com/xsd">Abhay Verma</user_Name>
            <user_Type xmlns="http://uamservice.tcs.com/xsd">2</user_Type>
            <category xmlns="http://uamservice.tcs.com/xsd">2</category>
            <date_Of_Birth xmlns="http://uamservice.tcs.com/xsd">12/03/1999</date_Of_Birth>
            <salutation xmlns="http://uamservice.tcs.com/xsd">2</salutation>
            <gender xmlns="http://uamservice.tcs.com/xsd">2</gender>
            </in>
            </deleteUser>
            </s:Body>
            </s:Envelope>`
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UamIntegrationController.prototype, "deleteUserUsingUAM", null);
(0, tslib_1.__decorate)([
    (0, rest_1.put)(`/${API_PREFIX}/reopenUserUsingUAM`),
    (0, rest_1.response)(200, {
        description: 'Reopen User using UAM',
        content: {
            'application/xml': {
                schema: {}
            }
        }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/xml': {
                example: `<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
            <s:Body xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xmlns:xsd="http://www.w3.org/2001/XMLSchema">
            <reopenUser xmlns="http://uamservice.tcs.com">
            <in>
            <last_Modified_Maker_Id
            xmlns="http://uamservice.tcs.com/xsd">80f92805d8f11020</last_Modified_Maker_Id>
            <last_Modified_Checker_Id
            xmlns="http://uamservice.tcs.com/xsd">80f92805d8f11020</last_Modified_Checker_Id>
            <last_Modified_Maker_Date_Time
            xmlns="http://uamservice.tcs.com/xsd">2019-09-09 12:00:00
            </last_Modified_Maker_Date_Time>
            <last_Modified_Checker_Date_Time xmlns="http://uamservice.tcs.com/xsd">
            2019-09-09 12:00:00</last_Modified_Checker_Date_Time>
            <email_Id xmlns="http://uamservice.tcs.com/xsd">gfdjh876@gmail.com</email_Id>
            <emp_Code xmlns="http://uamservice.tcs.com/xsd">INV23590</emp_Code>
            <mobile xmlns="http://uamservice.tcs.com/xsd">9673305847</mobile>
            <role_Id xmlns="http://uamservice.tcs.com/xsd">1</role_Id>
            <uniqueNumber xmlns="http://uamservice.tcs.com/xsd">77jdghfj573</uniqueNumber>
            <user_Id xmlns="http://uamservice.tcs.com/xsd">A2000</user_Id>
            <user_Name xmlns="http://uamservice.tcs.com/xsd">Abhay Verma</user_Name>
            <user_Type xmlns="http://uamservice.tcs.com/xsd">2</user_Type>
            <category xmlns="http://uamservice.tcs.com/xsd">2</category>
            <date_Of_Birth xmlns="http://uamservice.tcs.com/xsd">12/03/1999</date_Of_Birth>
            <salutation xmlns="http://uamservice.tcs.com/xsd">2</salutation>
            <gender xmlns="http://uamservice.tcs.com/xsd">2</gender>
            </in>
            </reopenUser>
            </s:Body>
            </s:Envelope>`
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UamIntegrationController.prototype, "reopenUserUsingUAM", null);
(0, tslib_1.__decorate)([
    (0, rest_1.put)(`/${API_PREFIX}/unlockUserUsingUAM`),
    (0, rest_1.response)(200, {
        description: 'Unlock User using UAM',
        content: {
            'application/xml': {
                schema: {}
            }
        }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/xml': {
                example: `<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
            <s:Body xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xmlns:xsd="http://www.w3.org/2001/XMLSchema">
            <unlockUser xmlns="http://uamservice.tcs.com">
            <in>
            <last_Modified_Maker_Id
            xmlns="http://uamservice.tcs.com/xsd">80f92805d8f11020</last_Modified_Maker_Id>
            <last_Modified_Checker_Id
            xmlns="http://uamservice.tcs.com/xsd">80f92805d8f11020</last_Modified_Checker_Id>
            <last_Modified_Maker_Date_Time
            xmlns="http://uamservice.tcs.com/xsd">2019-09-09 12:00:00
            </last_Modified_Maker_Date_Time>
            <last_Modified_Checker_Date_Time xmlns="http://uamservice.tcs.com/xsd">
            2019-09-09 12:00:00</last_Modified_Checker_Date_Time>
            <email_Id xmlns="http://uamservice.tcs.com/xsd">gfdjh876@gmail.com</email_Id>
            <emp_Code xmlns="http://uamservice.tcs.com/xsd">INV23590</emp_Code>
            <mobile xmlns="http://uamservice.tcs.com/xsd">9673305847</mobile>
            <role_Id xmlns="http://uamservice.tcs.com/xsd">1</role_Id>
            <uniqueNumber xmlns="http://uamservice.tcs.com/xsd">77jdghfj573</uniqueNumber>
            <user_Id xmlns="http://uamservice.tcs.com/xsd">A2000</user_Id>
            <user_Name xmlns="http://uamservice.tcs.com/xsd">Abhay Verma</user_Name>
            <user_Type xmlns="http://uamservice.tcs.com/xsd">2</user_Type>
            <category xmlns="http://uamservice.tcs.com/xsd">2</category>
            <date_Of_Birth xmlns="http://uamservice.tcs.com/xsd">12/03/1999</date_Of_Birth>
            <salutation xmlns="http://uamservice.tcs.com/xsd">2</salutation>
            <gender xmlns="http://uamservice.tcs.com/xsd">2</gender>
            </in>
            </unlockUser>
            </s:Body>
            </s:Envelope>`
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UamIntegrationController.prototype, "unlockUserUsingUAM", null);
(0, tslib_1.__decorate)([
    (0, rest_1.put)(`/${API_PREFIX}/updateUserUsingUAM`),
    (0, rest_1.response)(200, {
        description: 'Update User using UAM',
        content: {
            'application/xml': {
                schema: {}
            }
        }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/xml': {
                example: `<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
            <s:Body xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xmlns:xsd="http://www.w3.org/2001/XMLSchema">
            <modifyUser xmlns="http://uamservice.tcs.com">
            <in>
            <last_Modified_Maker_Id
            xmlns="http://uamservice.tcs.com/xsd">80f92805d8f11020</last_Modified_Maker_Id>
            <last_Modified_Checker_Id
            xmlns="http://uamservice.tcs.com/xsd">80f92805d8f11020</last_Modified_Checker_Id>
            <last_Modified_Maker_Date_Time
            xmlns="http://uamservice.tcs.com/xsd">2019-09-09 12:00:00
            </last_Modified_Maker_Date_Time>
            <last_Modified_Checker_Date_Time xmlns="http://uamservice.tcs.com/xsd">
            2019-09-09 12:00:00</last_Modified_Checker_Date_Time>
            <email_Id xmlns="http://uamservice.tcs.com/xsd">gfdjh876@gmail.com</email_Id>
            <emp_Code xmlns="http://uamservice.tcs.com/xsd">INV23590</emp_Code>
            <mobile xmlns="http://uamservice.tcs.com/xsd">9673305847</mobile>
            <role_Id xmlns="http://uamservice.tcs.com/xsd">1</role_Id>
            <uniqueNumber xmlns="http://uamservice.tcs.com/xsd">77jdghfj573</uniqueNumber>
            <user_Id xmlns="http://uamservice.tcs.com/xsd">A2000</user_Id>
            <user_Name xmlns="http://uamservice.tcs.com/xsd">Abhay Verma</user_Name>
            <user_Type xmlns="http://uamservice.tcs.com/xsd">2</user_Type>
            <category xmlns="http://uamservice.tcs.com/xsd">2</category>
            <date_Of_Birth xmlns="http://uamservice.tcs.com/xsd">12/03/1999</date_Of_Birth>
            <salutation xmlns="http://uamservice.tcs.com/xsd">2</salutation>
            <gender xmlns="http://uamservice.tcs.com/xsd">2</gender>
            </in>
            </modifyUser>
            </s:Body>
            </s:Envelope>`
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UamIntegrationController.prototype, "updateUserUsingUAM", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/fetchUserIdPopulationReport`),
    (0, rest_1.response)(200, {
        description: 'For fetching user id population report',
        content: {
            'application/json': {
                schema: {
                    type: 'object'
                }
            }
        },
        param: rest_1.param
    }),
    (0, tslib_1.__param)(0, rest_1.param.query.number('offset')),
    (0, tslib_1.__param)(1, rest_1.param.query.number('limit')),
    (0, tslib_1.__param)(2, rest_1.param.query.object('searchFilter')),
    (0, tslib_1.__param)(3, rest_1.param.array('orderBy', 'query', { type: 'object' })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, Number, Object, Array]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UamIntegrationController.prototype, "fetchUserIdPopulationReport", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/exportUserIdPopulationReport/{exportFormat}`),
    (0, rest_1.response)(200, {
        description: 'For exporting userId PopulationReport by given export format(xlsx)',
        content: {
            'application/json': {
                schema: {
                    type: 'object'
                }
            }
        },
        param: rest_1.param
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.string('exportFormat')),
    (0, tslib_1.__param)(1, rest_1.param.query.date('fromDate')),
    (0, tslib_1.__param)(2, rest_1.param.query.date('toDate')),
    (0, tslib_1.__param)(3, rest_1.param.query.object('searchFilter')),
    (0, tslib_1.__param)(4, rest_1.param.array('orderBy', 'query', { type: 'object' })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String, Object, Object, Object, Array]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UamIntegrationController.prototype, "exportUserIdPopulationReport", null);
(0, tslib_1.__decorate)([
    (0, rest_1.put)(`/${API_PREFIX}/changeAppUserStatus`),
    (0, rest_1.response)(200, {
        description: 'API to update/lock/disable/delete user',
        content: {
            'application/json': {
                schema: {
                    type: 'object'
                },
                example: {
                    success: true
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: {
                    type: 'object'
                }
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UamIntegrationController.prototype, "changeAppUserStatus", null);
(0, tslib_1.__decorate)([
    (0, rest_1.put)(`/${API_PREFIX}/changeAppUserDetails`),
    (0, rest_1.response)(200, {
        description: 'API to update/lock/disable/delete user',
        content: {
            'application/json': {
                schema: {
                    type: 'object'
                },
                example: {
                    success: true
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: {
                    type: 'object'
                }
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UamIntegrationController.prototype, "changeAppUserDetails", null);
(0, tslib_1.__decorate)([
    (0, rest_1.post)(`/${API_PREFIX}/createUser`),
    (0, rest_1.response)(200, {
        description: 'API to create user',
        content: {
            'application/json': {
                schema: {
                    type: 'object'
                },
                example: {
                    success: true
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    example: '{"salutation":2,"name":"SUBHANKAR B","userCode":"SUBHANKARB","branchCode":"branch","branchName":"branch","departmentCode":"dept","departmentName":"dept","appRoleId":4,"appUserStatusValue":19,"dob":"","gender":1,"contactNumber":"","email":"SUBHANKARB@hdfcbank.com","category":1}'
                }
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UamIntegrationController.prototype, "createUser", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/downloadAdminActivityReport`),
    (0, rest_1.response)(200, {
        description: 'API for downloading the file',
        content: {
            'application/json': {
                schema: {
                    type: 'object'
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.filter(common_1.UamIntegration)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UamIntegrationController.prototype, "downloadAdminActivityReport", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)(`/${API_PREFIX}/updateConfigiurations`),
    (0, rest_1.response)(204, {
        description: 'changeMaxAllowedLoginAttempts success'
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    // required: ['maxAttempts'],
                    properties: {
                        maxLoginAttempts: {
                            type: 'number',
                            minimum: 1,
                            maximum: 10
                        },
                        maxDormancyDays: {
                            type: 'number',
                            minimum: 1,
                            maximum: 100
                        },
                        maxDormancyDaysBeforeFirstLogin: {
                            type: 'number',
                            minimum: 1,
                            maximum: 100
                        }
                    }
                }
            }
        }
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [common_1.UamLoginAttemptsConfig]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UamIntegrationController.prototype, "updateMaxAllowedLoginAttempts", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/fetchConfigurations`),
    (0, rest_1.response)(200, {
        description: 'Fetch configs',
        content: {
            'application/json': {
                schema: {
                    type: 'object'
                }
            }
        }
    }),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", []),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UamIntegrationController.prototype, "fetchConfigurations", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)(`/${API_PREFIX}/downloadRoleRightsReport`),
    (0, rest_1.response)(200, {
        description: 'API for downloading the file',
        content: {
            'application/json': {
                schema: {
                    type: 'object'
                }
            }
        }
    }),
    (0, tslib_1.__param)(0, rest_1.param.filter(common_1.UamIntegration)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UamIntegrationController.prototype, "downloadRoleRightsReport", null);
UamIntegrationController = (0, tslib_1.__decorate)([
    (0, authorization_1.authorize)({}),
    (0, tslib_1.__param)(0, (0, core_1.service)(facades_1.UamIntegrationFacade)),
    (0, tslib_1.__param)(1, (0, core_1.inject)(rest_1.RestBindings.Http.RESPONSE)),
    (0, tslib_1.__param)(2, (0, core_1.inject)('additionalHeaders')),
    (0, tslib_1.__param)(3, (0, core_1.inject)('userProfile')),
    (0, tslib_1.__metadata)("design:paramtypes", [facades_1.UamIntegrationFacade, Object, Object, Object])
], UamIntegrationController);
exports.UamIntegrationController = UamIntegrationController;
//# sourceMappingURL=uam-integration.controller.js.map