import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Query,
  Put,
  Body,
  Delete,
} from '@nestjs/common'
import UserService from './User.Service'
import { plainToInstance } from 'class-transformer'
import { UserPutDto, UserQueryDto, UserResponseDto } from './User.Dto'
import { TransformResponse } from '../../../core/interceptors/TransformResponse.Interceptor'
import CheckPermissionService from 'src/modules/CheckPermission/CheckPermission.Service'
import { UserInfo } from 'src/core/decorators/UserInfo.Decorator'
import { Brackets } from 'typeorm'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import IndRoleSerivce from 'src/modules/RoleModules/Role/IndRole.Service'

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export default class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly checkPermissionService: CheckPermissionService,
    private readonly indRoleService: IndRoleSerivce,
  ) {}

  @Get()
  async index(@Query() query: UserQueryDto, @UserInfo() user) {
    const check = await this.checkPermissionService.checkPermissionArray(
      ['upMaster:userRead'],
      user.user.id,
    )
    if (check != true) {
      return check
    }

    const defaultLimit = query.limit || 10
    const defaultPage = query.page || 1
    const offset = (defaultPage - 1) * defaultLimit

    const data = await this.userService
      .getRepository()
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'role')
      // .leftJoinAndSelect('user.corporates', 'corporates')
      // .leftJoinAndSelect('user.patient', 'patients')
      .orderBy('user.created_at', 'DESC')

    const fieldFilter = []
    fieldFilter.push({
      par: 'id',
      field: 'user.id',
      mode: 'andWhere',
      mode2: 'equal',
    })
    fieldFilter.push({
      par: 'type',
      field: 'user.type',
      mode: 'andWhere',
      mode2: 'equal',
    })

    for (let i = 0; i < fieldFilter.length; i++) {
      const rowJSON = fieldFilter[i]
      if (rowJSON.par in query) {
        const filterData = query[rowJSON.par]
        if (filterData != 'All' && filterData != '') {
          const parJSON = {}
          if (rowJSON.mode2 == 'like') {
            parJSON[rowJSON.par] = `%${filterData}%`
          } else {
            parJSON[rowJSON.par] = filterData
          }

          if (rowJSON.mode == 'andWhere') {
            if (rowJSON.mode2 == 'like') {
              await data.andWhere(
                rowJSON.field + ' like :' + rowJSON.par,
                parJSON,
              )
            } else {
              await data.andWhere(rowJSON.field + ' = :' + rowJSON.par, parJSON)
            }
          }
        }
      }
    }

    if ('src' in query) {
      await data.andWhere(
        new Brackets((qb) => {
          const fieldSrc = ['user.full_name', 'user.email', 'role.name']
          const fieldSrcVar = ['full_name', 'email', 'name']
          for (let i = 0; i < fieldSrc.length; i++) {
            const fieldDB = fieldSrc[i]
            const fieldPar = fieldSrcVar[i]
            const parJSON = {}
            parJSON[fieldPar] = `%${query.src}%`
            qb.orWhere(fieldDB + ' like :' + fieldPar, parJSON)
          }
        }),
      )
    }

    const count = await data.getCount()
    if (query.limit != -1) {
      await data.take(defaultLimit).skip(offset)
    }
    const result = await data.getMany()
    const response = plainToInstance(UserResponseDto, result)
    return { data: response, count: count }
  }

  @Get(':user')
  async show(
    @Param('user', ParseUUIDPipe) id: number,
  ): Promise<TransformResponse<UserResponseDto>> {
    const query = await this.userService.getOneById(id)
    const response = plainToInstance(UserResponseDto, query)

    return { data: response }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() body: UserPutDto,
    @UserInfo() user,
  ) {
    const check = await this.checkPermissionService.checkPermissionArray(
      ['upMaster:userManage'],
      user.user.id,
    )
    if (check != true) {
      return check
    }

    body.active_user = 0

    const data = await this.userService.update(id, {
      updated_by: user.user.full_name,
      full_name: body.full_name,
      email: body.email,
      type: body.type,
      active_user: body.active_user,
    })
    const response = plainToInstance(UserResponseDto, data)

    if (body.role_id != null) {
      const userRole = await this.userService.getOne({
        where: {
          id: id,
        },
      })

      const roleData = await this.indRoleService.getOne({
        where: {
          id: body.role_id,
        },
      })

      const role = []
      role.push(roleData)
      userRole.roles = role

      await this.userService.save(userRole)
    }
    return { data: response }
  }

  @Delete(':id')
  async delete(@Param('id') id: number, @UserInfo() user) {
    const check = await this.checkPermissionService.checkPermissionArray(
      ['upMaster:userManage'],
      user.user.id,
    )
    if (check != true) {
      return check
    }
    await this.userService.update(id, { deleted_by: user.user.full_name })
    const data = await this.userService.delete(id)
    return { data: data }
  }
}
