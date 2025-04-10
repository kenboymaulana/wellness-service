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
exports.WellnessItemQueryDto = exports.WellnessItemResponseDto = exports.WellnessItemPutDto = exports.WellnessItemRequestDto = void 0;
const Dto_Base_1 = require("../../../base/Dto.Base");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const MedicalStaff_Entity_1 = require("../../MedicalStaffModules/MedicalStaff.Entity");
class WellnessItemRequestDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: 'string',
        name: 'main_id',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], WellnessItemRequestDto.prototype, "main_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: 'string',
        name: 'parent_id',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], WellnessItemRequestDto.prototype, "parent_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: 'number',
        name: 'level',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], WellnessItemRequestDto.prototype, "level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: 'number',
        name: 'sort',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], WellnessItemRequestDto.prototype, "sort", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: 'number',
        name: 'header',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], WellnessItemRequestDto.prototype, "header", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: 'string',
        name: 'code',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WellnessItemRequestDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: 'string',
        name: 'name',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WellnessItemRequestDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: 'string',
        name: 'name_eng',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], WellnessItemRequestDto.prototype, "name_eng", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: 'string',
        name: 'desc',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], WellnessItemRequestDto.prototype, "desc", void 0);
exports.WellnessItemRequestDto = WellnessItemRequestDto;
class WellnessItemPutDto {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WellnessItemPutDto.prototype, "main_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WellnessItemPutDto.prototype, "parent_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], WellnessItemPutDto.prototype, "level", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], WellnessItemPutDto.prototype, "sort", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], WellnessItemPutDto.prototype, "header", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WellnessItemPutDto.prototype, "code", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WellnessItemPutDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WellnessItemPutDto.prototype, "name_eng", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WellnessItemPutDto.prototype, "desc", void 0);
exports.WellnessItemPutDto = WellnessItemPutDto;
let WellnessItemResponseDto = class WellnessItemResponseDto {
};
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], WellnessItemResponseDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], WellnessItemResponseDto.prototype, "main_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], WellnessItemResponseDto.prototype, "parent_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], WellnessItemResponseDto.prototype, "level", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], WellnessItemResponseDto.prototype, "sort", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], WellnessItemResponseDto.prototype, "header", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], WellnessItemResponseDto.prototype, "code", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], WellnessItemResponseDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], WellnessItemResponseDto.prototype, "name_eng", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], WellnessItemResponseDto.prototype, "desc", void 0);
WellnessItemResponseDto = __decorate([
    (0, class_transformer_1.Exclude)()
], WellnessItemResponseDto);
exports.WellnessItemResponseDto = WellnessItemResponseDto;
class WellnessItemQueryDto extends Dto_Base_1.PaginationQuery {
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
], WellnessItemQueryDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'src',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WellnessItemQueryDto.prototype, "src", void 0);
exports.WellnessItemQueryDto = WellnessItemQueryDto;
//# sourceMappingURL=WellnessItem.Dto.js.map