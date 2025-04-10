import PermisionGroup from '../PermissionGroup/PermissionGroup.Entity';
import Role from '../Role/Role.Entity';
export default class Permission {
    id: number;
    name: string;
    description: string;
    icon: string;
    group_id: number;
    sort: number;
    path: string;
    type: string;
    name_be: string;
    roles?: Role[];
    permisionGroup: PermisionGroup;
}
