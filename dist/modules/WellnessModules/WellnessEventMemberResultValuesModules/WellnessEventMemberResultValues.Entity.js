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
let WellnessEventMemberResultValues = class WellnessEventMemberResultValues extends Entity_Base_1.BaseEntityUuid {
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], WellnessEventMemberResultValues.prototype, "wellness_event_member_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WellnessEventMemberResultValues.prototype, "item_code", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WellnessEventMemberResultValues.prototype, "item_value", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], WellnessEventMemberResultValues.prototype, "time_input", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], WellnessEventMemberResultValues.prototype, "date", void 0);
WellnessEventMemberResultValues = __decorate([
    (0, typeorm_1.Entity)('wellness_event_member_result_values')
], WellnessEventMemberResultValues);
exports.default = WellnessEventMemberResultValues;
//# sourceMappingURL=WellnessEventMemberResultValues.Entity.js.map