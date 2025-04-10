import { CreateDto, PaginationQuery, PutDto, ResponseDto } from '../../base/Dto.Base';
import MedicalStaff from './MedicalStaff.Entity';
import WellnessEvent from '../WellnessModules/WellnessEventModules/WellnessEvent.Entity';
import User from '../UserModules/User/User.Entity';
export declare class MedicalStaffRequestDto implements CreateDto<MedicalStaff> {
    created_by: string;
    nik: string;
    name: string;
    dob: Date;
    gender: string;
    email: string;
    phone: string;
    no_str: string;
    no_sip: string;
    staff_type: string;
    doctor_type: string;
    poly_practice: string;
    status_active: number;
    sign_image: string;
    address: string;
    wellnessEvent: WellnessEvent;
}
export declare class MedicalStaffPutDto implements PutDto<MedicalStaff> {
    updated_by: string;
    nik: string;
    name: string;
    dob: Date;
    gender: string;
    phone: string;
    email: string;
    no_str: string;
    no_sip: string;
    staff_type: string;
    doctor_type: string;
    poly_practice: string;
    status_active: number;
    sign_image: string;
    address: string;
    is_main: boolean;
    is_verified: boolean;
    wellnessEvent: WellnessEvent;
}
export declare class MedicalStaffResponseDto implements ResponseDto<MedicalStaff> {
    id: number;
    nik: string;
    name: string;
    dob: Date;
    gender: string;
    phone: string;
    email: string;
    no_str: string;
    no_sip: string;
    address: string;
    staff_type: string;
    doctor_type: string;
    poly_practice: string;
    status_active: number;
    sign_image: string;
    users: User[];
}
export declare class CorproateQueryDto extends PaginationQuery {
    id: number;
    users: string;
    src: string;
}
