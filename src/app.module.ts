import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import * as Joi from 'joi'
import DatabaseConfig from './config/Database.Config'
import UserModule from './modules/UserModules/User/User.Module'
import { AuthModule } from './modules/AuthModules/Auth.Module'
import { APP_GUARD } from '@nestjs/core'
import { JwtAuthGuard, ScopesGuard } from './config/Jwt.Config'
import { IsUniqueConstraint } from './utils/validators'
import RoleModule from './modules/RoleModules/Role/Role.Module'
import PermissionModule from './modules/RoleModules/Permission/Permission.Module'
import PermissionGroupModule from './modules/RoleModules/PermissionGroup/PermissionGroup.Module'
import CheckPermissionModule from './modules/CheckPermission/CheckPermission.Module'
import EmployeeModule from './modules/EmployeeModules/Employee.Module'
import WellnessProgramsModule from './modules/WellnessModules/WellnessProgramsModules/WellnessPrograms.Module'
import WellnessItemModule from './modules/WellnessModules/WellnessItemModules/WellnessItem.Module'
import WellnessProgramItemModule from './modules/WellnessModules/WellnessProgramItemModules/WellnessProgramItem.Module'
import WellnessEventModule from './modules/WellnessModules/WellnessEventModules/WellnessEvent.Module'
import WellnessEventMemberModule from './modules/WellnessModules/WellnessEventMemberModules/WellnessEventMember.Module'
import WellnessEventMemberResultModule from './modules/WellnessModules/WellnessEventMemberResultModules/WellnessEventMemberResult.Module'
import WellnessEventMemberResultValuesModule from './modules/WellnessModules/WellnessEventMemberResultValuesModules/WellnessEventMemberResultValues.Module'
import WellnessEventMemberEvaluateModule from './modules/WellnessModules/WellnessEventMemberEvaluateModules/WellnessEventMemberEvaluate.Module'
import MedicalStaffModule from './modules/MedicalStaffModules/MedicalStaff.Module'
import PerusahaanModule from './modules/PerusahaanModules/Perusahaan.Module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().required().valid('DEVELOPMENT', 'PRODUCTION'),
        SERVER_PORT: Joi.number().default(3000),
        SERVER_TIMEOUT: Joi.number().default(10),

        DB_DRIVER: Joi.string().default('mysql'),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USER: Joi.string().required(),
        // DB_PASSWORD: Joi.string(),
        DB_NAME: Joi.string().required(),

        SMTP_HOST: Joi.string().required(),
        SMTP_PORT: Joi.number().required(),
        SMTP_USER: Joi.string().required(),
        SMTP_PASSWORD: Joi.string().required(),
        SMTP_IGNORE_TLS: Joi.boolean().default(false),
        SMTP_SECURE: Joi.boolean().default(true),
        SMTP_FROM: Joi.string().default('"No Reply" <no-reply@localhost>'),
      }),
      validationOptions: {
        abortEarly: false,
      },
    }),
    DatabaseConfig,
    UserModule,
    AuthModule,
    RoleModule,
    PermissionModule,
    PermissionGroupModule,
    CheckPermissionModule,
    EmployeeModule,
    PerusahaanModule,
    MedicalStaffModule,
    WellnessProgramsModule,
    WellnessItemModule,
    WellnessProgramItemModule,
    WellnessEventModule,
    WellnessEventMemberModule,
    WellnessEventMemberResultModule,
    WellnessEventMemberResultValuesModule,
    WellnessEventMemberEvaluateModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ScopesGuard,
    },
    IsUniqueConstraint,
  ],
})
export class AppModule {}
