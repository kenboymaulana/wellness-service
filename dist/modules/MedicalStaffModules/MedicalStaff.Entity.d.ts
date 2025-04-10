import { BaseEntityUuid } from '../../base/Entity.Base';
import WellnessEvent from '../WellnessModules/WellnessEventModules/WellnessEvent.Entity';
import User from '../UserModules/User/User.Entity';
export default class MedicalStaff extends BaseEntityUuid {
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
    wellnessEvent: WellnessEvent;
    users?: User[];
}
