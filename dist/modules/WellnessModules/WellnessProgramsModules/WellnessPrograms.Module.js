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
const WellnessPrograms_Entity_1 = require("./WellnessPrograms.Entity");
const WellnessPrograms_Service_1 = require("./WellnessPrograms.Service");
const WellnessProgramItem_Module_1 = require("../WellnessProgramItemModules/WellnessProgramItem.Module");
const WellnessPrograms_Controller_1 = require("./WellnessPrograms.Controller");
let ModulesModule = class ModulesModule {
};
ModulesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([WellnessPrograms_Entity_1.default]), WellnessProgramItem_Module_1.default],
        controllers: [WellnessPrograms_Controller_1.default],
        providers: [WellnessPrograms_Service_1.default],
        exports: [WellnessPrograms_Service_1.default],
    })
], ModulesModule);
exports.default = ModulesModule;
//# sourceMappingURL=WellnessPrograms.Module.js.map