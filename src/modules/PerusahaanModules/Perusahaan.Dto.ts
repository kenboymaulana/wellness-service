import {
  CreateDto,
  PaginationQuery,
  PutDto,
  ResponseDto,
} from 'src/base/Dto.Base'
import Perusahaan from './Perusahaan.Entity'
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

export class PerusahaanRequestDto implements CreateDto<Perusahaan> {
  created_by: string

  @ApiProperty({
    required: true,
    type: 'string',
    name: 'npwp',
  })
  @IsString()
  npwp: string

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
    name: 'contact',
  })
  @IsString()
  contact: string

  @ApiProperty({
    required: true,
    type: 'string',
    name: 'address',
  })
  @IsString()
  address: string

  // @IsOptional()
  // wellnessEvent: WellnessEvent
}

export class PerusahaanPutDto implements PutDto<Perusahaan> {
  updated_by: string

  @IsOptional()
  @IsString()
  npwp: string

  @IsOptional()
  @IsString()
  name: string

  @IsOptional()
  @IsString()
  contact: string

  @IsOptional()
  @IsString()
  address: string

  // @IsOptional()
  // wellnessEvent: WellnessEvent
}

@Exclude()
export class PerusahaanResponseDto implements ResponseDto<Perusahaan> {
  @Expose()
  id: number

  @Expose()
  npwp: string

  @Expose()
  name: string

  @Expose()
  contact: string

  @Expose()
  address: string
}

export class PerusahaanQueryDto extends PaginationQuery {
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
