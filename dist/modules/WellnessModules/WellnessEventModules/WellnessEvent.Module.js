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
const WellnessEvent_Entity_1 = require("./WellnessEvent.Entity");
const WellnessEvent_Service_1 = require("./WellnessEvent.Service");
const WellnessEvent_Controller_1 = require("./WellnessEvent.Controller");
let EmployeeModule = class EmployeeModule {
};
EmployeeModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([WellnessEvent_Entity_1.default])],
        controllers: [WellnessEvent_Controller_1.default],
        providers: [WellnessEvent_Service_1.default],
        exports: [WellnessEvent_Service_1.default],
    })
], EmployeeModule);
exports.default = EmployeeModule;
//# sourceMappingURL=WellnessEvent.Module.js.map