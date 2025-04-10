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
exports.WellnessEventMemberResultQueryDto = exports.WellnessEventMemberResultResponseDto = exports.WellnessEventMemberResultPutDto = exports.WellnessEventMemberResultRequestDto = void 0;
const Dto_Base_1 = require("../../../base/Dto.Base");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const Employee_Entity_1 = require("../../EmployeeModules/Employee.Entity");
const validators_1 = require("../../../utils/validators");
const WellnessEventMember_Entity_1 = require("../WellnessEventMemberModules/WellnessEventMember.Entity");
class WellnessEventMemberResultRequestDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: 'number',
        name: 'wellness_event_member_id',
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], WellnessEventMemberResultRequestDto.prototype, "wellness_event_member_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: 'string',
        name: 'main_id',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], WellnessEventMemberResultRequestDto.prototype, "main_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: 'string',
        name: 'parent_id',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], WellnessEventMemberResultRequestDto.prototype, "parent_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: 'number',
        name: 'level',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], WellnessEventMemberResultRequestDto.prototype, "level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: 'number',
        name: 'sort',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], WellnessEventMemberResultRequestDto.prototype, "sort", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: 'number',
        name: 'header',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], WellnessEventMemberResultRequestDto.prototype, "header", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: 'string',
        name: 'code',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WellnessEventMemberResultRequestDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: 'string',
        name: 'name',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WellnessEventMemberResultRequestDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: 'string',
        name: 'name_eng',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], WellnessEventMemberResultRequestDto.prototype, "name_eng", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: 'string',
        name: 'desc',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], WellnessEventMemberResultRequestDto.prototype, "desc", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: 'string',
        name: 'result',
    }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], WellnessEventMemberResultRequestDto.prototype, "result", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", WellnessEventMember_Entity_1.default)
], WellnessEventMemberResultRequestDto.prototype, "wellnessEventMember", void 0);
exports.WellnessEventMemberResultRequestDto = WellnessEventMemberResultRequestDto;
class WellnessEventMemberResultPutDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'number',
        name: 'wellness_event_member_id',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], WellnessEventMemberResultPutDto.prototype, "wellness_event_member_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WellnessEventMemberResultPutDto.prototype, "main_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WellnessEventMemberResultPutDto.prototype, "parent_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], WellnessEventMemberResultPutDto.prototype, "level", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], WellnessEventMemberResultPutDto.prototype, "sort", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], WellnessEventMemberResultPutDto.prototype, "header", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WellnessEventMemberResultPutDto.prototype, "code", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WellnessEventMemberResultPutDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WellnessEventMemberResultPutDto.prototype, "name_eng", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WellnessEventMemberResultPutDto.prototype, "desc", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", WellnessEventMember_Entity_1.default)
], WellnessEventMemberResultPutDto.prototype, "wellnessEventMember", void 0);
exports.WellnessEventMemberResultPutDto = WellnessEventMemberResultPutDto;
let WellnessEventMemberResultResponseDto = class WellnessEventMemberResultResponseDto {
};
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], WellnessEventMemberResultResponseDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], WellnessEventMemberResultResponseDto.prototype, "wellness_event_member_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], WellnessEventMemberResultResponseDto.prototype, "main_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], WellnessEventMemberResultResponseDto.prototype, "parent_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], WellnessEventMemberResultResponseDto.prototype, "level", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], WellnessEventMemberResultResponseDto.prototype, "sort", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], WellnessEventMemberResultResponseDto.prototype, "header", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], WellnessEventMemberResultResponseDto.prototype, "code", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], WellnessEventMemberResultResponseDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], WellnessEventMemberResultResponseDto.prototype, "name_eng", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], WellnessEventMemberResultResponseDto.prototype, "desc", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", WellnessEventMember_Entity_1.default)
], WellnessEventMemberResultResponseDto.prototype, "wellnessEventMember", void 0);
WellnessEventMemberResultResponseDto = __decorate([
    (0, class_transformer_1.Exclude)()
], WellnessEventMemberResultResponseDto);
exports.WellnessEventMemberResultResponseDto = WellnessEventMemberResultResponseDto;
class WellnessEventMemberResultQueryDto extends Dto_Base_1.PaginationQuery {
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
], WellnessEventMemberResultQueryDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'number',
        name: 'wellness_event_id',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Number)
], WellnessEventMemberResultQueryDto.prototype, "wellness_event_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'number',
        name: 'wellness_event_member_id',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Number)
], WellnessEventMemberResultQueryDto.prototype, "wellness_event_member_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'src',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WellnessEventMemberResultQueryDto.prototype, "src", void 0);
exports.WellnessEventMemberResultQueryDto = WellnessEventMemberResultQueryDto;
//# sourceMappingURL=WellnessEventMemberResult.Dto.js.map