import { RegistrationType, SocialProvider } from '../../core/enums/Auth.Enum';
import { BaseDto } from '../../base/Dto.Base';
import { UserType } from '../UserModules/User/User.Enum';
import { UserResponseDto } from '../UserModules/User/User.Dto';
export declare class AuthRequestDto implements Readonly<AuthRequestDto> {
    social_provider: SocialProvider;
    access_token: string;
    email: string;
    phone_number: string;
    password: string;
}
export declare class AuthResponseDto {
    user: UserResponseDto;
    access_token: string;
    refresh_token: string;
}
export declare class RegistrationRequestDto extends BaseDto {
    is_main: boolean;
    is_verified: boolean;
    need_verification: boolean;
    full_name: string;
    email: string;
    phone_number: string;
    registration_type: RegistrationType;
    password: string;
    employee_id: number;
    medical_staff_id: number;
    type: UserType;
    role_id: number;
}
export declare class AuthPasswordDto {
    password: string;
}
export declare class AuthPutDto {
    old_password: string;
    password: string;
    confirmation_password: string;
}
export declare class AuthRefreshToken {
    refreshToken: string;
}
export declare class RegistrationPatientRequestDto extends BaseDto {
    is_main: boolean;
    is_verified: boolean;
    need_verification: boolean;
    name: string;
    email: string;
    type: UserType;
    nik: string;
    dob: string;
    gender: string;
    address: string;
    emp_no: string;
    phone: string;
    division: string;
    position: string;
    description: string;
    type_id: number;
    province: string;
    city: string;
}
export declare class AuthPatientRequestDto implements Readonly<AuthPatientRequestDto> {
    name: string;
    phone: string;
}
export declare class PatientLoginRequestDto implements Readonly<PatientLoginRequestDto> {
    id: number;
    otp: string;
}
