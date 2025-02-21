import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm';
import Role from '../RoleModules/Role/Role.Entity';
import IndUserModule from '../UserModules/User/IndUser.Module';
import UserModule from '../UserModules/User/User.Module';
import CheckPermissionController from './CheckPermission.Controller';
import CheckPermissionService from './CheckPermission.Service';

@Module({
  imports: [TypeOrmModule.forFeature([Role]),IndUserModule],
  controllers: [CheckPermissionController],
  providers: [CheckPermissionService],
  exports: [CheckPermissionService],
})
export default class CheckPermissionModule {}
