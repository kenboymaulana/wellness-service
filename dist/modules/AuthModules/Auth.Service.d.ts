import UserService from '../UserModules/User/User.Service';
import { JwtService } from '@nestjs/jwt';
import { SocialProvider } from '../../core/enums/Auth.Enum';
import { SocialProviderData } from './Auth.Interface';
import { UserResponseDto } from '../UserModules/User/User.Dto';
import { AuthResponseDto } from './Auth.Dto';
import { ConfigService } from '@nestjs/config';
export default class AuthService {
    private userService;
    private configService;
    private jwtService;
    constructor(userService: UserService, configService: ConfigService, jwtService: JwtService);
    hashPassword(password: string): Promise<string>;
    comparePassword(password: string, hash: string): Promise<boolean>;
    loginWithEmail(email: string, password: string): Promise<AuthResponseDto>;
    loginWithPhone(phoneNumber: string, password: string): Promise<AuthResponseDto>;
    loginWithSocial(socialProvider: SocialProvider, accessToken: string): Promise<{
        user: UserResponseDto;
        access_token: string;
    }>;
    authenticateWithGoogle(accessToken: string): Promise<SocialProviderData>;
    logout(userId: number): Promise<import("../UserModules/User/User.Entity").default>;
    refreshToken(userId: number, refreshToken: string): Promise<{
        user: UserResponseDto;
        access_token: string;
        refresh_token: string;
    }>;
}
