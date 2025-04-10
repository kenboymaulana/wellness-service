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
const WellnessEventMember_Entity_1 = require("./WellnessEventMember.Entity");
const WellnessEventMember_Service_1 = require("./WellnessEventMember.Service");
const WellnessEventMember_Controller_1 = require("./WellnessEventMember.Controller");
const Employee_Module_1 = require("../../EmployeeModules/Employee.Module");
const User_Module_1 = require("../../UserModules/User/User.Module");
const Role_Module_1 = require("../../RoleModules/Role/Role.Module");
const WellnessItem_Module_1 = require("../WellnessItemModules/WellnessItem.Module");
const WellnessEventMemberResult_Module_1 = require("../WellnessEventMemberResultModules/WellnessEventMemberResult.Module");
const WellnessEventMemberResultValues_Module_1 = require("../WellnessEventMemberResultValuesModules/WellnessEventMemberResultValues.Module");
let WellnessEventMemberModule = class WellnessEventMemberModule {
};
WellnessEventMemberModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([WellnessEventMember_Entity_1.default]), Employee_Module_1.default, User_Module_1.default, Role_Module_1.default, WellnessItem_Module_1.default, WellnessEventMemberResult_Module_1.default, WellnessEventMemberResultValues_Module_1.default],
        controllers: [WellnessEventMember_Controller_1.default],
        providers: [WellnessEventMember_Service_1.default],
        exports: [WellnessEventMember_Service_1.default],
    })
], WellnessEventMemberModule);
exports.default = WellnessEventMemberModule;
//# sourceMappingURL=WellnessEventMember.Module.js.map