import { BaseEntityUuid } from '../../../base/Entity.Base';
import Role from '../../RoleModules/Role/Role.Entity';
import Employee from 'src/modules/EmployeeModules/Employee.Entity';
import MedicalStaff from 'src/modules/MedicalStaffModules/MedicalStaff.Entity';
export default class User extends BaseEntityUuid {
    full_name: string;
    email: string;
    password: string;
    is_main: boolean;
    is_verified: boolean;
    type: string;
    active_user: number;
    refresh_token: string;
    roles?: Role[];
    employees?: Employee[];
    medicalStaffs?: MedicalStaff[];
}
