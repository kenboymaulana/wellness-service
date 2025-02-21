import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator'
import {
  GrantType,
  RegistrationType,
  SocialProvider,
} from '../../core/enums/Auth.Enum'
import { BaseDto, PutDto } from '../../base/Dto.Base'
import { UserType } from '../UserModules/User/User.Enum'
import { Exclude, Expose } from 'class-transformer'
import { UserResponseDto } from '../UserModules/User/User.Dto'
import { ApiProperty } from '@nestjs/swagger'
import { User } from 'aws-sdk/clients/budgets'

export class AuthRequestDto implements Readonly<AuthRequestDto> {
  @ApiProperty({
    required: false,
    type: 'enum',
    enum: GrantType,
    name: 'grant_type',
  })
  // @IsEnum(GrantType, { message: 'Invalid grant type!' })
  // grant_type!: GrantType
  @ApiProperty({
    required: false,
    type: 'enum',
    enum: SocialProvider,
    name: 'social_provider',
  })
  @IsEnum(SocialProvider, { message: 'Invalid social provider!' })
  @ValidateIf((object) => object.grant_type === GrantType.SOCIAL)
  social_provider: SocialProvider

  @ApiProperty({
    required: false,
    type: 'string',
    name: 'access_token',
  })
  @IsString()
  @ValidateIf((object) => object.grant_type === GrantType.SOCIAL)
  access_token: string

  @ApiProperty({
    required: false,
    type: 'string',
    name: 'email',
  })
  @IsString()
  email: string

  @ApiProperty({
    required: false,
    type: 'string',
    name: 'phone_number',
  })
  @IsEmail()
  @ValidateIf((object) => object.grant_type === GrantType.PHONE)
  phone_number: string

  @ApiProperty({
    required: false,
    type: 'string',
    name: 'password',
  })
  @IsString()
  @ValidateIf(
    (object) =>
      object.grant_type === GrantType.EMAIL ||
      object.grant_type === GrantType.PHONE,
  )
  password: string
}

@Exclude()
export class AuthResponseDto {
  @Expose()
  user: UserResponseDto

  @Expose()
  access_token: string

  @Expose()
  refresh_token: string
}

export class RegistrationRequestDto extends BaseDto {
  is_main: boolean
  is_verified: boolean

  @ApiProperty({
    required: false,
    type: 'boolean',
    default: 'false',
    name: 'need_verification',
  })
  @IsBoolean()
  need_verification: boolean

  @ApiProperty({
    required: true,
    type: 'string',
    name: 'full_name',
  })
  @IsString()
  full_name: string

  @ApiProperty({
    required: false,
    type: 'string',
    name: 'email',
  })
  @ValidateIf((object) => object.grant_type === GrantType.EMAIL)
  @IsEmail()
  email: string

  @ApiProperty({
    required: false,
    type: 'number',
    name: 'phone_number',
  })
  @ValidateIf((object) => object.grant_type === GrantType.PHONE)
  @IsNumberString()
  phone_number: string

  @ApiProperty({
    required: true,
    type: 'enum',
    enum: RegistrationType,
    name: 'registration_type',
  })
  @IsEnum(RegistrationType)
  registration_type: RegistrationType

  @ApiProperty({
    required: true,
    type: 'string',
    name: 'password',
  })
  @IsString()
  password: string

  @ApiProperty({
    required: false,
    type: 'string',
    name: 'employee_id',
  })
  @IsOptional()
  @IsString()
  employee_id: number

  @ApiProperty({
    required: false,
    type: 'string',
    name: 'medical_staff_id',
  })
  @IsOptional()
  @IsString()
  medical_staff_id: number

  @ApiProperty({
    required: true,
    type: 'enum',
    enum: UserType,
  })
  @IsEnum(UserType)
  type: UserType

  @ApiProperty({
    required: true,
    type: 'number',
    name: 'role_id',
  })
  @IsNumber()
  role_id: number

}

export class AuthPasswordDto {
  @IsOptional()
  @IsString()
  password: string
}

export class AuthPutDto {
  @ApiProperty({
    required: false,
    type: 'string',
    name: 'old_password',
  })
  @IsString()
  old_password: string

  @ApiProperty({
    required: false,
    type: 'string',
    name: 'password',
  })
  @IsString()
  password: string

  @ApiProperty({
    required: false,
    type: 'string',
    name: 'confirmation_password',
  })
  @IsString()
  confirmation_password: string
}

export class AuthRefreshToken {
  @ApiProperty({
    required: false,
    type: 'string',
    name: 'refreshToken',
  })
  @IsString()
  refreshToken: string
}

export class RegistrationPatientRequestDto extends BaseDto {
  is_main: boolean
  is_verified: boolean

  @ApiProperty({
    required: false,
    type: 'boolean',
    default: 'false',
    name: 'need_verification',
  })
  @IsBoolean()
  need_verification: boolean

  @ApiProperty({
    required: true,
    type: 'string',
    name: 'name',
  })
  @IsString()
  name: string

  @ApiProperty({
    required: true,
    type: 'string',
    name: 'email',
  })
  @IsString()
  email: string

  @ApiProperty({
    required: true,
    type: 'enum',
    enum: UserType,
    default: 'PATIENT',
  })
  @IsEnum(UserType)
  type: UserType

  @ApiProperty({
    required: false,
    type: 'string',
    name: 'nik',
  })
  @IsOptional()
  @IsString()
  nik: string

  @ApiProperty({
    required: true,
    type: Date,
    name: 'dob',
  })
  @IsDateString()
  dob: string

  @ApiProperty({
    required: true,
    type: 'string',
    name: 'gender',
  })
  @IsString()
  gender: string

  @ApiProperty({
    required: false,
    type: 'string',
    name: 'address',
  })
  @IsOptional()
  @IsString()
  address: string

  @ApiProperty({
    required: false,
    type: 'string',
    name: 'emp_no',
  })
  @IsOptional()
  @IsString()
  emp_no: string

  @ApiProperty({
    required: true,
    type: 'string',
    name: 'phone',
  })
  @IsString()
  phone: string

  @ApiProperty({
    required: false,
    type: 'string',
    name: 'division',
  })
  @IsOptional()
  @IsString()
  division: string

  @ApiProperty({
    required: false,
    type: 'string',
    name: 'position',
  })
  @IsOptional()
  @IsString()
  position: string

  @ApiProperty({
    required: false,
    type: 'string',
    name: 'description',
  })
  @IsOptional()
  @IsString()
  description: string

  @ApiProperty({
    required: false,
    type: 'string',
    name: 'type_id',
  })
  @IsOptional()
  @IsString()
  type_id: number

  @ApiProperty({
    required: false,
    type: 'string',
    name: 'province',
  })
  @IsOptional()
  @IsString()
  province: string

  @ApiProperty({
    required: false,
    type: 'string',
    name: 'city',
  })
  @IsOptional()
  @IsString()
  city: string
}

export class AuthPatientRequestDto implements Readonly<AuthPatientRequestDto> {
  @ApiProperty({
    required: true,
    type: 'string',
    name: 'name',
  })
  @IsString()
  name: string

  @ApiProperty({
    required: true,
    type: 'string',
    name: 'phone',
  })
  @IsString()
  phone: string
}

export class PatientLoginRequestDto
  implements Readonly<PatientLoginRequestDto>
{
  @ApiProperty({
    required: true,
    type: 'string',
    name: 'id',
  })
  @IsString()
  id: number

  @ApiProperty({
    required: true,
    type: 'string',
    name: 'otp',
  })
  @IsString()
  otp: string
}
