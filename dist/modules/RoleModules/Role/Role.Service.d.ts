import { Repository } from 'typeorm';
import BaseService from '../../../base/Service.Base';
import Role from './Role.Entity';
export default class RoleService extends BaseService<Role> {
    private readonly roleRepository;
    constructor(roleRepository: Repository<Role>);
}
