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
const Role_Service_1 = require("./Role.Service");
const Role_Dto_1 = require("./Role.Dto");
const class_transformer_1 = require("class-transformer");
const CheckPermission_Service_1 = require("../../CheckPermission/CheckPermission.Service");
const UserInfo_Decorator_1 = require("../../../core/decorators/UserInfo.Decorator");
const Permission_Service_1 = require("../Permission/Permission.Service");
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
let RoleController = class RoleController {
    constructor(roleService, checkPermissionService, permissionService) {
        this.roleService = roleService;
        this.checkPermissionService = checkPermissionService;
        this.permissionService = permissionService;
    }
    index(user, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const check = yield this.checkPermissionService.checkPermissionArray(['upMaster:roleRead'], user.user.id);
            if (check != true) {
                return check;
            }
            const defaultLimit = query.limit || 5;
            const defaultPage = query.page || 1;
            const offset = (defaultPage - 1) * defaultLimit;
            const data = yield this.roleService
                .getRepository()
                .createQueryBuilder('roles')
                .orderBy('roles.created_at', 'DESC');
            if ('id' in query) {
                yield data.andWhere('roles.id = :ids', { ids: query.id });
            }
            if ('src' in query) {
                yield data.andWhere('roles.name like :name', { name: `%${query.src}%` });
            }
            const count = yield data.getCount();
            if (query.limit != -1) {
                yield data.take(defaultLimit).skip(offset);
            }
            const result = yield data.getMany();
            const response = (0, class_transformer_1.plainToInstance)(Role_Dto_1.RoleResponseDto, result);
            return { data: response, count: count };
        });
    }
    save(user, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const check = yield this.checkPermissionService.checkPermissionArray(['upMaster:roleManage'], user.user.id);
            if (check != true) {
                return check;
            }
            const data = yield this.roleService.save(body);
            const response = (0, class_transformer_1.plainToInstance)(Role_Dto_1.RoleResponseDto, data);
            return { data: response };
        });
    }
    update(user, body, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const check = yield this.checkPermissionService.checkPermissionArray(['upMaster:roleManage'], user.user.id);
            if (check != true) {
                return check;
            }
            const data = yield this.roleService.update(id, body);
            const response = (0, class_transformer_1.plainToInstance)(Role_Dto_1.RoleResponseDto, data);
            return { data: response };
        });
    }
    delete(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const check = yield this.checkPermissionService.checkPermissionArray(['upMaster:roleManage'], user.user.id);
            if (check != true) {
                return check;
            }
            const data = yield this.roleService.delete(id);
            return { data: data };
        });
    }
    getRolePermission(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.roleService
                .getRepository()
                .createQueryBuilder('role')
                .leftJoinAndSelect('role.permissions', 'permission');
            if ('role_id' in query) {
                yield data.andWhere('role.id = :id', { id: query.role_id });
            }
            const result = yield data.getMany();
            const response = (0, class_transformer_1.plainToInstance)(Role_Dto_1.RoleResponseDto, result);
            return { data: response };
        });
    }
    saveRolePermission(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataRole = yield this.roleService.getOne({
                where: {
                    id: body.role_id,
                },
                relations: {
                    permissions: true,
                },
            });
            const dataPermission = yield this.permissionService.getRepository().find({
                where: {
                    id: (0, typeorm_1.In)(body.permission_id),
                },
            });
            dataRole.permissions = dataPermission;
            const data = yield this.roleService.save(dataRole);
            const response = (0, class_transformer_1.plainToInstance)(Role_Dto_1.RoleResponseDto, data);
            return { data: response };
        });
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, UserInfo_Decorator_1.UserInfo)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Role_Dto_1.RoleQueryDto]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "index", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, UserInfo_Decorator_1.UserInfo)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Role_Dto_1.RoleRequestDto]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "save", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, UserInfo_Decorator_1.UserInfo)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Role_Dto_1.RolePutDto, Number]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, UserInfo_Decorator_1.UserInfo)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)('permission'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Role_Dto_1.RolePermissionRequestDto]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "getRolePermission", null);
__decorate([
    (0, common_1.Post)('permission'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Role_Dto_1.RolePermissionRequestDto]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "saveRolePermission", null);
RoleController = __decorate([
    (0, swagger_1.ApiTags)('Role'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('roles'),
    __metadata("design:paramtypes", [Role_Service_1.default,
        CheckPermission_Service_1.default,
        Permission_Service_1.default])
], RoleController);
exports.default = RoleController;
//# sourceMappingURL=Role.Controller.js.map