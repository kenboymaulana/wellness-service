import { CreateDto, PaginationQuery, PutDto, ResponseDto } from '../../../base/Dto.Base';
import Role from './Role.Entity';
import User from 'src/modules/UserModules/User/User.Entity';
import Permission from '../Permission/Permission.Entity';
export declare class RoleResponseDto implements ResponseDto<Role> {
    id: number;
    name: string;
    for_type: string;
    permissions?: Permission[];
}
export declare class RoleRequestDto implements CreateDto<Role> {
    name: string;
    for_type: string;
    users?: User[];
    permissions?: Permission[];
    type: string;
}
export declare class RolePutDto implements PutDto<Role> {
    name: string;
    for_type: string;
    users?: User[];
    permissions?: Permission[];
}
export declare class RolePermissionRequestDto {
    role_id: number;
    permission_id: number[];
}
export declare class RoleQueryDto extends PaginationQuery {
    id: number;
    src: string;
    type: string;
}
