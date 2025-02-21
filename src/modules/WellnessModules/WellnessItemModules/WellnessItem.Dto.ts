import {
  CreateDto,
  PaginationQuery,
  PutDto,
  ResponseDto,
} from '../../../base/Dto.Base'
import WellnessItem from './WellnessItem.Entity'
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
import MedicalStaff from 'src/modules/MedicalStaffModules/MedicalStaff.Entity'

export class WellnessItemRequestDto implements CreateDto<WellnessItem> {
  created_by: string

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

  // @IsOptional()
  // wellnessEvent: WellnessEvent
}

export class WellnessItemPutDto implements PutDto<WellnessItem> {
  updated_by: string

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

  // @IsOptional()
  // wellnessEvent: WellnessEvent
}

@Exclude()
export class WellnessItemResponseDto implements ResponseDto<WellnessItem> {
  @Expose()
  id: number

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
}

export class WellnessItemQueryDto extends PaginationQuery {
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
