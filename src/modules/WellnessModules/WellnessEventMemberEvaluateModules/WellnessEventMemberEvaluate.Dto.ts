import {
  CreateDto,
  PaginationQuery,
  PutDto,
  ResponseDto,
} from '../../../base/Dto.Base'
import WellnessEventMemberEvaluate from './WellnessEventMemberEvaluate.Entity'
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

export class WellnessEventMemberEvaluateRequestDto
  implements CreateDto<WellnessEventMemberEvaluate>
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
    name: 'keluhan_saat_ini',
  })
  @IsOptional()
  keluhan_saat_ini: string

  @ApiProperty({
    required: true,
    type: 'string',
    name: 'tingkat_keberhasilan',
  })
  @IsOptional()
  tingkat_keberhasilan: string

  @ApiProperty({
    required: true,
    type: 'string',
    name: 'motivasi',
  })
  @IsOptional()
  motivasi: string

  @ApiProperty({
    required: true,
    type: 'string',
    name: 'evaluasi',
  })
  @IsOptional()
  evaluasi: string

  @IsOptional()
  wellnessEventMember: WellnessEventMember
}

export class WellnessEventMemberEvaluatePutDto implements PutDto<WellnessEventMemberEvaluate> {
  updated_by: string

  @ApiProperty({
    required: false,
    type: 'number',
    name: 'wellness_event_member_id',
  })
  @IsOptional()
  @IsNumber()
  wellness_event_member_id: number

  @ApiProperty({
    required: false,
    type: 'string',
    name: 'keluhan_saat_ini',
  })
  @IsOptional()
  keluhan_saat_ini: string

  @ApiProperty({
    required: false,
    type: 'string',
    name: 'tingkat_keberhasilan',
  })
  @IsOptional()
  tingkat_keberhasilan: string

  @ApiProperty({
    required: false,
    type: 'string',
    name: 'motivasi',
  })
  @IsOptional()
  motivasi: string

  @ApiProperty({
    required: false,
    type: 'string',
    name: 'evaluasi',
  })
  @IsOptional()
  evaluasi: string

  @IsOptional()
  wellnessEventMember: WellnessEventMember
}

@Exclude()
export class WellnessEventMemberEvaluateResponseDto
  implements ResponseDto<WellnessEventMemberEvaluate>
{
  @Expose()
  id: number

  @Expose()
  keluhan_saat_ini: string

  @Expose()
  tingkat_keberhasilan: string

  @Expose()
  motivasi: string

  @Expose()
  evaluasi: string

  @Expose()
  wellnessEventMember: WellnessEventMember
}

export class WellnessEventMemberEvaluateQueryDto extends PaginationQuery {
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
    name: 'src',
  })
  @IsOptional()
  @IsString()
  src: string
}
