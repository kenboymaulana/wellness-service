import {
  CreateDto,
  PaginationQuery,
  PutDto,
  ResponseDto,
} from '../../../base/Dto.Base'
import WellnessEventMemberResult from './WellnessEventMemberResult.Entity'
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

export class WellnessEventMemberResultRequestDto
  implements CreateDto<WellnessEventMemberResult>
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
    name: 'main_id',
  })
  @IsOptional()
  main_id: string

  @ApiProperty({
    required: true,
    type: 'string',
    name: 'parent_id',
  })
  @IsOptional()
  parent_id: string

  @ApiProperty({
    required: true,
    type: 'number',
    name: 'level',
  })
  @IsOptional()
  level: number

  @ApiProperty({
    required: true,
    type: 'number',
    name: 'sort',
  })
  @IsOptional()
  sort: number

  @ApiProperty({
    required: true,
    type: 'number',
    name: 'header',
  })
  @IsOptional()
  header: number

  @ApiProperty({
    required: true,
    type: 'string',
    name: 'code',
  })
  @IsString()
  code: string

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
    name: 'name_eng',
  })
  @IsOptional()
  name_eng: string

  @ApiProperty({
    required: true,
    type: 'string',
    name: 'desc',
  })
  @IsOptional()
  desc: string

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

export class WellnessEventMemberResultPutDto implements PutDto<WellnessEventMemberResult> {
  updated_by: string

  @ApiProperty({
    required: false,
    type: 'number',
    name: 'wellness_event_member_id',
  })
  @IsOptional()
  wellness_event_member_id: number

  @IsOptional()
  @IsString()
  main_id: string

  @IsOptional()
  @IsString()
  parent_id: string

  @IsOptional()
  @IsNumber()
  level: number

  @IsOptional()
  @IsNumber()
  sort: number

  @IsOptional()
  @IsNumber()
  header: number

  @IsOptional()
  @IsString()
  code: string

  @IsOptional()
  @IsString()
  name: string

  @IsOptional()
  @IsString()
  name_eng: string

  @IsOptional()
  @IsString()
  desc: string

  @IsOptional()
  wellnessEventMember: WellnessEventMember
}

@Exclude()
export class WellnessEventMemberResultResponseDto
  implements ResponseDto<WellnessEventMemberResult>
{
  @Expose()
  id: number

  @Expose()
  wellness_event_member_id: number

  @Expose()
  main_id: string

  @Expose()
  parent_id: string

  @Expose()
  level: number

  @Expose()
  sort: number

  @Expose()
  header: number

  @Expose()
  code: string

  @Expose()
  name: string

  @Expose()
  name_eng: string

  @Expose()
  desc: string

  @Expose()
  wellnessEventMember: WellnessEventMember
}

export class WellnessEventMemberResultQueryDto extends PaginationQuery {
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
    type: 'number',
    name: 'wellness_event_member_id',
  })
  @IsOptional()
  @IsString()
  wellness_event_member_id: number

  @ApiProperty({
    required: false,
    type: 'string',
    name: 'src',
  })
  @IsOptional()
  @IsString()
  src: string
}
