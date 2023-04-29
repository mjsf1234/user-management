import { Count, DataObject, Filter, FilterExcludingWhere, Options, Where } from '@loopback/repository';
import { InstrumentsExportFile, InstrumentsExportFileRelations, InstrumentsExportFileRepository } from 'common';
export declare class InstrumentsExportFileFacade {
    private InstrumentsExportFileRepository;
    constructor(InstrumentsExportFileRepository: InstrumentsExportFileRepository);
    create(entity: DataObject<InstrumentsExportFile>, options?: Options): Promise<InstrumentsExportFile>;
    createAll(entities: DataObject<InstrumentsExportFile>[], options?: Options): Promise<InstrumentsExportFile[]>;
    save(entity: InstrumentsExportFile, options?: Options): Promise<InstrumentsExportFile>;
    find(filter?: Filter<InstrumentsExportFile>, options?: Options): Promise<(InstrumentsExportFile & InstrumentsExportFileRelations)[]>;
    findOne(filter?: Filter<InstrumentsExportFile>, options?: Options): Promise<(InstrumentsExportFile & InstrumentsExportFileRelations) | null>;
    findById(id: number, filter?: FilterExcludingWhere<InstrumentsExportFile>, options?: Options): Promise<InstrumentsExportFile & InstrumentsExportFileRelations>;
    update(entity: InstrumentsExportFile, options?: Options): Promise<void>;
    delete(entity: InstrumentsExportFile, options?: Options): Promise<void>;
    updateAll(data: DataObject<InstrumentsExportFile>, where?: Where<InstrumentsExportFile>, options?: Options): Promise<Count>;
    updateById(id: number, data: DataObject<InstrumentsExportFile>, options?: Options): Promise<void>;
    replaceById(id: number, data: DataObject<InstrumentsExportFile>, options?: Options): Promise<void>;
    deleteAll(where?: Where<InstrumentsExportFile>, options?: Options): Promise<Count>;
    deleteById(id: number, options?: Options): Promise<void>;
    count(where?: Where<InstrumentsExportFile>, options?: Options): Promise<Count>;
    exists(id: number, options?: Options): Promise<boolean>;
}
