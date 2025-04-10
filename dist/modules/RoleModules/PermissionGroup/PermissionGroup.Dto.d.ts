import { PaginationQuery, ResponseDto } from "src/base/Dto.Base";
import Permission from "../Permission/Permission.Entity";
import PermisionGroup from "./PermissionGroup.Entity";
export declare class PermissionGroupResponseDto implements ResponseDto<PermisionGroup> {
    id: number;
    name: string;
    icon: string;
    sort: number;
    permission: Permission[];
}
export declare class PermissionGroupQueryDto extends PaginationQuery {
    name: string;
}
