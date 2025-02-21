import { DeepPartial } from 'typeorm'
import { BaseEntityUuid } from './Entity.Base'
import { IsNumber, IsOptional, Min } from 'class-validator'
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

export type ResponseDto<Entity> = Readonly<DeepPartial<Entity>>
export type CreateDto<Entity> = Readonly<Omit<Entity, keyof BaseEntityUuid>>
export type PatchDto<Entity> = Readonly<DeepPartial<CreateDto<Entity>>>
export type PutDto<Entity> = Readonly<Omit<Entity, keyof BaseEntityUuid>>

export class BaseDto {
  createdBy: string
  updatedBy: string
  deletedBy: string
}

export class PaginationQuery {

  @ApiProperty({
    required: false,
    type: 'number',
    name: 'page',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  page?: number

  @ApiProperty({
    required: false,
    type: 'number',
    name: 'limit',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number
}
