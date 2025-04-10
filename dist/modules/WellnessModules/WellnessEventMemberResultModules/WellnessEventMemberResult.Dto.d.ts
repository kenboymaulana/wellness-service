import { CreateDto, PaginationQuery, PutDto, ResponseDto } from '../../../base/Dto.Base';
import WellnessEventMemberResult from './WellnessEventMemberResult.Entity';
import WellnessEventMember from '../WellnessEventMemberModules/WellnessEventMember.Entity';
export declare class WellnessEventMemberResultRequestDto implements CreateDto<WellnessEventMemberResult> {
    created_by: string;
    wellness_event_member_id: number;
    main_id: string;
    parent_id: string;
    level: number;
    sort: number;
    header: number;
    code: string;
    name: string;
    name_eng: string;
    desc: string;
    result: [];
    wellnessEventMember: WellnessEventMember;
}
export declare class WellnessEventMemberResultPutDto implements PutDto<WellnessEventMemberResult> {
    updated_by: string;
    wellness_event_member_id: number;
    main_id: string;
    parent_id: string;
    level: number;
    sort: number;
    header: number;
    code: string;
    name: string;
    name_eng: string;
    desc: string;
    wellnessEventMember: WellnessEventMember;
}
export declare class WellnessEventMemberResultResponseDto implements ResponseDto<WellnessEventMemberResult> {
    id: number;
    wellness_event_member_id: number;
    main_id: string;
    parent_id: string;
    level: number;
    sort: number;
    header: number;
    code: string;
    name: string;
    name_eng: string;
    desc: string;
    wellnessEventMember: WellnessEventMember;
}
export declare class WellnessEventMemberResultQueryDto extends PaginationQuery {
    id: string;
    wellness_event_id: number;
    wellness_event_member_id: number;
    src: string;
}
