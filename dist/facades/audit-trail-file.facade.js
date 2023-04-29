"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditTrailFileFacade = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const common_1 = require("common");
// All business loigc goes inside Facade layer
let AuditTrailFileFacade = class AuditTrailFileFacade {
    constructor(AuditTrailFileRepository, 
    // @repository.getter(UserManagementAppFileRepository)private AppFileGetter: Getter<UserManagementAppFileRepository>,
    // @repository(UserManagementAppFileRepository) private UserManagementAppFileRepository: UserManagementAppFileRepository,
    // @repository(AuditTrailRepository) private AuditTrailRepository: AuditTrailRepository,
    // @repository(RtaRepository) private RtaRepository: RtaRepository,
    fileStorageService) {
        this.AuditTrailFileRepository = AuditTrailFileRepository;
        this.fileStorageService = fileStorageService;
    } //
    async create(entity, options) {
        return this.AuditTrailFileRepository.create(entity, options);
    }
    async createAll(entities, options) {
        return this.AuditTrailFileRepository.createAll(entities, options);
    }
    async save(entity, options) {
        return this.AuditTrailFileRepository.save(entity, options);
    }
    async find(filter, options) {
        return this.AuditTrailFileRepository.find(filter, options);
    }
    async findOne(filter, options) {
        return this.AuditTrailFileRepository.findOne(filter, options);
    }
    async findById(id, filter, options) {
        return this.AuditTrailFileRepository.findById(id, filter, options);
    }
    async update(entity, options) {
        return this.AuditTrailFileRepository.update(entity, options);
    }
    async delete(entity, options) {
        return this.AuditTrailFileRepository.delete(entity, options);
    }
    async updateAll(data, where, options) {
        return this.AuditTrailFileRepository.updateAll(data, where, options);
    }
    async updateById(id, data, options) {
        return this.AuditTrailFileRepository.updateById(id, data, options);
    }
    async replaceById(id, data, options) {
        return this.AuditTrailFileRepository.replaceById(id, data, options);
    }
    async deleteAll(where, options) {
        return this.AuditTrailFileRepository.deleteAll(where, options);
    }
    async deleteById(id, options) {
        return this.AuditTrailFileRepository.deleteById(id, options);
    }
    async count(where, options) {
        return this.AuditTrailFileRepository.count(where, options);
    }
    async exists(id, options) {
        return this.AuditTrailFileRepository.exists(id, options);
    }
};
AuditTrailFileFacade = (0, tslib_1.__decorate)([
    (0, core_1.injectable)({ scope: core_1.BindingScope.APPLICATION }),
    (0, tslib_1.__param)(0, (0, repository_1.repository)(common_1.AuditTrailFileRepository)),
    (0, tslib_1.__param)(1, (0, core_1.inject)('services.fileStorageComponent')),
    (0, tslib_1.__metadata)("design:paramtypes", [common_1.AuditTrailFileRepository, Object])
], AuditTrailFileFacade);
exports.AuditTrailFileFacade = AuditTrailFileFacade;
//# sourceMappingURL=audit-trail-file.facade.js.map