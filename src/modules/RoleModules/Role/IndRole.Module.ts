import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import IndRoleSerivce from './IndRole.Service'
import Role from './Role.Entity'

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [IndRoleSerivce],
  exports: [IndRoleSerivce],
})
export default class IndRoleModule {}
