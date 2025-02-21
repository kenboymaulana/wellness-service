import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common'
import RoleService from './Role.Service'
import { TransformResponse } from '../../../core/interceptors/TransformResponse.Interceptor'
import {
  RolePermissionRequestDto,
  RolePutDto,
  RoleQueryDto,
  RoleRequestDto,
  RoleResponseDto,
} from './Role.Dto'
import { plainToInstance } from 'class-transformer'
import CheckPermissionService from 'src/modules/CheckPermission/CheckPermission.Service'
import { UserInfo } from 'src/core/decorators/UserInfo.Decorator'
import { ParseUUIDPipe } from '@nestjs/common/pipes'
import PermissionService from '../Permission/Permission.Service'
import { In } from 'typeorm'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

@ApiTags('Role')
@ApiBearerAuth()
@Controller('roles')
export default class RoleController {
  constructor(
    private readonly roleService: RoleService,
    private readonly checkPermissionService: CheckPermissionService,
    private readonly permissionService: PermissionService,
  ) {}
  @Get()
  async index(@UserInfo() user, @Query() query: RoleQueryDto) {
    const check = await this.checkPermissionService.checkPermissionArray(
      ['upMaster:roleRead'],
      user.user.id,
    )
    if (check != true) {
      return check
    }
    const defaultLimit = query.limit || 5
    const defaultPage = query.page || 1
    const offset = (defaultPage - 1) * defaultLimit
    const data = await this.roleService
      .getRepository()
      .createQueryBuilder('roles')
      .orderBy('roles.created_at', 'DESC')

    if ('id' in query) {
      await data.andWhere('roles.id = :ids', { ids: query.id })
    }

    if ('src' in query) {
      await data.andWhere('roles.name like :name', { name: `%${query.src}%` })
    }

    const count = await data.getCount()
    if (query.limit != -1) {
      await data.take(defaultLimit).skip(offset)
    }
    const result = await data.getMany()
    const response = plainToInstance(RoleResponseDto, result)

    return { data: response, count: count }
  }

  @Post()
  async save(@UserInfo() user, @Body() body: RoleRequestDto) {
    const check = await this.checkPermissionService.checkPermissionArray(
      ['upMaster:roleManage'],
      user.user.id,
    )
    if (check != true) {
      return check
    }
    const data = await this.roleService.save(body)
    const response = plainToInstance(RoleResponseDto, data)

    return { data: response }
  }

  @Put(':id')
  async update(
    @UserInfo() user,
    @Body() body: RolePutDto,
    @Param('id') id: number,
  ) {
    const check = await this.checkPermissionService.checkPermissionArray(
      ['upMaster:roleManage'],
      user.user.id,
    )
    if (check != true) {
      return check
    }
    const data = await this.roleService.update(id, body)
    const response = plainToInstance(RoleResponseDto, data)
    return { data: response }
  }

  @Delete(':id')
  async delete(@UserInfo() user, @Param('id') id: number) {
    const check = await this.checkPermissionService.checkPermissionArray(
      ['upMaster:roleManage'],
      user.user.id,
    )
    if (check != true) {
      return check
    }
    const data = await this.roleService.delete(id)
    return { data: data }
  }

  @Get('permission')
  async getRolePermission(@Query() query: RolePermissionRequestDto) {
    const data = await this.roleService
      .getRepository()
      .createQueryBuilder('role')
      .leftJoinAndSelect('role.permissions', 'permission')

    if ('role_id' in query) {
      await data.andWhere('role.id = :id', { id: query.role_id })
    }

    const result = await data.getMany()
    const response = plainToInstance(RoleResponseDto, result)
    return { data: response }
  }

  @Post('permission')
  async saveRolePermission(@Body() body: RolePermissionRequestDto) {
    const dataRole = await this.roleService.getOne({
      where: {
        id: body.role_id,
      },
      relations: {
        permissions: true,
      },
    })

    const dataPermission = await this.permissionService.getRepository().find({
      where: {
        id: In(body.permission_id),
      },
    })

    dataRole.permissions = dataPermission

    const data = await this.roleService.save(dataRole)
    const response = plainToInstance(RoleResponseDto, data)

    return { data: response }
  }
}
