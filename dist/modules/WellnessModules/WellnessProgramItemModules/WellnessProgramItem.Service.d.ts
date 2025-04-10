import { Repository } from 'typeorm';
import Modules from './WellnessProgramItem.Entity';
import BaseService from 'src/base/Service.Base';
export default class ModulesService extends BaseService<Modules> {
    private readonly ModulesRepository;
    constructor(ModulesRepository: Repository<Modules>);
    convertToTree(data: any, parent?: any, level?: number, loop?: number): Promise<any[]>;
}
