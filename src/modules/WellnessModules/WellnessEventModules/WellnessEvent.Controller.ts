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
import WellnessEventService from './WellnessEvent.Service'
import {
  WellnessEventPutDto,
  WellnessEventRequestDto,
  WellnessEventResponseDto,
  WellnessEventQueryDto,
} from './WellnessEvent.Dto'
import { plainToInstance } from 'class-transformer'
import { Brackets } from 'typeorm'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { UserInfo } from 'src/core/decorators/UserInfo.Decorator'
import { PublicRoute } from 'src/config/Jwt.Config'
import WellnessPrograms from '../WellnessProgramsModules/WellnessPrograms.Entity'
import WellnessEventMember from '../WellnessEventMemberModules/WellnessEventMember.Entity'

@ApiTags('WellnessEvent')
@ApiBearerAuth()
// @PublicRoute()
@Controller('wellness-event')
export default class WellnessEventController {
  constructor(private readonly WellnessEventService: WellnessEventService) {}

  @Get()
  async index(@UserInfo() users, @Query() query: WellnessEventQueryDto) {
    const defaultLimit = query.limit || 5
    const defaultPage = query.page || 1
    const offset = (defaultPage - 1) * defaultLimit

    const data =
      await this.WellnessEventService.getRepository().createQueryBuilder(
        'WellnessEvent',
      )
      .leftJoinAndSelect('WellnessEvent.medicalStaff', 'medicalStaff')
      .leftJoinAndMapOne('WellnessEvent.modelCode', WellnessPrograms, 'modelCode', 'modelCode.code=WellnessEvent.model_code')
      .leftJoinAndSelect('WellnessEvent.wellnessEventMember', 'wellnessEventMember', 'wellnessEventMember.wellness_event_id=WellnessEvent.id')

      if(users?.user?.type === 'EMPLOYEE') {
        // console.log(users?.user?.email)
        await data.andWhere('wellnessEventMember.nik = :nik', { nik: users?.user?.employees[0]?.nik });
      }
      if(users?.user?.type === 'STAFF') {
        // console.log(users?.user?.email)
        await data.andWhere('WellnessEvent.medical_staff_id = :medical_staff_id', { medical_staff_id: users.user.medicalStaffs[0].id });
      }

    const fieldFilter = []
    fieldFilter.push({
      par: 'id',
      field: 'WellnessEvent.id',
      mode: 'andWhere',
      mode2: 'equal',
    })
    fieldFilter.push({
      par: 'status',
      field: 'WellnessEvent.status',
      mode: 'andWhere',
      mode2: 'equal',
    })
    
    // console.log(users)

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
          const fieldSrc = ['WellnessEvent.name']
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

    await data.orderBy('WellnessEvent.created_at', 'DESC')

    const count = await data.getCount()
    if (query.limit != -1) {
      await data.take(defaultLimit).skip(offset)
    }
    const result = await data.getMany()
    const response = plainToInstance(WellnessEventResponseDto, result)
    return { data: response, count: count }
  }

  @Post()
  async save(@Body() body: WellnessEventRequestDto) {
    const data = await this.WellnessEventService.save(body)
    const response = plainToInstance(WellnessEventResponseDto, data)
    return { data: response }
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: WellnessEventPutDto) {
    const query = await this.WellnessEventService.update(id, body)
    const response = plainToInstance(WellnessEventResponseDto, query)
    return { data: response }
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    // await this.WellnessEventService.update(id, { deleted_by: user.user.full_name })
    const query = await this.WellnessEventService.delete(id)
    return { data: query }
  }
}
