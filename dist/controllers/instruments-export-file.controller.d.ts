import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { InstrumentsExportFile } from 'common';
import { InstrumentsExportFileFacade } from '../facades';
export declare class InstrumentsExportFileController {
    InstrumentsExportFileFacade: InstrumentsExportFileFacade;
    private additionalHeaders;
    constructor(InstrumentsExportFileFacade: InstrumentsExportFileFacade, additionalHeaders: any);
    create(InstrumentsExportFile: Omit<InstrumentsExportFile, 'id'>): Promise<InstrumentsExportFile>;
    count(where?: Where<InstrumentsExportFile>): Promise<Count>;
    find(filter?: Filter<InstrumentsExportFile>): Promise<InstrumentsExportFile[]>;
    updateAll(InstrumentsExportFile: InstrumentsExportFile, where?: Where<InstrumentsExportFile>): Promise<Count>;
    findById(id: number, filter?: FilterExcludingWhere<InstrumentsExportFile>): Promise<InstrumentsExportFile>;
    updateById(id: number, InstrumentsExportFile: InstrumentsExportFile): Promise<void>;
    replaceById(id: number, InstrumentsExportFile: InstrumentsExportFile): Promise<void>;
    deleteById(id: number): Promise<void>;
}
