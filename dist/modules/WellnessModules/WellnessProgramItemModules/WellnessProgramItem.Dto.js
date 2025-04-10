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
exports.WellnessProgramItemQueryDto = exports.WellnessProgramItemResponseDto = exports.WellnessProgramItemPutDto = exports.WellnessProgramItemRequestDto = void 0;
const Dto_Base_1 = require("../../../base/Dto.Base");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const MedicalStaff_Entity_1 = require("../../MedicalStaffModules/MedicalStaff.Entity");
const WellnessItem_Entity_1 = require("../WellnessItemModules/WellnessItem.Entity");
class WellnessProgramItemRequestDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: 'string',
        name: 'wellness_program_id',
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], WellnessProgramItemRequestDto.prototype, "wellness_program_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: 'string',
        name: 'wellness_item_id',
    }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Number)
], WellnessProgramItemRequestDto.prototype, "wellness_item_id", void 0);
exports.WellnessProgramItemRequestDto = WellnessProgramItemRequestDto;
class WellnessProgramItemPutDto {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], WellnessProgramItemPutDto.prototype, "wellness_program_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], WellnessProgramItemPutDto.prototype, "wellness_item_id", void 0);
exports.WellnessProgramItemPutDto = WellnessProgramItemPutDto;
let WellnessProgramItemResponseDto = class WellnessProgramItemResponseDto {
};
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], WellnessProgramItemResponseDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], WellnessProgramItemResponseDto.prototype, "wellness_program_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], WellnessProgramItemResponseDto.prototype, "wellness_item_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", WellnessItem_Entity_1.default)
], WellnessProgramItemResponseDto.prototype, "wellnessItem", void 0);
WellnessProgramItemResponseDto = __decorate([
    (0, class_transformer_1.Exclude)()
], WellnessProgramItemResponseDto);
exports.WellnessProgramItemResponseDto = WellnessProgramItemResponseDto;
class WellnessProgramItemQueryDto extends Dto_Base_1.PaginationQuery {
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
], WellnessProgramItemQueryDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'wellness_program_id',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WellnessProgramItemQueryDto.prototype, "wellness_program_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'src',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WellnessProgramItemQueryDto.prototype, "src", void 0);
exports.WellnessProgramItemQueryDto = WellnessProgramItemQueryDto;
//# sourceMappingURL=WellnessProgramItem.Dto.js.map