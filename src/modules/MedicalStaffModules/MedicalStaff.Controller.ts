import {
  BadRequestException,
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
import MedicalStaffService from './MedicalStaff.Service'
import {
  MedicalStaffPutDto,
  MedicalStaffRequestDto,
  MedicalStaffResponseDto,
  CorproateQueryDto,
} from './MedicalStaff.Dto'
import { plainToInstance } from 'class-transformer'
import { Brackets } from 'typeorm'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { UserInfo } from 'src/core/decorators/UserInfo.Decorator'
import { userInfo } from 'os'
import { PublicRoute } from 'src/config/Jwt.Config'

import * as moment from "moment";
import UserService from '../UserModules/User/User.Service'
import RoleService from '../RoleModules/Role/Role.Service'

@ApiTags('Medical Staff')
@ApiBearerAuth()
@PublicRoute()
@Controller('medical-staff')
export default class MedicalStaffController {
  constructor(
    private readonly MedicalStaffService: MedicalStaffService,
    private readonly userService: UserService,
    private readonly roleService: RoleService
  ) {}

  @Get()
  async index(@Query() query: CorproateQueryDto) {
    const defaultLimit = query.limit || 5
    const defaultPage = query.page || 1
    const offset = (defaultPage - 1) * defaultLimit

    const data = await this.MedicalStaffService.getRepository().createQueryBuilder(
      'MedicalStaff',
    )
    .leftJoinAndSelect('MedicalStaff.users', 'users')

    if(query.users === 'true') {
      data.andWhere('users is not null')
    }else if(query.users === 'false') {
      data.andWhere('users is null')
    }

    const fieldFilter = []
    fieldFilter.push({
      par: 'id',
      field: 'MedicalStaff.id',
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
          const fieldSrc = ['MedicalStaff.name']
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
    const response = plainToInstance(MedicalStaffResponseDto, result)
    return { data: response, count: count }
  }

  @Post()
  async save(@Body() body: MedicalStaffRequestDto) {
    const data = await this.MedicalStaffService.save(body)
    const response = plainToInstance(MedicalStaffResponseDto, data)
    return { data: response }
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: MedicalStaffPutDto) {
    const query = await this.MedicalStaffService.update(id, body)
    const response = plainToInstance(MedicalStaffResponseDto, query)
    return { data: response }
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    // await this.MedicalStaffService.update(id, { deleted_by: user.user.full_name })
    const query = await this.MedicalStaffService.delete(id)
    return { data: query }
  }

  @Put('generate-user/:id')
  async generateUser(
    @UserInfo() users,
    @Param('id') id: number,
    @Body() body: MedicalStaffPutDto,
  ) {
    const getMember = await this.MedicalStaffService.getOneById(id)
    const email = getMember.nik
    const password = moment(getMember.dob).format('DDMMYYYY')
    // console.log(password)

    body.is_main = true
    body.is_verified = false

    // if (body.registration_type === RegistrationType.EMAIL) {
      if (await this.userService.checkEmailExist(email)) {
        throw new BadRequestException(`NIK "${email}" already exists.`)
      }
    // }

    // console.log(users)

    const hashedPass = await this.userService.hashPassword(password)
    const user = await this.userService.save({
      ...body,
      full_name: getMember.name,
      created_by: 'GENERATED',
      password: hashedPass,
      email: email,
      type: 'STAFF',
      is_verified: true,
    })
    // console.log(user)

    if(1+1 === 2) {
      const getEmploye = await this.MedicalStaffService.getOne({
        where: { nik: getMember.nik },
      })

      const employe = []
      employe.push(getEmploye)

      const getUser = await this.userService.getOne({
        where: {
          id: user.id,
        },
      })
      getUser.medicalStaffs = employe
      await this.userService.save(getUser)
    }

    //Insert Role
    const dataRole = await this.roleService.getAll({
      where: {
        for_type: 'Petugas',
      },
    })
    const getUser = await this.userService.getOne({
      where: {
        id: user.id,
      },
    })

    getUser.roles = dataRole
    await this.userService.save(getUser)
    // console.log(query)
    
    const response = plainToInstance(MedicalStaffResponseDto, [])
    return { data: response }
  }
}
