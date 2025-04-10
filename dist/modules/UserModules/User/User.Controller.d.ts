import UserService from './User.Service';
import { UserPutDto, UserQueryDto, UserResponseDto } from './User.Dto';
import { TransformResponse } from '../../../core/interceptors/TransformResponse.Interceptor';
import CheckPermissionService from 'src/modules/CheckPermission/CheckPermission.Service';
import IndRoleSerivce from 'src/modules/RoleModules/Role/IndRole.Service';
export default class UserController {
    private readonly userService;
    private readonly checkPermissionService;
    private readonly indRoleService;
    constructor(userService: UserService, checkPermissionService: CheckPermissionService, indRoleService: IndRoleSerivce);
    index(query: UserQueryDto, user: any): Promise<false | {
        data: UserResponseDto[];
        count: number;
    }>;
    show(id: number): Promise<TransformResponse<UserResponseDto>>;
    update(id: number, body: UserPutDto, user: any): Promise<false | {
        data: UserResponseDto;
    }>;
    delete(id: number, user: any): Promise<false | {
        data: any;
    }>;
}
