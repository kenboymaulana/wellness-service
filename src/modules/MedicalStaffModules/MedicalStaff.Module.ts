import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import MedicalStaff from './MedicalStaff.Entity'
import MedicalStaffService from './MedicalStaff.Service'
import MedicalStaffController from './MedicalStaff.Controller'
import UserModule from '../UserModules/User/User.Module'
import RoleModule from '../RoleModules/Role/Role.Module'

@Module({
  imports: [TypeOrmModule.forFeature([MedicalStaff]), UserModule, RoleModule],
  controllers: [MedicalStaffController],
  providers: [MedicalStaffService],
  exports: [MedicalStaffService],
})
export default class MedicalStaffModule {}
