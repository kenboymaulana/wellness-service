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
const Permission_Module_1 = require("../Permission/Permission.Module");
const Role_Controller_1 = require("./Role.Controller");
const Role_Entity_1 = require("./Role.Entity");
const Role_Service_1 = require("./Role.Service");
let RoleModule = class RoleModule {
};
RoleModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([Role_Entity_1.default]),
            CheckPermission_Module_1.default,
            Permission_Module_1.default,
        ],
        controllers: [Role_Controller_1.default],
        providers: [Role_Service_1.default],
        exports: [Role_Service_1.default],
    })
], RoleModule);
exports.default = RoleModule;
//# sourceMappingURL=Role.Module.js.map