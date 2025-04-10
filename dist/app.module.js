"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const Joi = require("joi");
const Database_Config_1 = require("./config/Database.Config");
const User_Module_1 = require("./modules/UserModules/User/User.Module");
const Auth_Module_1 = require("./modules/AuthModules/Auth.Module");
const core_1 = require("@nestjs/core");
const Jwt_Config_1 = require("./config/Jwt.Config");
const validators_1 = require("./utils/validators");
const Role_Module_1 = require("./modules/RoleModules/Role/Role.Module");
const Permission_Module_1 = require("./modules/RoleModules/Permission/Permission.Module");
const PermissionGroup_Module_1 = require("./modules/RoleModules/PermissionGroup/PermissionGroup.Module");
const CheckPermission_Module_1 = require("./modules/CheckPermission/CheckPermission.Module");
const Employee_Module_1 = require("./modules/EmployeeModules/Employee.Module");
const WellnessPrograms_Module_1 = require("./modules/WellnessModules/WellnessProgramsModules/WellnessPrograms.Module");
const WellnessItem_Module_1 = require("./modules/WellnessModules/WellnessItemModules/WellnessItem.Module");
const WellnessProgramItem_Module_1 = require("./modules/WellnessModules/WellnessProgramItemModules/WellnessProgramItem.Module");
const WellnessEvent_Module_1 = require("./modules/WellnessModules/WellnessEventModules/WellnessEvent.Module");
const WellnessEventMember_Module_1 = require("./modules/WellnessModules/WellnessEventMemberModules/WellnessEventMember.Module");
const WellnessEventMemberResult_Module_1 = require("./modules/WellnessModules/WellnessEventMemberResultModules/WellnessEventMemberResult.Module");
const WellnessEventMemberResultValues_Module_1 = require("./modules/WellnessModules/WellnessEventMemberResultValuesModules/WellnessEventMemberResultValues.Module");
const WellnessEventMemberEvaluate_Module_1 = require("./modules/WellnessModules/WellnessEventMemberEvaluateModules/WellnessEventMemberEvaluate.Module");
const MedicalStaff_Module_1 = require("./modules/MedicalStaffModules/MedicalStaff.Module");
const Perusahaan_Module_1 = require("./modules/PerusahaanModules/Perusahaan.Module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                validationSchema: Joi.object({
                    NODE_ENV: Joi.string().required().valid('DEVELOPMENT', 'PRODUCTION'),
                    SERVER_PORT: Joi.number().default(3000),
                    SERVER_TIMEOUT: Joi.number().default(10),
                    DB_DRIVER: Joi.string().default('mysql'),
                    DB_HOST: Joi.string().required(),
                    DB_PORT: Joi.number().required(),
                    DB_USER: Joi.string().required(),
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
            Database_Config_1.default,
            User_Module_1.default,
            Auth_Module_1.AuthModule,
            Role_Module_1.default,
            Permission_Module_1.default,
            PermissionGroup_Module_1.default,
            CheckPermission_Module_1.default,
            Employee_Module_1.default,
            Perusahaan_Module_1.default,
            MedicalStaff_Module_1.default,
            WellnessPrograms_Module_1.default,
            WellnessItem_Module_1.default,
            WellnessProgramItem_Module_1.default,
            WellnessEvent_Module_1.default,
            WellnessEventMember_Module_1.default,
            WellnessEventMemberResult_Module_1.default,
            WellnessEventMemberResultValues_Module_1.default,
            WellnessEventMemberEvaluate_Module_1.default,
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: Jwt_Config_1.JwtAuthGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: Jwt_Config_1.ScopesGuard,
            },
            validators_1.IsUniqueConstraint,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map