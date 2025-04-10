import { BaseEntityUuid } from '../../../base/Entity.Base';
import WellnessEventMember from '../WellnessEventMemberModules/WellnessEventMember.Entity';
export default class WellnessEventMemberResult extends BaseEntityUuid {
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
