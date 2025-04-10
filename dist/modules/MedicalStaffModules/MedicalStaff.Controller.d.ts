import MedicalStaffService from './MedicalStaff.Service';
import { MedicalStaffPutDto, MedicalStaffRequestDto, MedicalStaffResponseDto, CorproateQueryDto } from './MedicalStaff.Dto';
import UserService from '../UserModules/User/User.Service';
import RoleService from '../RoleModules/Role/Role.Service';
export default class MedicalStaffController {
    private readonly MedicalStaffService;
    private readonly userService;
    private readonly roleService;
    constructor(MedicalStaffService: MedicalStaffService, userService: UserService, roleService: RoleService);
    index(query: CorproateQueryDto): Promise<{
        data: MedicalStaffResponseDto[];
        count: number;
    }>;
    save(body: MedicalStaffRequestDto): Promise<{
        data: MedicalStaffResponseDto;
    }>;
    update(id: number, body: MedicalStaffPutDto): Promise<{
        data: MedicalStaffResponseDto;
    }>;
    delete(id: number): Promise<{
        data: any;
    }>;
    generateUser(users: any, id: number, body: MedicalStaffPutDto): Promise<{
        data: MedicalStaffResponseDto[];
    }>;
}
