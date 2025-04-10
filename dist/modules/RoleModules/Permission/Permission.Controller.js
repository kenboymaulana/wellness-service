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
const exceptions_1 = require("@nestjs/common/exceptions");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const UserInfo_Decorator_1 = require("../../../core/decorators/UserInfo.Decorator");
const TransformResponse_Interceptor_1 = require("../../../core/interceptors/TransformResponse.Interceptor");
const CheckPermission_Service_1 = require("../../CheckPermission/CheckPermission.Service");
const User_Service_1 = require("../../UserModules/User/User.Service");
const typeorm_1 = require("typeorm");
const Permission_Dto_1 = require("./Permission.Dto");
const Permission_Service_1 = require("./Permission.Service");
const PermissionGroup_Service_1 = require("../PermissionGroup/PermissionGroup.Service");
let PermissionController = class PermissionController {
    constructor(permissionService, permissionGroupService, userService, checkPermissionService) {
        this.permissionService = permissionService;
        this.permissionGroupService = permissionGroupService;
        this.userService = userService;
        this.checkPermissionService = checkPermissionService;
    }
    index(user, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataUser = yield this.userService.getOne({
                where: {
                    id: user.user.id,
                },
                relations: {
                    roles: true,
                },
            });
            const data = yield this.permissionService
                .getRepository()
                .createQueryBuilder('permission')
                .leftJoinAndSelect('permission.roles', 'role')
                .orderBy('permission.sort', 'ASC');
            if ('name' in query) {
                yield data.andWhere(new typeorm_1.Brackets((qb) => {
                    qb.orWhere('permission.name ilike :name', {
                        name: `%${query.name + ':'}%`,
                    }).orWhere('permission.name like :name2', {
                        name2: `%${'module:' + query.name}%`,
                    });
                }));
            }
            const result = yield data
                .andWhere('role.id = :id', { id: dataUser.roles[0].id })
                .getMany();
            const results = [];
            result.forEach((value) => __awaiter(this, void 0, void 0, function* () {
                delete value.roles;
                results.push(value);
            }));
            const response = (0, class_transformer_1.plainToInstance)(Permission_Dto_1.default, results);
            return { data: response };
        });
    }
    getPermissionRole(query, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const check = yield this.checkPermissionService.checkPermissionArray([], user.user.id);
            if (check != true) {
                return check;
            }
            throw new exceptions_1.BadRequestException('your body type not found!');
        });
    }
    getPermission(query, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const check = yield this.checkPermissionService.checkPermissionArray([], user.user.id);
            if (check != true) {
                return check;
            }
            const data = yield this.permissionGroupService
                .getRepository()
                .createQueryBuilder('permisionGroups')
                .leftJoinAndSelect('permisionGroups.permission', 'permissions')
                .orderBy('permisionGroups.sort', 'ASC')
                .addOrderBy('permissions.sort', 'ASC')
                .getMany();
            return { data: data };
        });
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, UserInfo_Decorator_1.UserInfo)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Permission_Dto_1.PermissionQueryDto]),
    __metadata("design:returntype", Promise)
], PermissionController.prototype, "index", null);
__decorate([
    (0, common_1.Get)('/role'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, UserInfo_Decorator_1.UserInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Permission_Dto_1.PermissionQueryDto, Object]),
    __metadata("design:returntype", Promise)
], PermissionController.prototype, "getPermissionRole", null);
__decorate([
    (0, common_1.Get)('/roles-module'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, UserInfo_Decorator_1.UserInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Permission_Dto_1.PermissionQueryDto, Object]),
    __metadata("design:returntype", Promise)
], PermissionController.prototype, "getPermission", null);
PermissionController = __decorate([
    (0, swagger_1.ApiTags)('Permission'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('permission'),
    __metadata("design:paramtypes", [Permission_Service_1.default,
        PermissionGroup_Service_1.default,
        User_Service_1.default,
        CheckPermission_Service_1.default])
], PermissionController);
exports.default = PermissionController;
//# sourceMappingURL=Permission.Controller.js.map