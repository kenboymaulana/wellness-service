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
exports.WellnessEventMemberQueryDto = exports.WellnessEventMemberResponseDto = exports.WellnessEventMemberPutDto = exports.WellnessEventMemberRequestDto = void 0;
const Dto_Base_1 = require("../../../base/Dto.Base");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const WellnessEvent_Entity_1 = require("../WellnessEventModules/WellnessEvent.Entity");
const Employee_Entity_1 = require("../../EmployeeModules/Employee.Entity");
const validators_1 = require("../../../utils/validators");
const WellnessEventMemberResult_Entity_1 = require("../WellnessEventMemberResultModules/WellnessEventMemberResult.Entity");
class WellnessEventMemberRequestDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: 'string',
        name: 'create_employee',
    }),
    __metadata("design:type", String)
], WellnessEventMemberRequestDto.prototype, "create_employee", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: 'number',
        name: 'wellness_event_id',
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], WellnessEventMemberRequestDto.prototype, "wellness_event_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'number',
        name: 'employee_id',
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], WellnessEventMemberRequestDto.prototype, "employee_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'nik',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WellnessEventMemberRequestDto.prototype, "nik", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'name',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WellnessEventMemberRequestDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'dob',
    }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], WellnessEventMemberRequestDto.prototype, "dob", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'gender',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WellnessEventMemberRequestDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'phone',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WellnessEventMemberRequestDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'division',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WellnessEventMemberRequestDto.prototype, "division", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'position',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WellnessEventMemberRequestDto.prototype, "position", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'work',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WellnessEventMemberRequestDto.prototype, "work", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'address',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WellnessEventMemberRequestDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'number',
        name: 'role_id',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], WellnessEventMemberRequestDto.prototype, "role_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", WellnessEvent_Entity_1.default)
], WellnessEventMemberRequestDto.prototype, "wellnessEvent", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", WellnessEventMemberResult_Entity_1.default)
], WellnessEventMemberRequestDto.prototype, "wellnessEventMemberResult", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Employee_Entity_1.default)
], WellnessEventMemberRequestDto.prototype, "employee", void 0);
exports.WellnessEventMemberRequestDto = WellnessEventMemberRequestDto;
class WellnessEventMemberPutDto {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], WellnessEventMemberPutDto.prototype, "wellness_event_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], WellnessEventMemberPutDto.prototype, "employee_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WellnessEventMemberPutDto.prototype, "nik", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WellnessEventMemberPutDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Date)
], WellnessEventMemberPutDto.prototype, "dob", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WellnessEventMemberPutDto.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WellnessEventMemberPutDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WellnessEventMemberPutDto.prototype, "division", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WellnessEventMemberPutDto.prototype, "position", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WellnessEventMemberPutDto.prototype, "work", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WellnessEventMemberPutDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Number)
], WellnessEventMemberPutDto.prototype, "role_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], WellnessEventMemberPutDto.prototype, "is_main", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], WellnessEventMemberPutDto.prototype, "is_verified", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", WellnessEvent_Entity_1.default)
], WellnessEventMemberPutDto.prototype, "wellnessEvent", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", WellnessEventMemberResult_Entity_1.default)
], WellnessEventMemberPutDto.prototype, "wellnessEventMemberResult", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Employee_Entity_1.default)
], WellnessEventMemberPutDto.prototype, "employee", void 0);
exports.WellnessEventMemberPutDto = WellnessEventMemberPutDto;
let WellnessEventMemberResponseDto = class WellnessEventMemberResponseDto {
};
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], WellnessEventMemberResponseDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], WellnessEventMemberResponseDto.prototype, "wellness_event_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], WellnessEventMemberResponseDto.prototype, "employee_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], WellnessEventMemberResponseDto.prototype, "nik", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], WellnessEventMemberResponseDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], WellnessEventMemberResponseDto.prototype, "dob", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], WellnessEventMemberResponseDto.prototype, "gender", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], WellnessEventMemberResponseDto.prototype, "phone", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], WellnessEventMemberResponseDto.prototype, "division", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], WellnessEventMemberResponseDto.prototype, "position", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], WellnessEventMemberResponseDto.prototype, "work", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], WellnessEventMemberResponseDto.prototype, "address", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Employee_Entity_1.default)
], WellnessEventMemberResponseDto.prototype, "employee", void 0);
WellnessEventMemberResponseDto = __decorate([
    (0, class_transformer_1.Exclude)()
], WellnessEventMemberResponseDto);
exports.WellnessEventMemberResponseDto = WellnessEventMemberResponseDto;
class WellnessEventMemberQueryDto extends Dto_Base_1.PaginationQuery {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'id',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WellnessEventMemberQueryDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'number',
        name: 'wellness_event_id',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Number)
], WellnessEventMemberQueryDto.prototype, "wellness_event_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'wellness_event_id',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WellnessEventMemberQueryDto.prototype, "nik", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'users',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WellnessEventMemberQueryDto.prototype, "users", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'src',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WellnessEventMemberQueryDto.prototype, "src", void 0);
exports.WellnessEventMemberQueryDto = WellnessEventMemberQueryDto;
//# sourceMappingURL=WellnessEventMember.Dto.js.map