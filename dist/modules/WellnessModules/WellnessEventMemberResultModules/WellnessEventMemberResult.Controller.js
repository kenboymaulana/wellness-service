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
const WellnessEventMemberResult_Service_1 = require("./WellnessEventMemberResult.Service");
const WellnessEventMemberResult_Dto_1 = require("./WellnessEventMemberResult.Dto");
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
let WellnessEventMemberResultController = class WellnessEventMemberResultController {
    constructor(WellnessEventMemberResultService, employeeService, userService, roleService) {
        this.WellnessEventMemberResultService = WellnessEventMemberResultService;
        this.employeeService = employeeService;
        this.userService = userService;
        this.roleService = roleService;
    }
    index(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const defaultLimit = query.limit || 5;
            const defaultPage = query.page || 1;
            const offset = (defaultPage - 1) * defaultLimit;
            const data = yield this.WellnessEventMemberResultService.getRepository().createQueryBuilder('WellnessEventMemberResult');
            const fieldFilter = [];
            fieldFilter.push({
                par: 'id',
                field: 'WellnessEventMemberResult.id',
                mode: 'andWhere',
                mode2: 'equal',
            });
            fieldFilter.push({
                par: 'wellness_event_member_id',
                field: 'WellnessEventMemberResult.wellness_event_member_id',
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
                    const fieldSrc = ['WellnessEventMemberResult.name'];
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
            const response = (0, class_transformer_1.plainToInstance)(WellnessEventMemberResult_Dto_1.WellnessEventMemberResultResponseDto, result);
            return { data: response, count: count };
        });
    }
    save(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = [];
            body.result.forEach(({ item_code, item_value }) => {
                const bodyData = {
                    item_code: item_code,
                    item_value: item_value,
                    wellness_event_member_id: body.wellness_event_member_id,
                    time_input: new Date(),
                    date: new Date()
                };
                data.push(bodyData);
            });
            yield this.WellnessEventMemberResultService.getRepository().delete({ wellness_event_member_id: body.wellness_event_member_id });
            let request;
            data.forEach((el) => __awaiter(this, void 0, void 0, function* () {
                request = yield this.WellnessEventMemberResultService.getRepository().save(el);
            }));
            const response = (0, class_transformer_1.plainToInstance)(WellnessEventMemberResult_Dto_1.WellnessEventMemberResultResponseDto, request);
            return { data: response };
        });
    }
    update(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield this.WellnessEventMemberResultService.update(id, body);
            const response = (0, class_transformer_1.plainToInstance)(WellnessEventMemberResult_Dto_1.WellnessEventMemberResultResponseDto, query);
            return { data: response };
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield this.WellnessEventMemberResultService.delete(id);
            return { data: query };
        });
    }
    getItemTree(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const defaultLimit = query.limit || 5;
            const defaultPage = query.page || 1;
            const offset = (defaultPage - 1) * defaultLimit;
            const request = yield this.WellnessEventMemberResultService.getRepository().createQueryBuilder('WellnessEventMemberResult');
            const fieldFilter = [];
            fieldFilter.push({
                par: 'id',
                field: 'WellnessEventMemberResult.id',
                mode: 'andWhere',
                mode2: 'equal',
            });
            fieldFilter.push({
                par: 'wellness_event_member_id',
                field: 'WellnessEventMemberResult.wellness_event_member_id',
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
                                yield request.andWhere(rowJSON.field + ' like :' + rowJSON.par, parJSON);
                            }
                            else {
                                yield request.andWhere(rowJSON.field + ' = :' + rowJSON.par, parJSON);
                            }
                        }
                    }
                }
            }
            if ('src' in query) {
                yield request.andWhere(new typeorm_1.Brackets((qb) => {
                    const fieldSrc = ['WellnessEventMemberResult.name'];
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
            const result = yield request.getMany();
            const resultTree = yield this.WellnessEventMemberResultService.convertToTree(result);
            return { data: resultTree };
        });
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [WellnessEventMemberResult_Dto_1.WellnessEventMemberResultQueryDto]),
    __metadata("design:returntype", Promise)
], WellnessEventMemberResultController.prototype, "index", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [WellnessEventMemberResult_Dto_1.WellnessEventMemberResultRequestDto]),
    __metadata("design:returntype", Promise)
], WellnessEventMemberResultController.prototype, "save", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, WellnessEventMemberResult_Dto_1.WellnessEventMemberResultPutDto]),
    __metadata("design:returntype", Promise)
], WellnessEventMemberResultController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], WellnessEventMemberResultController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)('tree'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [WellnessEventMemberResult_Dto_1.WellnessEventMemberResultQueryDto]),
    __metadata("design:returntype", Promise)
], WellnessEventMemberResultController.prototype, "getItemTree", null);
WellnessEventMemberResultController = __decorate([
    (0, swagger_1.ApiTags)('Wellness Event Member Result'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('wellness-event-member-result'),
    __metadata("design:paramtypes", [WellnessEventMemberResult_Service_1.default,
        Employee_Service_1.default,
        User_Service_1.default,
        Role_Service_1.default])
], WellnessEventMemberResultController);
exports.default = WellnessEventMemberResultController;
//# sourceMappingURL=WellnessEventMemberResult.Controller.js.map