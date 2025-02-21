import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common'
// import dateFormat from '@types/dateformat'
import WellnessEventMemberEvaluateService from './WellnessEventMemberEvaluate.Service'
import {
  WellnessEventMemberEvaluatePutDto,
  WellnessEventMemberEvaluateRequestDto,
  WellnessEventMemberEvaluateResponseDto,
  WellnessEventMemberEvaluateQueryDto,
} from './WellnessEventMemberEvaluate.Dto'
import { plainToInstance } from 'class-transformer'
import { Brackets } from 'typeorm'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { UserInfo } from 'src/core/decorators/UserInfo.Decorator'
import { userInfo } from 'os'
import { PublicRoute } from 'src/config/Jwt.Config'
import EmployeeService from 'src/modules/EmployeeModules/Employee.Service'
import AuthService from 'src/modules/AuthModules/Auth.Service'
import UserService from 'src/modules/UserModules/User/User.Service'
import { UserResponseDto } from 'src/modules/UserModules/User/User.Dto'
import RoleService from 'src/modules/RoleModules/Role/Role.Service'

import * as moment from "moment";

@ApiTags('Wellness Event Member Evaluate')
@ApiBearerAuth()
// @PublicRoute()
@Controller('wellness-event-member-evaluate')

export default class WellnessEventMemberEvaluateController {
  constructor(
    private readonly WellnessEventMemberEvaluateService: WellnessEventMemberEvaluateService,
    private readonly employeeService: EmployeeService,
    private readonly userService: UserService,
    private readonly roleService: RoleService,
    ) {}
   
    
    @Get()
    async index(@Query() query: WellnessEventMemberEvaluateQueryDto) {
      const defaultLimit = query.limit || 5
      const defaultPage = query.page || 1
      const offset = (defaultPage - 1) * defaultLimit

    const data =
      await this.WellnessEventMemberEvaluateService.getRepository().createQueryBuilder(
        'WellnessEventMemberEvaluate',
      )
      // .leftJoinAndMapOne('WellnessEventMemberEvaluate.programItem', 'programItem', 'programItem.program_item_id = programItems.id')


    const fieldFilter = []
    fieldFilter.push({
      par: 'id',
      field: 'WellnessEventMemberEvaluate.id',
      mode: 'andWhere',
      mode2: 'equal',
    })
    fieldFilter.push({
      par: 'wellness_event_member_id',
      field: 'WellnessEventMemberEvaluate.wellness_event_member_id',
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
          const fieldSrc = ['WellnessEventMemberEvaluate.name']
          const fieldSrcVar = ['name']
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
    const response = plainToInstance(WellnessEventMemberEvaluateResponseDto, result)
    return { data: response, count: count }
  }

  @Post()
  async save(@Body() body: WellnessEventMemberEvaluateRequestDto) {
    const request = await this.WellnessEventMemberEvaluateService.getRepository().save(body)

    const response = plainToInstance(WellnessEventMemberEvaluateResponseDto, request)
    return { data: response }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() body: WellnessEventMemberEvaluatePutDto,
  ) {
    const query = await this.WellnessEventMemberEvaluateService.update(id, body)
    const response = plainToInstance(WellnessEventMemberEvaluateResponseDto, query)
    return { data: response }
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    // await this.WellnessEventMemberEvaluateService.update(id, { deleted_by: user.user.full_name })
    const query = await this.WellnessEventMemberEvaluateService.delete(id)
    return { data: query }
  }
}
