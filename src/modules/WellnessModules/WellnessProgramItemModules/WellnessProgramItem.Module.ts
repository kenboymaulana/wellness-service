import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import Modules from './WellnessProgramItem.Entity'
import ModulesService from './WellnessProgramItem.Service'
import ModulesController from './WellnessProgramItem.Controller'
import WellnessItem from '../WellnessItemModules/WellnessItem.Entity'

@Module({
  imports: [TypeOrmModule.forFeature([Modules]), WellnessItem],
  controllers: [ModulesController],
  providers: [ModulesService],
  exports: [ModulesService],
})
export default class ModulesModule {}
