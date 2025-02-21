import {
  Body,
  ConflictException,
  Controller,
  Post,
  Param,
  Logger,
  BadRequestException,
  HttpStatus,
  HttpException,
} from '@nestjs/common'
import AuthService from './Auth.Service'
import {
  AuthPasswordDto,
  AuthPatientRequestDto,
  AuthPutDto,
  AuthRefreshToken,
  AuthRequestDto,
  AuthResponseDto,
  PatientLoginRequestDto,
  RegistrationPatientRequestDto,
  RegistrationRequestDto,
} from './Auth.Dto'
import { PublicRoute } from '../../config/Jwt.Config'
import { TransformResponse } from '../../core/interceptors/TransformResponse.Interceptor'
import { GrantType, RegistrationType } from '../../core/enums/Auth.Enum'
import UserService from '../UserModules/User/User.Service'
import { plainToInstance } from 'class-transformer'
import { UserResponseDto } from '../UserModules/User/User.Dto'
import { UserInfo } from 'src/core/decorators/UserInfo.Decorator'
import CheckPermissionService from '../CheckPermission/CheckPermission.Service'
import { ParseUUIDPipe } from '@nestjs/common/pipes'
import RoleService from '../RoleModules/Role/Role.Service'
import { Delete, Get, Put, Req, Request } from '@nestjs/common/decorators'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import EmployeeService from '../EmployeeModules/Employee.Service'
import MedicalStaffService from '../MedicalStaffModules/MedicalStaff.Service'

@ApiTags('Auth')
@ApiBearerAuth()
@Controller('auth')
export default class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly employeService: EmployeeService,
    private readonly medicalStaffService: MedicalStaffService,
    private readonly checkPermissionService: CheckPermissionService,
    private readonly roleService: RoleService,
  ) {}

  @PublicRoute()
  @Post('register')
  async register(@UserInfo() users, @Body() body: RegistrationRequestDto) {
    body.is_main = true
    body.is_verified = false

    if (body.registration_type === RegistrationType.EMAIL) {
      if (await this.userService.checkEmailExist(body.email)) {
        throw new ConflictException('Email already exists.')
      }
    }

    const hashedPass = await this.authService.hashPassword(body.password)
    const user = await this.userService.save({
      ...body,
      created_by: users?.user?.full_name || '',
      password: hashedPass,
      email: body.email,
      is_verified: !body.need_verification,
    })

    const response = plainToInstance(UserResponseDto, user)

    if (body.employee_id) {
      const getEmploye = await this.employeService.getOne({
        where: { id: body.employee_id },
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

    if (body.medical_staff_id) {
      const getMedicalStaff = await this.medicalStaffService.getOne({
        where: { id: body.medical_staff_id },
      })

      const medicalStaff = []
      medicalStaff.push(getMedicalStaff)

      const getUser = await this.userService.getOne({
        where: {
          id: user.id,
        },
      })
      getUser.medicalStaffs = medicalStaff
      await this.userService.save(getUser)
    }

    //Insert Role
    const dataRole = await this.roleService.getAll({
      where: {
        id: body.role_id,
      },
    })
    const getUser = await this.userService.getOne({
      where: {
        id: user.id,
      },
    })

    getUser.roles = dataRole
    await this.userService.save(getUser)

    return { data: response }
  }

  @PublicRoute()
  @Post('login')
  public async login(
    @Body() authDto: AuthRequestDto,
  ): Promise<TransformResponse<any>> {

    // if (authDto.grant_type === GrantType.SOCIAL) {
    //   data = await this.authService.loginWithSocial(
    //     authDto.social_provider,
    //     authDto.access_token,
    //   )
    // } else if (authDto.grant_type === GrantType.EMAIL) {
    // console.log(authDto)
    const data = await this.authService.loginWithEmail(
      authDto.email,
      authDto.password,
    )
    // } else if (authDto.grant_type === GrantType.PHONE) {
    //   data = await this.authService.loginWithPhone(
    //     authDto.phone_number,
    //     authDto.password,
    //   )
    // }
    return { success: true, data: data }
  }

  @PublicRoute()
  @Post('hashGenerator')
  public async hasher(@Body() body): Promise<TransformResponse<any>> {
    const hash = await this.authService.hashPassword(body.password)
    return { success: true, data: hash }
  }

  @Post('/change-password/:id')
  async changePassword(
    @UserInfo() user,
    @Param('id', ParseUUIDPipe) id: number,
    @Body() body: AuthPasswordDto,
  ) {
    const check = await this.checkPermissionService.checkPermissionArray(
      ['users:change_password', 'upClinic:userManage', 'upCorp:userManage'],
      user.user.id,
    )
    if (check != true) {
      return check
    }
    const hashedPass = await this.authService.hashPassword(body.password)
    const data = await this.userService
      .getRepository()
      .update(
        { id: id },
        { password: hashedPass, updated_by: user.user.full_name },
      )

    return { data: data }
  }

  @Put(':id')
  async changePasswordProfile(
    @Param('id', ParseUUIDPipe) id: number,
    @Body() body: AuthPutDto,
  ) {
    const dataUser = await this.userService.getOne({
      where: {
        id: id,
      },
    })
    if (body.old_password != null) {
      const IsMatch = await this.authService.comparePassword(
        body.old_password,
        dataUser.password,
      )
      if (IsMatch == true) {
        if (body.password == body.confirmation_password) {
          const hashedPass = await this.authService.hashPassword(body.password)
          await this.userService.getRepository().update(
            {
              id: id,
            },
            {
              password: hashedPass,
            },
          )
          return { status: HttpStatus.OK, data: 'Successfully Change Password' }
        }
      } else {
        throw new BadRequestException("old password doesn't match!")
      }
    }
    throw new BadRequestException(
      'password and password confirmation do not match!',
    )
  }

  @Delete(':id')
  async logout(@Param('id', ParseUUIDPipe) id: number) {
    await this.authService.logout(id)
    throw new HttpException(
      {
        success: true,
        status_code: HttpStatus.OK,
        messages: [`Success logout!`],
      },
      HttpStatus.OK,
    )
  }

  @Get('refresh')
  async refreshToken(@Body() body: AuthRefreshToken, @UserInfo() user) {
    const refresh = await this.authService.refreshToken(
      user.user.id,
      body.refreshToken,
    )
    return { data: refresh }
  }

  // @PublicRoute()
  // @Post('register/patient')
  // async registerPatient(@Body() body: RegistrationPatientRequestDto) {
  //   body.is_main = true
  //   body.is_verified = false

  //   if (await this.userService.checkEmailExist(body.email)) {
  //     throw new BadRequestException(`${body.email} sudah terdaftar!`)
  //   }

  //   let patientData = null
  //   const dataPatient = await this.authService.checkPatientData(body)
  //   if (dataPatient != null) {
  //     patientData = dataPatient
  //   }

  //   const user = await this.userService.save({
  //     ...body,
  //     created_by: 'Patient Registrasi',
  //     email: body.email,
  //     full_name: body.name,
  //     is_verified: !body.need_verification,
  //   })

  //   const response = plainToInstance(UserResponseDto, user)

  //   //Insert Role
  //   const dataRole = await this.rolePatientService.getAll({
  //     where: {
  //       role_default: '1',
  //     },
  //     relations: {
  //       roles: true,
  //     },
  //   })

  //   const roles = []
  //   roles.push(dataRole[0].roles)
  //   user.roles = roles

  //   if (dataPatient == null) {
  //     const mr_number = await this.patientService.generateMr()
  //     patientData = await this.patientService.save({
  //       created_by: 'Patient Registrasi',
  //       emp_no: body.emp_no,
  //       mr_number: mr_number,
  //       nik: body.nik,
  //       name: body.name,
  //       dob: body.dob,
  //       gender: body.gender,
  //       address: body.address,
  //       phone: body.phone,
  //       position: body.position,
  //       description: body.description,
  //       type_id: body.type_id,
  //       province: body.province,
  //       city: body.city,
  //     })
  //   }

  //   const patient = []

  //   patient.push(patientData)
  //   user.patient = patient

  //   //save user
  //   await this.userService.save(user)
  //   return { data: response }
  // }

  // @PublicRoute()
  // @Post('generate-otp')
  // async generateOtp(@Body() body: AuthPatientRequestDto) {
  //   const data = await this.authService.checkPatient(body)

  //   if (data == null) {
  //     throw new BadRequestException('Patient tidak ditemukan!')
  //   }

  //   if (data.users.length == 0) {
  //     throw new BadRequestException('Belum terdaftar menjadi user!')
  //   }

  //   const date = new Date()
  //   // add 1 minute
  //   date.setMinutes(date.getMinutes() + 20)

  //   //otp
  //   const digits = '0123456789'
  //   let otp = ''
  //   for (let i = 0; i < 4; i++) {
  //     otp += digits[Math.floor(Math.random() * 10)]
  //   }

  //   //user otp
  //   const saveOtp = await this.userOtpService.save({
  //     created_by: data.name,
  //     user_id: data.users[0].id,
  //     otp: otp,
  //     expired: date,
  //   })

  //   const response = plainToInstance(UserOtpResponseDto, saveOtp)

  //   throw new HttpException(
  //     {
  //       success: true,
  //       status_code: HttpStatus.OK,
  //       data: response,
  //     },
  //     HttpStatus.OK,
  //   )
  // }

  // @PublicRoute()
  // @Post('login/patient')
  // async loginPatient(@Body() body: PatientLoginRequestDto) {
  //   let data
  //   const date = new Date()
  //   const dataOtp = await this.userOtpService
  //     .getRepository()
  //     .createQueryBuilder('otp')
  //     .where('otp.id = :id', { id: body.id })
  //     .andWhere('otp.expired >= :expired', { expired: date })
  //     .andWhere('otp.status = :status', { status: '0' })
  //     .getOne()

  //   if (dataOtp == null) {
  //     throw new BadRequestException('kode otp anda telah kadaluarsa!')
  //   }

  //   if (dataOtp.otp != body.otp) {
  //     throw new BadRequestException('otp yang anda masukkan salah!')
  //   }

  //   // data = await this.authService.loginPatient(dataOtp.user_id)

  //   await this.userOtpService.update(body.id, {
  //     status: '1',
  //     updated_by: 'Patient',
  //   })

  //   return { data: data }
  // }
}
