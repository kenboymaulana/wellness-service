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
const WellnessEvent_Entity_1 = require("../WellnessEventModules/WellnessEvent.Entity");
const Employee_Entity_1 = require("../../EmployeeModules/Employee.Entity");
const WellnessEventMemberResult_Entity_1 = require("../WellnessEventMemberResultModules/WellnessEventMemberResult.Entity");
let WellnessEventMember = class WellnessEventMember extends Entity_Base_1.BaseEntityUuid {
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], WellnessEventMember.prototype, "wellness_event_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], WellnessEventMember.prototype, "employee_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], WellnessEventMember.prototype, "nik", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WellnessEventMember.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', default: null }),
    __metadata("design:type", Date)
], WellnessEventMember.prototype, "dob", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WellnessEventMember.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WellnessEventMember.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WellnessEventMember.prototype, "division", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WellnessEventMember.prototype, "position", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WellnessEventMember.prototype, "work", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WellnessEventMember.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => WellnessEvent_Entity_1.default, (wellnessEvent) => wellnessEvent.wellnessEventMember),
    (0, typeorm_1.JoinColumn)({ name: 'wellness_event_id' }),
    __metadata("design:type", WellnessEvent_Entity_1.default)
], WellnessEventMember.prototype, "wellnessEvent", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => WellnessEventMemberResult_Entity_1.default, (par) => par.wellnessEventMember),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", WellnessEventMemberResult_Entity_1.default)
], WellnessEventMember.prototype, "wellnessEventMemberResult", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Employee_Entity_1.default, (employee) => employee.wellnessEventMember),
    (0, typeorm_1.JoinColumn)({ name: 'employee_id' }),
    __metadata("design:type", Employee_Entity_1.default)
], WellnessEventMember.prototype, "employee", void 0);
WellnessEventMember = __decorate([
    (0, typeorm_1.Entity)('wellness_event_member')
], WellnessEventMember);
exports.default = WellnessEventMember;
//# sourceMappingURL=WellnessEventMember.Entity.js.map