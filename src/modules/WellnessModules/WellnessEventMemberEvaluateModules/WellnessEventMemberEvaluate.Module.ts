import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import WellnessEventMemberEvaluate from './WellnessEventMemberEvaluate.Entity'
import WellnessEventMemberEvaluateService from './WellnessEventMemberEvaluate.Service'
import WellnessEventMemberEvaluateController from './WellnessEventMemberEvaluate.Controller'
import EmployeeModule from 'src/modules/EmployeeModules/Employee.Module'
import UserModule from 'src/modules/UserModules/User/User.Module'
import RoleModule from 'src/modules/RoleModules/Role/Role.Module'

@Module({
  imports: [TypeOrmModule.forFeature([WellnessEventMemberEvaluate]), EmployeeModule,  UserModule, RoleModule],
  controllers: [WellnessEventMemberEvaluateController],
  providers: [WellnessEventMemberEvaluateService],
  exports: [WellnessEventMemberEvaluateService],
})
export default class WellnessEventMemberEvaluateModule {}
