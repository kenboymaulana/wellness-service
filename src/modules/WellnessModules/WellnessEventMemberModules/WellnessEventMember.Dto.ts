import {
  CreateDto,
  PaginationQuery,
  PutDto,
  ResponseDto,
} from '../../../base/Dto.Base'
import WellnessEventMember from './WellnessEventMember.Entity'
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
import WellnessEvent from '../WellnessEventModules/WellnessEvent.Entity'
import Employee from 'src/modules/EmployeeModules/Employee.Entity'
import { isUnique } from 'src/utils/validators'
import WellnessEventMemberResult from '../WellnessEventMemberResultModules/WellnessEventMemberResult.Entity'

export class WellnessEventMemberRequestDto
  implements CreateDto<WellnessEventMember>
{
  created_by: string

  @ApiProperty({
    required: true,
    type: 'string',
    name: 'create_employee',
  })
  create_employee: string

  @ApiProperty({
    required: true,
    type: 'number',
    name: 'wellness_event_id',
  })
  @IsNumber()
  wellness_event_id: number

  @ApiProperty({
    required: false,
    type: 'number',
    name: 'employee_id',
  })
  @IsNumber()
  employee_id: number

  @ApiProperty({
    required: false,
    type: 'string',
    name: 'nik',
  })
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

  @ApiProperty({
    required: false,
    type: 'number',
    name: 'role_id',
  })
  @IsOptional()
  @IsNumber()
  role_id: number

  @IsOptional()
  wellnessEvent: WellnessEvent

  @IsOptional()
  wellnessEventMemberResult: WellnessEventMemberResult

  @IsOptional()
  employee: Employee
}

export class WellnessEventMemberPutDto implements PutDto<WellnessEventMember> {
  updated_by: string

  @IsOptional()
  @IsNumber()
  wellness_event_id: number

  @IsOptional()
  @IsNumber()
  employee_id: number

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
  @IsString()
  role_id: number

  @IsOptional()
  is_main: boolean

  @IsOptional()
  is_verified: boolean

  @IsOptional()
  wellnessEvent: WellnessEvent

  @IsOptional()
  wellnessEventMemberResult: WellnessEventMemberResult

  @IsOptional()
  employee: Employee
}

@Exclude()
export class WellnessEventMemberResponseDto
  implements ResponseDto<WellnessEventMember>
{
  @Expose()
  id: number

  @Expose()
  wellness_event_id: number

  @Expose()
  employee_id: number

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

  @Expose()
  employee: Employee
}

export class WellnessEventMemberQueryDto extends PaginationQuery {
  @ApiProperty({
    required: false,
    type: 'string',
    name: 'id',
  })
  @IsOptional()
  @IsString()
  id: string

  @ApiProperty({
    required: false,
    type: 'number',
    name: 'wellness_event_id',
  })
  @IsOptional()
  @IsString()
  wellness_event_id: number

  @ApiProperty({
    required: false,
    type: 'string',
    name: 'wellness_event_id',
  })
  @IsOptional()
  @IsString()
  nik: string

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
