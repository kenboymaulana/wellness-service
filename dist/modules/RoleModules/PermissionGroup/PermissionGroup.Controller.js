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
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const UserInfo_Decorator_1 = require("../../../core/decorators/UserInfo.Decorator");
const TransformResponse_Interceptor_1 = require("../../../core/interceptors/TransformResponse.Interceptor");
const User_Service_1 = require("../../UserModules/User/User.Service");
const PermissionGroup_Dto_1 = require("./PermissionGroup.Dto");
const PermissionGroup_Service_1 = require("./PermissionGroup.Service");
let PermissionGroupController = class PermissionGroupController {
    constructor(permissionGroupService, userService) {
        this.permissionGroupService = permissionGroupService;
        this.userService = userService;
    }
    index(query, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataUser = yield this.userService.getOne({
                where: {
                    id: user.user.id,
                },
                relations: {
                    roles: true,
                },
            });
            const data = yield this.permissionGroupService
                .getRepository()
                .createQueryBuilder('permissionGroup')
                .leftJoinAndSelect('permissionGroup.permission', 'permissions')
                .leftJoinAndSelect('permissions.roles', 'role')
                .where('permissions.name LIKE :name', {
                name: `%${'module:'}%`,
            })
                .andWhere('role.id = :id', { id: dataUser.roles[0].id })
                .orderBy('permissionGroup.sort', 'ASC')
                .addOrderBy('permissions.sort', 'ASC');
            const result = yield data.getMany();
            const response = (0, class_transformer_1.plainToInstance)(PermissionGroup_Dto_1.PermissionGroupResponseDto, result);
            return { data: response };
        });
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, UserInfo_Decorator_1.UserInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PermissionGroup_Dto_1.PermissionGroupQueryDto, Object]),
    __metadata("design:returntype", Promise)
], PermissionGroupController.prototype, "index", null);
PermissionGroupController = __decorate([
    (0, swagger_1.ApiTags)('Permission Group'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('permission-group'),
    __metadata("design:paramtypes", [PermissionGroup_Service_1.default,
        User_Service_1.default])
], PermissionGroupController);
exports.default = PermissionGroupController;
//# sourceMappingURL=PermissionGroup.Controller.js.map