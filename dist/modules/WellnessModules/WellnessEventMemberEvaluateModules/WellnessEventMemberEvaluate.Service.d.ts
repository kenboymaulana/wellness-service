import { Repository } from 'typeorm';
import Modules from './WellnessEventMemberEvaluate.Entity';
import BaseService from 'src/base/Service.Base';
export default class ModulesService extends BaseService<Modules> {
    private readonly ModulesRepository;
    constructor(ModulesRepository: Repository<Modules>);
}
