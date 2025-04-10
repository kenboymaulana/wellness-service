import { CreateDto, PaginationQuery, PutDto, ResponseDto } from '../../../base/Dto.Base';
import WellnessEventMemberEvaluate from './WellnessEventMemberEvaluate.Entity';
import WellnessEventMember from '../WellnessEventMemberModules/WellnessEventMember.Entity';
export declare class WellnessEventMemberEvaluateRequestDto implements CreateDto<WellnessEventMemberEvaluate> {
    created_by: string;
    wellness_event_member_id: number;
    keluhan_saat_ini: string;
    tingkat_keberhasilan: string;
    motivasi: string;
    evaluasi: string;
    wellnessEventMember: WellnessEventMember;
}
export declare class WellnessEventMemberEvaluatePutDto implements PutDto<WellnessEventMemberEvaluate> {
    updated_by: string;
    wellness_event_member_id: number;
    keluhan_saat_ini: string;
    tingkat_keberhasilan: string;
    motivasi: string;
    evaluasi: string;
    wellnessEventMember: WellnessEventMember;
}
export declare class WellnessEventMemberEvaluateResponseDto implements ResponseDto<WellnessEventMemberEvaluate> {
    id: number;
    keluhan_saat_ini: string;
    tingkat_keberhasilan: string;
    motivasi: string;
    evaluasi: string;
    wellnessEventMember: WellnessEventMember;
}
export declare class WellnessEventMemberEvaluateQueryDto extends PaginationQuery {
    id: string;
    wellness_event_member_id: number;
    src: string;
}
