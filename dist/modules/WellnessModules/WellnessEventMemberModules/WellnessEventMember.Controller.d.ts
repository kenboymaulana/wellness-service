import WellnessEventMemberService from './WellnessEventMember.Service';
import WellnessEventMemberResultValuesService from '../WellnessEventMemberResultValuesModules/WellnessEventMemberResultValues.Service';
import { WellnessEventMemberPutDto, WellnessEventMemberRequestDto, WellnessEventMemberResponseDto, WellnessEventMemberQueryDto } from './WellnessEventMember.Dto';
import EmployeeService from 'src/modules/EmployeeModules/Employee.Service';
import UserService from 'src/modules/UserModules/User/User.Service';
import RoleService from 'src/modules/RoleModules/Role/Role.Service';
import WellnessItemService from '../WellnessItemModules/WellnessItem.Service';
import WellnessEventMemberResultService from '../WellnessEventMemberResultModules/WellnessEventMemberResult.Service';
export default class WellnessEventMemberController {
    private readonly WellnessEventMemberService;
    private readonly WellnessEventMemberResultValuesService;
    private readonly employeeService;
    private readonly userService;
    private readonly roleService;
    private readonly wellnessItems;
    private readonly WellnessEventMemberResultService;
    constructor(WellnessEventMemberService: WellnessEventMemberService, WellnessEventMemberResultValuesService: WellnessEventMemberResultValuesService, employeeService: EmployeeService, userService: UserService, roleService: RoleService, wellnessItems: WellnessItemService, WellnessEventMemberResultService: WellnessEventMemberResultService);
    index(query: WellnessEventMemberQueryDto): Promise<{
        data: WellnessEventMemberResponseDto[];
        count: number;
    }>;
    save(body: WellnessEventMemberRequestDto): Promise<{
        data: any;
    }>;
    update(id: number, body: WellnessEventMemberPutDto): Promise<{
        data: WellnessEventMemberResponseDto;
    }>;
    delete(id: number): Promise<{
        data: any;
    }>;
    generateUser(users: any, id: number, body: WellnessEventMemberPutDto): Promise<{
        data: WellnessEventMemberResponseDto[];
    }>;
    analyzeAge(query: WellnessEventMemberQueryDto): Promise<{
        data: {
            key: string;
            value: unknown;
        }[];
    }>;
    getTodayMembers(query: WellnessEventMemberQueryDto): Promise<{
        data: import("./WellnessEventMember.Entity").default[];
    }>;
}
