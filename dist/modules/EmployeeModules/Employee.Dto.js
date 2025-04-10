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
exports.CorproateQueryDto = exports.EmployeeResponseDto = exports.EmployeePutDto = exports.EmployeeRequestDto = void 0;
const Dto_Base_1 = require("../../base/Dto.Base");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const validators_1 = require("../../utils/validators");
const WellnessEventMember_Entity_1 = require("../WellnessModules/WellnessEventMemberModules/WellnessEventMember.Entity");
class EmployeeRequestDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: 'number',
        name: 'perusahaan_id',
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], EmployeeRequestDto.prototype, "perusahaan_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'nik',
    }),
    (0, validators_1.isUnique)({ tableName: 'employee', column: 'nik' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EmployeeRequestDto.prototype, "nik", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'name',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EmployeeRequestDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'dob',
    }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], EmployeeRequestDto.prototype, "dob", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'gender',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EmployeeRequestDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'phone',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EmployeeRequestDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'division',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EmployeeRequestDto.prototype, "division", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'position',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EmployeeRequestDto.prototype, "position", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'work',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EmployeeRequestDto.prototype, "work", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'address',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EmployeeRequestDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", WellnessEventMember_Entity_1.default)
], EmployeeRequestDto.prototype, "wellnessEventMember", void 0);
exports.EmployeeRequestDto = EmployeeRequestDto;
class EmployeePutDto {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], EmployeePutDto.prototype, "perusahaan_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EmployeePutDto.prototype, "nik", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EmployeePutDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Date)
], EmployeePutDto.prototype, "dob", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EmployeePutDto.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EmployeePutDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EmployeePutDto.prototype, "division", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EmployeePutDto.prototype, "position", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EmployeePutDto.prototype, "work", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EmployeePutDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", WellnessEventMember_Entity_1.default)
], EmployeePutDto.prototype, "wellnessEventMember", void 0);
exports.EmployeePutDto = EmployeePutDto;
let EmployeeResponseDto = class EmployeeResponseDto {
};
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], EmployeeResponseDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], EmployeeResponseDto.prototype, "perusahaan_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "nik", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], EmployeeResponseDto.prototype, "dob", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "gender", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "phone", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "division", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "position", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "work", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "address", void 0);
EmployeeResponseDto = __decorate([
    (0, class_transformer_1.Exclude)()
], EmployeeResponseDto);
exports.EmployeeResponseDto = EmployeeResponseDto;
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
        type: 'number',
        name: 'perusahaan_id',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Number)
], CorproateQueryDto.prototype, "perusahaan_id", void 0);
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
//# sourceMappingURL=Employee.Dto.js.map