import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import WellnessEventMemberResultValues from './WellnessEventMemberResultValues.Entity'
import WellnessEventMemberResultValuesService from './WellnessEventMemberResultValues.Service'
import WellnessEventMemberResultValuesController from './WellnessEventMemberResultValues.Controller'
import EmployeeModule from 'src/modules/EmployeeModules/Employee.Module'
import UserModule from 'src/modules/UserModules/User/User.Module'
import RoleModule from 'src/modules/RoleModules/Role/Role.Module'

@Module({
  imports: [TypeOrmModule.forFeature([WellnessEventMemberResultValues]), EmployeeModule,  UserModule, RoleModule],
  controllers: [WellnessEventMemberResultValuesController],
  providers: [WellnessEventMemberResultValuesService],
  exports: [WellnessEventMemberResultValuesService],
})
export default class WellnessEventMemberResultValuesModule {}
