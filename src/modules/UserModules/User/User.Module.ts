import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import User from './User.Entity'
import UserService from './User.Service'
import UserController from './User.Controller'
import CheckPermissionModule from 'src/modules/CheckPermission/CheckPermission.Module'
import IndRoleModule from 'src/modules/RoleModules/Role/IndRole.Module'

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    CheckPermissionModule,
    IndRoleModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export default class UserModule {}
