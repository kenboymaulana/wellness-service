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
let WellnessEventMemberResult = class WellnessEventMemberResult extends Entity_Base_1.BaseEntityUuid {
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], WellnessEventMemberResult.prototype, "wellness_event_member_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WellnessEventMemberResult.prototype, "main_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WellnessEventMemberResult.prototype, "parent_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], WellnessEventMemberResult.prototype, "level", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], WellnessEventMemberResult.prototype, "sort", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], WellnessEventMemberResult.prototype, "header", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WellnessEventMemberResult.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WellnessEventMemberResult.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WellnessEventMemberResult.prototype, "name_eng", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WellnessEventMemberResult.prototype, "desc", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => WellnessEventMember_Entity_1.default, (wellnessEventMember) => wellnessEventMember.wellnessEventMemberResult),
    (0, typeorm_1.JoinColumn)({ name: 'wellness_event_member_id' }),
    __metadata("design:type", WellnessEventMember_Entity_1.default)
], WellnessEventMemberResult.prototype, "wellnessEventMember", void 0);
WellnessEventMemberResult = __decorate([
    (0, typeorm_1.Entity)('wellness_event_member_result')
], WellnessEventMemberResult);
exports.default = WellnessEventMemberResult;
//# sourceMappingURL=WellnessEventMemberResult.Entity.js.map