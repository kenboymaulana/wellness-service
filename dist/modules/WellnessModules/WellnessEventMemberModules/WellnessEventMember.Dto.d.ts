import { CreateDto, PaginationQuery, PutDto, ResponseDto } from '../../../base/Dto.Base';
import WellnessEventMember from './WellnessEventMember.Entity';
import WellnessEvent from '../WellnessEventModules/WellnessEvent.Entity';
import Employee from 'src/modules/EmployeeModules/Employee.Entity';
import WellnessEventMemberResult from '../WellnessEventMemberResultModules/WellnessEventMemberResult.Entity';
export declare class WellnessEventMemberRequestDto implements CreateDto<WellnessEventMember> {
    created_by: string;
    create_employee: string;
    wellness_event_id: number;
    employee_id: number;
    nik: string;
    name: string;
    dob: Date;
    gender: string;
    phone: string;
    division: string;
    position: string;
    work: string;
    address: string;
    role_id: number;
    wellnessEvent: WellnessEvent;
    wellnessEventMemberResult: WellnessEventMemberResult;
    employee: Employee;
}
export declare class WellnessEventMemberPutDto implements PutDto<WellnessEventMember> {
    updated_by: string;
    wellness_event_id: number;
    employee_id: number;
    nik: string;
    name: string;
    dob: Date;
    gender: string;
    phone: string;
    division: string;
    position: string;
    work: string;
    address: string;
    role_id: number;
    is_main: boolean;
    is_verified: boolean;
    wellnessEvent: WellnessEvent;
    wellnessEventMemberResult: WellnessEventMemberResult;
    employee: Employee;
}
export declare class WellnessEventMemberResponseDto implements ResponseDto<WellnessEventMember> {
    id: number;
    wellness_event_id: number;
    employee_id: number;
    nik: string;
    name: string;
    dob: Date;
    gender: string;
    phone: string;
    division: string;
    position: string;
    work: string;
    address: string;
    employee: Employee;
}
export declare class WellnessEventMemberQueryDto extends PaginationQuery {
    id: string;
    wellness_event_id: number;
    nik: string;
    users: string;
    src: string;
}
