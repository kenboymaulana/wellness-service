import { Injectable } from '@nestjs/common'
import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm'
import FindAndCount from '../core/interfaces/FindAndCount.Interface'
import { BaseEntityUuid } from './Entity.Base'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'

@Injectable()
export default abstract class BaseService<T extends BaseEntityUuid> {
  private readonly repository: Repository<T>

  protected constructor(repository: Repository<T>) {
    this.repository = repository
  }

  getRepository(): Repository<T> {
    return this.repository
  }

  async getAllAndCount(opts?: FindManyOptions<T>): Promise<FindAndCount<T>> {
    const [data, count] = await this.repository.findAndCount(opts)
    return { data: data, count: count }
  }

  async getAll(opts?: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find(opts)
  }

  async getOne(opts: FindOneOptions<T>) {
    return this.repository.findOne(opts)
  }

  async getOneBy(opts?: FindOptionsWhere<T>): Promise<T> {
    return this.repository.findOneBy(opts)
  }

  async getOneById(id: number): Promise<T> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.getOneBy({
      id: id,
    })
  }

  async getCount(opts?: FindManyOptions<any>): Promise<number> {
    return this.repository.count(opts)
  }

  async save(entities: DeepPartial<T>): Promise<T> {
    return this.repository.save(entities)
  }

  async update(id: number, data: QueryDeepPartialEntity<T>): Promise<T> {
    await this.repository.update(id, data)
    return this.getOneById(id)
  }

  async delete(id: number | number): Promise<any> {
    return this.repository.softDelete(id)
  }

  async checkExist(conditions?: FindOptionsWhere<T>): Promise<boolean> {
    return !!(await this.repository.countBy(conditions))
  }

  async checkIdExist(
    id: number,
    additional?: FindOptionsWhere<T>,
  ): Promise<boolean> {
    return !!(await this.repository.countBy({
      id: id,
      ...additional,
    }))
  }
}
