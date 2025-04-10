"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const User_Module_1 = require("../UserModules/User/User.Module");
const Auth_Service_1 = require("./Auth.Service");
const Jwt_Config_1 = require("../../config/Jwt.Config");
const Auth_Controller_1 = require("./Auth.Controller");
const CheckPermission_Module_1 = require("../CheckPermission/CheckPermission.Module");
const Role_Module_1 = require("../RoleModules/Role/Role.Module");
const Employee_Module_1 = require("../EmployeeModules/Employee.Module");
const MedicalStaff_Module_1 = require("../MedicalStaffModules/MedicalStaff.Module");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            User_Module_1.default,
            CheckPermission_Module_1.default,
            Role_Module_1.default,
            config_1.ConfigModule,
            Employee_Module_1.default,
            MedicalStaff_Module_1.default,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => __awaiter(void 0, void 0, void 0, function* () {
                    return ({
                        secret: configService.get('JWT_SECRET_KEY'),
                        signOptions: {
                            issuer: 'http://mdev-clinic-app.xavierpimc.co.id/',
                            expiresIn: '1y',
                        },
                    });
                }),
            }),
        ],
        providers: [Auth_Service_1.default, Jwt_Config_1.JwtStrategy, Jwt_Config_1.RefreshTokenStrategy],
        controllers: [Auth_Controller_1.default],
        exports: [Jwt_Config_1.JwtStrategy, Jwt_Config_1.RefreshTokenStrategy],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=Auth.Module.js.map