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
const WellnessEventMember_Entity_1 = require("../WellnessModules/WellnessEventMemberModules/WellnessEventMember.Entity");
const User_Entity_1 = require("../UserModules/User/User.Entity");
let Employee = class Employee extends Entity_Base_1.BaseEntityUuid {
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Employee.prototype, "perusahaan_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Employee.prototype, "nik", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Employee.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', default: null }),
    __metadata("design:type", Date)
], Employee.prototype, "dob", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Employee.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Employee.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Employee.prototype, "division", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Employee.prototype, "position", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Employee.prototype, "work", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Employee.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => WellnessEventMember_Entity_1.default, (wellnessEventMember) => wellnessEventMember.employee),
    __metadata("design:type", WellnessEventMember_Entity_1.default)
], Employee.prototype, "wellnessEventMember", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => User_Entity_1.default, (el) => el.employees),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Employee.prototype, "users", void 0);
Employee = __decorate([
    (0, typeorm_1.Entity)('employee')
], Employee);
exports.default = Employee;
//# sourceMappingURL=Employee.Entity.js.map