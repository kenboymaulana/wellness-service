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
import WellnessProgramsService from './WellnessPrograms.Service'
import WellnessProgramItemService from '../WellnessProgramItemModules/WellnessProgramItem.Service'
import {
  WellnessProgramsPutDto,
  WellnessProgramsRequestDto,
  WellnessProgramsResponseDto,
  WellnessProgramsQueryDto,
  WellnessProgramsItemsRequestDto,
} from './WellnessPrograms.Dto'
import { plainToInstance } from 'class-transformer'
import { Brackets } from 'typeorm'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { UserInfo } from 'src/core/decorators/UserInfo.Decorator'
import { userInfo } from 'os'
import { PublicRoute } from 'src/config/Jwt.Config'

@ApiTags('WellnessPrograms')
@ApiBearerAuth()
@PublicRoute()
@Controller('wellness-programs')
export default class WellnessProgramsController {
  constructor(
    private readonly WellnessProgramsService: WellnessProgramsService, 
    private readonly wellnessProgramItemService: WellnessProgramItemService
    ) {}

  @Get()
  async index(@Query() query: WellnessProgramsQueryDto) {
    const defaultLimit = query.limit || 5
    const defaultPage = query.page || 1
    const offset = (defaultPage - 1) * defaultLimit

    const data =
      await this.WellnessProgramsService.getRepository().createQueryBuilder(
        'WellnessPrograms',
      )

    const fieldFilter = []
    fieldFilter.push({
      par: 'id',
      field: 'WellnessPrograms.id',
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
          const fieldSrc = ['WellnessPrograms.name']
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
    const response = plainToInstance(WellnessProgramsResponseDto, result)
    return { data: response, count: count }
  }

  @Post()
  async save(@Body() body: WellnessProgramsRequestDto) {
    const data = await this.WellnessProgramsService.save(body)
    const response = plainToInstance(WellnessProgramsResponseDto, data)
    return { data: response }
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: WellnessProgramsPutDto) {
    const query = await this.WellnessProgramsService.update(id, body)
    const response = plainToInstance(WellnessProgramsResponseDto, query)
    return { data: response }
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    // await this.WellnessProgramsService.update(id, { deleted_by: user.user.full_name })
    const query = await this.WellnessProgramsService.delete(id)
    return { data: query }
  }

  @Post('items')
  async saveWnProgramItems(@Body() body: WellnessProgramsItemsRequestDto) {
    const data = [];
    body.wellness_item_id.forEach(el => {
      const bodyData = {
        wellness_program_id: body.wellness_program_id,
        wellness_item_id: el,
      }

      data.push(bodyData)
    });

    await this.wellnessProgramItemService.getRepository().delete({wellness_program_id: body.wellness_program_id})
    
    let request
    data.forEach(async (el) => {
      request = await this.wellnessProgramItemService.save(el)
    })

    const response = plainToInstance(WellnessProgramsResponseDto, request)

    return { data: response }
  }
}
