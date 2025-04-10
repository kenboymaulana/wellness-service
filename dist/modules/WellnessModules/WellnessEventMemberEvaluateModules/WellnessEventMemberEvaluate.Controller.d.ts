import WellnessEventMemberEvaluateService from './WellnessEventMemberEvaluate.Service';
import { WellnessEventMemberEvaluatePutDto, WellnessEventMemberEvaluateRequestDto, WellnessEventMemberEvaluateResponseDto, WellnessEventMemberEvaluateQueryDto } from './WellnessEventMemberEvaluate.Dto';
import EmployeeService from 'src/modules/EmployeeModules/Employee.Service';
import UserService from 'src/modules/UserModules/User/User.Service';
import RoleService from 'src/modules/RoleModules/Role/Role.Service';
export default class WellnessEventMemberEvaluateController {
    private readonly WellnessEventMemberEvaluateService;
    private readonly employeeService;
    private readonly userService;
    private readonly roleService;
    constructor(WellnessEventMemberEvaluateService: WellnessEventMemberEvaluateService, employeeService: EmployeeService, userService: UserService, roleService: RoleService);
    index(query: WellnessEventMemberEvaluateQueryDto): Promise<{
        data: WellnessEventMemberEvaluateResponseDto[];
        count: number;
    }>;
    save(body: WellnessEventMemberEvaluateRequestDto): Promise<{
        data: WellnessEventMemberEvaluateResponseDto;
    }>;
    update(id: number, body: WellnessEventMemberEvaluatePutDto): Promise<{
        data: WellnessEventMemberEvaluateResponseDto;
    }>;
    delete(id: number): Promise<{
        data: any;
    }>;
}
