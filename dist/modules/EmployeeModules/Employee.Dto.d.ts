import { CreateDto, PaginationQuery, PutDto, ResponseDto } from '../../base/Dto.Base';
import Employee from './Employee.Entity';
import WellnessEventMember from '../WellnessModules/WellnessEventMemberModules/WellnessEventMember.Entity';
export declare class EmployeeRequestDto implements CreateDto<Employee> {
    created_by: string;
    perusahaan_id: number;
    nik: string;
    name: string;
    dob: Date;
    gender: string;
    phone: string;
    division: string;
    position: string;
    work: string;
    address: string;
    wellnessEventMember: WellnessEventMember;
}
export declare class EmployeePutDto implements PutDto<Employee> {
    updated_by: string;
    perusahaan_id: number;
    nik: string;
    name: string;
    dob: Date;
    gender: string;
    phone: string;
    division: string;
    position: string;
    work: string;
    address: string;
    wellnessEventMember: WellnessEventMember;
}
export declare class EmployeeResponseDto implements ResponseDto<Employee> {
    id: number;
    perusahaan_id: number;
    nik: string;
    name: string;
    dob: Date;
    gender: string;
    phone: string;
    division: string;
    position: string;
    work: string;
    address: string;
}
export declare class CorproateQueryDto extends PaginationQuery {
    id: number;
    perusahaan_id: number;
    src: string;
}
