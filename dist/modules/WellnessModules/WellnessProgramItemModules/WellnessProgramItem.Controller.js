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
const WellnessProgramItem_Service_1 = require("./WellnessProgramItem.Service");
const WellnessProgramItem_Dto_1 = require("./WellnessProgramItem.Dto");
const class_transformer_1 = require("class-transformer");
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const UserInfo_Decorator_1 = require("../../../core/decorators/UserInfo.Decorator");
const Jwt_Config_1 = require("../../../config/Jwt.Config");
const WellnessItem_Entity_1 = require("../WellnessItemModules/WellnessItem.Entity");
let WellnessProgramItemController = class WellnessProgramItemController {
    constructor(WellnessProgramItemService) {
        this.WellnessProgramItemService = WellnessProgramItemService;
    }
    index(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const defaultLimit = query.limit || 5;
            const defaultPage = query.page || 1;
            const offset = (defaultPage - 1) * defaultLimit;
            const request = yield this.WellnessProgramItemService.getRepository().createQueryBuilder('WellnessProgramItem')
                .leftJoinAndMapOne('WellnessProgramItem.wellnessItem', WellnessItem_Entity_1.default, 'wellnessItem', 'WellnessProgramItem.wellness_item_id = wellnessItem.id');
            const fieldFilter = [];
            fieldFilter.push({
                par: 'id',
                field: 'WellnessProgramItem.id',
                mode: 'andWhere',
                mode2: 'equal',
            });
            fieldFilter.push({
                par: 'wellness_program_id',
                field: 'WellnessProgramItem.wellness_program_id',
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
                    const fieldSrc = ['WellnessProgramItem.name'];
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
            const count = yield request.getCount();
            const response = (0, class_transformer_1.plainToInstance)(WellnessProgramItem_Dto_1.WellnessProgramItemResponseDto, result);
            return { data: response, count: count };
        });
    }
    getItemTree(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const defaultLimit = query.limit || 5;
            const defaultPage = query.page || 1;
            const offset = (defaultPage - 1) * defaultLimit;
            const request = yield this.WellnessProgramItemService.getRepository().createQueryBuilder('WellnessProgramItem');
            const fieldFilter = [];
            fieldFilter.push({
                par: 'id',
                field: 'WellnessProgramItem.id',
                mode: 'andWhere',
                mode2: 'equal',
            });
            fieldFilter.push({
                par: 'wellness_program_id',
                field: 'WellnessProgramItem.wellness_program_id',
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
                    const fieldSrc = ['WellnessProgramItem.name'];
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
            const resultTree = yield this.WellnessProgramItemService.convertToTree(result);
            return { data: resultTree };
        });
    }
    save(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.WellnessProgramItemService.save(body);
            const response = (0, class_transformer_1.plainToInstance)(WellnessProgramItem_Dto_1.WellnessProgramItemResponseDto, data);
            return { data: response };
        });
    }
    update(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield this.WellnessProgramItemService.update(id, body);
            const response = (0, class_transformer_1.plainToInstance)(WellnessProgramItem_Dto_1.WellnessProgramItemResponseDto, query);
            return { data: response };
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield this.WellnessProgramItemService.delete(id);
            return { data: query };
        });
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [WellnessProgramItem_Dto_1.WellnessProgramItemQueryDto]),
    __metadata("design:returntype", Promise)
], WellnessProgramItemController.prototype, "index", null);
__decorate([
    (0, common_1.Get)('tree'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [WellnessProgramItem_Dto_1.WellnessProgramItemQueryDto]),
    __metadata("design:returntype", Promise)
], WellnessProgramItemController.prototype, "getItemTree", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [WellnessProgramItem_Dto_1.WellnessProgramItemRequestDto]),
    __metadata("design:returntype", Promise)
], WellnessProgramItemController.prototype, "save", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, WellnessProgramItem_Dto_1.WellnessProgramItemPutDto]),
    __metadata("design:returntype", Promise)
], WellnessProgramItemController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], WellnessProgramItemController.prototype, "delete", null);
WellnessProgramItemController = __decorate([
    (0, swagger_1.ApiTags)('WellnessProgramItem'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, Jwt_Config_1.PublicRoute)(),
    (0, common_1.Controller)('wellness-program-item'),
    __metadata("design:paramtypes", [WellnessProgramItem_Service_1.default])
], WellnessProgramItemController);
exports.default = WellnessProgramItemController;
//# sourceMappingURL=WellnessProgramItem.Controller.js.map