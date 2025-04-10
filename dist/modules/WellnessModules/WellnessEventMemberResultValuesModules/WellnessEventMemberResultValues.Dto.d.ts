import { CreateDto, PaginationQuery, PutDto, ResponseDto } from '../../../base/Dto.Base';
import WellnessEventMemberResultValues from './WellnessEventMemberResultValues.Entity';
import WellnessEventMember from '../WellnessEventMemberModules/WellnessEventMember.Entity';
export declare class WellnessEventMemberResultValuesRequestDto implements CreateDto<WellnessEventMemberResultValues> {
    created_by: string;
    wellness_event_member_id: number;
    item_code: string;
    items: string;
    item_value: string;
    time_input: Date;
    date: Date;
    result: [];
    wellnessEventMember: WellnessEventMember;
}
export declare class WellnessEventMemberResultValuesPutDto implements PutDto<WellnessEventMemberResultValues> {
    updated_by: string;
    wellness_event_member_id: number;
    item_code: string;
    item_value: string;
    time_input: Date;
    date: Date;
    wellnessEventMember: WellnessEventMember;
}
export declare class WellnessEventMemberResultValuesResponseDto implements ResponseDto<WellnessEventMemberResultValues> {
    id: number;
    wellness_event_member_id: number;
    item_code: string;
    items: string;
    item_value: string;
    time_input: Date;
    date: Date;
    wellnessEventMember: WellnessEventMember;
}
export declare class WellnessEventMemberResultValuesQueryDto extends PaginationQuery {
    id: string;
    wellness_event_member_id: number;
    time: string;
    users: string;
    src: string;
}
