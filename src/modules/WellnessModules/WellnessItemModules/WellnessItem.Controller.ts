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
import WellnessItemService from './WellnessItem.Service'
import {
  WellnessItemPutDto,
  WellnessItemRequestDto,
  WellnessItemResponseDto,
  WellnessItemQueryDto,
} from './WellnessItem.Dto'
import { plainToInstance } from 'class-transformer'
import { Brackets } from 'typeorm'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { UserInfo } from 'src/core/decorators/UserInfo.Decorator'
import { userInfo } from 'os'
import { PublicRoute } from 'src/config/Jwt.Config'
import WellnessProgramItem from '../WellnessProgramItemModules/WellnessProgramItem.Entity'

@ApiTags('WellnessItem')
@ApiBearerAuth()
@PublicRoute()
@Controller('wellness-item')
export default class WellnessItemController {
  constructor(private readonly WellnessItemService: WellnessItemService) {}

  @Get()
  async index(@Query() query: WellnessItemQueryDto) {
    const defaultLimit = query.limit || 5
    const defaultPage = query.page || 1
    const offset = (defaultPage - 1) * defaultLimit

    const request =
      await this.WellnessItemService.getRepository().createQueryBuilder(
        'WellnessItem',
      )

      const fieldFilter = []
      fieldFilter.push({
        par: 'id',
        field: 'WellnessItem.id',
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
            const fieldSrc = ['WellnessItem.name']
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

    const response = plainToInstance(WellnessItemResponseDto, result)
    return { data: response, count: count}
  }

  @Get('tree')
  async getItemTree(@Query() query: WellnessItemQueryDto) {
    const defaultLimit = query.limit || 5
    const defaultPage = query.page || 1
    const offset = (defaultPage - 1) * defaultLimit

    const request =
      await this.WellnessItemService.getRepository().createQueryBuilder(
        'WellnessItem',
      )
      .leftJoinAndMapOne('WellnessItem.WellnessItemProgram', WellnessProgramItem, 'WellnessItemProgram', 'WellnessItem.id = WellnessItemProgram.wellness_item_id')

      const fieldFilter = []
      fieldFilter.push({
        par: 'id',
        field: 'WellnessItem.id',
        mode: 'andWhere',
        mode2: 'equal',
      })
      fieldFilter.push({
        par: 'wellness_program_id',
        field: 'WellnessItemProgram.id',
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
            const fieldSrc = ['WellnessItem.name']
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
    
    const resultTree = await this.WellnessItemService.convertToTree(result)
    // console.log(tes)

    // const response = plainToInstance(WellnessItemResponseDto, resultTree)
    return { data: resultTree }
  }

  @Post()
  async save(@Body() body: WellnessItemRequestDto) {
    const data = await this.WellnessItemService.save(body)
    if(!body.parent_id) {
      const bodyUpdate = {
        parent_id: String(data.id),
        main_id: String(data.id)
      }
      const update = await this.WellnessItemService.update(data.id, bodyUpdate)
    }
    const response = plainToInstance(WellnessItemResponseDto, data)
    return { data: response }
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: WellnessItemPutDto) {
    const query = await this.WellnessItemService.update(id, body)
    const response = plainToInstance(WellnessItemResponseDto, query)
    return { data: response }
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    // await this.WellnessItemService.update(id, { deleted_by: user.user.full_name })
    const query = await this.WellnessItemService.delete(id)
    return { data: query }
  }
}
