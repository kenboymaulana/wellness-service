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
const Entity_Base_1 = require("../../base/Entity.Base");
const WellnessEvent_Entity_1 = require("../WellnessModules/WellnessEventModules/WellnessEvent.Entity");
const User_Entity_1 = require("../UserModules/User/User.Entity");
let MedicalStaff = class MedicalStaff extends Entity_Base_1.BaseEntityUuid {
};
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], MedicalStaff.prototype, "nik", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MedicalStaff.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', default: null }),
    __metadata("design:type", Date)
], MedicalStaff.prototype, "dob", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MedicalStaff.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MedicalStaff.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MedicalStaff.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MedicalStaff.prototype, "no_str", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MedicalStaff.prototype, "no_sip", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MedicalStaff.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MedicalStaff.prototype, "staff_type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MedicalStaff.prototype, "doctor_type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MedicalStaff.prototype, "poly_practice", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 1 }),
    __metadata("design:type", Number)
], MedicalStaff.prototype, "status_active", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MedicalStaff.prototype, "sign_image", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => WellnessEvent_Entity_1.default, (wellnessEvent) => wellnessEvent.medicalStaff),
    __metadata("design:type", WellnessEvent_Entity_1.default)
], MedicalStaff.prototype, "wellnessEvent", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => User_Entity_1.default, (el) => el.medicalStaffs),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], MedicalStaff.prototype, "users", void 0);
MedicalStaff = __decorate([
    (0, typeorm_1.Entity)('medical_staff')
], MedicalStaff);
exports.default = MedicalStaff;
//# sourceMappingURL=MedicalStaff.Entity.js.map