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
exports.PatientLoginRequestDto = exports.AuthPatientRequestDto = exports.RegistrationPatientRequestDto = exports.AuthRefreshToken = exports.AuthPutDto = exports.AuthPasswordDto = exports.RegistrationRequestDto = exports.AuthResponseDto = exports.AuthRequestDto = void 0;
const class_validator_1 = require("class-validator");
const Auth_Enum_1 = require("../../core/enums/Auth.Enum");
const Dto_Base_1 = require("../../base/Dto.Base");
const User_Enum_1 = require("../UserModules/User/User.Enum");
const class_transformer_1 = require("class-transformer");
const User_Dto_1 = require("../UserModules/User/User.Dto");
const swagger_1 = require("@nestjs/swagger");
class AuthRequestDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'enum',
        enum: Auth_Enum_1.GrantType,
        name: 'grant_type',
    }),
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'enum',
        enum: Auth_Enum_1.SocialProvider,
        name: 'social_provider',
    }),
    (0, class_validator_1.IsEnum)(Auth_Enum_1.SocialProvider, { message: 'Invalid social provider!' }),
    (0, class_validator_1.ValidateIf)((object) => object.grant_type === Auth_Enum_1.GrantType.SOCIAL),
    __metadata("design:type", String)
], AuthRequestDto.prototype, "social_provider", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'access_token',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.ValidateIf)((object) => object.grant_type === Auth_Enum_1.GrantType.SOCIAL),
    __metadata("design:type", String)
], AuthRequestDto.prototype, "access_token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'email',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AuthRequestDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'phone_number',
    }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.ValidateIf)((object) => object.grant_type === Auth_Enum_1.GrantType.PHONE),
    __metadata("design:type", String)
], AuthRequestDto.prototype, "phone_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'password',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.ValidateIf)((object) => object.grant_type === Auth_Enum_1.GrantType.EMAIL ||
        object.grant_type === Auth_Enum_1.GrantType.PHONE),
    __metadata("design:type", String)
], AuthRequestDto.prototype, "password", void 0);
exports.AuthRequestDto = AuthRequestDto;
let AuthResponseDto = class AuthResponseDto {
};
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", User_Dto_1.UserResponseDto)
], AuthResponseDto.prototype, "user", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AuthResponseDto.prototype, "access_token", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AuthResponseDto.prototype, "refresh_token", void 0);
AuthResponseDto = __decorate([
    (0, class_transformer_1.Exclude)()
], AuthResponseDto);
exports.AuthResponseDto = AuthResponseDto;
class RegistrationRequestDto extends Dto_Base_1.BaseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'boolean',
        default: 'false',
        name: 'need_verification',
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], RegistrationRequestDto.prototype, "need_verification", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: 'string',
        name: 'full_name',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegistrationRequestDto.prototype, "full_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'email',
    }),
    (0, class_validator_1.ValidateIf)((object) => object.grant_type === Auth_Enum_1.GrantType.EMAIL),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], RegistrationRequestDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'number',
        name: 'phone_number',
    }),
    (0, class_validator_1.ValidateIf)((object) => object.grant_type === Auth_Enum_1.GrantType.PHONE),
    (0, class_validator_1.IsNumberString)(),
    __metadata("design:type", String)
], RegistrationRequestDto.prototype, "phone_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: 'enum',
        enum: Auth_Enum_1.RegistrationType,
        name: 'registration_type',
    }),
    (0, class_validator_1.IsEnum)(Auth_Enum_1.RegistrationType),
    __metadata("design:type", String)
], RegistrationRequestDto.prototype, "registration_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: 'string',
        name: 'password',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegistrationRequestDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'employee_id',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Number)
], RegistrationRequestDto.prototype, "employee_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'medical_staff_id',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Number)
], RegistrationRequestDto.prototype, "medical_staff_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: 'enum',
        enum: User_Enum_1.UserType,
    }),
    (0, class_validator_1.IsEnum)(User_Enum_1.UserType),
    __metadata("design:type", String)
], RegistrationRequestDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: 'number',
        name: 'role_id',
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RegistrationRequestDto.prototype, "role_id", void 0);
exports.RegistrationRequestDto = RegistrationRequestDto;
class AuthPasswordDto {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AuthPasswordDto.prototype, "password", void 0);
exports.AuthPasswordDto = AuthPasswordDto;
class AuthPutDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'old_password',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AuthPutDto.prototype, "old_password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'password',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AuthPutDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'confirmation_password',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AuthPutDto.prototype, "confirmation_password", void 0);
exports.AuthPutDto = AuthPutDto;
class AuthRefreshToken {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'refreshToken',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AuthRefreshToken.prototype, "refreshToken", void 0);
exports.AuthRefreshToken = AuthRefreshToken;
class RegistrationPatientRequestDto extends Dto_Base_1.BaseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'boolean',
        default: 'false',
        name: 'need_verification',
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], RegistrationPatientRequestDto.prototype, "need_verification", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: 'string',
        name: 'name',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegistrationPatientRequestDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: 'string',
        name: 'email',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegistrationPatientRequestDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: 'enum',
        enum: User_Enum_1.UserType,
        default: 'PATIENT',
    }),
    (0, class_validator_1.IsEnum)(User_Enum_1.UserType),
    __metadata("design:type", String)
], RegistrationPatientRequestDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'nik',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegistrationPatientRequestDto.prototype, "nik", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: Date,
        name: 'dob',
    }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], RegistrationPatientRequestDto.prototype, "dob", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: 'string',
        name: 'gender',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegistrationPatientRequestDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'address',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegistrationPatientRequestDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'emp_no',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegistrationPatientRequestDto.prototype, "emp_no", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: 'string',
        name: 'phone',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegistrationPatientRequestDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'division',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegistrationPatientRequestDto.prototype, "division", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'position',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegistrationPatientRequestDto.prototype, "position", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'description',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegistrationPatientRequestDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'type_id',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Number)
], RegistrationPatientRequestDto.prototype, "type_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'province',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegistrationPatientRequestDto.prototype, "province", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'string',
        name: 'city',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegistrationPatientRequestDto.prototype, "city", void 0);
exports.RegistrationPatientRequestDto = RegistrationPatientRequestDto;
class AuthPatientRequestDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: 'string',
        name: 'name',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AuthPatientRequestDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: 'string',
        name: 'phone',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AuthPatientRequestDto.prototype, "phone", void 0);
exports.AuthPatientRequestDto = AuthPatientRequestDto;
class PatientLoginRequestDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: 'string',
        name: 'id',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Number)
], PatientLoginRequestDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: 'string',
        name: 'otp',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PatientLoginRequestDto.prototype, "otp", void 0);
exports.PatientLoginRequestDto = PatientLoginRequestDto;
//# sourceMappingURL=Auth.Dto.js.map