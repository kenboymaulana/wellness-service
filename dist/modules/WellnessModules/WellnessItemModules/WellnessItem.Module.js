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
const WellnessItem_Entity_1 = require("./WellnessItem.Entity");
const WellnessItem_Service_1 = require("./WellnessItem.Service");
const WellnessItem_Controller_1 = require("./WellnessItem.Controller");
let ModulesModule = class ModulesModule {
};
ModulesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([WellnessItem_Entity_1.default])],
        controllers: [WellnessItem_Controller_1.default],
        providers: [WellnessItem_Service_1.default],
        exports: [WellnessItem_Service_1.default],
    })
], ModulesModule);
exports.default = ModulesModule;
//# sourceMappingURL=WellnessItem.Module.js.map