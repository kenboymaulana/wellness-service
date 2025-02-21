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
import WellnessEventMemberResultValuesService from './WellnessEventMemberResultValues.Service'
import {
  WellnessEventMemberResultValuesPutDto,
  WellnessEventMemberResultValuesRequestDto,
  WellnessEventMemberResultValuesResponseDto,
  WellnessEventMemberResultValuesQueryDto,
} from './WellnessEventMemberResultValues.Dto'
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

@ApiTags('Wellness Event Member Result')
@ApiBearerAuth()
// @PublicRoute()
@Controller('wellness-event-member-result-values')

export default class WellnessEventMemberResultValuesController {
  constructor(
    private readonly WellnessEventMemberResultValuesService: WellnessEventMemberResultValuesService,
    private readonly employeeService: EmployeeService,
    private readonly userService: UserService,
    private readonly roleService: RoleService,
    ) {}
   
    
    @Get()
    async index(@Query() query: WellnessEventMemberResultValuesQueryDto) {
      const defaultLimit = query.limit || 5
      const defaultPage = query.page || 1
      const offset = (defaultPage - 1) * defaultLimit

    const data =
      await this.WellnessEventMemberResultValuesService.getRepository().createQueryBuilder(
        'WellnessEventMemberResultValues',
      )
      // .leftJoinAndMapOne('WellnessEventMemberResultValues.programItem', 'programItem', 'programItem.program_item_id = programItems.id')


    const fieldFilter = []
    fieldFilter.push({
      par: 'id',
      field: 'WellnessEventMemberResultValues.id',
      mode: 'andWhere',
      mode2: 'equal',
    })
    fieldFilter.push({
      par: 'wellness_event_member_id',
      field: 'WellnessEventMemberResultValues.wellness_event_member_id',
      mode: 'andWhere',
      mode2: 'equal',
    })

    if(query.time) {
      console.log(query.time)
      data.andWhere(`WellnessEventMemberResultValues.date = :date`, {date: query.time})
    }

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
          const fieldSrc = ['WellnessEventMemberResultValues.name']
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
    const response = plainToInstance(WellnessEventMemberResultValuesResponseDto, result)
    return { data: response, count: count }
  }

  @Post()
  async save(@Body() body: WellnessEventMemberResultValuesRequestDto) {
    const data = [];
    body.result.forEach(({item_code, item_value}) => {
      const bodyData = {
        item_code: item_code,
        item_value: item_value,
        wellness_event_member_id: body.wellness_event_member_id,
        time_input: new Date(),
        date: new Date()
      }

      data.push(bodyData)
    });


    const today = new Date();
    today.setHours(0, 0, 0, 0);
    await this.WellnessEventMemberResultValuesService.getRepository().delete({wellness_event_member_id: body.wellness_event_member_id, date: today})
    
    let request
    data.forEach(async (el) => {
      request = await this.WellnessEventMemberResultValuesService.getRepository().save(el)
    })

    const response = plainToInstance(WellnessEventMemberResultValuesResponseDto, request)
    return { data: response }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() body: WellnessEventMemberResultValuesPutDto,
  ) {
    const query = await this.WellnessEventMemberResultValuesService.update(id, body)
    const response = plainToInstance(WellnessEventMemberResultValuesResponseDto, query)
    return { data: response }
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    // await this.WellnessEventMemberResultValuesService.update(id, { deleted_by: user.user.full_name })
    const query = await this.WellnessEventMemberResultValuesService.delete(id)
    return { data: query }
  }

  @Get('tree')
  async getItemTree(@Query() query: WellnessEventMemberResultValuesQueryDto) {
    const defaultLimit = query.limit || 5
    const defaultPage = query.page || 1
    const offset = (defaultPage - 1) * defaultLimit

    const request =
      await this.WellnessEventMemberResultValuesService.getRepository().createQueryBuilder(
        'WellnessEventMemberResultValues',
      )

      const fieldFilter = []
      fieldFilter.push({
        par: 'id',
        field: 'WellnessEventMemberResultValues.id',
        mode: 'andWhere',
        mode2: 'equal',
      })
      fieldFilter.push({
        par: 'wellness_event_member_id',
        field: 'WellnessEventMemberResultValues.wellness_event_member_id',
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
                await request.andWhere(
                  rowJSON.field + ' like :' + rowJSON.par,
                  parJSON,
                )
              } else {
                await request.andWhere(rowJSON.field + ' = :' + rowJSON.par, parJSON)
              }
            }
          }
        }
      }

      if(query.time) {
        console.log(query.time)
        request.andWhere(`WellnessEventMemberResultValues.date = :date`, {date: query.time})
      }
  
      if ('src' in query) {
        await request.andWhere(
          new Brackets((qb) => {
            const fieldSrc = ['WellnessEventMemberResultValues.name']
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
    const result = await request.getMany()
    
    const resultTree = await this.WellnessEventMemberResultValuesService.convertToTree(result)
    // console.log(tes)

    // const response = plainToInstance(WellnessEventMemberResultValuesResponseDto, resultTree)
    return { data: resultTree }
  }
}
