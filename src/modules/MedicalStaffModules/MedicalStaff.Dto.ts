import {
  CreateDto,
  PaginationQuery,
  PutDto,
  ResponseDto,
} from '../../base/Dto.Base'
import MedicalStaff from './MedicalStaff.Entity'
import {
  IsDateString,
  IsEmail,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator'
import { Exclude, Expose } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'
import { isUnique } from 'src/utils/validators'
import WellnessEvent from '../WellnessModules/WellnessEventModules/WellnessEvent.Entity'
import User from '../UserModules/User/User.Entity'

export class MedicalStaffRequestDto implements CreateDto<MedicalStaff> {
  created_by: string
  @ApiProperty({
    required: false,
    type: 'string',
    name: 'nik',
  })
  @isUnique({ tableName: 'medical_staff', column: 'nik' })
  @IsString()
  nik: string

  @ApiProperty({
    required: false,
    type: 'string',
    name: 'name',
  })
  @IsString()
  name: string

  @ApiProperty({
    required: false,
    type: 'string',
    name: 'dob',
  })
  @IsDateString()
  dob: Date

  @ApiProperty({
    required: false,
    type: 'string',
    name: 'gender',
  })
  @IsString()
  gender: string

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
    name: 'phone',
  })
  @IsString()
  phone: string

  @ApiProperty({
    required: false,
    type: 'string',
    name: 'no_str',
  })
  @IsString()
  no_str: string

  @ApiProperty({
    required: false,
    type: 'string',
    name: 'no_sip',
  })
  @IsString()
  no_sip: string

  @ApiProperty({
    required: false,
    type: 'string',
    name: 'staff_type',
  })
  @IsString()
  staff_type: string

  @ApiProperty({
    required: false,
    type: 'string',
    name: 'doctor_type',
  })
  @IsString()
  doctor_type: string

  @ApiProperty({
    required: false,
    type: 'string',
    name: 'poly_practice',
  })
  @IsString()
  poly_practice: string

  @ApiProperty({
    required: false,
    type: 'number',
    name: 'status_active',
  })
  @IsNumber()
  status_active: number

  @ApiProperty({
    required: false,
    type: 'string',
    name: 'sign_image',
  })
  @IsString()
  sign_image: string

  @ApiProperty({
    required: false,
    type: 'string',
    name: 'address',
  })
  @IsString()
  address: string

  @IsOptional()
  wellnessEvent: WellnessEvent
}

export class MedicalStaffPutDto implements PutDto<MedicalStaff> {
  updated_by: string

  @IsOptional()
  @IsString()
  nik: string

  @IsOptional()
  @IsString()
  name: string

  @IsOptional()
  @IsString()
  dob: Date

  @IsOptional()
  @IsString()
  gender: string

  @IsOptional()
  @IsString()
  phone: string

  @IsOptional()
  @IsString()
  email: string

  @IsOptional()
  @IsString()
  no_str: string

  @IsOptional()
  @IsString()
  no_sip: string

  @IsOptional()
  @IsString()
  staff_type: string

  @IsOptional()
  @IsString()
  doctor_type: string

  @IsOptional()
  @IsString()
  poly_practice: string

  @IsOptional()
  @IsNumber()
  status_active: number

  @IsOptional()
  @IsString()
  sign_image: string

  @IsOptional()
  @IsString()
  address: string

  @IsOptional()
  is_main: boolean

  @IsOptional()
  is_verified: boolean

  @IsOptional()
  wellnessEvent: WellnessEvent
}

@Exclude()
export class MedicalStaffResponseDto implements ResponseDto<MedicalStaff> {
  @Expose()
  id: number

  @Expose()
  nik: string

  @Expose()
  name: string

  @Expose()
  dob: Date

  @Expose()
  gender: string

  @Expose()
  phone: string

  @Expose()
  email: string

  @Expose()
  no_str: string

  @Expose()
  no_sip: string

  @Expose()
  address: string

  @Expose()
  staff_type: string

  @Expose()
  doctor_type: string
  
  @Expose()
  poly_practice: string

  @Expose()
  status_active: number

  @Expose()
  sign_image: string

  @Expose()
  users: User[]
}

export class CorproateQueryDto extends PaginationQuery {
  @ApiProperty({
    required: false,
    type: 'number',
    name: 'id',
  })
  @IsOptional()
  @IsString()
  id: number

  @ApiProperty({
    required: false,
    type: 'string',
    name: 'users',
  })
  @IsOptional()
  @IsString()
  users: string

  @ApiProperty({
    required: false,
    type: 'string',
    name: 'src',
  })
  @IsOptional()
  @IsString()
  src: string
}
