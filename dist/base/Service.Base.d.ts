import { DeepPartial, FindManyOptions, FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import FindAndCount from '../core/interfaces/FindAndCount.Interface';
import { BaseEntityUuid } from './Entity.Base';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
export default abstract class BaseService<T extends BaseEntityUuid> {
    private readonly repository;
    protected constructor(repository: Repository<T>);
    getRepository(): Repository<T>;
    getAllAndCount(opts?: FindManyOptions<T>): Promise<FindAndCount<T>>;
    getAll(opts?: FindManyOptions<T>): Promise<T[]>;
    getOne(opts: FindOneOptions<T>): Promise<T>;
    getOneBy(opts?: FindOptionsWhere<T>): Promise<T>;
    getOneById(id: number): Promise<T>;
    getCount(opts?: FindManyOptions<any>): Promise<number>;
    save(entities: DeepPartial<T>): Promise<T>;
    update(id: number, data: QueryDeepPartialEntity<T>): Promise<T>;
    delete(id: number | number): Promise<any>;
    checkExist(conditions?: FindOptionsWhere<T>): Promise<boolean>;
    checkIdExist(id: number, additional?: FindOptionsWhere<T>): Promise<boolean>;
}
