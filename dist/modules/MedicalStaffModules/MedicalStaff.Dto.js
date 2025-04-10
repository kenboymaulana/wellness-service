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
exports.CorproateQueryDto = exports.MedicalStaffResponseDto = exports.MedicalStaffPutDto = exports.MedicalStaffRequestDto = void 0;
const Dto_Base_1 = require("../../base/Dto.Base");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const validators_1 = require("../../utils/validators");
const WellnessEvent_Entity_1 = require("../WellnessModules/WellnessEventModules/WellnessEvent.Entity");
class MedicalStaffRequestDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'nik',
    }),
    (0, validators_1.isUnique)({ tableName: 'medical_staff', column: 'nik' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MedicalStaffRequestDto.prototype, "nik", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'name',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MedicalStaffRequestDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'dob',
    }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], MedicalStaffRequestDto.prototype, "dob", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'gender',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MedicalStaffRequestDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'email',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MedicalStaffRequestDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'phone',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MedicalStaffRequestDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'no_str',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MedicalStaffRequestDto.prototype, "no_str", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'no_sip',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MedicalStaffRequestDto.prototype, "no_sip", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'staff_type',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MedicalStaffRequestDto.prototype, "staff_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'doctor_type',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MedicalStaffRequestDto.prototype, "doctor_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'poly_practice',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MedicalStaffRequestDto.prototype, "poly_practice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'number',
        name: 'status_active',
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], MedicalStaffRequestDto.prototype, "status_active", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'sign_image',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MedicalStaffRequestDto.prototype, "sign_image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'address',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MedicalStaffRequestDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", WellnessEvent_Entity_1.default)
], MedicalStaffRequestDto.prototype, "wellnessEvent", void 0);
exports.MedicalStaffRequestDto = MedicalStaffRequestDto;
class MedicalStaffPutDto {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MedicalStaffPutDto.prototype, "nik", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MedicalStaffPutDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Date)
], MedicalStaffPutDto.prototype, "dob", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MedicalStaffPutDto.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MedicalStaffPutDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MedicalStaffPutDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MedicalStaffPutDto.prototype, "no_str", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MedicalStaffPutDto.prototype, "no_sip", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MedicalStaffPutDto.prototype, "staff_type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MedicalStaffPutDto.prototype, "doctor_type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MedicalStaffPutDto.prototype, "poly_practice", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], MedicalStaffPutDto.prototype, "status_active", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MedicalStaffPutDto.prototype, "sign_image", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MedicalStaffPutDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], MedicalStaffPutDto.prototype, "is_main", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], MedicalStaffPutDto.prototype, "is_verified", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", WellnessEvent_Entity_1.default)
], MedicalStaffPutDto.prototype, "wellnessEvent", void 0);
exports.MedicalStaffPutDto = MedicalStaffPutDto;
let MedicalStaffResponseDto = class MedicalStaffResponseDto {
};
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], MedicalStaffResponseDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], MedicalStaffResponseDto.prototype, "nik", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], MedicalStaffResponseDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], MedicalStaffResponseDto.prototype, "dob", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], MedicalStaffResponseDto.prototype, "gender", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], MedicalStaffResponseDto.prototype, "phone", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], MedicalStaffResponseDto.prototype, "email", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], MedicalStaffResponseDto.prototype, "no_str", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], MedicalStaffResponseDto.prototype, "no_sip", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], MedicalStaffResponseDto.prototype, "address", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], MedicalStaffResponseDto.prototype, "staff_type", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], MedicalStaffResponseDto.prototype, "doctor_type", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], MedicalStaffResponseDto.prototype, "poly_practice", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], MedicalStaffResponseDto.prototype, "status_active", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], MedicalStaffResponseDto.prototype, "sign_image", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], MedicalStaffResponseDto.prototype, "users", void 0);
MedicalStaffResponseDto = __decorate([
    (0, class_transformer_1.Exclude)()
], MedicalStaffResponseDto);
exports.MedicalStaffResponseDto = MedicalStaffResponseDto;
class CorproateQueryDto extends Dto_Base_1.PaginationQuery {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'number',
        name: 'id',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Number)
], CorproateQueryDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'users',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CorproateQueryDto.prototype, "users", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'src',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CorproateQueryDto.prototype, "src", void 0);
exports.CorproateQueryDto = CorproateQueryDto;
//# sourceMappingURL=MedicalStaff.Dto.js.map