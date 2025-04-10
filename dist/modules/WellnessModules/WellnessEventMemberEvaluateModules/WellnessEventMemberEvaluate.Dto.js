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
exports.WellnessEventMemberEvaluateQueryDto = exports.WellnessEventMemberEvaluateResponseDto = exports.WellnessEventMemberEvaluatePutDto = exports.WellnessEventMemberEvaluateRequestDto = void 0;
const Dto_Base_1 = require("../../../base/Dto.Base");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const Employee_Entity_1 = require("../../EmployeeModules/Employee.Entity");
const validators_1 = require("../../../utils/validators");
const WellnessEventMember_Entity_1 = require("../WellnessEventMemberModules/WellnessEventMember.Entity");
class WellnessEventMemberEvaluateRequestDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: 'number',
        name: 'wellness_event_member_id',
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], WellnessEventMemberEvaluateRequestDto.prototype, "wellness_event_member_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: 'string',
        name: 'keluhan_saat_ini',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], WellnessEventMemberEvaluateRequestDto.prototype, "keluhan_saat_ini", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: 'string',
        name: 'tingkat_keberhasilan',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], WellnessEventMemberEvaluateRequestDto.prototype, "tingkat_keberhasilan", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: 'string',
        name: 'motivasi',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], WellnessEventMemberEvaluateRequestDto.prototype, "motivasi", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: 'string',
        name: 'evaluasi',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], WellnessEventMemberEvaluateRequestDto.prototype, "evaluasi", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", WellnessEventMember_Entity_1.default)
], WellnessEventMemberEvaluateRequestDto.prototype, "wellnessEventMember", void 0);
exports.WellnessEventMemberEvaluateRequestDto = WellnessEventMemberEvaluateRequestDto;
class WellnessEventMemberEvaluatePutDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'number',
        name: 'wellness_event_member_id',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], WellnessEventMemberEvaluatePutDto.prototype, "wellness_event_member_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'keluhan_saat_ini',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], WellnessEventMemberEvaluatePutDto.prototype, "keluhan_saat_ini", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'tingkat_keberhasilan',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], WellnessEventMemberEvaluatePutDto.prototype, "tingkat_keberhasilan", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'motivasi',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], WellnessEventMemberEvaluatePutDto.prototype, "motivasi", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'evaluasi',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], WellnessEventMemberEvaluatePutDto.prototype, "evaluasi", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", WellnessEventMember_Entity_1.default)
], WellnessEventMemberEvaluatePutDto.prototype, "wellnessEventMember", void 0);
exports.WellnessEventMemberEvaluatePutDto = WellnessEventMemberEvaluatePutDto;
let WellnessEventMemberEvaluateResponseDto = class WellnessEventMemberEvaluateResponseDto {
};
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], WellnessEventMemberEvaluateResponseDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], WellnessEventMemberEvaluateResponseDto.prototype, "keluhan_saat_ini", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], WellnessEventMemberEvaluateResponseDto.prototype, "tingkat_keberhasilan", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], WellnessEventMemberEvaluateResponseDto.prototype, "motivasi", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], WellnessEventMemberEvaluateResponseDto.prototype, "evaluasi", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", WellnessEventMember_Entity_1.default)
], WellnessEventMemberEvaluateResponseDto.prototype, "wellnessEventMember", void 0);
WellnessEventMemberEvaluateResponseDto = __decorate([
    (0, class_transformer_1.Exclude)()
], WellnessEventMemberEvaluateResponseDto);
exports.WellnessEventMemberEvaluateResponseDto = WellnessEventMemberEvaluateResponseDto;
class WellnessEventMemberEvaluateQueryDto extends Dto_Base_1.PaginationQuery {
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
], WellnessEventMemberEvaluateQueryDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'number',
        name: 'wellness_event_member_id',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Number)
], WellnessEventMemberEvaluateQueryDto.prototype, "wellness_event_member_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'src',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WellnessEventMemberEvaluateQueryDto.prototype, "src", void 0);
exports.WellnessEventMemberEvaluateQueryDto = WellnessEventMemberEvaluateQueryDto;
//# sourceMappingURL=WellnessEventMemberEvaluate.Dto.js.map