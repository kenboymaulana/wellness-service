import { BaseEntityUuid } from '../../../base/Entity.Base';
import WellnessEventMember from '../WellnessEventMemberModules/WellnessEventMember.Entity';
import MedicalStaff from 'src/modules/MedicalStaffModules/MedicalStaff.Entity';
export default class WellnessEvent extends BaseEntityUuid {
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
