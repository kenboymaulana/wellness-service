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
exports.PerusahaanQueryDto = exports.PerusahaanResponseDto = exports.PerusahaanPutDto = exports.PerusahaanRequestDto = void 0;
const Dto_Base_1 = require("../../base/Dto.Base");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
class PerusahaanRequestDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: 'string',
        name: 'npwp',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PerusahaanRequestDto.prototype, "npwp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: 'string',
        name: 'name',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PerusahaanRequestDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: 'string',
        name: 'contact',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PerusahaanRequestDto.prototype, "contact", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: 'string',
        name: 'address',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PerusahaanRequestDto.prototype, "address", void 0);
exports.PerusahaanRequestDto = PerusahaanRequestDto;
class PerusahaanPutDto {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PerusahaanPutDto.prototype, "npwp", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PerusahaanPutDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PerusahaanPutDto.prototype, "contact", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PerusahaanPutDto.prototype, "address", void 0);
exports.PerusahaanPutDto = PerusahaanPutDto;
let PerusahaanResponseDto = class PerusahaanResponseDto {
};
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], PerusahaanResponseDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PerusahaanResponseDto.prototype, "npwp", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PerusahaanResponseDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PerusahaanResponseDto.prototype, "contact", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PerusahaanResponseDto.prototype, "address", void 0);
PerusahaanResponseDto = __decorate([
    (0, class_transformer_1.Exclude)()
], PerusahaanResponseDto);
exports.PerusahaanResponseDto = PerusahaanResponseDto;
class PerusahaanQueryDto extends Dto_Base_1.PaginationQuery {
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
], PerusahaanQueryDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'src',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PerusahaanQueryDto.prototype, "src", void 0);
exports.PerusahaanQueryDto = PerusahaanQueryDto;
//# sourceMappingURL=Perusahaan.Dto.js.map