import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import UserModule from 'src/modules/UserModules/User/User.Module'
import PermissionGroupController from './PermissionGroup.Controller'
import PermisionGroup from './PermissionGroup.Entity'
import PermissionGroupService from './PermissionGroup.Service'


@Module({
  imports: [TypeOrmModule.forFeature([PermisionGroup]), UserModule],
  controllers: [PermissionGroupController],
  providers: [PermissionGroupService],
  exports: [PermissionGroupService],
})
export default class PermissionGroupModule {}
