import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import BaseService from '../../../base/Service.Base'
import User from './User.Entity'
import * as bcrypt from 'bcrypt'

@Injectable()
export default class UserService extends BaseService<User> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super(userRepository)
  }

  async checkEmailExist(email: string): Promise<boolean> {
    return this.checkExist({ email: email })
  }

  
  async getOneByEmail(email: string): Promise<User> {
    return this.getOneBy({
      email: email,
    })
  }

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt()
    return bcrypt.hash(password, salt)
  }
}
