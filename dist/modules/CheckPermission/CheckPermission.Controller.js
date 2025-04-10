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
const swagger_1 = require("@nestjs/swagger");
const UserInfo_Decorator_1 = require("../../core/decorators/UserInfo.Decorator");
const CheckPermission_Dto_1 = require("./CheckPermission.Dto");
const CheckPermission_Service_1 = require("./CheckPermission.Service");
let CheckPermissionController = class CheckPermissionController {
    constructor(checkPermissionService) {
        this.checkPermissionService = checkPermissionService;
    }
    save(body, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.checkPermissionService.checkPermission(body.permission, user.user.id);
            return { data: data };
        });
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, UserInfo_Decorator_1.UserInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CheckPermission_Dto_1.CheckPermissionRequestDto, Object]),
    __metadata("design:returntype", Promise)
], CheckPermissionController.prototype, "save", null);
CheckPermissionController = __decorate([
    (0, swagger_1.ApiTags)('Check Permission'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('check-permission'),
    __metadata("design:paramtypes", [CheckPermission_Service_1.default])
], CheckPermissionController);
exports.default = CheckPermissionController;
//# sourceMappingURL=CheckPermission.Controller.js.map