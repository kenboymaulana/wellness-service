import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import Modules from './WellnessPrograms.Entity'
import ModulesService from './WellnessPrograms.Service'
import WellnessProgramItemModules from '../WellnessProgramItemModules/WellnessProgramItem.Module'
import ModulesController from './WellnessPrograms.Controller'

@Module({
  imports: [TypeOrmModule.forFeature([Modules]), WellnessProgramItemModules],
  controllers: [ModulesController],
  providers: [ModulesService],
  exports: [ModulesService],
})
export default class ModulesModule {}
