import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import Permission from './Permission.Entity'


@Injectable()
export default class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly PermissionRepository: Repository<Permission>,
  ) {}

  getRepository(): Repository<Permission> {
    return this.PermissionRepository
  }
}
