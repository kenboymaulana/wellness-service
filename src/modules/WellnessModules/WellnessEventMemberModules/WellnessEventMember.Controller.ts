import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common'
// import dateFormat from '@types/dateformat'
import WellnessEventMemberService from './WellnessEventMember.Service'
import WellnessEventMemberResultValuesService from '../WellnessEventMemberResultValuesModules/WellnessEventMemberResultValues.Service'
import {
  WellnessEventMemberPutDto,
  WellnessEventMemberRequestDto,
  WellnessEventMemberResponseDto,
  WellnessEventMemberQueryDto,
} from './WellnessEventMember.Dto'
import { plainToInstance } from 'class-transformer'
import { Brackets, In } from 'typeorm'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { UserInfo } from 'src/core/decorators/UserInfo.Decorator'
import { userInfo } from 'os'
import { PublicRoute } from 'src/config/Jwt.Config'
import EmployeeService from 'src/modules/EmployeeModules/Employee.Service'
import AuthService from 'src/modules/AuthModules/Auth.Service'
import UserService from 'src/modules/UserModules/User/User.Service'
import { UserResponseDto } from 'src/modules/UserModules/User/User.Dto'
import RoleService from 'src/modules/RoleModules/Role/Role.Service'
import WellnessItemService from '../WellnessItemModules/WellnessItem.Service'
import WellnessEventMemberResultService from '../WellnessEventMemberResultModules/WellnessEventMemberResult.Service'

import * as moment from "moment";
import WellnessEventMemberResult from '../WellnessEventMemberResultModules/WellnessEventMemberResult.Entity'
import WellnessEventMemberResultValues from '../WellnessEventMemberResultValuesModules/WellnessEventMemberResultValues.Entity'

@ApiTags('Wellness Event Member')
@ApiBearerAuth()
// @PublicRoute()
@Controller('wellness-event-member')

export default class WellnessEventMemberController {
  constructor(
    private readonly WellnessEventMemberService: WellnessEventMemberService,
    private readonly WellnessEventMemberResultValuesService: WellnessEventMemberResultValuesService,
    private readonly employeeService: EmployeeService,
    private readonly userService: UserService,
    private readonly roleService: RoleService,
    private readonly wellnessItems: WellnessItemService,
    private readonly WellnessEventMemberResultService: WellnessEventMemberResultService,
    ) {}
   
    
    @Get()
    async index(@Query() query: WellnessEventMemberQueryDto) {
      const defaultLimit = query.limit || 5
      const defaultPage = query.page || 1
      const offset = (defaultPage - 1) * defaultLimit

    const data =
      await this.WellnessEventMemberService.getRepository().createQueryBuilder(
        'WellnessEventMember',
      )
      .leftJoinAndSelect('WellnessEventMember.employee', 'employee')
      .leftJoinAndSelect('employee.users', 'users')

    if(query.users === 'true') {
      data.andWhere('users is not null')
    }else if(query.users === 'false') {
      data.andWhere('users is null')
    }

    const fieldFilter = []
    fieldFilter.push({
      par: 'id',
      field: 'WellnessEventMember.id',
      mode: 'andWhere',
      mode2: 'equal',
    })
    fieldFilter.push({
      par: 'wellness_event_id',
      field: 'WellnessEventMember.wellness_event_id',
      mode: 'andWhere',
      mode2: 'equal',
    })
    fieldFilter.push({
      par: 'nik',
      field: 'WellnessEventMember.nik',
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
          const fieldSrc = ['WellnessEventMember.name']
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
    const response = plainToInstance(WellnessEventMemberResponseDto, result)
    return { data: response, count: count }
  }

  @Post()
  async save(@Body() body: WellnessEventMemberRequestDto) {
    if(body.employee_id == 0) {
      const storeEmployee = await this.employeeService.save(body)
      body.employee_id = storeEmployee.id
    }

    const qrGetData = await this.WellnessEventMemberService.getRepository().createQueryBuilder('WellnessEventMember')
    await qrGetData.andWhere(`nik = :nik`, {nik: body.nik})
    await qrGetData.andWhere(`wellness_event_id = :wellness_event_id`, {wellness_event_id: body.wellness_event_id})
    const getData = await qrGetData.getMany()
    
    if(getData.length > 0) {
      throw new BadRequestException(`Karyawan dengan NIK ${getData[0].nik} sudah terdaftar.`)
    }
    let response
    try {
      const data = await this.WellnessEventMemberService.save(body)
      console.log(data)
      if(data) {
        const wnItems = await this.wellnessItems
          .getRepository()
          .createQueryBuilder('wnItems')
          .getMany()
  
        wnItems.forEach(async (el) => {
          const bodyWnItems = {
            wellness_event_member_id: data.id,
            main_id: String(el.id),
            parent_id: el.parent_id,
            level: el.level,
            sort: el.sort,
            header: el.header,
            code: el.code,
            name: el.name,
            name_eng: el.name_eng,
            desc: el.desc
          }
          await this.WellnessEventMemberResultService.save(bodyWnItems)
        })
        response = plainToInstance(WellnessEventMemberResponseDto, data)
      }
    } catch (error) {
      console.error('Error saving WellnessEventMember:', error)
      response = null
      throw new InternalServerErrorException('Failed to save WellnessEventMember')
    }


    return { data: response }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() body: WellnessEventMemberPutDto,
  ) {
    const query = await this.WellnessEventMemberService.update(id, body)
    const response = plainToInstance(WellnessEventMemberResponseDto, query)
    return { data: response }
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    // await this.WellnessEventMemberService.update(id, { deleted_by: user.user.full_name })
    const query = await this.WellnessEventMemberService.delete(id)
    return { data: query }
  }

  @Put('generate-user/:id')
  async generateUser(
    @UserInfo() users,
    @Param('id') id: number,
    @Body() body: WellnessEventMemberPutDto,
  ) {
    const getMember = await this.WellnessEventMemberService.getOneById(id)
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
      type: 'EMPLOYEE',
      is_verified: true,
    })
    // console.log(user)

    if(1+1 === 2) {
      const getEmploye = await this.employeeService.getOne({
        where: { nik: getMember.nik },
      })

      const employe = []
      employe.push(getEmploye)

      const getUser = await this.userService.getOne({
        where: {
          id: user.id,
        },
      })
      getUser.employees = employe
      await this.userService.save(getUser)
    }

    //Insert Role
    const dataRole = await this.roleService.getAll({
      where: {
        for_type: 'Pengguna',
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
    
    const response = plainToInstance(WellnessEventMemberResponseDto, [])
    return { data: response }
  }

  @Get('analyze-age')
  async analyzeAge(@Query() query: WellnessEventMemberQueryDto) {
    const members = await this.WellnessEventMemberService.getAll({ where: { wellness_event_id: query.wellness_event_id } })
    const ageGroups = members.reduce((acc, member) => {
      const age = new Date().getFullYear() - new Date(member.dob).getFullYear()
      if (age < 30) {
        acc['<30'] = (acc['<30'] || 0) + 1
      } else if (age < 40) {
        acc['30-39'] = (acc['30-39'] || 0) + 1
      } else if (age < 50) {
        acc['40-49'] = (acc['40-49'] || 0) + 1
      } else {
        acc['50+'] = (acc['50+'] || 0) + 1
      }
      return acc
    }, {})
    const dataTemp = Object.entries(ageGroups).map(([key, value]) => ({key, value}))

    return {data: dataTemp}
  }

  @Get('today-members')
  async getTodayMembers(@Query() query: WellnessEventMemberQueryDto) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to midnight of today
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1); // Set to midnight of tomorrow

    const members = await this.WellnessEventMemberService.getRepository().createQueryBuilder('wellness_event_member')
      .leftJoinAndMapMany('wellness_event_member.resultValues', WellnessEventMemberResultValues, 'resultValues', 'resultValues.wellness_event_member_id = wellness_event_member.id')
      .leftJoinAndMapMany('resultValues.memberResult', WellnessEventMemberResult, 'memberResult', 'memberResult.code = resultValues.item_code')
      .where('wellness_event_member.wellness_event_id = :wellness_event_id', { wellness_event_id: query.wellness_event_id })
      .andWhere('resultValues.date = :date', { date: today })
      .getMany();
    return { data: members };
  }

  // @Get('daily-analysis')
  // async dailyAnalysis(@Query() query: WellnessEventMemberQueryDto) {
  //   const results = await this.WellnessEventMemberService.getRepository().createQueryBuilder('wellness_event_member')
  //     .leftJoinAndMapMany('wellness_event_member.wellnessEventMemberResultValues', WellnessEventMemberResultValues, 'wellnessEventMemberResultValues', 'wellnessEventMemberResultValues.wellness_event_member_id = wellness_event_member.id')
  //     .where('wellness_event_member.wellness_event_id = :wellness_event_id', { wellness_event_id: query.wellness_event_id })
  //     .getMany()

  //   const dataTemp = {}

  //   results.forEach((result) => {
  //     result.wellnessEventMemberResultValues.forEach((value) => {
  //       const date = moment(value.created_at).format('YYYY-MM-DD')
  //       if (date in dataTemp) {
  //         dataTemp[date].push(value)
  //       } else {
  //         dataTemp[date] = [value]
  //       }
  //     })
  //   })

  //   // const dailyAnalysis = results.reduce((acc, result) => {
  //   //   const date = moment(result.created_at).format('YYYY-MM-DD')
  //   //   if (!acc[date]) {
  //   //     acc[date] = []
  //   //   }
  //   //   acc[date].push(result)
  //   //   return acc
  //   // }, {})

  //   // const data = Object.entries(dailyAnalysis).map(([date, results]) => {
  //   //   const total = results.reduce((sum, result) => sum + result.value, 0)
  //   //   return { date, total }
  //   // })

  //   return { data: dailyAnalysis }
  // }
}
