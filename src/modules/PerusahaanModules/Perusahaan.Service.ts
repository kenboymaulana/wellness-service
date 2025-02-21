import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
// import BaseService from '../../../base/Service.Base'
import Modules from './Perusahaan.Entity'
import BaseService from 'src/base/Service.Base'

@Injectable()
export default class ModulesService extends BaseService<Modules> {
  constructor(
    @InjectRepository(Modules)
    private readonly ModulesRepository: Repository<Modules>,
  ) {
    super(ModulesRepository)
  }
}
