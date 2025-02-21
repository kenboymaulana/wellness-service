import {
  CreateDto,
  PaginationQuery,
  PutDto,
  ResponseDto,
} from '../../../base/Dto.Base'
import WellnessEvent from './WellnessEvent.Entity'
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
import WellnessEventMember from '../WellnessEventMemberModules/WellnessEventMember.Entity'
import MedicalStaff from 'src/modules/MedicalStaffModules/MedicalStaff.Entity'
import WellnessPrograms from '../WellnessProgramsModules/WellnessPrograms.Entity'

export class WellnessEventRequestDto implements CreateDto<WellnessEvent> {
  created_by: string

  @ApiProperty({
    required: true,
    type: 'number',
    name: 'medical_staff_id',
  })
  @IsNumber()
  medical_staff_id: number

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
    name: 'model_code',
  })
  @IsString()
  model_code: string

  @ApiProperty({
    required: false,
    type: 'string',
    name: 'start_date',
  })
  @IsOptional()
  @IsDateString()
  start_date: Date

  @ApiProperty({
    required: false,
    type: 'string',
    name: 'end_date',
  })
  @IsOptional()
  @IsDateString()
  end_date: Date

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
    name: 'image',
  })
  @IsOptional()
  @IsString()
  image: string

  @IsOptional()
  @IsString()
  status: string

  @IsOptional()
  wellnessEventMember: WellnessEventMember

  @IsOptional()
  medicalStaff: MedicalStaff

  // @IsOptional()
  // wellnessPrograms: WellnessPrograms
}

export class WellnessEventPutDto implements PutDto<WellnessEvent> {
  updated_by: string

  @IsOptional()
  @IsNumber()
  medical_staff_id: number

  @IsOptional()
  @IsString()
  name: string

  @IsOptional()
  @IsString()
  model_code: string

  @IsOptional()
  @IsDateString()
  start_date: Date

  @IsOptional()
  @IsDateString()
  end_date: Date

  @IsOptional()
  @IsString()
  description: string

  @IsOptional()
  @IsString()
  image: string

  @IsOptional()
  @IsString()
  status: string

  @IsOptional()
  wellnessEventMember: WellnessEventMember

  @IsOptional()
  medicalStaff: MedicalStaff

  // @IsOptional()
  // wellnessPrograms: WellnessPrograms
}

@Exclude()
export class WellnessEventResponseDto implements ResponseDto<WellnessEvent> {
  @Expose()
  id: number

  @Expose()
  medical_staff_id: number

  @Expose()
  name: string

  @Expose()
  model_code: string

  @Expose()
  start_date: Date

  @Expose()
  end_date: Date

  @Expose()
  description: string

  @Expose()
  image: string

  @Expose()
  status: string

  @Expose()
  medicalStaff: MedicalStaff

  @Expose()
  modelCode:WellnessPrograms
}

export class WellnessEventQueryDto extends PaginationQuery {
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
    type: 'string',
    name: 'status',
  })
  @IsOptional()
  @IsString()
  status: string

  @ApiProperty({
    required: false,
    type: 'string',
    name: 'src',
  })
  @IsOptional()
  @IsString()
  src: string
}
