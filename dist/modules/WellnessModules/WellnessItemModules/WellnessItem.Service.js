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
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const WellnessItem_Entity_1 = require("./WellnessItem.Entity");
const Service_Base_1 = require("../../../base/Service.Base");
let ModulesService = class ModulesService extends Service_Base_1.default {
    constructor(ModulesRepository) {
        super(ModulesRepository);
        this.ModulesRepository = ModulesRepository;
    }
    convertToTree(data, parent = null, level = 0, loop = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultNew = [];
            data.forEach((el) => __awaiter(this, void 0, void 0, function* () {
                const arr = el;
                if ((loop == 0 && level == el.level) || (loop != 0 && el.parent_id == parent && el.id != parent)) {
                    const newLevel = level + 1;
                    arr.children = yield this.convertToTree(data, el.id, newLevel, 1);
                    resultNew.push(arr);
                }
            }));
            return resultNew;
        });
    }
};
ModulesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(WellnessItem_Entity_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ModulesService);
exports.default = ModulesService;
//# sourceMappingURL=WellnessItem.Service.js.map