import { BaseEntityUuid } from '../../../base/Entity.Base';
import Permission from '../Permission/Permission.Entity';
import User from '../../UserModules/User/User.Entity';
export default class Role extends BaseEntityUuid {
    name: string;
    for_type: string;
    users?: User[];
    permissions?: Permission[];
}
