import WellnessEventMemberResultService from './WellnessEventMemberResult.Service';
import { WellnessEventMemberResultPutDto, WellnessEventMemberResultRequestDto, WellnessEventMemberResultResponseDto, WellnessEventMemberResultQueryDto } from './WellnessEventMemberResult.Dto';
import EmployeeService from 'src/modules/EmployeeModules/Employee.Service';
import UserService from 'src/modules/UserModules/User/User.Service';
import RoleService from 'src/modules/RoleModules/Role/Role.Service';
export default class WellnessEventMemberResultController {
    private readonly WellnessEventMemberResultService;
    private readonly employeeService;
    private readonly userService;
    private readonly roleService;
    constructor(WellnessEventMemberResultService: WellnessEventMemberResultService, employeeService: EmployeeService, userService: UserService, roleService: RoleService);
    index(query: WellnessEventMemberResultQueryDto): Promise<{
        data: WellnessEventMemberResultResponseDto[];
        count: number;
    }>;
    save(body: WellnessEventMemberResultRequestDto): Promise<{
        data: WellnessEventMemberResultResponseDto;
    }>;
    update(id: number, body: WellnessEventMemberResultPutDto): Promise<{
        data: WellnessEventMemberResultResponseDto;
    }>;
    delete(id: number): Promise<{
        data: any;
    }>;
    getItemTree(query: WellnessEventMemberResultQueryDto): Promise<{
        data: any[];
    }>;
}
