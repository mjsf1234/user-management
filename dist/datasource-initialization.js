"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatasourceInitialization = void 0;
const datasources_1 = require("common/dist/datasources");
const common_1 = require("common");
class DatasourceInitialization {
    static async init(app) {
        common_1.LoggingUtils.info('Initializing datasources');
        await app.dataSource(datasources_1.LoggingRestRemoteDataSource, 'logging_remote_rest');
        await app.dataSource(datasources_1.MasterDataRemoteRestDataSource, 'master_data_remote_rest');
        await app.dataSource(datasources_1.OrderExecutionRemoteRestDataSource, 'order_execution_remote_rest');
        // await app.dataSource(ReportingRemoteRestDataSource as unknown as Class<juggler.DataSource>, 'reporting_remote_rest');
        await app.dataSource(datasources_1.TransactionRemoteRestDataSource, 'transaction_remote_rest');
        // await app.dataSource(UserManagementRemoteRestDataSource as unknown as Class<juggler.DataSource>, 'user_management_remote_rest');
        await app.dataSource(datasources_1.CacheRedisRemoteDataSource, 'cache_redis');
    }
}
exports.DatasourceInitialization = DatasourceInitialization;
//# sourceMappingURL=datasource-initialization.js.map