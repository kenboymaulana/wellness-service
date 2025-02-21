import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
// import BaseService from '../../../base/Service.Base'
import Modules from './WellnessEventMemberResultValues.Entity'
import BaseService from 'src/base/Service.Base'

@Injectable()
export default class ModulesService extends BaseService<Modules> {
  constructor(
    @InjectRepository(Modules)
    private readonly ModulesRepository: Repository<Modules>,
  ) {
    super(ModulesRepository)
  }

  async convertToTree (data, parent = null, level=0, loop=0) {
    const resultNew = [];
    data.forEach(async el => {
        const arr = el
        if( (loop == 0 && level == el.level) || (loop != 0 && el.parent_id == parent && el.id != parent) ) {
          const newLevel = level + 1
          arr.children = await this.convertToTree(data, el.id, newLevel, 1)
          resultNew.push(arr)
        }
    });
    
    return resultNew
  }
}
