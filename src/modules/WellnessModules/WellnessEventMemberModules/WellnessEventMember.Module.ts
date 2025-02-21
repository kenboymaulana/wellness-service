import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import WellnessEventMember from './WellnessEventMember.Entity'
import WellnessEventMemberService from './WellnessEventMember.Service'
import WellnessEventMemberController from './WellnessEventMember.Controller'
import EmployeeModule from 'src/modules/EmployeeModules/Employee.Module'
import UserModule from 'src/modules/UserModules/User/User.Module'
import RoleModule from 'src/modules/RoleModules/Role/Role.Module'
import WellnessItemModule from '../WellnessItemModules/WellnessItem.Module'
import WellnessEventMemberResultModule from '../WellnessEventMemberResultModules/WellnessEventMemberResult.Module'
import WellnessEventMemberResultValuesModule from '../WellnessEventMemberResultValuesModules/WellnessEventMemberResultValues.Module'

@Module({
  imports: [TypeOrmModule.forFeature([WellnessEventMember]), EmployeeModule,  UserModule, RoleModule, WellnessItemModule,WellnessEventMemberResultModule,WellnessEventMemberResultValuesModule],
  controllers: [WellnessEventMemberController],
  providers: [WellnessEventMemberService],
  exports: [WellnessEventMemberService],
})
export default class WellnessEventMemberModule {}
