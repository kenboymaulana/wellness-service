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
const WellnessEvent_Service_1 = require("./WellnessEvent.Service");
const WellnessEvent_Dto_1 = require("./WellnessEvent.Dto");
const class_transformer_1 = require("class-transformer");
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const UserInfo_Decorator_1 = require("../../../core/decorators/UserInfo.Decorator");
const Jwt_Config_1 = require("../../../config/Jwt.Config");
const WellnessPrograms_Entity_1 = require("../WellnessProgramsModules/WellnessPrograms.Entity");
let WellnessEventController = class WellnessEventController {
    constructor(WellnessEventService) {
        this.WellnessEventService = WellnessEventService;
    }
    index(users, query) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            const defaultLimit = query.limit || 5;
            const defaultPage = query.page || 1;
            const offset = (defaultPage - 1) * defaultLimit;
            const data = yield this.WellnessEventService.getRepository().createQueryBuilder('WellnessEvent')
                .leftJoinAndSelect('WellnessEvent.medicalStaff', 'medicalStaff')
                .leftJoinAndMapOne('WellnessEvent.modelCode', WellnessPrograms_Entity_1.default, 'modelCode', 'modelCode.code=WellnessEvent.model_code')
                .leftJoinAndSelect('WellnessEvent.wellnessEventMember', 'wellnessEventMember', 'wellnessEventMember.wellness_event_id=WellnessEvent.id');
            if (((_a = users === null || users === void 0 ? void 0 : users.user) === null || _a === void 0 ? void 0 : _a.type) === 'EMPLOYEE') {
                yield data.andWhere('wellnessEventMember.nik = :nik', { nik: (_c = (_b = users === null || users === void 0 ? void 0 : users.user) === null || _b === void 0 ? void 0 : _b.employees[0]) === null || _c === void 0 ? void 0 : _c.nik });
            }
            if (((_d = users === null || users === void 0 ? void 0 : users.user) === null || _d === void 0 ? void 0 : _d.type) === 'STAFF') {
                yield data.andWhere('WellnessEvent.medical_staff_id = :medical_staff_id', { medical_staff_id: users.user.medicalStaffs[0].id });
            }
            const fieldFilter = [];
            fieldFilter.push({
                par: 'id',
                field: 'WellnessEvent.id',
                mode: 'andWhere',
                mode2: 'equal',
            });
            fieldFilter.push({
                par: 'status',
                field: 'WellnessEvent.status',
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
                    const fieldSrc = ['WellnessEvent.name'];
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
            yield data.orderBy('WellnessEvent.created_at', 'DESC');
            const count = yield data.getCount();
            if (query.limit != -1) {
                yield data.take(defaultLimit).skip(offset);
            }
            const result = yield data.getMany();
            const response = (0, class_transformer_1.plainToInstance)(WellnessEvent_Dto_1.WellnessEventResponseDto, result);
            return { data: response, count: count };
        });
    }
    save(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.WellnessEventService.save(body);
            const response = (0, class_transformer_1.plainToInstance)(WellnessEvent_Dto_1.WellnessEventResponseDto, data);
            return { data: response };
        });
    }
    update(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield this.WellnessEventService.update(id, body);
            const response = (0, class_transformer_1.plainToInstance)(WellnessEvent_Dto_1.WellnessEventResponseDto, query);
            return { data: response };
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield this.WellnessEventService.delete(id);
            return { data: query };
        });
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, UserInfo_Decorator_1.UserInfo)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, WellnessEvent_Dto_1.WellnessEventQueryDto]),
    __metadata("design:returntype", Promise)
], WellnessEventController.prototype, "index", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [WellnessEvent_Dto_1.WellnessEventRequestDto]),
    __metadata("design:returntype", Promise)
], WellnessEventController.prototype, "save", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, WellnessEvent_Dto_1.WellnessEventPutDto]),
    __metadata("design:returntype", Promise)
], WellnessEventController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], WellnessEventController.prototype, "delete", null);
WellnessEventController = __decorate([
    (0, swagger_1.ApiTags)('WellnessEvent'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('wellness-event'),
    __metadata("design:paramtypes", [WellnessEvent_Service_1.default])
], WellnessEventController);
exports.default = WellnessEventController;
//# sourceMappingURL=WellnessEvent.Controller.js.map