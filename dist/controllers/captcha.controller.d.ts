import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Captcha } from 'common';
import { CaptchaFacade } from '../facades';
export declare class CaptchaController {
    captchaFacade: CaptchaFacade;
    constructor(captchaFacade: CaptchaFacade);
    create(captcha: Omit<Captcha, 'id'>): Promise<Captcha>;
    count(where?: Where<Captcha>): Promise<Count>;
    find(filter?: Filter<Captcha>): Promise<Captcha[]>;
    updateAll(captcha: Captcha, where?: Where<Captcha>): Promise<Count>;
    findById(id: number, filter?: FilterExcludingWhere<Captcha>): Promise<Captcha>;
    updateById(id: number, captcha: Captcha): Promise<void>;
    replaceById(id: number, captcha: Captcha): Promise<void>;
    deleteById(id: number): Promise<void>;
}
