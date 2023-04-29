"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryInitialization = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const common_1 = require("common");
const LoggingRepositories = (0, tslib_1.__importStar)(require("common/dist/repositories/logging"));
const MasterDataRepositories = (0, tslib_1.__importStar)(require("common/dist/repositories/master-data"));
const OrderExecutionRepositories = (0, tslib_1.__importStar)(require("common/dist/repositories/order-execution"));
const TransactionRepositories = (0, tslib_1.__importStar)(require("common/dist/repositories/transaction"));
const UserManagementRepositories = (0, tslib_1.__importStar)(require("common/dist/repositories/user-management"));
class RepositoryInitialization {
    //initiate whichever repositories are needed in the service or processor
    static init(app) {
        common_1.LoggingUtils.info('Initializing repositories');
        const LoggingRepositoriesCollection = LoggingRepositories;
        for (const key in LoggingRepositoriesCollection) {
            (0, core_1.inject)('datasources.logging_remote_rest')(LoggingRepositoriesCollection[key], undefined, 0);
            app.repository(LoggingRepositoriesCollection[key]);
        }
        const MasterDataRepositoriesCollection = MasterDataRepositories;
        for (const key in MasterDataRepositoriesCollection) {
            (0, core_1.inject)('datasources.master_data_remote_rest')(MasterDataRepositoriesCollection[key], undefined, 0);
            app.repository(MasterDataRepositoriesCollection[key]);
        }
        const OrderExecutionRepositoriesCollection = OrderExecutionRepositories;
        for (const key in OrderExecutionRepositoriesCollection) {
            (0, core_1.inject)('datasources.order_execution_remote_rest')(OrderExecutionRepositoriesCollection[key], undefined, 0);
            app.repository(OrderExecutionRepositoriesCollection[key]);
        }
        // const ReportingRepositoriesCollection: Collection = ReportingRepositories;
        // for (const key in ReportingRepositoriesCollection) {
        //   inject('datasources.reporting_remote_rest')(ReportingRepositoriesCollection[key], undefined, 0);
        //   app.repository(ReportingRepositoriesCollection[key]);
        // }
        const TransactionRepositoriesCollection = TransactionRepositories;
        for (const key in TransactionRepositoriesCollection) {
            (0, core_1.inject)('datasources.transaction_remote_rest')(TransactionRepositoriesCollection[key], undefined, 0);
            app.repository(TransactionRepositoriesCollection[key]);
        }
        const UserManagementRepositoriesCollection = UserManagementRepositories;
        for (const key in UserManagementRepositoriesCollection) {
            (0, core_1.inject)('datasources.local')(UserManagementRepositoriesCollection[key], undefined, 0);
            app.repository(UserManagementRepositoriesCollection[key]);
        }
    }
}
exports.RepositoryInitialization = RepositoryInitialization;
//# sourceMappingURL=repository-initiliazation.js.map