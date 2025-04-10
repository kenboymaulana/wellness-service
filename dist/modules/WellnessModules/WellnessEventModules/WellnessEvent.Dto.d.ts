import { CreateDto, PaginationQuery, PutDto, ResponseDto } from '../../../base/Dto.Base';
import WellnessEvent from './WellnessEvent.Entity';
import WellnessEventMember from '../WellnessEventMemberModules/WellnessEventMember.Entity';
import MedicalStaff from 'src/modules/MedicalStaffModules/MedicalStaff.Entity';
import WellnessPrograms from '../WellnessProgramsModules/WellnessPrograms.Entity';
export declare class WellnessEventRequestDto implements CreateDto<WellnessEvent> {
    created_by: string;
    medical_staff_id: number;
    name: string;
    model_code: string;
    start_date: Date;
    end_date: Date;
    description: string;
    image: string;
    status: string;
    wellnessEventMember: WellnessEventMember;
    medicalStaff: MedicalStaff;
}
export declare class WellnessEventPutDto implements PutDto<WellnessEvent> {
    updated_by: string;
    medical_staff_id: number;
    name: string;
    model_code: string;
    start_date: Date;
    end_date: Date;
    description: string;
    image: string;
    status: string;
    wellnessEventMember: WellnessEventMember;
    medicalStaff: MedicalStaff;
}
export declare class WellnessEventResponseDto implements ResponseDto<WellnessEvent> {
    id: number;
    medical_staff_id: number;
    name: string;
    model_code: string;
    start_date: Date;
    end_date: Date;
    description: string;
    image: string;
    status: string;
    medicalStaff: MedicalStaff;
    modelCode: WellnessPrograms;
}
export declare class WellnessEventQueryDto extends PaginationQuery {
    id: string;
    status: string;
    src: string;
}
