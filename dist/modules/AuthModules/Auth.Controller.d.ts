import { HttpStatus } from '@nestjs/common';
import AuthService from './Auth.Service';
import { AuthPasswordDto, AuthPutDto, AuthRefreshToken, AuthRequestDto, RegistrationRequestDto } from './Auth.Dto';
import { TransformResponse } from '../../core/interceptors/TransformResponse.Interceptor';
import UserService from '../UserModules/User/User.Service';
import { UserResponseDto } from '../UserModules/User/User.Dto';
import CheckPermissionService from '../CheckPermission/CheckPermission.Service';
import RoleService from '../RoleModules/Role/Role.Service';
import EmployeeService from '../EmployeeModules/Employee.Service';
import MedicalStaffService from '../MedicalStaffModules/MedicalStaff.Service';
export default class AuthController {
    private readonly authService;
    private readonly userService;
    private readonly employeService;
    private readonly medicalStaffService;
    private readonly checkPermissionService;
    private readonly roleService;
    constructor(authService: AuthService, userService: UserService, employeService: EmployeeService, medicalStaffService: MedicalStaffService, checkPermissionService: CheckPermissionService, roleService: RoleService);
    register(users: any, body: RegistrationRequestDto): Promise<{
        data: UserResponseDto;
    }>;
    login(authDto: AuthRequestDto): Promise<TransformResponse<any>>;
    hasher(body: any): Promise<TransformResponse<any>>;
    changePassword(user: any, id: number, body: AuthPasswordDto): Promise<false | {
        data: import("typeorm").UpdateResult;
    }>;
    changePasswordProfile(id: number, body: AuthPutDto): Promise<{
        status: HttpStatus;
        data: string;
    }>;
    logout(id: number): Promise<void>;
    refreshToken(body: AuthRefreshToken, user: any): Promise<{
        data: {
            user: UserResponseDto;
            access_token: string;
            refresh_token: string;
        };
    }>;
}
