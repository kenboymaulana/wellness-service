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
const WellnessPrograms_Service_1 = require("./WellnessPrograms.Service");
const WellnessProgramItem_Service_1 = require("../WellnessProgramItemModules/WellnessProgramItem.Service");
const WellnessPrograms_Dto_1 = require("./WellnessPrograms.Dto");
const class_transformer_1 = require("class-transformer");
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const UserInfo_Decorator_1 = require("../../../core/decorators/UserInfo.Decorator");
const Jwt_Config_1 = require("../../../config/Jwt.Config");
let WellnessProgramsController = class WellnessProgramsController {
    constructor(WellnessProgramsService, wellnessProgramItemService) {
        this.WellnessProgramsService = WellnessProgramsService;
        this.wellnessProgramItemService = wellnessProgramItemService;
    }
    index(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const defaultLimit = query.limit || 5;
            const defaultPage = query.page || 1;
            const offset = (defaultPage - 1) * defaultLimit;
            const data = yield this.WellnessProgramsService.getRepository().createQueryBuilder('WellnessPrograms');
            const fieldFilter = [];
            fieldFilter.push({
                par: 'id',
                field: 'WellnessPrograms.id',
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
                    const fieldSrc = ['WellnessPrograms.name'];
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
            const response = (0, class_transformer_1.plainToInstance)(WellnessPrograms_Dto_1.WellnessProgramsResponseDto, result);
            return { data: response, count: count };
        });
    }
    save(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.WellnessProgramsService.save(body);
            const response = (0, class_transformer_1.plainToInstance)(WellnessPrograms_Dto_1.WellnessProgramsResponseDto, data);
            return { data: response };
        });
    }
    update(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield this.WellnessProgramsService.update(id, body);
            const response = (0, class_transformer_1.plainToInstance)(WellnessPrograms_Dto_1.WellnessProgramsResponseDto, query);
            return { data: response };
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield this.WellnessProgramsService.delete(id);
            return { data: query };
        });
    }
    saveWnProgramItems(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = [];
            body.wellness_item_id.forEach(el => {
                const bodyData = {
                    wellness_program_id: body.wellness_program_id,
                    wellness_item_id: el,
                };
                data.push(bodyData);
            });
            yield this.wellnessProgramItemService.getRepository().delete({ wellness_program_id: body.wellness_program_id });
            let request;
            data.forEach((el) => __awaiter(this, void 0, void 0, function* () {
                request = yield this.wellnessProgramItemService.save(el);
            }));
            const response = (0, class_transformer_1.plainToInstance)(WellnessPrograms_Dto_1.WellnessProgramsResponseDto, request);
            return { data: response };
        });
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [WellnessPrograms_Dto_1.WellnessProgramsQueryDto]),
    __metadata("design:returntype", Promise)
], WellnessProgramsController.prototype, "index", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [WellnessPrograms_Dto_1.WellnessProgramsRequestDto]),
    __metadata("design:returntype", Promise)
], WellnessProgramsController.prototype, "save", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, WellnessPrograms_Dto_1.WellnessProgramsPutDto]),
    __metadata("design:returntype", Promise)
], WellnessProgramsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], WellnessProgramsController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)('items'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [WellnessPrograms_Dto_1.WellnessProgramsItemsRequestDto]),
    __metadata("design:returntype", Promise)
], WellnessProgramsController.prototype, "saveWnProgramItems", null);
WellnessProgramsController = __decorate([
    (0, swagger_1.ApiTags)('WellnessPrograms'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, Jwt_Config_1.PublicRoute)(),
    (0, common_1.Controller)('wellness-programs'),
    __metadata("design:paramtypes", [WellnessPrograms_Service_1.default,
        WellnessProgramItem_Service_1.default])
], WellnessProgramsController);
exports.default = WellnessProgramsController;
//# sourceMappingURL=WellnessPrograms.Controller.js.map