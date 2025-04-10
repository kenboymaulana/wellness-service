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
const WellnessEventMember_Service_1 = require("./WellnessEventMember.Service");
const WellnessEventMemberResultValues_Service_1 = require("../WellnessEventMemberResultValuesModules/WellnessEventMemberResultValues.Service");
const WellnessEventMember_Dto_1 = require("./WellnessEventMember.Dto");
const class_transformer_1 = require("class-transformer");
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const UserInfo_Decorator_1 = require("../../../core/decorators/UserInfo.Decorator");
const Jwt_Config_1 = require("../../../config/Jwt.Config");
const Employee_Service_1 = require("../../EmployeeModules/Employee.Service");
const Auth_Service_1 = require("../../AuthModules/Auth.Service");
const User_Service_1 = require("../../UserModules/User/User.Service");
const User_Dto_1 = require("../../UserModules/User/User.Dto");
const Role_Service_1 = require("../../RoleModules/Role/Role.Service");
const WellnessItem_Service_1 = require("../WellnessItemModules/WellnessItem.Service");
const WellnessEventMemberResult_Service_1 = require("../WellnessEventMemberResultModules/WellnessEventMemberResult.Service");
const moment = require("moment");
const WellnessEventMemberResult_Entity_1 = require("../WellnessEventMemberResultModules/WellnessEventMemberResult.Entity");
const WellnessEventMemberResultValues_Entity_1 = require("../WellnessEventMemberResultValuesModules/WellnessEventMemberResultValues.Entity");
let WellnessEventMemberController = class WellnessEventMemberController {
    constructor(WellnessEventMemberService, WellnessEventMemberResultValuesService, employeeService, userService, roleService, wellnessItems, WellnessEventMemberResultService) {
        this.WellnessEventMemberService = WellnessEventMemberService;
        this.WellnessEventMemberResultValuesService = WellnessEventMemberResultValuesService;
        this.employeeService = employeeService;
        this.userService = userService;
        this.roleService = roleService;
        this.wellnessItems = wellnessItems;
        this.WellnessEventMemberResultService = WellnessEventMemberResultService;
    }
    index(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const defaultLimit = query.limit || 5;
            const defaultPage = query.page || 1;
            const offset = (defaultPage - 1) * defaultLimit;
            const data = yield this.WellnessEventMemberService.getRepository().createQueryBuilder('WellnessEventMember')
                .leftJoinAndSelect('WellnessEventMember.employee', 'employee')
                .leftJoinAndSelect('employee.users', 'users');
            if (query.users === 'true') {
                data.andWhere('users is not null');
            }
            else if (query.users === 'false') {
                data.andWhere('users is null');
            }
            const fieldFilter = [];
            fieldFilter.push({
                par: 'id',
                field: 'WellnessEventMember.id',
                mode: 'andWhere',
                mode2: 'equal',
            });
            fieldFilter.push({
                par: 'wellness_event_id',
                field: 'WellnessEventMember.wellness_event_id',
                mode: 'andWhere',
                mode2: 'equal',
            });
            fieldFilter.push({
                par: 'nik',
                field: 'WellnessEventMember.nik',
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
                    const fieldSrc = ['WellnessEventMember.name'];
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
            const response = (0, class_transformer_1.plainToInstance)(WellnessEventMember_Dto_1.WellnessEventMemberResponseDto, result);
            return { data: response, count: count };
        });
    }
    save(body) {
        return __awaiter(this, void 0, void 0, function* () {
            if (body.employee_id == 0) {
                const storeEmployee = yield this.employeeService.save(body);
                body.employee_id = storeEmployee.id;
            }
            const qrGetData = yield this.WellnessEventMemberService.getRepository().createQueryBuilder('WellnessEventMember');
            yield qrGetData.andWhere(`nik = :nik`, { nik: body.nik });
            yield qrGetData.andWhere(`wellness_event_id = :wellness_event_id`, { wellness_event_id: body.wellness_event_id });
            const getData = yield qrGetData.getMany();
            if (getData.length > 0) {
                throw new common_1.BadRequestException(`Karyawan dengan NIK ${getData[0].nik} sudah terdaftar.`);
            }
            let response;
            try {
                const data = yield this.WellnessEventMemberService.save(body);
                console.log(data);
                if (data) {
                    const wnItems = yield this.wellnessItems
                        .getRepository()
                        .createQueryBuilder('wnItems')
                        .getMany();
                    wnItems.forEach((el) => __awaiter(this, void 0, void 0, function* () {
                        const bodyWnItems = {
                            wellness_event_member_id: data.id,
                            main_id: String(el.id),
                            parent_id: el.parent_id,
                            level: el.level,
                            sort: el.sort,
                            header: el.header,
                            code: el.code,
                            name: el.name,
                            name_eng: el.name_eng,
                            desc: el.desc
                        };
                        yield this.WellnessEventMemberResultService.save(bodyWnItems);
                    }));
                    response = (0, class_transformer_1.plainToInstance)(WellnessEventMember_Dto_1.WellnessEventMemberResponseDto, data);
                }
            }
            catch (error) {
                console.error('Error saving WellnessEventMember:', error);
                response = null;
                throw new common_1.InternalServerErrorException('Failed to save WellnessEventMember');
            }
            return { data: response };
        });
    }
    update(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield this.WellnessEventMemberService.update(id, body);
            const response = (0, class_transformer_1.plainToInstance)(WellnessEventMember_Dto_1.WellnessEventMemberResponseDto, query);
            return { data: response };
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield this.WellnessEventMemberService.delete(id);
            return { data: query };
        });
    }
    generateUser(users, id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const getMember = yield this.WellnessEventMemberService.getOneById(id);
            const email = getMember.nik;
            const password = moment(getMember.dob).format('DDMMYYYY');
            body.is_main = true;
            body.is_verified = false;
            if (yield this.userService.checkEmailExist(email)) {
                throw new common_1.BadRequestException(`NIK "${email}" already exists.`);
            }
            const hashedPass = yield this.userService.hashPassword(password);
            const user = yield this.userService.save(Object.assign(Object.assign({}, body), { full_name: getMember.name, created_by: 'GENERATED', password: hashedPass, email: email, type: 'EMPLOYEE', is_verified: true }));
            if (1 + 1 === 2) {
                const getEmploye = yield this.employeeService.getOne({
                    where: { nik: getMember.nik },
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
            const dataRole = yield this.roleService.getAll({
                where: {
                    for_type: 'Pengguna',
                },
            });
            const getUser = yield this.userService.getOne({
                where: {
                    id: user.id,
                },
            });
            getUser.roles = dataRole;
            yield this.userService.save(getUser);
            const response = (0, class_transformer_1.plainToInstance)(WellnessEventMember_Dto_1.WellnessEventMemberResponseDto, []);
            return { data: response };
        });
    }
    analyzeAge(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const members = yield this.WellnessEventMemberService.getAll({ where: { wellness_event_id: query.wellness_event_id } });
            const ageGroups = members.reduce((acc, member) => {
                const age = new Date().getFullYear() - new Date(member.dob).getFullYear();
                if (age < 30) {
                    acc['<30'] = (acc['<30'] || 0) + 1;
                }
                else if (age < 40) {
                    acc['30-39'] = (acc['30-39'] || 0) + 1;
                }
                else if (age < 50) {
                    acc['40-49'] = (acc['40-49'] || 0) + 1;
                }
                else {
                    acc['50+'] = (acc['50+'] || 0) + 1;
                }
                return acc;
            }, {});
            const dataTemp = Object.entries(ageGroups).map(([key, value]) => ({ key, value }));
            return { data: dataTemp };
        });
    }
    getTodayMembers(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const tomorrow = new Date(today);
            tomorrow.setDate(today.getDate() + 1);
            const members = yield this.WellnessEventMemberService.getRepository().createQueryBuilder('wellness_event_member')
                .leftJoinAndMapMany('wellness_event_member.resultValues', WellnessEventMemberResultValues_Entity_1.default, 'resultValues', 'resultValues.wellness_event_member_id = wellness_event_member.id')
                .leftJoinAndMapMany('resultValues.memberResult', WellnessEventMemberResult_Entity_1.default, 'memberResult', 'memberResult.code = resultValues.item_code')
                .where('wellness_event_member.wellness_event_id = :wellness_event_id', { wellness_event_id: query.wellness_event_id })
                .andWhere('resultValues.date = :date', { date: today })
                .getMany();
            return { data: members };
        });
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [WellnessEventMember_Dto_1.WellnessEventMemberQueryDto]),
    __metadata("design:returntype", Promise)
], WellnessEventMemberController.prototype, "index", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [WellnessEventMember_Dto_1.WellnessEventMemberRequestDto]),
    __metadata("design:returntype", Promise)
], WellnessEventMemberController.prototype, "save", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, WellnessEventMember_Dto_1.WellnessEventMemberPutDto]),
    __metadata("design:returntype", Promise)
], WellnessEventMemberController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], WellnessEventMemberController.prototype, "delete", null);
__decorate([
    (0, common_1.Put)('generate-user/:id'),
    __param(0, (0, UserInfo_Decorator_1.UserInfo)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, WellnessEventMember_Dto_1.WellnessEventMemberPutDto]),
    __metadata("design:returntype", Promise)
], WellnessEventMemberController.prototype, "generateUser", null);
__decorate([
    (0, common_1.Get)('analyze-age'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [WellnessEventMember_Dto_1.WellnessEventMemberQueryDto]),
    __metadata("design:returntype", Promise)
], WellnessEventMemberController.prototype, "analyzeAge", null);
__decorate([
    (0, common_1.Get)('today-members'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [WellnessEventMember_Dto_1.WellnessEventMemberQueryDto]),
    __metadata("design:returntype", Promise)
], WellnessEventMemberController.prototype, "getTodayMembers", null);
WellnessEventMemberController = __decorate([
    (0, swagger_1.ApiTags)('Wellness Event Member'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('wellness-event-member'),
    __metadata("design:paramtypes", [WellnessEventMember_Service_1.default,
        WellnessEventMemberResultValues_Service_1.default,
        Employee_Service_1.default,
        User_Service_1.default,
        Role_Service_1.default,
        WellnessItem_Service_1.default,
        WellnessEventMemberResult_Service_1.default])
], WellnessEventMemberController);
exports.default = WellnessEventMemberController;
//# sourceMappingURL=WellnessEventMember.Controller.js.map