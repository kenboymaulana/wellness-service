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
const MedicalStaff_Entity_1 = require("../../MedicalStaffModules/MedicalStaff.Entity");
let WellnessEvent = class WellnessEvent extends Entity_Base_1.BaseEntityUuid {
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], WellnessEvent.prototype, "medical_staff_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WellnessEvent.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WellnessEvent.prototype, "model_code", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], WellnessEvent.prototype, "start_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], WellnessEvent.prototype, "end_date", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WellnessEvent.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WellnessEvent.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '0' }),
    __metadata("design:type", String)
], WellnessEvent.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => WellnessEventMember_Entity_1.default, (wellnessEventMember) => wellnessEventMember.wellnessEvent),
    __metadata("design:type", WellnessEventMember_Entity_1.default)
], WellnessEvent.prototype, "wellnessEventMember", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => MedicalStaff_Entity_1.default, (medicalStaff) => medicalStaff.wellnessEvent),
    (0, typeorm_1.JoinColumn)({ name: 'medical_staff_id' }),
    __metadata("design:type", MedicalStaff_Entity_1.default)
], WellnessEvent.prototype, "medicalStaff", void 0);
WellnessEvent = __decorate([
    (0, typeorm_1.Entity)('wellness_event')
], WellnessEvent);
exports.default = WellnessEvent;
//# sourceMappingURL=WellnessEvent.Entity.js.map