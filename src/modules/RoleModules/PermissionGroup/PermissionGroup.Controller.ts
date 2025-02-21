import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { plainToInstance } from 'class-transformer'
import { query } from 'express'
import { UserInfo } from 'src/core/decorators/UserInfo.Decorator'
import { TransformResponse } from 'src/core/interceptors/TransformResponse.Interceptor'
import UserService from 'src/modules/UserModules/User/User.Service'
import {
  PermissionGroupQueryDto,
  PermissionGroupResponseDto,
} from './PermissionGroup.Dto'
import PermissionGroupService from './PermissionGroup.Service'

@ApiTags('Permission Group')
@ApiBearerAuth()
@Controller('permission-group')
export default class PermissionGroupController {
  constructor(
    private readonly permissionGroupService: PermissionGroupService,
    private readonly userService: UserService,
  ) {}

  @Get()
  async index(
    @Query() query: PermissionGroupQueryDto,
    @UserInfo() user,
  ): Promise<TransformResponse<PermissionGroupResponseDto>> {
    const dataUser = await this.userService.getOne({
      where: {
        id: user.user.id,
      },
      relations: {
        roles: true,
      },
    })

    const data = await this.permissionGroupService
      .getRepository()
      .createQueryBuilder('permissionGroup')
      .leftJoinAndSelect('permissionGroup.permission', 'permissions')
      .leftJoinAndSelect('permissions.roles', 'role')
      .where('permissions.name LIKE :name', {
        name: `%${'module:'}%`,
      })
      .andWhere('role.id = :id', { id: dataUser.roles[0].id })
      .orderBy('permissionGroup.sort', 'ASC')
      .addOrderBy('permissions.sort', 'ASC')

    const result = await data.getMany()
    const response = plainToInstance(PermissionGroupResponseDto, result)
    return { data: response }
  }
}
