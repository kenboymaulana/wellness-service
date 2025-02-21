import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import BaseService from '../../../base/Service.Base'
import User from './User.Entity'

@Injectable()
export default class IndUserSerivce extends BaseService<User> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super(userRepository)
  }
}
