import Permission from '../Permission/Permission.Entity';
export default class PermisionGroup {
    id: number;
    name: string;
    icon: string;
    sort: number;
    permission: Permission[];
}
