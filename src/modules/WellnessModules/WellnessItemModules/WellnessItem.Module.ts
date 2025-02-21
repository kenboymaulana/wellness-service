import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import Modules from './WellnessItem.Entity'
import ModulesService from './WellnessItem.Service'
import ModulesController from './WellnessItem.Controller'

@Module({
  imports: [TypeOrmModule.forFeature([Modules])],
  controllers: [ModulesController],
  providers: [ModulesService],
  exports: [ModulesService],
})
export default class ModulesModule {}
