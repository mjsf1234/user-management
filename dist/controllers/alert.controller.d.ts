import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Alert } from 'common';
import { AlertFacade } from '../facades';
export declare class AlertController {
    alertFacade: AlertFacade;
    constructor(alertFacade: AlertFacade);
    create(alert: Omit<Alert, 'id'>): Promise<Alert>;
    count(where?: Where<Alert>): Promise<Count>;
    find(filter?: Filter<Alert>): Promise<Alert[]>;
    updateAll(alert: Alert, where?: Where<Alert>): Promise<Count>;
    findById(id: number, filter?: FilterExcludingWhere<Alert>): Promise<Alert>;
    updateById(id: number, alert: Alert): Promise<void>;
    replaceById(id: number, alert: Alert): Promise<void>;
    deleteById(id: number): Promise<void>;
}
