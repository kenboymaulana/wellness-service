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
const IndRole_Service_1 = require("./IndRole.Service");
const Role_Entity_1 = require("./Role.Entity");
let IndRoleModule = class IndRoleModule {
};
IndRoleModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([Role_Entity_1.default])],
        providers: [IndRole_Service_1.default],
        exports: [IndRole_Service_1.default],
    })
], IndRoleModule);
exports.default = IndRoleModule;
//# sourceMappingURL=IndRole.Module.js.map