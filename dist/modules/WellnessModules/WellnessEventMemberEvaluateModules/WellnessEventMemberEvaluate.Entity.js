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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Entity_Base_1 = require("../../../base/Entity.Base");
const WellnessEventMember_Entity_1 = require("../WellnessEventMemberModules/WellnessEventMember.Entity");
let WellnessEventMemberEvaluate = class WellnessEventMemberEvaluate extends Entity_Base_1.BaseEntityUuid {
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], WellnessEventMemberEvaluate.prototype, "wellness_event_member_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WellnessEventMemberEvaluate.prototype, "keluhan_saat_ini", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WellnessEventMemberEvaluate.prototype, "tingkat_keberhasilan", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WellnessEventMemberEvaluate.prototype, "motivasi", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WellnessEventMemberEvaluate.prototype, "evaluasi", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => WellnessEventMember_Entity_1.default, (wellnessEventMember) => wellnessEventMember.wellnessEventMemberResult),
    (0, typeorm_1.JoinColumn)({ name: 'wellness_event_member_id' }),
    __metadata("design:type", WellnessEventMember_Entity_1.default)
], WellnessEventMemberEvaluate.prototype, "wellnessEventMember", void 0);
WellnessEventMemberEvaluate = __decorate([
    (0, typeorm_1.Entity)('wellness_event_member_evaluate')
], WellnessEventMemberEvaluate);
exports.default = WellnessEventMemberEvaluate;
//# sourceMappingURL=WellnessEventMemberEvaluate.Entity.js.map