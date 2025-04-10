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
const typeorm_1 = require("typeorm");
let BaseService = class BaseService {
    constructor(repository) {
        this.repository = repository;
    }
    getRepository() {
        return this.repository;
    }
    getAllAndCount(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            const [data, count] = yield this.repository.findAndCount(opts);
            return { data: data, count: count };
        });
    }
    getAll(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.find(opts);
        });
    }
    getOne(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.findOne(opts);
        });
    }
    getOneBy(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.findOneBy(opts);
        });
    }
    getOneById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getOneBy({
                id: id,
            });
        });
    }
    getCount(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.count(opts);
        });
    }
    save(entities) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.save(entities);
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.update(id, data);
            return this.getOneById(id);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.softDelete(id);
        });
    }
    checkExist(conditions) {
        return __awaiter(this, void 0, void 0, function* () {
            return !!(yield this.repository.countBy(conditions));
        });
    }
    checkIdExist(id, additional) {
        return __awaiter(this, void 0, void 0, function* () {
            return !!(yield this.repository.countBy(Object.assign({ id: id }, additional)));
        });
    }
};
BaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], BaseService);
exports.default = BaseService;
//# sourceMappingURL=Service.Base.js.map