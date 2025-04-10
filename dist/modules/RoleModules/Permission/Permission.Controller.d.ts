import { TransformResponse } from 'src/core/interceptors/TransformResponse.Interceptor';
import CheckPermissionService from 'src/modules/CheckPermission/CheckPermission.Service';
import UserService from 'src/modules/UserModules/User/User.Service';
import PermissionResponseDto, { PermissionQueryDto } from './Permission.Dto';
import PermissionService from './Permission.Service';
import PermissionGroupService from '../PermissionGroup/PermissionGroup.Service';
export default class PermissionController {
    private readonly permissionService;
    private readonly permissionGroupService;
    private readonly userService;
    private readonly checkPermissionService;
    constructor(permissionService: PermissionService, permissionGroupService: PermissionGroupService, userService: UserService, checkPermissionService: CheckPermissionService);
    index(user: any, query: PermissionQueryDto): Promise<TransformResponse<PermissionResponseDto>>;
    getPermissionRole(query: PermissionQueryDto, user: any): Promise<boolean>;
    getPermission(query: PermissionQueryDto, user: any): Promise<false | {
        data: import("../PermissionGroup/PermissionGroup.Entity").default[];
    }>;
}
