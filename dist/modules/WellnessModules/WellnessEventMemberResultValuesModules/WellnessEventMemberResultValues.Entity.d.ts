import { BaseEntityUuid } from '../../../base/Entity.Base';
export default class WellnessEventMemberResultValues extends BaseEntityUuid {
    wellness_event_member_id: number;
    item_code: string;
    item_value: string;
    time_input: Date;
    date: Date;
}
