import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
// import BaseService from '../../../base/Service.Base'
import WellnessEventMember from './WellnessEventMember.Entity'
import BaseService from 'src/base/Service.Base'

@Injectable()
export default class WellnessEventMemberService extends BaseService<WellnessEventMember> {
  constructor(
    @InjectRepository(WellnessEventMember)
    private readonly WellnessEventMemberRepository: Repository<WellnessEventMember>,
  ) {
    super(WellnessEventMemberRepository)
  }
}
