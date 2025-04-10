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
const User_Entity_1 = require("./User.Entity");
const User_Service_1 = require("./User.Service");
const User_Controller_1 = require("./User.Controller");
const CheckPermission_Module_1 = require("../../CheckPermission/CheckPermission.Module");
const IndRole_Module_1 = require("../../RoleModules/Role/IndRole.Module");
let UserModule = class UserModule {
};
UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([User_Entity_1.default]),
            CheckPermission_Module_1.default,
            IndRole_Module_1.default,
        ],
        controllers: [User_Controller_1.default],
        providers: [User_Service_1.default],
        exports: [User_Service_1.default],
    })
], UserModule);
exports.default = UserModule;
//# sourceMappingURL=User.Module.js.map