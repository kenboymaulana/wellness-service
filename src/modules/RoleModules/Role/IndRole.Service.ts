import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import BaseService from '../../../base/Service.Base'
import Role from './Role.Entity'

@Injectable()
export default class IndRoleSerivce extends BaseService<Role> {
  constructor(
    @InjectRepository(Role)
    private readonly RoleRepository: Repository<Role>,
  ) {
    super(RoleRepository)
  }
}
