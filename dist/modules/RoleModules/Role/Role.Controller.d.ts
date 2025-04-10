import RoleService from './Role.Service';
import { RolePermissionRequestDto, RolePutDto, RoleQueryDto, RoleRequestDto, RoleResponseDto } from './Role.Dto';
import CheckPermissionService from 'src/modules/CheckPermission/CheckPermission.Service';
import PermissionService from '../Permission/Permission.Service';
export default class RoleController {
    private readonly roleService;
    private readonly checkPermissionService;
    private readonly permissionService;
    constructor(roleService: RoleService, checkPermissionService: CheckPermissionService, permissionService: PermissionService);
    index(user: any, query: RoleQueryDto): Promise<false | {
        data: RoleResponseDto[];
        count: number;
    }>;
    save(user: any, body: RoleRequestDto): Promise<false | {
        data: RoleResponseDto;
    }>;
    update(user: any, body: RolePutDto, id: number): Promise<false | {
        data: RoleResponseDto;
    }>;
    delete(user: any, id: number): Promise<false | {
        data: any;
    }>;
    getRolePermission(query: RolePermissionRequestDto): Promise<{
        data: RoleResponseDto[];
    }>;
    saveRolePermission(body: RolePermissionRequestDto): Promise<{
        data: RoleResponseDto;
    }>;
}
