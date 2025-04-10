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
const WellnessEventMemberEvaluate_Entity_1 = require("./WellnessEventMemberEvaluate.Entity");
const WellnessEventMemberEvaluate_Service_1 = require("./WellnessEventMemberEvaluate.Service");
const WellnessEventMemberEvaluate_Controller_1 = require("./WellnessEventMemberEvaluate.Controller");
const Employee_Module_1 = require("../../EmployeeModules/Employee.Module");
const User_Module_1 = require("../../UserModules/User/User.Module");
const Role_Module_1 = require("../../RoleModules/Role/Role.Module");
let WellnessEventMemberEvaluateModule = class WellnessEventMemberEvaluateModule {
};
WellnessEventMemberEvaluateModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([WellnessEventMemberEvaluate_Entity_1.default]), Employee_Module_1.default, User_Module_1.default, Role_Module_1.default],
        controllers: [WellnessEventMemberEvaluate_Controller_1.default],
        providers: [WellnessEventMemberEvaluate_Service_1.default],
        exports: [WellnessEventMemberEvaluate_Service_1.default],
    })
], WellnessEventMemberEvaluateModule);
exports.default = WellnessEventMemberEvaluateModule;
//# sourceMappingURL=WellnessEventMemberEvaluate.Module.js.map