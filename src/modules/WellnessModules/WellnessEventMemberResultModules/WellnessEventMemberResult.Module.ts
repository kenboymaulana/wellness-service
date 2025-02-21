import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import WellnessEventMemberResult from './WellnessEventMemberResult.Entity'
import WellnessEventMemberResultService from './WellnessEventMemberResult.Service'
import WellnessEventMemberResultController from './WellnessEventMemberResult.Controller'
import EmployeeModule from 'src/modules/EmployeeModules/Employee.Module'
import UserModule from 'src/modules/UserModules/User/User.Module'
import RoleModule from 'src/modules/RoleModules/Role/Role.Module'

@Module({
  imports: [TypeOrmModule.forFeature([WellnessEventMemberResult]), EmployeeModule,  UserModule, RoleModule],
  controllers: [WellnessEventMemberResultController],
  providers: [WellnessEventMemberResultService],
  exports: [WellnessEventMemberResultService],
})
export default class WellnessEventMemberResultModule {}
