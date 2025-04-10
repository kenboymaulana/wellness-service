import { Repository } from 'typeorm';
import Permission from './Permission.Entity';
export default class PermissionService {
    private readonly PermissionRepository;
    constructor(PermissionRepository: Repository<Permission>);
    getRepository(): Repository<Permission>;
}
