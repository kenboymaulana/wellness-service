import { Exclude, Expose } from 'class-transformer'
import { PaginationQuery, PutDto, ResponseDto } from '../../../base/Dto.Base'
import User from './User.Entity'
import { UserType } from './User.Enum'
import {
  IsEnum,
  IsNumber,
  isObject,
  IsOptional,
  isString,
  IsString,
} from 'class-validator'
import Role from '../../RoleModules/Role/Role.Entity'
import { ApiProperty } from '@nestjs/swagger'
import Employee from 'src/modules/EmployeeModules/Employee.Entity'
import MedicalStaff from 'src/modules/MedicalStaffModules/MedicalStaff.Entity'

@Exclude()
export class UserResponseDto implements ResponseDto<User> {
  @Expose()
  id: number

  @Expose()
  full_name: string

  @Expose()
  email: string

  @Expose()
  is_verified: boolean

  @Expose()
  is_main: boolean

  @Expose()
  type: UserType

  @Expose()
  active_user: number

  @Expose()
  employees: Employee[]

  @Expose()
  medicalStaffs: MedicalStaff[]

  @Expose()
  roles: Role[]
}

export class UserPutDto {
  @IsOptional()
  full_name: string

  @IsOptional()
  @IsString()
  email: string

  @IsOptional()
  @IsString()
  password: string

  @IsOptional()
  @IsString()
  is_main: boolean

  @IsOptional()
  is_verified: boolean

  @ApiProperty({
    required: true,
    type: 'enum',
    enum: UserType,
  })
  @IsOptional()
  @IsEnum(UserType)
  type: UserType

  @IsOptional()
  roles?: Role[]

  @IsOptional()
  @IsNumber()
  role_id: number

  @IsOptional()
  @IsString()
  clinic_id: number

  @IsOptional()
  @IsNumber()
  active_user: number
}

export class UserQueryDto extends PaginationQuery {
  @IsOptional()
  @IsString()
  id: number

  @IsOptional()
  @IsString()
  src: string

  @IsOptional()
  @IsString()
  type: string
}
