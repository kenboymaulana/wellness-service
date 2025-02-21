import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import CheckPermissionModule from 'src/modules/CheckPermission/CheckPermission.Module'
import UserModule from 'src/modules/UserModules/User/User.Module'
import PermissionController from './Permission.Controller'
import Permission from './Permission.Entity'
import PermissionService from './Permission.Service'
import PermissionGroupModule from '../PermissionGroup/PermissionGroup.Module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Permission]),
    UserModule,
    PermissionGroupModule,
    CheckPermissionModule,
  ],
  controllers: [PermissionController],
  providers: [PermissionService],
  exports: [PermissionService],
})
export default class PermissionModule {}
