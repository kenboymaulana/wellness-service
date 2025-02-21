import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
// import BaseService from '../../../base/Service.Base'
import MedicalStaff from './MedicalStaff.Entity'
import BaseService from 'src/base/Service.Base'

@Injectable()
export default class MedicalStaffService extends BaseService<MedicalStaff> {
  constructor(
    @InjectRepository(MedicalStaff)
    private readonly MedicalStaffRepository: Repository<MedicalStaff>,
  ) {
    super(MedicalStaffRepository)
  }
}
