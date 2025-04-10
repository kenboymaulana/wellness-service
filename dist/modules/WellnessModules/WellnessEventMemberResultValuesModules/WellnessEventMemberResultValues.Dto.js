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
exports.WellnessEventMemberResultValuesQueryDto = exports.WellnessEventMemberResultValuesResponseDto = exports.WellnessEventMemberResultValuesPutDto = exports.WellnessEventMemberResultValuesRequestDto = void 0;
const Dto_Base_1 = require("../../../base/Dto.Base");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const Employee_Entity_1 = require("../../EmployeeModules/Employee.Entity");
const validators_1 = require("../../../utils/validators");
const WellnessEventMember_Entity_1 = require("../WellnessEventMemberModules/WellnessEventMember.Entity");
class WellnessEventMemberResultValuesRequestDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: 'number',
        name: 'wellness_event_member_id',
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], WellnessEventMemberResultValuesRequestDto.prototype, "wellness_event_member_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: 'string',
        name: 'item_code',
    }),
    __metadata("design:type", String)
], WellnessEventMemberResultValuesRequestDto.prototype, "item_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: 'string',
        name: 'items',
    }),
    __metadata("design:type", String)
], WellnessEventMemberResultValuesRequestDto.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: 'string',
        name: 'item_value',
    }),
    __metadata("design:type", String)
], WellnessEventMemberResultValuesRequestDto.prototype, "item_value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: 'string',
        name: 'time_input',
    }),
    __metadata("design:type", Date)
], WellnessEventMemberResultValuesRequestDto.prototype, "time_input", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: 'string',
        name: 'date',
    }),
    __metadata("design:type", Date)
], WellnessEventMemberResultValuesRequestDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: 'string',
        name: 'result',
    }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], WellnessEventMemberResultValuesRequestDto.prototype, "result", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", WellnessEventMember_Entity_1.default)
], WellnessEventMemberResultValuesRequestDto.prototype, "wellnessEventMember", void 0);
exports.WellnessEventMemberResultValuesRequestDto = WellnessEventMemberResultValuesRequestDto;
class WellnessEventMemberResultValuesPutDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'number',
        name: 'wellness_event_member_id',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], WellnessEventMemberResultValuesPutDto.prototype, "wellness_event_member_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'item_code',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], WellnessEventMemberResultValuesPutDto.prototype, "item_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'item_value',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], WellnessEventMemberResultValuesPutDto.prototype, "item_value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'time_input',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], WellnessEventMemberResultValuesPutDto.prototype, "time_input", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'date',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], WellnessEventMemberResultValuesPutDto.prototype, "date", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", WellnessEventMember_Entity_1.default)
], WellnessEventMemberResultValuesPutDto.prototype, "wellnessEventMember", void 0);
exports.WellnessEventMemberResultValuesPutDto = WellnessEventMemberResultValuesPutDto;
let WellnessEventMemberResultValuesResponseDto = class WellnessEventMemberResultValuesResponseDto {
};
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], WellnessEventMemberResultValuesResponseDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], WellnessEventMemberResultValuesResponseDto.prototype, "wellness_event_member_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], WellnessEventMemberResultValuesResponseDto.prototype, "item_code", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], WellnessEventMemberResultValuesResponseDto.prototype, "items", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], WellnessEventMemberResultValuesResponseDto.prototype, "item_value", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], WellnessEventMemberResultValuesResponseDto.prototype, "time_input", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], WellnessEventMemberResultValuesResponseDto.prototype, "date", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", WellnessEventMember_Entity_1.default)
], WellnessEventMemberResultValuesResponseDto.prototype, "wellnessEventMember", void 0);
WellnessEventMemberResultValuesResponseDto = __decorate([
    (0, class_transformer_1.Exclude)()
], WellnessEventMemberResultValuesResponseDto);
exports.WellnessEventMemberResultValuesResponseDto = WellnessEventMemberResultValuesResponseDto;
class WellnessEventMemberResultValuesQueryDto extends Dto_Base_1.PaginationQuery {
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
], WellnessEventMemberResultValuesQueryDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'number',
        name: 'wellness_event_member_id',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Number)
], WellnessEventMemberResultValuesQueryDto.prototype, "wellness_event_member_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'time',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WellnessEventMemberResultValuesQueryDto.prototype, "time", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'users',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WellnessEventMemberResultValuesQueryDto.prototype, "users", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'src',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WellnessEventMemberResultValuesQueryDto.prototype, "src", void 0);
exports.WellnessEventMemberResultValuesQueryDto = WellnessEventMemberResultValuesQueryDto;
//# sourceMappingURL=WellnessEventMemberResultValues.Dto.js.map