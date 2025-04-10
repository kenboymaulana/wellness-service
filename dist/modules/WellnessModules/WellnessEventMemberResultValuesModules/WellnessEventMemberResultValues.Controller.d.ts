import WellnessEventMemberResultValuesService from './WellnessEventMemberResultValues.Service';
import { WellnessEventMemberResultValuesPutDto, WellnessEventMemberResultValuesRequestDto, WellnessEventMemberResultValuesResponseDto, WellnessEventMemberResultValuesQueryDto } from './WellnessEventMemberResultValues.Dto';
import EmployeeService from 'src/modules/EmployeeModules/Employee.Service';
import UserService from 'src/modules/UserModules/User/User.Service';
import RoleService from 'src/modules/RoleModules/Role/Role.Service';
export default class WellnessEventMemberResultValuesController {
    private readonly WellnessEventMemberResultValuesService;
    private readonly employeeService;
    private readonly userService;
    private readonly roleService;
    constructor(WellnessEventMemberResultValuesService: WellnessEventMemberResultValuesService, employeeService: EmployeeService, userService: UserService, roleService: RoleService);
    index(query: WellnessEventMemberResultValuesQueryDto): Promise<{
        data: WellnessEventMemberResultValuesResponseDto[];
        count: number;
    }>;
    save(body: WellnessEventMemberResultValuesRequestDto): Promise<{
        data: WellnessEventMemberResultValuesResponseDto;
    }>;
    update(id: number, body: WellnessEventMemberResultValuesPutDto): Promise<{
        data: WellnessEventMemberResultValuesResponseDto;
    }>;
    delete(id: number): Promise<{
        data: any;
    }>;
    getItemTree(query: WellnessEventMemberResultValuesQueryDto): Promise<{
        data: any[];
    }>;
}
