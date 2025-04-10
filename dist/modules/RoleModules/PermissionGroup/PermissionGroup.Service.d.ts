import { Repository } from 'typeorm';
import PermisionGroup from './PermissionGroup.Entity';
export default class PermissionGroupService {
    private readonly PermissionGroupRepository;
    constructor(PermissionGroupRepository: Repository<PermisionGroup>);
    getRepository(): Repository<PermisionGroup>;
}
