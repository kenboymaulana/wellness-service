import { BaseEntityUuid } from '../../../base/Entity.Base';
import WellnessEvent from '../WellnessEventModules/WellnessEvent.Entity';
import Employee from 'src/modules/EmployeeModules/Employee.Entity';
import WellnessEventMemberResult from '../WellnessEventMemberResultModules/WellnessEventMemberResult.Entity';
export default class WellnessEventMember extends BaseEntityUuid {
    wellness_event_id: number;
    employee_id: number;
    nik: string;
    name: string;
    dob: Date;
    gender: string;
    phone: string;
    division: string;
    position: string;
    work: string;
    address: string;
    wellnessEvent: WellnessEvent;
    wellnessEventMemberResult: WellnessEventMemberResult;
    employee: Employee;
}
