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
const User_Service_1 = require("./User.Service");
const class_transformer_1 = require("class-transformer");
const User_Dto_1 = require("./User.Dto");
const CheckPermission_Service_1 = require("../../CheckPermission/CheckPermission.Service");
const UserInfo_Decorator_1 = require("../../../core/decorators/UserInfo.Decorator");
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const IndRole_Service_1 = require("../../RoleModules/Role/IndRole.Service");
let UserController = class UserController {
    constructor(userService, checkPermissionService, indRoleService) {
        this.userService = userService;
        this.checkPermissionService = checkPermissionService;
        this.indRoleService = indRoleService;
    }
    index(query, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const check = yield this.checkPermissionService.checkPermissionArray(['upMaster:userRead'], user.user.id);
            if (check != true) {
                return check;
            }
            const defaultLimit = query.limit || 10;
            const defaultPage = query.page || 1;
            const offset = (defaultPage - 1) * defaultLimit;
            const data = yield this.userService
                .getRepository()
                .createQueryBuilder('user')
                .leftJoinAndSelect('user.roles', 'role')
                .orderBy('user.created_at', 'DESC');
            const fieldFilter = [];
            fieldFilter.push({
                par: 'id',
                field: 'user.id',
                mode: 'andWhere',
                mode2: 'equal',
            });
            fieldFilter.push({
                par: 'type',
                field: 'user.type',
                mode: 'andWhere',
                mode2: 'equal',
            });
            for (let i = 0; i < fieldFilter.length; i++) {
                const rowJSON = fieldFilter[i];
                if (rowJSON.par in query) {
                    const filterData = query[rowJSON.par];
                    if (filterData != 'All' && filterData != '') {
                        const parJSON = {};
                        if (rowJSON.mode2 == 'like') {
                            parJSON[rowJSON.par] = `%${filterData}%`;
                        }
                        else {
                            parJSON[rowJSON.par] = filterData;
                        }
                        if (rowJSON.mode == 'andWhere') {
                            if (rowJSON.mode2 == 'like') {
                                yield data.andWhere(rowJSON.field + ' like :' + rowJSON.par, parJSON);
                            }
                            else {
                                yield data.andWhere(rowJSON.field + ' = :' + rowJSON.par, parJSON);
                            }
                        }
                    }
                }
            }
            if ('src' in query) {
                yield data.andWhere(new typeorm_1.Brackets((qb) => {
                    const fieldSrc = ['user.full_name', 'user.email', 'role.name'];
                    const fieldSrcVar = ['full_name', 'email', 'name'];
                    for (let i = 0; i < fieldSrc.length; i++) {
                        const fieldDB = fieldSrc[i];
                        const fieldPar = fieldSrcVar[i];
                        const parJSON = {};
                        parJSON[fieldPar] = `%${query.src}%`;
                        qb.orWhere(fieldDB + ' like :' + fieldPar, parJSON);
                    }
                }));
            }
            const count = yield data.getCount();
            if (query.limit != -1) {
                yield data.take(defaultLimit).skip(offset);
            }
            const result = yield data.getMany();
            const response = (0, class_transformer_1.plainToInstance)(User_Dto_1.UserResponseDto, result);
            return { data: response, count: count };
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield this.userService.getOneById(id);
            const response = (0, class_transformer_1.plainToInstance)(User_Dto_1.UserResponseDto, query);
            return { data: response };
        });
    }
    update(id, body, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const check = yield this.checkPermissionService.checkPermissionArray(['upMaster:userManage'], user.user.id);
            if (check != true) {
                return check;
            }
            body.active_user = 0;
            const data = yield this.userService.update(id, {
                updated_by: user.user.full_name,
                full_name: body.full_name,
                email: body.email,
                type: body.type,
                active_user: body.active_user,
            });
            const response = (0, class_transformer_1.plainToInstance)(User_Dto_1.UserResponseDto, data);
            if (body.role_id != null) {
                const userRole = yield this.userService.getOne({
                    where: {
                        id: id,
                    },
                });
                const roleData = yield this.indRoleService.getOne({
                    where: {
                        id: body.role_id,
                    },
                });
                const role = [];
                role.push(roleData);
                userRole.roles = role;
                yield this.userService.save(userRole);
            }
            return { data: response };
        });
    }
    delete(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const check = yield this.checkPermissionService.checkPermissionArray(['upMaster:userManage'], user.user.id);
            if (check != true) {
                return check;
            }
            yield this.userService.update(id, { deleted_by: user.user.full_name });
            const data = yield this.userService.delete(id);
            return { data: data };
        });
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, UserInfo_Decorator_1.UserInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_Dto_1.UserQueryDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "index", null);
__decorate([
    (0, common_1.Get)(':user'),
    __param(0, (0, common_1.Param)('user', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "show", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, UserInfo_Decorator_1.UserInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, User_Dto_1.UserPutDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, UserInfo_Decorator_1.UserInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "delete", null);
UserController = __decorate([
    (0, swagger_1.ApiTags)('Users'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [User_Service_1.default,
        CheckPermission_Service_1.default,
        IndRole_Service_1.default])
], UserController);
exports.default = UserController;
//# sourceMappingURL=User.Controller.js.map