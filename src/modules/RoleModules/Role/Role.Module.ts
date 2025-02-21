import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import CheckPermissionModule from 'src/modules/CheckPermission/CheckPermission.Module'
import PermissionModule from '../Permission/Permission.Module'
import RoleController from './Role.Controller'
import Role from './Role.Entity'
import RoleService from './Role.Service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Role]),
    CheckPermissionModule,
    PermissionModule,
  ],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export default class RoleModule {}
