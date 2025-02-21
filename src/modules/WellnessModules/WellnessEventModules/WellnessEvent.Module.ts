import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import Employee from './WellnessEvent.Entity'
import EmployeeService from './WellnessEvent.Service'
import EmployeeController from './WellnessEvent.Controller'

@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  controllers: [EmployeeController],
  providers: [EmployeeService],
  exports: [EmployeeService],
})
export default class EmployeeModule {}
