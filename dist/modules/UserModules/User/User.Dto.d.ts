import { PaginationQuery, ResponseDto } from '../../../base/Dto.Base';
import User from './User.Entity';
import { UserType } from './User.Enum';
import Role from '../../RoleModules/Role/Role.Entity';
import Employee from 'src/modules/EmployeeModules/Employee.Entity';
import MedicalStaff from 'src/modules/MedicalStaffModules/MedicalStaff.Entity';
export declare class UserResponseDto implements ResponseDto<User> {
    id: number;
    full_name: string;
    email: string;
    is_verified: boolean;
    is_main: boolean;
    type: UserType;
    active_user: number;
    employees: Employee[];
    medicalStaffs: MedicalStaff[];
    roles: Role[];
}
export declare class UserPutDto {
    full_name: string;
    email: string;
    password: string;
    is_main: boolean;
    is_verified: boolean;
    type: UserType;
    roles?: Role[];
    role_id: number;
    clinic_id: number;
    active_user: number;
}
export declare class UserQueryDto extends PaginationQuery {
    id: number;
    src: string;
    type: string;
}
