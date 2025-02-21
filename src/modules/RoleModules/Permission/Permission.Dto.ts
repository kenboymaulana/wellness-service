import { ApiProperty } from '@nestjs/swagger'
import { Exclude, Expose } from 'class-transformer'
import { IsOptional, IsString } from 'class-validator'
import { PaginationQuery, ResponseDto } from 'src/base/Dto.Base'
import PermisionGroup from '../PermissionGroup/PermissionGroup.Entity'
import Role from '../Role/Role.Entity'
import Permission from './Permission.Entity'

@Exclude()
export default class PermissionResponseDto implements ResponseDto<Permission> {
  @Expose()
  id: number

  @Expose()
  name: string

  @Expose()
  description: string

  @Expose()
  icon: string

  @Expose()
  group_id: number

  @Expose()
  sort: number

  @Expose()
  path: string

  @Expose()
  type: string

  @Expose()
  roles?: Role[]

  @Expose()
  permisionGroup: PermisionGroup

}

export class PermissionQueryDto extends PaginationQuery {
  @ApiProperty({
    required: false,
    type: 'string',
    name: 'name',
  })
  @IsOptional()
  @IsString()
  name: string

  @ApiProperty({
    required: false,
    type: 'string',
    name: 'type',
  })
  @IsOptional()
  @IsString()
  type: string
}
