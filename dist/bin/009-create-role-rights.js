"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBaseData = void 0;
const tslib_1 = require("tslib");
const common_1 = require("common");
const application_1 = require("../application");
const datasource_initialization_1 = require("../datasource-initialization");
const repository_initiliazation_1 = require("../repository-initiliazation");
const common_2 = require("common");
const dotenv = (0, tslib_1.__importStar)(require("dotenv"));
const path = (0, tslib_1.__importStar)(require("path"));
try {
    dotenv.config({ path: path.resolve(__dirname, '../../.env') });
}
catch (error) { }
async function createBaseData() {
    const app = new application_1.UserManagementService();
    await app.boot();
    await datasource_initialization_1.DatasourceInitialization.init(app);
    repository_initiliazation_1.RepositoryInitialization.init(app);
    const baseData = [
        {
            profile: 'BUSINESS',
            roleDescription: 'This role is created for Business team to ensure the access for analysis, issue or BAU can be done successfully. Scope will include Business reports, call centre team and operations ',
            rights: 'Generic Maintenance',
            rightsDescription: 'Business user will have view rights on this module',
            read: true,
            write: false,
            roleStatus: 'Active',
            rightsStatus: 'Active',
            typeOfAccess: 'Viewer'
        },
        {
            profile: 'BUSINESS',
            roleDescription: 'This role is created for Business team to ensure the access for analysis, issue or BAU can be done successfully. Scope will include Business reports, call centre team and operations ',
            rights: 'Reports > Transaction Report',
            rightsDescription: 'Business user will have view rights on this module',
            read: true,
            write: false,
            roleStatus: 'Active',
            rightsStatus: 'Active',
            typeOfAccess: 'Viewer'
        },
        {
            profile: 'BUSINESS',
            roleDescription: 'This role is created for Business team to ensure the access for analysis, issue or BAU can be done successfully. Scope will include Business reports, call centre team and operations ',
            rights: 'Reports > Capital Gain Report',
            rightsDescription: 'Business user will have view rights on this module',
            read: true,
            write: false,
            roleStatus: 'Active',
            rightsStatus: 'Active',
            typeOfAccess: 'Viewer'
        },
        {
            profile: 'BUSINESS',
            roleDescription: 'This role is created for Business team to ensure the access for analysis, issue or BAU can be done successfully. Scope will include Business reports, call centre team and operations ',
            rights: 'Reports > Holding Report',
            rightsDescription: 'Business user will have view rights on this module',
            read: true,
            write: false,
            roleStatus: 'Active',
            rightsStatus: 'Active',
            typeOfAccess: 'Viewer'
        },
        {
            profile: 'BUSINESS',
            roleDescription: 'This role is created for Business team to ensure the access for analysis, issue or BAU can be done successfully. Scope will include Business reports, call centre team and operations ',
            rights: 'Logs >a. Cron Logsb. Messaging Logsc. Activity Logsd. Audit Logse. Login Logsf. UAM Logs',
            rightsDescription: 'Business user will have view rights on this module',
            read: true,
            write: false,
            roleStatus: 'Active',
            rightsStatus: 'Active',
            typeOfAccess: 'Viewer'
        },
        {
            profile: 'BUSINESS',
            roleDescription: 'This role is created for Business team to ensure the access for analysis, issue or BAU can be done successfully. Scope will include Business reports, call centre team and operations ',
            rights: 'Logs > Order Execution Logs',
            rightsDescription: 'Business user will have view rights on this module',
            read: true,
            write: false,
            roleStatus: 'Active',
            rightsStatus: 'Active',
            typeOfAccess: 'Viewer'
        },
        {
            profile: 'BUSINESS',
            roleDescription: 'This role is created for Business team to ensure the access for analysis, issue or BAU can be done successfully. Scope will include Business reports, call centre team and operations ',
            rights: 'Holding Recon',
            rightsDescription: 'Business user will have view rights on this module',
            read: true,
            write: false,
            roleStatus: 'Active',
            rightsStatus: 'Active',
            typeOfAccess: 'Viewer'
        },
        {
            profile: 'BUSINESS',
            roleDescription: 'This role is created for Business team to ensure the access for analysis, issue or BAU can be done successfully. Scope will include Business reports, call centre team and operations ',
            rights: 'Risk Profile Configuration >a. Risk Profileb. Risk Profile Questionc. Risk Profile Question Possible Answer',
            rightsDescription: 'Business user will have view rights on this module',
            read: true,
            write: false,
            roleStatus: 'Active',
            rightsStatus: 'Active',
            typeOfAccess: 'Viewer'
        },
        {
            profile: 'BUSINESS',
            roleDescription: 'This role is created for Business team to ensure the access for analysis, issue or BAU can be done successfully. Scope will include Business reports, call centre team and operations ',
            rights: 'Risk Profile Configuration > MIS Risk Profile',
            rightsDescription: 'Business user will have view rights on this module',
            read: true,
            write: false,
            roleStatus: 'Active',
            rightsStatus: 'Active',
            typeOfAccess: 'Viewer'
        },
        {
            profile: 'BUSINESS',
            roleDescription: 'This role is created for Business team to ensure the access for analysis, issue or BAU can be done successfully. Scope will include Business reports, call centre team and operations ',
            rights: 'Instrument Master',
            rightsDescription: 'Business user will have view & edit rights on this module',
            read: true,
            write: true,
            roleStatus: 'Active',
            rightsStatus: 'Active',
            typeOfAccess: 'Dual rights '
        },
        {
            profile: 'BUSINESS',
            roleDescription: 'This role is created for Business team to ensure the access for analysis, issue or BAU can be done successfully. Scope will include Business reports, call centre team and operations ',
            rights: 'Investor Master',
            rightsDescription: 'Business user will have view rights on this module',
            read: true,
            write: false,
            roleStatus: 'Active',
            rightsStatus: 'Active',
            typeOfAccess: 'Viewer'
        },
        {
            profile: 'BUSINESS',
            roleDescription: 'This role is created for Business team to ensure the access for analysis, issue or BAU can be done successfully. Scope will include Business reports, call centre team and operations ',
            rights: 'Advisory Client Master',
            rightsDescription: 'Business user will have view rights on this module',
            read: true,
            write: false,
            roleStatus: 'Active',
            rightsStatus: 'Active',
            typeOfAccess: 'Viewer'
        },
        {
            profile: 'BUSINESS',
            roleDescription: 'This role is created for Business team to ensure the access for analysis, issue or BAU can be done successfully. Scope will include Business reports, call centre team and operations ',
            rights: 'New Folio Update',
            rightsDescription: 'Business user will have view rights on this module',
            read: true,
            write: false,
            roleStatus: 'Active',
            rightsStatus: 'Active',
            typeOfAccess: 'Viewer'
        },
        {
            profile: 'BUSINESS',
            roleDescription: 'This role is created for Business team to ensure the access for analysis, issue or BAU can be done successfully. Scope will include Business reports, call centre team and operations ',
            rights: 'Business Reports',
            rightsDescription: 'Business user will have view rights on this module',
            read: true,
            write: false,
            roleStatus: 'Active',
            rightsStatus: 'Active',
            typeOfAccess: 'Viewer'
        },
        {
            profile: 'BUSINESS',
            roleDescription: 'This role is created for Business team to ensure the access for analysis, issue or BAU can be done successfully. Scope will include Business reports, call centre team and operations ',
            rights: 'Model Portfolio Configuration',
            rightsDescription: 'Business user will have view & edit rights on this module',
            read: true,
            write: true,
            roleStatus: 'Active',
            rightsStatus: 'Active',
            typeOfAccess: 'Dual rights '
        },
        {
            profile: 'UAMMAKER',
            roleDescription: 'Roles is created for the UAM team to perform their task on regular basis',
            rights: 'UAM > User Maintenance',
            rightsDescription: 'Provide access to Backoffice user',
            read: true,
            write: true,
            roleStatus: 'Active',
            rightsStatus: 'Active',
            typeOfAccess: 'Dual rights'
        },
        {
            profile: 'UAMREVIEWER',
            roleDescription: 'This role is created for UAM user to only download UAM specific reports',
            rights: 'UAM Management',
            rightsDescription: 'To download UAM reports from UAM Module',
            read: true,
            write: false,
            roleStatus: 'Active',
            rightsStatus: 'Active',
            typeOfAccess: 'Viewer'
        },
        {
            profile: 'CALLCENTER',
            roleDescription: 'This role is created for Service Center team to facilitate them with details required for handling customer queries',
            rights: 'Reports > Transaction Report',
            rightsDescription: 'Service Center user will have view rights on this module',
            read: true,
            write: false,
            roleStatus: 'Active',
            rightsStatus: 'Active',
            typeOfAccess: 'Viewer'
        },
        {
            profile: 'CALLCENTER',
            roleDescription: 'This role is created for Service Center team to facilitate them with details required for handling customer queries',
            rights: 'Reports > Capital Gain Report',
            rightsDescription: 'Service Center user will have view rights on this module',
            read: true,
            write: false,
            roleStatus: 'Active',
            rightsStatus: 'Active',
            typeOfAccess: 'Viewer'
        },
        {
            profile: 'CALLCENTER',
            roleDescription: 'This role is created for Service Center team to facilitate them with details required for handling customer queries',
            rights: 'Reports > Holding Report',
            rightsDescription: 'Service Center user will have view rights on this module',
            read: true,
            write: false,
            roleStatus: 'Active',
            rightsStatus: 'Active',
            typeOfAccess: 'Viewer'
        },
        {
            profile: 'CALLCENTER',
            roleDescription: 'This role is created for Service Center team to facilitate them with details required for handling customer queries',
            rights: 'Logs >a. Cron Logsb. Messaging Logsc. Activity Logsd. Audit Logse. Login Logsf. UAM Logs',
            rightsDescription: 'Service Center user will have view rights on this module',
            read: true,
            write: false,
            roleStatus: 'Active',
            rightsStatus: 'Active',
            typeOfAccess: 'Viewer'
        },
        {
            profile: 'CALLCENTER',
            roleDescription: 'This role is created for Service Center team to facilitate them with details required for handling customer queries',
            rights: 'Logs > Order Execution Logs',
            rightsDescription: 'Service Center user will have view rights on this module',
            read: true,
            write: false,
            roleStatus: 'Active',
            rightsStatus: 'Active',
            typeOfAccess: 'Viewer'
        },
        {
            profile: 'CALLCENTER',
            roleDescription: 'This role is created for Service Center team to facilitate them with details required for handling customer queries',
            rights: 'Risk Profile Configuration >a. Risk Profileb. Risk Profile Questionc. Risk Profile Question Possible Answer',
            rightsDescription: 'Service Center user will have view rights on this module',
            read: true,
            write: false,
            roleStatus: 'Active',
            rightsStatus: 'Active',
            typeOfAccess: 'Viewer'
        },
        {
            profile: 'CALLCENTER',
            roleDescription: 'This role is created for Service Center team to facilitate them with details required for handling customer queries',
            rights: 'Risk Profile Configuration > MIS Risk Profile',
            rightsDescription: 'Service Center user will have view rights on this module',
            read: true,
            write: false,
            roleStatus: 'Active',
            rightsStatus: 'Active',
            typeOfAccess: 'Viewer'
        },
        {
            profile: 'CALLCENTER',
            roleDescription: 'This role is created for Service Center team to facilitate them with details required for handling customer queries',
            rights: 'Instrument Master',
            rightsDescription: 'Service Center user will have view rights on this module',
            read: true,
            write: false,
            roleStatus: 'Active',
            rightsStatus: 'Active',
            typeOfAccess: 'Viewer'
        },
        {
            profile: 'CALLCENTER',
            roleDescription: 'This role is created for Service Center team to facilitate them with details required for handling customer queries',
            rights: 'Investor Master',
            rightsDescription: 'Service Center user will have view rights on this module',
            read: true,
            write: false,
            roleStatus: 'Active',
            rightsStatus: 'Active',
            typeOfAccess: 'Viewer'
        },
        {
            profile: 'CALLCENTER',
            roleDescription: 'This role is created for Service Center team to facilitate them with details required for handling customer queries',
            rights: 'Advisory Client Master',
            rightsDescription: 'Service Center user will have view rights on this module',
            read: true,
            write: false,
            roleStatus: 'Active',
            rightsStatus: 'Active',
            typeOfAccess: 'Viewer'
        },
        {
            profile: 'BSG',
            roleDescription: 'This role is created for BSG/BTG team to ensure the access for analysis, issue or BAU can be done successfully. Scope will include Business reports, call centre team, operations or the log',
            rights: 'Generic Maintenance',
            rightsDescription: 'BSG user will have view rights on this module',
            read: true,
            write: false,
            roleStatus: 'Active',
            rightsStatus: 'Active',
            typeOfAccess: 'Viewer'
        },
        {
            profile: 'BSG',
            roleDescription: 'This role is created for BSG/BTG team to ensure the access for analysis, issue or BAU can be done successfully. Scope will include Business reports, call centre team, operations or the log',
            rights: 'Reports > Transaction Report',
            rightsDescription: 'BSG user will have view rights on this module',
            read: true,
            write: false,
            roleStatus: 'Active',
            rightsStatus: 'Active',
            typeOfAccess: 'Viewer'
        },
        {
            profile: 'BSG',
            roleDescription: 'This role is created for BSG/BTG team to ensure the access for analysis, issue or BAU can be done successfully. Scope will include Business reports, call centre team, operations or the log',
            rights: 'Reports > Capital Gain Report',
            rightsDescription: 'BSG user will have view rights on this module',
            read: true,
            write: false,
            roleStatus: 'Active',
            rightsStatus: 'Active',
            typeOfAccess: 'Viewer'
        },
        {
            profile: 'BSG',
            roleDescription: 'This role is created for BSG/BTG team to ensure the access for analysis, issue or BAU can be done successfully. Scope will include Business reports, call centre team, operations or the log',
            rights: 'Reports > Holding Report',
            rightsDescription: 'BSG user will have view rights on this module',
            read: true,
            write: false,
            roleStatus: 'Active',
            rightsStatus: 'Active',
            typeOfAccess: 'Viewer'
        },
        {
            profile: 'BSG',
            roleDescription: 'This role is created for BSG/BTG team to ensure the access for analysis, issue or BAU can be done successfully. Scope will include Business reports, call centre team, operations or the log',
            rights: 'Upload > FATCA Upload',
            rightsDescription: 'BSG user will have view rights on this module',
            read: true,
            write: false,
            roleStatus: 'Active',
            rightsStatus: 'Active',
            typeOfAccess: 'Viewer'
        },
        {
            profile: 'BSG',
            roleDescription: 'This role is created for BSG/BTG team to ensure the access for analysis, issue or BAU can be done successfully. Scope will include Business reports, call centre team, operations or the log',
            rights: 'Logs >a. Cron Logsb. Messaging Logsc. Activity Logsd. Audit Logse. Login Logsf. UAM Logs',
            rightsDescription: 'BSG user will have view rights on this module',
            read: true,
            write: false,
            roleStatus: 'Active',
            rightsStatus: 'Active',
            typeOfAccess: 'Viewer'
        },
        {
            profile: 'BSG',
            roleDescription: 'This role is created for BSG/BTG team to ensure the access for analysis, issue or BAU can be done successfully. Scope will include Business reports, call centre team, operations or the log',
            rights: 'Logs > Order Execution Logs',
            rightsDescription: 'BSG user will have view rights on this module',
            read: true,
            write: false,
            roleStatus: 'Active',
            rightsStatus: 'Active',
            typeOfAccess: 'Viewer'
        },
        {
            profile: 'BSG',
            roleDescription: 'This role is created for BSG/BTG team to ensure the access for analysis, issue or BAU can be done successfully. Scope will include Business reports, call centre team, operations or the log',
            rights: 'Holding Recon',
            rightsDescription: 'BSG user will have view rights on this module',
            read: true,
            write: false,
            roleStatus: 'Active',
            rightsStatus: 'Active',
            typeOfAccess: 'Viewer'
        },
        {
            profile: 'BSG',
            roleDescription: 'This role is created for BSG/BTG team to ensure the access for analysis, issue or BAU can be done successfully. Scope will include Business reports, call centre team, operations or the log',
            rights: 'Risk Profile Configuration >a. Risk Profileb. Risk Profile Questionc. Risk Profile Question Possible Answer',
            rightsDescription: 'BSG user will have view rights on this module',
            read: true,
            write: false,
            roleStatus: 'Active',
            rightsStatus: 'Active',
            typeOfAccess: 'Viewer'
        },
        {
            profile: 'BSG',
            roleDescription: 'This role is created for BSG/BTG team to ensure the access for analysis, issue or BAU can be done successfully. Scope will include Business reports, call centre team, operations or the log',
            rights: 'Risk Profile Configuration > MIS Risk Profile',
            rightsDescription: 'BSG user will have view rights on this module',
            read: true,
            write: false,
            roleStatus: 'Active',
            rightsStatus: 'Active',
            typeOfAccess: 'Viewer'
        },
        {
            profile: 'BSG',
            roleDescription: 'This role is created for BSG/BTG team to ensure the access for analysis, issue or BAU can be done successfully. Scope will include Business reports, call centre team, operations or the log',
            rights: 'Instrument Master',
            rightsDescription: 'BSG user will have view rights on this module',
            read: true,
            write: false,
            roleStatus: 'Active',
            rightsStatus: 'Active',
            typeOfAccess: 'Viewer'
        },
        {
            profile: 'BSG',
            roleDescription: 'This role is created for BSG/BTG team to ensure the access for analysis, issue or BAU can be done successfully. Scope will include Business reports, call centre team, operations or the log',
            rights: 'Investor Master',
            rightsDescription: 'BSG user will have view rights on this module',
            read: true,
            write: false,
            roleStatus: 'Active',
            rightsStatus: 'Active',
            typeOfAccess: 'Viewer'
        },
        {
            profile: 'BSG',
            roleDescription: 'This role is created for BSG/BTG team to ensure the access for analysis, issue or BAU can be done successfully. Scope will include Business reports, call centre team, operations or the log',
            rights: 'Payment Feed Log',
            rightsDescription: 'BSG user will have view rights on this module',
            read: true,
            write: false,
            roleStatus: 'Active',
            rightsStatus: 'Active',
            typeOfAccess: 'Viewer'
        },
        {
            profile: 'BSG',
            roleDescription: 'This role is created for BSG/BTG team to ensure the access for analysis, issue or BAU can be done successfully. Scope will include Business reports, call centre team, operations or the log',
            rights: 'Advisory Client Master',
            rightsDescription: 'BSG user will have view rights on this module',
            read: true,
            write: false,
            roleStatus: 'Active',
            rightsStatus: 'Active',
            typeOfAccess: 'Viewer'
        },
        {
            profile: 'BSG',
            roleDescription: 'This role is created for BSG/BTG team to ensure the access for analysis, issue or BAU can be done successfully. Scope will include Business reports, call centre team, operations or the log',
            rights: 'New Folio Update',
            rightsDescription: 'BSG user will have view rights on this module',
            read: true,
            write: false,
            roleStatus: 'Active',
            rightsStatus: 'Active',
            typeOfAccess: 'Viewer'
        },
        {
            profile: 'OPERATIONS',
            roleDescription: 'This role is created for the operations team using which they will carry out the BAU activity which is directly or indirectly used to execute customer transaction',
            rights: 'Generic Maintenance',
            rightsDescription: 'Operations user will have view & edit rights on this module',
            read: true,
            write: true,
            roleStatus: 'Active',
            rightsStatus: 'Active',
            typeOfAccess: 'Dual rights '
        },
        {
            profile: 'OPERATIONS',
            roleDescription: 'This role is created for the operations team using which they will carry out the BAU activity which is directly or indirectly used to execute customer transaction',
            rights: 'Reports > Transaction Report',
            rightsDescription: 'Operations user will have view & edit rights on this module',
            read: true,
            write: true,
            roleStatus: 'Active',
            rightsStatus: 'Active',
            typeOfAccess: 'Dual rights '
        },
        {
            profile: 'OPERATIONS',
            roleDescription: 'This role is created for the operations team using which they will carry out the BAU activity which is directly or indirectly used to execute customer transaction',
            rights: 'Reports > Capital Gain Report',
            rightsDescription: 'Operations user will have view  rights on this module',
            read: true,
            write: false,
            roleStatus: 'Active',
            rightsStatus: 'Active',
            typeOfAccess: 'Viewer'
        },
        {
            profile: 'OPERATIONS',
            roleDescription: 'This role is created for the operations team using which they will carry out the BAU activity which is directly or indirectly used to execute customer transaction',
            rights: 'Reports > Holding Report',
            rightsDescription: 'Operations user will have view  rights on this module',
            read: true,
            write: false,
            roleStatus: 'Active',
            rightsStatus: 'Active',
            typeOfAccess: 'Viewer'
        },
        {
            profile: 'OPERATIONS',
            roleDescription: 'This role is created for the operations team using which they will carry out the BAU activity which is directly or indirectly used to execute customer transaction',
            rights: 'Upload > FATCA Upload',
            rightsDescription: 'Operations user will have view & edit rights on this module',
            read: true,
            write: true,
            roleStatus: 'Active',
            rightsStatus: 'Active',
            typeOfAccess: 'Dual rights '
        },
        {
            profile: 'OPERATIONS',
            roleDescription: 'This role is created for the operations team using which they will carry out the BAU activity which is directly or indirectly used to execute customer transaction',
            rights: 'Upload > Reverse Feed',
            rightsDescription: 'Operations user will have view & edit rights on this module',
            read: true,
            write: true,
            roleStatus: 'Active',
            rightsStatus: 'Active',
            typeOfAccess: 'Dual rights '
        },
        {
            profile: 'OPERATIONS',
            roleDescription: 'This role is created for the operations team using which they will carry out the BAU activity which is directly or indirectly used to execute customer transaction',
            rights: 'Upload > Service Provider Contact',
            rightsDescription: 'Operations user will have view & edit rights on this module',
            read: true,
            write: true,
            roleStatus: 'Active',
            rightsStatus: 'Active',
            typeOfAccess: 'Dual rights '
        },
        {
            profile: 'OPERATIONS',
            roleDescription: 'This role is created for the operations team using which they will carry out the BAU activity which is directly or indirectly used to execute customer transaction',
            rights: 'Document Repository',
            rightsDescription: 'Operations user will have view  rights on this module',
            read: true,
            write: false,
            roleStatus: 'Active',
            rightsStatus: 'Active',
            typeOfAccess: 'Viewer'
        },
        {
            profile: 'OPERATIONS',
            roleDescription: 'This role is created for the operations team using which they will carry out the BAU activity which is directly or indirectly used to execute customer transaction',
            rights: 'Generate RTA Documents',
            rightsDescription: 'Operations user will have view & edit rights on this module',
            read: true,
            write: true,
            roleStatus: 'Active',
            rightsStatus: 'Active',
            typeOfAccess: 'Dual rights '
        },
        {
            profile: 'OPERATIONS',
            roleDescription: 'This role is created for the operations team using which they will carry out the BAU activity which is directly or indirectly used to execute customer transaction',
            rights: 'Logs >a. Cron Logsb. Messaging Logsc. Activity Logsd. Audit Logse. Login Logsf. UAM Logs',
            rightsDescription: 'Operations user will have view  rights on this module',
            read: true,
            write: false,
            roleStatus: 'Active',
            rightsStatus: 'Active',
            typeOfAccess: 'Viewer'
        },
        {
            profile: 'OPERATIONS',
            roleDescription: 'This role is created for the operations team using which they will carry out the BAU activity which is directly or indirectly used to execute customer transaction',
            rights: 'Logs > Order Execution Logs',
            rightsDescription: 'Operations user will have view  rights on this module',
            read: true,
            write: false,
            roleStatus: 'Active',
            rightsStatus: 'Active',
            typeOfAccess: 'Viewer'
        },
        {
            profile: 'OPERATIONS',
            roleDescription: 'This role is created for the operations team using which they will carry out the BAU activity which is directly or indirectly used to execute customer transaction',
            rights: 'Holding Recon',
            rightsDescription: 'Operations user will have view & edit rights on this module',
            read: true,
            write: true,
            roleStatus: 'Active',
            rightsStatus: 'Active',
            typeOfAccess: 'Dual rights '
        },
        {
            profile: 'OPERATIONS',
            roleDescription: 'This role is created for the operations team using which they will carry out the BAU activity which is directly or indirectly used to execute customer transaction',
            rights: 'Risk Profile Configuration >a. Risk Profileb. Risk Profile Questionc. Risk Profile Question Possible Answer',
            rightsDescription: 'Operations user will have view & edit rights on this module',
            read: true,
            write: true,
            roleStatus: 'Active',
            rightsStatus: 'Active',
            typeOfAccess: 'Dual rights '
        },
        {
            profile: 'OPERATIONS',
            roleDescription: 'This role is created for the operations team using which they will carry out the BAU activity which is directly or indirectly used to execute customer transaction',
            rights: 'Risk Profile Configuration > MIS Risk Profile',
            rightsDescription: 'Operations user will have view  rights on this module',
            read: true,
            write: false,
            roleStatus: 'Active',
            rightsStatus: 'Active',
            typeOfAccess: 'Viewer'
        },
        {
            profile: 'OPERATIONS',
            roleDescription: 'This role is created for the operations team using which they will carry out the BAU activity which is directly or indirectly used to execute customer transaction',
            rights: 'Instrument Master',
            rightsDescription: 'Operations user will have view & edit rights on this module',
            read: true,
            write: true,
            roleStatus: 'Active',
            rightsStatus: 'Active',
            typeOfAccess: 'Dual rights '
        },
        {
            profile: 'OPERATIONS',
            roleDescription: 'This role is created for the operations team using which they will carry out the BAU activity which is directly or indirectly used to execute customer transaction',
            rights: 'Investor Master',
            rightsDescription: 'Operations user will have view & edit rights on this module',
            read: true,
            write: true,
            roleStatus: 'Active',
            rightsStatus: 'Active',
            typeOfAccess: 'Dual rights '
        },
        {
            profile: 'OPERATIONS',
            roleDescription: 'This role is created for the operations team using which they will carry out the BAU activity which is directly or indirectly used to execute customer transaction',
            rights: 'Payment Feed Log',
            rightsDescription: 'Operations user will have view & edit rights on this module',
            read: true,
            write: true,
            roleStatus: 'Active',
            rightsStatus: 'Active',
            typeOfAccess: 'Dual rights '
        },
        {
            profile: 'OPERATIONS',
            roleDescription: 'This role is created for the operations team using which they will carry out the BAU activity which is directly or indirectly used to execute customer transaction',
            rights: 'Advisory Client Master',
            rightsDescription: 'Operations user will have view & edit rights on this module',
            read: true,
            write: true,
            roleStatus: 'Active',
            rightsStatus: 'Active',
            typeOfAccess: 'Dual rights '
        },
        {
            profile: 'OPERATIONS',
            roleDescription: 'This role is created for the operations team using which they will carry out the BAU activity which is directly or indirectly used to execute customer transaction',
            rights: 'New Folio Update',
            rightsDescription: 'Operations user will have view & edit rights on this module',
            read: true,
            write: true,
            roleStatus: 'Active',
            rightsStatus: 'Active',
            typeOfAccess: 'Dual rights '
        },
        {
            profile: 'OPERATIONS',
            roleDescription: 'This role is created for the operations team using which they will carry out the BAU activity which is directly or indirectly used to execute customer transaction',
            rights: 'Business Reports',
            rightsDescription: 'Operations user will have view  rights on this module',
            read: true,
            write: false,
            roleStatus: 'Active',
            rightsStatus: 'Active',
            typeOfAccess: 'Viewer'
        },
        {
            profile: 'OPERATIONS',
            roleDescription: 'This role is created for the operations team using which they will carry out the BAU activity which is directly or indirectly used to execute customer transaction',
            rights: 'Model Portfolio Configuration',
            rightsDescription: 'Operations user will have view & edit rights on this module',
            read: true,
            write: true,
            roleStatus: 'Active',
            rightsStatus: 'Active',
            typeOfAccess: 'Dual rights '
        }
    ];
    const repository = await app.getRepository(common_1.RoleRightsRepository);
    //await repository.createAll(baseData);
    for (const record of baseData) {
        try {
            let dataExists = await repository.findOne({
                where: { rights: record.rights, profile: record.profile, isActive: true }
            });
            if (dataExists) {
                await repository.updateById(dataExists.id, record);
            }
            else {
                await repository.create(record);
            }
        }
        catch (error) {
            common_1.LoggingUtils.error(error.message);
        }
    }
    await common_2.ValidateSequence.checkIfSequenceIsCorrect(repository, common_2.RoleRights.definition.settings.postgresql.tableName, 'id');
    common_1.LoggingUtils.info('base data created successfully');
    //exit the process when everything is done
    process.exit(0);
}
exports.createBaseData = createBaseData;
createBaseData().catch(err => {
    common_1.LoggingUtils.error('Could not create base data- ' + err);
    process.exit(1);
});
//# sourceMappingURL=009-create-role-rights.js.map