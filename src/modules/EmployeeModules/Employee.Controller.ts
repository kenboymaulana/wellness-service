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
import EmployeeService from './Employee.Service'
import {
  EmployeePutDto,
  EmployeeRequestDto,
  EmployeeResponseDto,
  CorproateQueryDto,
} from './Employee.Dto'
import { plainToInstance } from 'class-transformer'
import { Brackets } from 'typeorm'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { UserInfo } from 'src/core/decorators/UserInfo.Decorator'
import { userInfo } from 'os'
import { PublicRoute } from 'src/config/Jwt.Config'

@ApiTags('Employee')
@ApiBearerAuth()
@PublicRoute()
@Controller('employee')
export default class EmployeeController {
  constructor(private readonly EmployeeService: EmployeeService) {}

  @Get()
  async index(@Query() query: CorproateQueryDto) {
    const defaultLimit = query.limit || 5
    const defaultPage = query.page || 1
    const offset = (defaultPage - 1) * defaultLimit

    const data = await this.EmployeeService.getRepository().createQueryBuilder(
      'Employee',
    )

    const fieldFilter = []
    fieldFilter.push({
      par: 'id',
      field: 'Employee.id',
      mode: 'andWhere',
      mode2: 'equal',
    })
    fieldFilter.push({
      par: 'perusahaan_id',
      field: 'Employee.perusahaan_id',
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
          const fieldSrc = ['Employee.name']
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
    const response = plainToInstance(EmployeeResponseDto, result)
    return { data: response, count: count }
  }

  @Post()
  async save(@Body() body: EmployeeRequestDto) {
    const data = await this.EmployeeService.save(body)
    const response = plainToInstance(EmployeeResponseDto, data)
    return { data: response }
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: EmployeePutDto) {
    const query = await this.EmployeeService.update(id, body)
    const response = plainToInstance(EmployeeResponseDto, query)
    return { data: response }
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    // await this.EmployeeService.update(id, { deleted_by: user.user.full_name })
    const query = await this.EmployeeService.delete(id)
    return { data: query }
  }
}
