import {
  CreateDto,
  PaginationQuery,
  PutDto,
  ResponseDto,
} from '../../base/Dto.Base'
import Employee from './Employee.Entity'
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
import WellnessEventMember from '../WellnessModules/WellnessEventMemberModules/WellnessEventMember.Entity'

export class EmployeeRequestDto implements CreateDto<Employee> {
  created_by: string
  @ApiProperty({
    required: true,
    type: 'number',
    name: 'perusahaan_id',
  })
  @IsNumber()
  perusahaan_id: number

  @ApiProperty({
    required: false,
    type: 'string',
    name: 'nik',
  })
  @isUnique({ tableName: 'employee', column: 'nik' })
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
    name: 'phone',
  })
  @IsString()
  phone: string

  @ApiProperty({
    required: false,
    type: 'string',
    name: 'division',
  })
  @IsString()
  division: string

  @ApiProperty({
    required: false,
    type: 'string',
    name: 'position',
  })
  @IsString()
  position: string

  @ApiProperty({
    required: false,
    type: 'string',
    name: 'work',
  })
  @IsString()
  work: string

  @ApiProperty({
    required: false,
    type: 'string',
    name: 'address',
  })
  @IsString()
  address: string

  @IsOptional()
  wellnessEventMember: WellnessEventMember
}

export class EmployeePutDto implements PutDto<Employee> {
  updated_by: string

  @IsNumber()
  perusahaan_id: number

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
  division: string

  @IsOptional()
  @IsString()
  position: string

  @IsOptional()
  @IsString()
  work: string

  @IsOptional()
  @IsString()
  address: string

  @IsOptional()
  wellnessEventMember: WellnessEventMember
}

@Exclude()
export class EmployeeResponseDto implements ResponseDto<Employee> {
  @Expose()
  id: number

  @Expose()
  perusahaan_id: number

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
  division: string

  @Expose()
  position: string

  @Expose()
  work: string

  @Expose()
  address: string
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
    type: 'number',
    name: 'perusahaan_id',
  })
  @IsOptional()
  @IsString()
  perusahaan_id: number

  @ApiProperty({
    required: false,
    type: 'string',
    name: 'src',
  })
  @IsOptional()
  @IsString()
  src: string
}
