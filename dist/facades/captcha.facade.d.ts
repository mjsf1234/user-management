import { Count, DataObject, Filter, FilterExcludingWhere, Options, Where } from '@loopback/repository';
import { Captcha, CaptchaRelations, CaptchaRepository } from 'common';
export declare class CaptchaFacade {
    private captchaRepository;
    constructor(captchaRepository: CaptchaRepository);
    create(entity: DataObject<Captcha>, options?: Options): Promise<Captcha>;
    createAll(entities: DataObject<Captcha>[], options?: Options): Promise<Captcha[]>;
    save(entity: Captcha, options?: Options): Promise<Captcha>;
    find(filter?: Filter<Captcha>, options?: Options): Promise<(Captcha & CaptchaRelations)[]>;
    findOne(filter?: Filter<Captcha>, options?: Options): Promise<(Captcha & CaptchaRelations) | null>;
    findById(id: number, filter?: FilterExcludingWhere<Captcha>, options?: Options): Promise<Captcha & CaptchaRelations>;
    update(entity: Captcha, options?: Options): Promise<void>;
    delete(entity: Captcha, options?: Options): Promise<void>;
    updateAll(data: DataObject<Captcha>, where?: Where<Captcha>, options?: Options): Promise<Count>;
    updateById(id: number, data: DataObject<Captcha>, options?: Options): Promise<void>;
    replaceById(id: number, data: DataObject<Captcha>, options?: Options): Promise<void>;
    deleteAll(where?: Where<Captcha>, options?: Options): Promise<Count>;
    deleteById(id: number, options?: Options): Promise<void>;
    count(where?: Where<Captcha>, options?: Options): Promise<Count>;
    exists(id: number, options?: Options): Promise<boolean>;
}
