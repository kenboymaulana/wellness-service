import { BaseEntityUuid } from '../../../base/Entity.Base';
import WellnessEventMember from '../WellnessEventMemberModules/WellnessEventMember.Entity';
export default class WellnessEventMemberEvaluate extends BaseEntityUuid {
    wellness_event_member_id: number;
    keluhan_saat_ini: string;
    tingkat_keberhasilan: string;
    motivasi: string;
    evaluasi: string;
    wellnessEventMember: WellnessEventMember;
}
