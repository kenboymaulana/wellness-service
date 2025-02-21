import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import UserModule from '../UserModules/User/User.Module'
import AuthService from './Auth.Service'
import { JwtStrategy, RefreshTokenStrategy } from '../../config/Jwt.Config'
import AuthController from './Auth.Controller'
import CheckPermissionModule from '../CheckPermission/CheckPermission.Module'
import RoleModule from '../RoleModules/Role/Role.Module'
import EmployeeModule from '../EmployeeModules/Employee.Module'
import MedicalStaffModule from '../MedicalStaffModules/MedicalStaff.Module'

@Module({
  imports: [
    UserModule,
    CheckPermissionModule,
    RoleModule,
    ConfigModule,
    EmployeeModule,
    MedicalStaffModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET_KEY'),
        signOptions: {
          issuer: 'http://mdev-clinic-app.xavierpimc.co.id/',
          expiresIn: '1y',
        },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy, RefreshTokenStrategy],
  controllers: [AuthController],
  exports: [JwtStrategy, RefreshTokenStrategy],
})
export class AuthModule {}
