import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import Employee from './Employee.Entity'
import EmployeeService from './Employee.Service'
import EmployeeController from './Employee.Controller'

@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  controllers: [EmployeeController],
  providers: [EmployeeService],
  exports: [EmployeeService],
})
export default class EmployeeModule {}
