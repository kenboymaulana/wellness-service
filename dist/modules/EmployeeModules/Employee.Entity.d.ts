import { BaseEntityUuid } from '../../base/Entity.Base';
import WellnessEventMember from '../WellnessModules/WellnessEventMemberModules/WellnessEventMember.Entity';
import User from '../UserModules/User/User.Entity';
export default class Employee extends BaseEntityUuid {
    perusahaan_id: number;
    nik: string;
    name: string;
    dob: Date;
    gender: string;
    phone: string;
    division: string;
    position: string;
    work: string;
    address: string;
    wellnessEventMember: WellnessEventMember;
    users?: User[];
}
