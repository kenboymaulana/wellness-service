import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import Modules from './Perusahaan.Entity'
import ModulesService from './Perusahaan.Service'
import ModulesController from './Perusahaan.Controller'

@Module({
  imports: [TypeOrmModule.forFeature([Modules])],
  controllers: [ModulesController],
  providers: [ModulesService],
  exports: [ModulesService],
})
export default class ModulesModule {}
