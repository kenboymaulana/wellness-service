import {
  CreateDto,
  PaginationQuery,
  PutDto,
  ResponseDto,
} from '../../../base/Dto.Base'
import WellnessEventMemberResultValues from './WellnessEventMemberResultValues.Entity'
import {
  IsArray,
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
import WellnessEventMember from '../WellnessEventMemberModules/WellnessEventMember.Entity'

export class WellnessEventMemberResultValuesRequestDto
  implements CreateDto<WellnessEventMemberResultValues>
{
  created_by: string

  @ApiProperty({
    required: true,
    type: 'number',
    name: 'wellness_event_member_id',
  })
  @IsNumber()
  wellness_event_member_id: number

  @ApiProperty({
    required: true,
    type: 'string',
    name: 'item_code',
  })
  item_code: string

  @ApiProperty({
    required: true,
    type: 'string',
    name: 'items',
  })
  items: string

  @ApiProperty({
    required: true,
    type: 'string',
    name: 'item_value',
  })
  item_value: string

  @ApiProperty({
    required: true,
    type: 'string',
    name: 'time_input',
  })
  time_input: Date

  @ApiProperty({
    required: true,
    type: 'string',
    name: 'date',
  })
  date: Date

  @ApiProperty({
    required: true,
    type: 'string',
    name: 'result',
  })
  @IsArray()
  result: []

  @IsOptional()
  wellnessEventMember: WellnessEventMember
}

export class WellnessEventMemberResultValuesPutDto implements PutDto<WellnessEventMemberResultValues> {
  updated_by: string

  @ApiProperty({
    required: false,
    type: 'number',
    name: 'wellness_event_member_id',
  })
  @IsOptional()
  wellness_event_member_id: number

  @ApiProperty({
    required: false,
    type: 'string',
    name: 'item_code',
  })
  @IsOptional()
  item_code: string

  @ApiProperty({
    required: false,
    type: 'string',
    name: 'item_value',
  })
  @IsOptional()
  item_value: string

  @ApiProperty({
    required: false,
    type: 'string',
    name: 'time_input',
  })
  @IsOptional()
  time_input: Date

  @ApiProperty({
    required: false,
    type: 'string',
    name: 'date',
  })
  @IsOptional()
  date: Date

  @IsOptional()
  wellnessEventMember: WellnessEventMember
}

@Exclude()
export class WellnessEventMemberResultValuesResponseDto
  implements ResponseDto<WellnessEventMemberResultValues>
{
  @Expose()
  id: number

  @Expose()
  wellness_event_member_id: number

  @Expose()
  item_code: string

  @Expose()
  items: string

  @Expose()
  item_value: string

  @Expose()
  time_input: Date

  @Expose()
  date: Date

  @Expose()
  wellnessEventMember: WellnessEventMember
}

export class WellnessEventMemberResultValuesQueryDto extends PaginationQuery {
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
    name: 'wellness_event_member_id',
  })
  @IsOptional()
  @IsString()
  wellness_event_member_id: number

  @ApiProperty({
    required: false,
    type: 'string',
    name: 'time',
  })
  @IsOptional()
  @IsString()
  time: string

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
