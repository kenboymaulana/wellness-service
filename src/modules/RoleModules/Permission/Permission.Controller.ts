import { Controller, Get, Query } from '@nestjs/common'
import { BadRequestException } from '@nestjs/common/exceptions'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { plainToInstance } from 'class-transformer'
import { query } from 'express'
import { UserInfo } from 'src/core/decorators/UserInfo.Decorator'
import { TransformResponse } from 'src/core/interceptors/TransformResponse.Interceptor'
import CheckPermissionService from 'src/modules/CheckPermission/CheckPermission.Service'
import UserService from 'src/modules/UserModules/User/User.Service'
import { Brackets } from 'typeorm'
import PermissionResponseDto, { PermissionQueryDto } from './Permission.Dto'
import PermissionService from './Permission.Service'
import PermissionGroupService from '../PermissionGroup/PermissionGroup.Service'

@ApiTags('Permission')
@ApiBearerAuth()
@Controller('permission')
export default class PermissionController {
  constructor(
    private readonly permissionService: PermissionService,
    private readonly permissionGroupService: PermissionGroupService,
    private readonly userService: UserService,
    private readonly checkPermissionService: CheckPermissionService,
  ) {}

  @Get()
  async index(
    @UserInfo() user,
    @Query() query: PermissionQueryDto,
  ): Promise<TransformResponse<PermissionResponseDto>> {
    const dataUser = await this.userService.getOne({
      where: {
        id: user.user.id,
      },
      relations: {
        roles: true,
      },
    })

    const data = await this.permissionService
      .getRepository()
      .createQueryBuilder('permission')
      .leftJoinAndSelect('permission.roles', 'role')
      .orderBy('permission.sort', 'ASC')

    if ('name' in query) {
      await data.andWhere(
        new Brackets((qb) => {
          qb.orWhere('permission.name ilike :name', {
            name: `%${query.name + ':'}%`,
          }).orWhere('permission.name like :name2', {
            name2: `%${'module:' + query.name}%`,
          })
        }),
      )
    }

    const result = await data
      .andWhere('role.id = :id', { id: dataUser.roles[0].id })
      .getMany()

    const results = []

    result.forEach(async (value) => {
      delete value.roles
      results.push(value)
    })
    const response = plainToInstance(PermissionResponseDto, results)
    return { data: response }
  }

  @Get('/role')
  async getPermissionRole(
    @Query() query: PermissionQueryDto,
    @UserInfo() user,
  ) {
    const check = await this.checkPermissionService.checkPermissionArray(
      [],
      user.user.id,
    )
    if (check != true) {
      return check
    }

    

    throw new BadRequestException('your body type not found!')
  }

  @Get('/roles-module')
  async getPermission(@Query() query: PermissionQueryDto, @UserInfo() user) {
    const check = await this.checkPermissionService.checkPermissionArray(
      [],
      user.user.id,
    )
    if (check != true) {
      return check
    }

    const data = await this.permissionGroupService
      .getRepository()
      .createQueryBuilder('permisionGroups')
      .leftJoinAndSelect('permisionGroups.permission', 'permissions')
      // .where('permissions.name like :name', {
      //   name: `%${''}%`,
      // })
      .orderBy('permisionGroups.sort', 'ASC')
      .addOrderBy('permissions.sort', 'ASC')
      .getMany()
    return { data: data }
  }
}
