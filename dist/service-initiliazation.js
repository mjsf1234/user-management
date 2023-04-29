"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceInitialization = void 0;
const common_1 = require("common");
class ServiceInitialization {
    //initiate whichever repositories are needed in the service or processor
    static init(app) {
        common_1.LoggingUtils.info('Initializing services');
        app.service(common_1.FileStorageComponent, 'fileStorageComponent');
    }
}
exports.ServiceInitialization = ServiceInitialization;
//# sourceMappingURL=service-initiliazation.js.map