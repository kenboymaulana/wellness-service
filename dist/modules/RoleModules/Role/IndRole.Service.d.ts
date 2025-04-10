import { Repository } from 'typeorm';
import BaseService from '../../../base/Service.Base';
import Role from './Role.Entity';
export default class IndRoleSerivce extends BaseService<Role> {
    private readonly RoleRepository;
    constructor(RoleRepository: Repository<Role>);
}
