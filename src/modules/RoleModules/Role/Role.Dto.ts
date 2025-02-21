import {
  CreateDto,
  PaginationQuery,
  PutDto,
  ResponseDto,
} from '../../../base/Dto.Base'
import Role from './Role.Entity'
import { Exclude, Expose } from 'class-transformer'
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator'
import User from 'src/modules/UserModules/User/User.Entity'
import Permission from '../Permission/Permission.Entity'
import { ApiProperty } from '@nestjs/swagger'

@Exclude()
export class RoleResponseDto implements ResponseDto<Role> {
  @Expose()
  id: number

  @Expose()
  name: string
  // @Expose()
  // users?: User[]

  @Expose()
  for_type: string

  @Expose()
  permissions?: Permission[]
}

export class RoleRequestDto implements CreateDto<Role> {
  @IsString()
  name: string

  @IsString()
  for_type: string

  @IsOptional()
  users?: User[]

  @IsOptional()
  permissions?: Permission[]

  @IsOptional()
  @IsString()
  type: string
}

export class RolePutDto implements PutDto<Role> {
  @IsOptional()
  @IsString()
  name: string

  @IsOptional()
  @IsString()
  for_type: string

  @IsOptional()
  users?: User[]

  @IsOptional()
  permissions?: Permission[]
}

export class RolePermissionRequestDto {
  @ApiProperty({
    required: false,
    type: 'string',
    name: 'role_id',
  })
  @IsOptional()
  // @IsNumber()
  role_id: number

  @IsOptional()
  @IsArray()
  permission_id: number[]
}

export class RoleQueryDto extends PaginationQuery {
  @ApiProperty({
    required: false,
    type: 'string',
    name: 'id',
  })
  @IsOptional()
  @IsString()
  id: number

  @ApiProperty({
    required: false,
    type: 'string',
    name: 'src',
  })
  @IsOptional()
  @IsString()
  src: string

  @ApiProperty({
    required: false,
    type: 'string',
    name: 'type',
  })
  @IsOptional()
  @IsString()
  type: string
}
