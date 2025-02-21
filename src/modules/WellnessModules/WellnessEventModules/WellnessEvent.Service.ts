import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
// import BaseService from '../../../base/Service.Base'
import Employee from './WellnessEvent.Entity'
import BaseService from 'src/base/Service.Base'

@Injectable()
export default class EmployeeService extends BaseService<Employee> {
  constructor(
    @InjectRepository(Employee)
    private readonly EmployeeRepository: Repository<Employee>,
  ) {
    super(EmployeeRepository)
  }
}
