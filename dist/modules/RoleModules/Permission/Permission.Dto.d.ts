import { PaginationQuery, ResponseDto } from 'src/base/Dto.Base';
import PermisionGroup from '../PermissionGroup/PermissionGroup.Entity';
import Role from '../Role/Role.Entity';
import Permission from './Permission.Entity';
export default class PermissionResponseDto implements ResponseDto<Permission> {
    id: number;
    name: string;
    description: string;
    icon: string;
    group_id: number;
    sort: number;
    path: string;
    type: string;
    roles?: Role[];
    permisionGroup: PermisionGroup;
}
export declare class PermissionQueryDto extends PaginationQuery {
    name: string;
    type: string;
}
