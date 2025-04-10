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
const MedicalStaff_Service_1 = require("./MedicalStaff.Service");
const MedicalStaff_Dto_1 = require("./MedicalStaff.Dto");
const class_transformer_1 = require("class-transformer");
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const UserInfo_Decorator_1 = require("../../core/decorators/UserInfo.Decorator");
const Jwt_Config_1 = require("../../config/Jwt.Config");
const moment = require("moment");
const User_Service_1 = require("../UserModules/User/User.Service");
const Role_Service_1 = require("../RoleModules/Role/Role.Service");
let MedicalStaffController = class MedicalStaffController {
    constructor(MedicalStaffService, userService, roleService) {
        this.MedicalStaffService = MedicalStaffService;
        this.userService = userService;
        this.roleService = roleService;
    }
    index(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const defaultLimit = query.limit || 5;
            const defaultPage = query.page || 1;
            const offset = (defaultPage - 1) * defaultLimit;
            const data = yield this.MedicalStaffService.getRepository().createQueryBuilder('MedicalStaff')
                .leftJoinAndSelect('MedicalStaff.users', 'users');
            if (query.users === 'true') {
                data.andWhere('users is not null');
            }
            else if (query.users === 'false') {
                data.andWhere('users is null');
            }
            const fieldFilter = [];
            fieldFilter.push({
                par: 'id',
                field: 'MedicalStaff.id',
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
                    const fieldSrc = ['MedicalStaff.name'];
                    const fieldSrcVar = ['name'];
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
            const response = (0, class_transformer_1.plainToInstance)(MedicalStaff_Dto_1.MedicalStaffResponseDto, result);
            return { data: response, count: count };
        });
    }
    save(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.MedicalStaffService.save(body);
            const response = (0, class_transformer_1.plainToInstance)(MedicalStaff_Dto_1.MedicalStaffResponseDto, data);
            return { data: response };
        });
    }
    update(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield this.MedicalStaffService.update(id, body);
            const response = (0, class_transformer_1.plainToInstance)(MedicalStaff_Dto_1.MedicalStaffResponseDto, query);
            return { data: response };
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield this.MedicalStaffService.delete(id);
            return { data: query };
        });
    }
    generateUser(users, id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const getMember = yield this.MedicalStaffService.getOneById(id);
            const email = getMember.nik;
            const password = moment(getMember.dob).format('DDMMYYYY');
            body.is_main = true;
            body.is_verified = false;
            if (yield this.userService.checkEmailExist(email)) {
                throw new common_1.BadRequestException(`NIK "${email}" already exists.`);
            }
            const hashedPass = yield this.userService.hashPassword(password);
            const user = yield this.userService.save(Object.assign(Object.assign({}, body), { full_name: getMember.name, created_by: 'GENERATED', password: hashedPass, email: email, type: 'STAFF', is_verified: true }));
            if (1 + 1 === 2) {
                const getEmploye = yield this.MedicalStaffService.getOne({
                    where: { nik: getMember.nik },
                });
                const employe = [];
                employe.push(getEmploye);
                const getUser = yield this.userService.getOne({
                    where: {
                        id: user.id,
                    },
                });
                getUser.medicalStaffs = employe;
                yield this.userService.save(getUser);
            }
            const dataRole = yield this.roleService.getAll({
                where: {
                    for_type: 'Petugas',
                },
            });
            const getUser = yield this.userService.getOne({
                where: {
                    id: user.id,
                },
            });
            getUser.roles = dataRole;
            yield this.userService.save(getUser);
            const response = (0, class_transformer_1.plainToInstance)(MedicalStaff_Dto_1.MedicalStaffResponseDto, []);
            return { data: response };
        });
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MedicalStaff_Dto_1.CorproateQueryDto]),
    __metadata("design:returntype", Promise)
], MedicalStaffController.prototype, "index", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MedicalStaff_Dto_1.MedicalStaffRequestDto]),
    __metadata("design:returntype", Promise)
], MedicalStaffController.prototype, "save", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, MedicalStaff_Dto_1.MedicalStaffPutDto]),
    __metadata("design:returntype", Promise)
], MedicalStaffController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MedicalStaffController.prototype, "delete", null);
__decorate([
    (0, common_1.Put)('generate-user/:id'),
    __param(0, (0, UserInfo_Decorator_1.UserInfo)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, MedicalStaff_Dto_1.MedicalStaffPutDto]),
    __metadata("design:returntype", Promise)
], MedicalStaffController.prototype, "generateUser", null);
MedicalStaffController = __decorate([
    (0, swagger_1.ApiTags)('Medical Staff'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, Jwt_Config_1.PublicRoute)(),
    (0, common_1.Controller)('medical-staff'),
    __metadata("design:paramtypes", [MedicalStaff_Service_1.default,
        User_Service_1.default,
        Role_Service_1.default])
], MedicalStaffController);
exports.default = MedicalStaffController;
//# sourceMappingURL=MedicalStaff.Controller.js.map