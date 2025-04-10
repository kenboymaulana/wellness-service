"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
const common_1 = require("@nestjs/common");
const Auth_Service_1 = require("./Auth.Service");
const Auth_Dto_1 = require("./Auth.Dto");
const Jwt_Config_1 = require("../../config/Jwt.Config");
const Auth_Enum_1 = require("../../core/enums/Auth.Enum");
const User_Service_1 = require("../UserModules/User/User.Service");
const class_transformer_1 = require("class-transformer");
const User_Dto_1 = require("../UserModules/User/User.Dto");
const UserInfo_Decorator_1 = require("../../core/decorators/UserInfo.Decorator");
const CheckPermission_Service_1 = require("../CheckPermission/CheckPermission.Service");
const pipes_1 = require("@nestjs/common/pipes");
const Role_Service_1 = require("../RoleModules/Role/Role.Service");
const decorators_1 = require("@nestjs/common/decorators");
const swagger_1 = require("@nestjs/swagger");
const Employee_Service_1 = require("../EmployeeModules/Employee.Service");
const MedicalStaff_Service_1 = require("../MedicalStaffModules/MedicalStaff.Service");
let AuthController = class AuthController {
    constructor(authService, userService, employeService, medicalStaffService, checkPermissionService, roleService) {
        this.authService = authService;
        this.userService = userService;
        this.employeService = employeService;
        this.medicalStaffService = medicalStaffService;
        this.checkPermissionService = checkPermissionService;
        this.roleService = roleService;
    }
    register(users, body) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            body.is_main = true;
            body.is_verified = false;
            if (body.registration_type === Auth_Enum_1.RegistrationType.EMAIL) {
                if (yield this.userService.checkEmailExist(body.email)) {
                    throw new common_1.ConflictException('Email already exists.');
                }
            }
            const hashedPass = yield this.authService.hashPassword(body.password);
            const user = yield this.userService.save(Object.assign(Object.assign({}, body), { created_by: ((_a = users === null || users === void 0 ? void 0 : users.user) === null || _a === void 0 ? void 0 : _a.full_name) || '', password: hashedPass, email: body.email, is_verified: !body.need_verification }));
            const response = (0, class_transformer_1.plainToInstance)(User_Dto_1.UserResponseDto, user);
            if (body.employee_id) {
                const getEmploye = yield this.employeService.getOne({
                    where: { id: body.employee_id },
                });
                const employe = [];
                employe.push(getEmploye);
                const getUser = yield this.userService.getOne({
                    where: {
                        id: user.id,
                    },
                });
                getUser.employees = employe;
                yield this.userService.save(getUser);
            }
            if (body.medical_staff_id) {
                const getMedicalStaff = yield this.medicalStaffService.getOne({
                    where: { id: body.medical_staff_id },
                });
                const medicalStaff = [];
                medicalStaff.push(getMedicalStaff);
                const getUser = yield this.userService.getOne({
                    where: {
                        id: user.id,
                    },
                });
                getUser.medicalStaffs = medicalStaff;
                yield this.userService.save(getUser);
            }
            const dataRole = yield this.roleService.getAll({
                where: {
                    id: body.role_id,
                },
            });
            const getUser = yield this.userService.getOne({
                where: {
                    id: user.id,
                },
            });
            getUser.roles = dataRole;
            yield this.userService.save(getUser);
            return { data: response };
        });
    }
    login(authDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.authService.loginWithEmail(authDto.email, authDto.password);
            return { success: true, data: data };
        });
    }
    hasher(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const hash = yield this.authService.hashPassword(body.password);
            return { success: true, data: hash };
        });
    }
    changePassword(user, id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const check = yield this.checkPermissionService.checkPermissionArray(['users:change_password', 'upClinic:userManage', 'upCorp:userManage'], user.user.id);
            if (check != true) {
                return check;
            }
            const hashedPass = yield this.authService.hashPassword(body.password);
            const data = yield this.userService
                .getRepository()
                .update({ id: id }, { password: hashedPass, updated_by: user.user.full_name });
            return { data: data };
        });
    }
    changePasswordProfile(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataUser = yield this.userService.getOne({
                where: {
                    id: id,
                },
            });
            if (body.old_password != null) {
                const IsMatch = yield this.authService.comparePassword(body.old_password, dataUser.password);
                if (IsMatch == true) {
                    if (body.password == body.confirmation_password) {
                        const hashedPass = yield this.authService.hashPassword(body.password);
                        yield this.userService.getRepository().update({
                            id: id,
                        }, {
                            password: hashedPass,
                        });
                        return { status: common_1.HttpStatus.OK, data: 'Successfully Change Password' };
                    }
                }
                else {
                    throw new common_1.BadRequestException("old password doesn't match!");
                }
            }
            throw new common_1.BadRequestException('password and password confirmation do not match!');
        });
    }
    logout(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.authService.logout(id);
            throw new common_1.HttpException({
                success: true,
                status_code: common_1.HttpStatus.OK,
                messages: [`Success logout!`],
            }, common_1.HttpStatus.OK);
        });
    }
    refreshToken(body, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const refresh = yield this.authService.refreshToken(user.user.id, body.refreshToken);
            return { data: refresh };
        });
    }
};
__decorate([
    (0, Jwt_Config_1.PublicRoute)(),
    (0, common_1.Post)('register'),
    __param(0, (0, UserInfo_Decorator_1.UserInfo)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Auth_Dto_1.RegistrationRequestDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, Jwt_Config_1.PublicRoute)(),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Auth_Dto_1.AuthRequestDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, Jwt_Config_1.PublicRoute)(),
    (0, common_1.Post)('hashGenerator'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "hasher", null);
__decorate([
    (0, common_1.Post)('/change-password/:id'),
    __param(0, (0, UserInfo_Decorator_1.UserInfo)()),
    __param(1, (0, common_1.Param)('id', pipes_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Auth_Dto_1.AuthPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "changePassword", null);
__decorate([
    (0, decorators_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', pipes_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Auth_Dto_1.AuthPutDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "changePasswordProfile", null);
__decorate([
    (0, decorators_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', pipes_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, decorators_1.Get)('refresh'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, UserInfo_Decorator_1.UserInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Auth_Dto_1.AuthRefreshToken, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [Auth_Service_1.default,
        User_Service_1.default,
        Employee_Service_1.default,
        MedicalStaff_Service_1.default,
        CheckPermission_Service_1.default,
        Role_Service_1.default])
], AuthController);
exports.default = AuthController;
//# sourceMappingURL=Auth.Controller.js.map