import { Repository } from 'typeorm';
import BaseService from '../../base/Service.Base';
import Role from '../RoleModules/Role/Role.Entity';
import IndUserSerivce from '../UserModules/User/IndUser.Service';
export default class CheckPermissionService extends BaseService<Role> {
    private readonly roleRepository;
    private readonly indUserService;
    constructor(roleRepository: Repository<Role>, indUserService: IndUserSerivce);
    checkPermission(name: string, user: number, mode?: number): Promise<boolean>;
    checkPermissionArray(name: string[], user: number, mode?: number): Promise<boolean>;
}
