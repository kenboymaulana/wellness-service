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
exports.WellnessEventQueryDto = exports.WellnessEventResponseDto = exports.WellnessEventPutDto = exports.WellnessEventRequestDto = void 0;
const Dto_Base_1 = require("../../../base/Dto.Base");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const WellnessEventMember_Entity_1 = require("../WellnessEventMemberModules/WellnessEventMember.Entity");
const MedicalStaff_Entity_1 = require("../../MedicalStaffModules/MedicalStaff.Entity");
const WellnessPrograms_Entity_1 = require("../WellnessProgramsModules/WellnessPrograms.Entity");
class WellnessEventRequestDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: 'number',
        name: 'medical_staff_id',
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], WellnessEventRequestDto.prototype, "medical_staff_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: 'string',
        name: 'name',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WellnessEventRequestDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: 'string',
        name: 'model_code',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WellnessEventRequestDto.prototype, "model_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'start_date',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], WellnessEventRequestDto.prototype, "start_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'end_date',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], WellnessEventRequestDto.prototype, "end_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'description',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WellnessEventRequestDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'image',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WellnessEventRequestDto.prototype, "image", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WellnessEventRequestDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", WellnessEventMember_Entity_1.default)
], WellnessEventRequestDto.prototype, "wellnessEventMember", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", MedicalStaff_Entity_1.default)
], WellnessEventRequestDto.prototype, "medicalStaff", void 0);
exports.WellnessEventRequestDto = WellnessEventRequestDto;
class WellnessEventPutDto {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], WellnessEventPutDto.prototype, "medical_staff_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WellnessEventPutDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WellnessEventPutDto.prototype, "model_code", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], WellnessEventPutDto.prototype, "start_date", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], WellnessEventPutDto.prototype, "end_date", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WellnessEventPutDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WellnessEventPutDto.prototype, "image", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WellnessEventPutDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", WellnessEventMember_Entity_1.default)
], WellnessEventPutDto.prototype, "wellnessEventMember", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", MedicalStaff_Entity_1.default)
], WellnessEventPutDto.prototype, "medicalStaff", void 0);
exports.WellnessEventPutDto = WellnessEventPutDto;
let WellnessEventResponseDto = class WellnessEventResponseDto {
};
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], WellnessEventResponseDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], WellnessEventResponseDto.prototype, "medical_staff_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], WellnessEventResponseDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], WellnessEventResponseDto.prototype, "model_code", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], WellnessEventResponseDto.prototype, "start_date", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], WellnessEventResponseDto.prototype, "end_date", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], WellnessEventResponseDto.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], WellnessEventResponseDto.prototype, "image", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], WellnessEventResponseDto.prototype, "status", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", MedicalStaff_Entity_1.default)
], WellnessEventResponseDto.prototype, "medicalStaff", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", WellnessPrograms_Entity_1.default)
], WellnessEventResponseDto.prototype, "modelCode", void 0);
WellnessEventResponseDto = __decorate([
    (0, class_transformer_1.Exclude)()
], WellnessEventResponseDto);
exports.WellnessEventResponseDto = WellnessEventResponseDto;
class WellnessEventQueryDto extends Dto_Base_1.PaginationQuery {
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
], WellnessEventQueryDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'status',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WellnessEventQueryDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'src',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WellnessEventQueryDto.prototype, "src", void 0);
exports.WellnessEventQueryDto = WellnessEventQueryDto;
//# sourceMappingURL=WellnessEvent.Dto.js.map