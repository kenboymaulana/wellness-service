import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import PermisionGroup from './PermissionGroup.Entity'



@Injectable()
export default class PermissionGroupService {
  constructor(
    @InjectRepository(PermisionGroup)
    private readonly PermissionGroupRepository: Repository<PermisionGroup>,
  ) {}

  getRepository(): Repository<PermisionGroup> {
    return this.PermissionGroupRepository
  }
}
