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
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Service_Base_1 = require("../../base/Service.Base");
const Role_Entity_1 = require("../RoleModules/Role/Role.Entity");
const IndUser_Service_1 = require("../UserModules/User/IndUser.Service");
let CheckPermissionService = class CheckPermissionService extends Service_Base_1.default {
    constructor(roleRepository, indUserService) {
        super(roleRepository);
        this.roleRepository = roleRepository;
        this.indUserService = indUserService;
    }
    checkPermission(name, user, mode = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataUser = yield this.indUserService.getOne({
                where: {
                    id: user,
                },
                relations: {
                    roles: true,
                },
            });
            const data = yield this.roleRepository
                .createQueryBuilder('role')
                .leftJoinAndSelect('role.permissions', 'permission');
            yield data.andWhere('permission.name_be ilike :name_be', {
                name_be: `%${name}%`,
            });
            if (dataUser.roles.length > 0) {
                const result = yield data
                    .andWhere('role.id = :id', { id: dataUser.roles[0].id })
                    .getMany();
                if (result.length > 0) {
                    return true;
                }
                else {
                    if (mode == 1) {
                        return false;
                    }
                    else {
                        throw new exceptions_1.HttpException({
                            success: false,
                            status_code: common_1.HttpStatus.FORBIDDEN,
                            messages: [
                                `Forbidden! You have no access to this resources ${name}!`,
                            ],
                        }, common_1.HttpStatus.FORBIDDEN);
                    }
                }
            }
            else {
                throw new exceptions_1.BadRequestException("you don't have roles!");
            }
        });
    }
    checkPermissionArray(name, user, mode = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataUser = yield this.indUserService.getOne({
                where: {
                    id: user,
                },
                relations: {
                    roles: true,
                },
            });
            let result2 = 0;
            const data = yield this.roleRepository
                .createQueryBuilder('role')
                .leftJoinAndSelect('role.permissions', 'permission');
            yield data.andWhere(new typeorm_2.Brackets((qb) => {
                for (let i = 0; i < name.length; i++) {
                    const par = 'par' + i;
                    const parJSON = {};
                    parJSON[par] = `%${name[i]}%`;
                    qb.orWhere('permission.name_be like :' + par, parJSON);
                }
            }));
            if (dataUser.roles.length > 0) {
                const result = yield data
                    .andWhere('role.id = :id', { id: dataUser.roles[0].id })
                    .getMany();
                if (result.length > 0) {
                    result2++;
                }
            }
            else {
                throw new exceptions_1.BadRequestException("you don't have roles!");
            }
            if (result2 > 0) {
                return true;
            }
            else {
                if (mode == 1) {
                    return false;
                }
                else {
                    throw new exceptions_1.HttpException({
                        success: false,
                        status_code: common_1.HttpStatus.FORBIDDEN,
                        messages: [
                            `Forbidden! You have no access to this resources ${name}!`,
                        ],
                    }, common_1.HttpStatus.FORBIDDEN);
                }
            }
        });
    }
};
CheckPermissionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Role_Entity_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        IndUser_Service_1.default])
], CheckPermissionService);
exports.default = CheckPermissionService;
//# sourceMappingURL=CheckPermission.Service.js.map