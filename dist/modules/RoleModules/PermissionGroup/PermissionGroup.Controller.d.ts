import { TransformResponse } from 'src/core/interceptors/TransformResponse.Interceptor';
import UserService from 'src/modules/UserModules/User/User.Service';
import { PermissionGroupQueryDto, PermissionGroupResponseDto } from './PermissionGroup.Dto';
import PermissionGroupService from './PermissionGroup.Service';
export default class PermissionGroupController {
    private readonly permissionGroupService;
    private readonly userService;
    constructor(permissionGroupService: PermissionGroupService, userService: UserService);
    index(query: PermissionGroupQueryDto, user: any): Promise<TransformResponse<PermissionGroupResponseDto>>;
}
