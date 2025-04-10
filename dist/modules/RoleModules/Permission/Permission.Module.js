"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const CheckPermission_Module_1 = require("../../CheckPermission/CheckPermission.Module");
const User_Module_1 = require("../../UserModules/User/User.Module");
const Permission_Controller_1 = require("./Permission.Controller");
const Permission_Entity_1 = require("./Permission.Entity");
const Permission_Service_1 = require("./Permission.Service");
const PermissionGroup_Module_1 = require("../PermissionGroup/PermissionGroup.Module");
let PermissionModule = class PermissionModule {
};
PermissionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([Permission_Entity_1.default]),
            User_Module_1.default,
            PermissionGroup_Module_1.default,
            CheckPermission_Module_1.default,
        ],
        controllers: [Permission_Controller_1.default],
        providers: [Permission_Service_1.default],
        exports: [Permission_Service_1.default],
    })
], PermissionModule);
exports.default = PermissionModule;
//# sourceMappingURL=Permission.Module.js.map