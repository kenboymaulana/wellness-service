import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import User from './User.Entity'
import IndUserSerivce from './IndUser.Service'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [IndUserSerivce],
  exports: [IndUserSerivce],
})
export default class IndUserModule {}
