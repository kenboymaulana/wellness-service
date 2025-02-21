import {
  CreateDto,
  PaginationQuery,
  PutDto,
  ResponseDto,
} from '../../../base/Dto.Base'
import WellnessPrograms from './WellnessPrograms.Entity'
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
import MedicalStaff from 'src/modules/MedicalStaffModules/MedicalStaff.Entity'
import { array } from 'joi'
import { PrimaryGeneratedColumn } from 'typeorm'

export class WellnessProgramsRequestDto implements CreateDto<WellnessPrograms> {
  created_by: string

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
    name: 'wellness_item_id',
  })
  @IsOptional()
  @IsNumber()
  wellness_program_id: number
  
  @ApiProperty({
    required: true,
    type: 'string',
    name: 'wellness_item_id',
  })
  @IsOptional()
  @IsArray()
  wellness_item_id: []

  // @IsOptional()
  // wellnessEvent: WellnessEvent
}

export class WellnessProgramsItemsRequestDto {
  created_by: string

  id: number

  @ApiProperty({
    required: true,
    type: 'string',
    name: 'wellness_item_id',
  })
  @IsOptional()
  @IsNumber()
  wellness_program_id: number
  
  @ApiProperty({
    required: true,
    type: 'string',
    name: 'wellness_item_id',
  })
  @IsOptional()
  @IsArray()
  wellness_item_id: []

  // @IsOptional()
  // wellnessEvent: WellnessEvent
}

export class WellnessProgramsPutDto implements PutDto<WellnessPrograms> {
  updated_by: string

  @IsOptional()
  @IsString()
  code: string

  @IsOptional()
  @IsString()
  name: string

  // @IsOptional()
  // wellnessEvent: WellnessEvent
}

@Exclude()
export class WellnessProgramsResponseDto implements ResponseDto<WellnessPrograms> {
  @Expose()
  id: number

  @Expose()
  code: string

  @Expose()
  name: string
}

export class WellnessProgramsQueryDto extends PaginationQuery {
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
    name: 'src',
  })
  @IsOptional()
  @IsString()
  src: string
}
