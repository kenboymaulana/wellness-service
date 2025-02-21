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
import WellnessProgramItemService from './WellnessProgramItem.Service'
import {
  WellnessProgramItemPutDto,
  WellnessProgramItemRequestDto,
  WellnessProgramItemResponseDto,
  WellnessProgramItemQueryDto,
} from './WellnessProgramItem.Dto'
import { plainToInstance } from 'class-transformer'
import { Brackets } from 'typeorm'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { UserInfo } from 'src/core/decorators/UserInfo.Decorator'
import { userInfo } from 'os'
import { PublicRoute } from 'src/config/Jwt.Config'
import WellnessItem from '../WellnessItemModules/WellnessItem.Entity'

@ApiTags('WellnessProgramItem')
@ApiBearerAuth()
@PublicRoute()
@Controller('wellness-program-item')
export default class WellnessProgramItemController {
  constructor(private readonly WellnessProgramItemService: WellnessProgramItemService,) {}

  @Get()
  async index(@Query() query: WellnessProgramItemQueryDto) {
    const defaultLimit = query.limit || 5
    const defaultPage = query.page || 1
    const offset = (defaultPage - 1) * defaultLimit

    const request =
      await this.WellnessProgramItemService.getRepository().createQueryBuilder(
        'WellnessProgramItem',
      )
      .leftJoinAndMapOne('WellnessProgramItem.wellnessItem', WellnessItem, 'wellnessItem', 'WellnessProgramItem.wellness_item_id = wellnessItem.id')

      const fieldFilter = []
      fieldFilter.push({
        par: 'id',
        field: 'WellnessProgramItem.id',
        mode: 'andWhere',
        mode2: 'equal',
      })
      fieldFilter.push({
        par: 'wellness_program_id',
        field: 'WellnessProgramItem.wellness_program_id',
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
  
      if ('src' in query) {
        await request.andWhere(
          new Brackets((qb) => {
            const fieldSrc = ['WellnessProgramItem.name']
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
    const count = await request.getCount()
    
    // console.log(tes)

    const response = plainToInstance(WellnessProgramItemResponseDto, result)
    return { data: response, count: count}
  }

  @Get('tree')
  async getItemTree(@Query() query: WellnessProgramItemQueryDto) {
    const defaultLimit = query.limit || 5
    const defaultPage = query.page || 1
    const offset = (defaultPage - 1) * defaultLimit

    const request =
      await this.WellnessProgramItemService.getRepository().createQueryBuilder(
        'WellnessProgramItem',
      )

      const fieldFilter = []
      fieldFilter.push({
        par: 'id',
        field: 'WellnessProgramItem.id',
        mode: 'andWhere',
        mode2: 'equal',
      })
      fieldFilter.push({
        par: 'wellness_program_id',
        field: 'WellnessProgramItem.wellness_program_id',
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
  
      if ('src' in query) {
        await request.andWhere(
          new Brackets((qb) => {
            const fieldSrc = ['WellnessProgramItem.name']
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

    // console.log(result)
    
    const resultTree = await this.WellnessProgramItemService.convertToTree(result)
    // console.log(tes)

    // const response = plainToInstance(WellnessProgramItemResponseDto, resultTree)
    return { data: resultTree }
  }

  @Post()
  async save(@Body() body: WellnessProgramItemRequestDto) {
    const data = await this.WellnessProgramItemService.save(body)
    const response = plainToInstance(WellnessProgramItemResponseDto, data)
    return { data: response }
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: WellnessProgramItemPutDto) {
    const query = await this.WellnessProgramItemService.update(id, body)
    const response = plainToInstance(WellnessProgramItemResponseDto, query)
    return { data: response }
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    // await this.WellnessProgramItemService.update(id, { deleted_by: user.user.full_name })
    const query = await this.WellnessProgramItemService.delete(id)
    return { data: query }
  }
}
