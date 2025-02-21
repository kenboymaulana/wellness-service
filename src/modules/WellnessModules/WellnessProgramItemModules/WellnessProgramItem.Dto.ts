import {
  CreateDto,
  PaginationQuery,
  PutDto,
  ResponseDto,
} from '../../../base/Dto.Base'
import WellnessProgramItem from './WellnessProgramItem.Entity'
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
import WellnessItem from '../WellnessItemModules/WellnessItem.Entity'

export class WellnessProgramItemRequestDto implements CreateDto<WellnessProgramItem> {
  created_by: string

  @ApiProperty({
    required: true,
    type: 'string',
    name: 'wellness_program_id',
  })
  @IsNumber()
  wellness_program_id: number

  @ApiProperty({
    required: true,
    type: 'string',
    name: 'wellness_item_id',
  })
  @IsArray()
  wellness_item_id: number
}

export class WellnessProgramItemPutDto implements PutDto<WellnessProgramItem> {
  updated_by: string

  @IsOptional()
  wellness_program_id: number

  @IsOptional()
  wellness_item_id: number
}

@Exclude()
export class WellnessProgramItemResponseDto implements ResponseDto<WellnessProgramItem> {
  @Expose()
  id: number

  @Expose()
  wellness_program_id: number

  @Expose()
  wellness_item_id: number

  @Expose()
  wellnessItem: WellnessItem
}

export class WellnessProgramItemQueryDto extends PaginationQuery {
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
    name: 'wellness_program_id',
  })
  @IsOptional()
  @IsString()
  wellness_program_id: string

  @ApiProperty({
    required: false,
    type: 'string',
    name: 'src',
  })
  @IsOptional()
  @IsString()
  src: string
}
