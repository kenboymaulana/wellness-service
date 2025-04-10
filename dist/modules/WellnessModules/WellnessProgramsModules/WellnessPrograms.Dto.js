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
exports.WellnessProgramsQueryDto = exports.WellnessProgramsResponseDto = exports.WellnessProgramsPutDto = exports.WellnessProgramsItemsRequestDto = exports.WellnessProgramsRequestDto = void 0;
const Dto_Base_1 = require("../../../base/Dto.Base");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const MedicalStaff_Entity_1 = require("../../MedicalStaffModules/MedicalStaff.Entity");
class WellnessProgramsRequestDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: 'string',
        name: 'code',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WellnessProgramsRequestDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: 'string',
        name: 'name',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WellnessProgramsRequestDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: 'string',
        name: 'wellness_item_id',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], WellnessProgramsRequestDto.prototype, "wellness_program_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: 'string',
        name: 'wellness_item_id',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], WellnessProgramsRequestDto.prototype, "wellness_item_id", void 0);
exports.WellnessProgramsRequestDto = WellnessProgramsRequestDto;
class WellnessProgramsItemsRequestDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: 'string',
        name: 'wellness_item_id',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], WellnessProgramsItemsRequestDto.prototype, "wellness_program_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: 'string',
        name: 'wellness_item_id',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], WellnessProgramsItemsRequestDto.prototype, "wellness_item_id", void 0);
exports.WellnessProgramsItemsRequestDto = WellnessProgramsItemsRequestDto;
class WellnessProgramsPutDto {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WellnessProgramsPutDto.prototype, "code", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WellnessProgramsPutDto.prototype, "name", void 0);
exports.WellnessProgramsPutDto = WellnessProgramsPutDto;
let WellnessProgramsResponseDto = class WellnessProgramsResponseDto {
};
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], WellnessProgramsResponseDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], WellnessProgramsResponseDto.prototype, "code", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], WellnessProgramsResponseDto.prototype, "name", void 0);
WellnessProgramsResponseDto = __decorate([
    (0, class_transformer_1.Exclude)()
], WellnessProgramsResponseDto);
exports.WellnessProgramsResponseDto = WellnessProgramsResponseDto;
class WellnessProgramsQueryDto extends Dto_Base_1.PaginationQuery {
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
], WellnessProgramsQueryDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'src',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WellnessProgramsQueryDto.prototype, "src", void 0);
exports.WellnessProgramsQueryDto = WellnessProgramsQueryDto;
//# sourceMappingURL=WellnessPrograms.Dto.js.map