import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import UserService from '../UserModules/User/User.Service'
import { JwtService } from '@nestjs/jwt'
import { SocialProvider } from '../../core/enums/Auth.Enum'
import { SocialProviderData } from './Auth.Interface'
import { google } from 'googleapis'
import { plainToInstance } from 'class-transformer'
import { UserResponseDto } from '../UserModules/User/User.Dto'
import { JwtPayload } from '../../config/Jwt.Config'
import * as bcrypt from 'bcrypt'
import { AuthResponseDto } from './Auth.Dto'
import { ConfigService } from '@nestjs/config'

@Injectable()
export default class AuthService {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt()
    return bcrypt.hash(password, salt)
  }

  async comparePassword(password: string, hash: string) {
    return bcrypt.compare(password, hash)
  }

  async loginWithEmail(
    email: string,
    password: string,
  ): Promise<AuthResponseDto> {
    const user = await this.userService.getOne({
      where: {
        email: email,
      },
      relations: {
        roles: true,
        employees: true,
        medicalStaffs: true,
      },
    })

    if (!user) {
      throw new BadRequestException('User not found!')
    }

    if (!(await this.comparePassword(password, user.password))) {
      throw new BadRequestException('Wrong email or password!')
    }

    // if (user.active_user == 1) {
    //   throw new BadRequestException('Not active!')
    // }

    const userData = plainToInstance(UserResponseDto, user)

    const payload: JwtPayload = {
      user: userData,
      sub: user.id,
    }

    const TokenRefresh = this.jwtService.sign(
      { id: user.id, email: user.email, full_name: user.full_name },
      {
        secret: this.configService.get<string>('JWT_SECRET_KEY_REFRESH'),
        expiresIn: '7d',
      },
    )

    await this.userService.update(user.id, { refresh_token: TokenRefresh })

    return {
      user: userData,
      access_token: this.jwtService.sign(payload),
      refresh_token: TokenRefresh,
    }
  }

  async loginWithPhone(
    phoneNumber: string,
    password: string,
  ): Promise<AuthResponseDto> {
    const user = await this.userService.getOneBy({
      // user_phones: {
      //   phone_number: phoneNumber,
      // },
    })

    if (!user) {
      throw new BadRequestException('User not found!')
    }

    if (!(await this.comparePassword(password, user.password))) {
      throw new BadRequestException('Wrong phone number or password!')
    }

    const userData = plainToInstance(UserResponseDto, user)

    const payload: JwtPayload = {
      user: userData,
      sub: user.id,
    }

    const TokenRefresh = this.jwtService.sign(
      { id: user.id, email: user.email, full_name: user.full_name },
      {
        secret: this.configService.get<string>('JWT_SECRET_KEY_REFRESH'),
        expiresIn: '7d',
      },
    )

    await this.userService.update(user.id, { refresh_token: TokenRefresh })

    return {
      user: userData,
      access_token: this.jwtService.sign(payload),
      refresh_token: TokenRefresh,
    }
  }

  async loginWithSocial(socialProvider: SocialProvider, accessToken: string) {
    let socialProviderData: SocialProviderData

    if (socialProvider === SocialProvider.GOOGLE) {
      socialProviderData = await this.authenticateWithGoogle(accessToken)
    }

    const user = await this.userService.getOneBy({
      email: socialProviderData.email,
    })

    if (!user) {
      throw new BadRequestException('User not found.')
    }

    // const checkSocialProvider = await this.userSocialProviderService.getOneBy({
    //   // provider_uid: socialProviderData.uid,
    //   provider_name: socialProvider,
    // })

    // if (!checkSocialProvider) {
    //   // await this.userSocialProviderService.save({
    //   //   provider_name: SocialProvider.GOOGLE,
    //   //   // provider_uid: socialProviderData.uid,
    //   //   user: user,
    //   // })
    // }

    const userData = plainToInstance(UserResponseDto, user)

    const payload: JwtPayload = {
      user: userData,
      sub: user.id,
    }

    return {
      user: userData,
      access_token: this.jwtService.sign(payload),
    }
  }

  async authenticateWithGoogle(
    accessToken: string,
  ): Promise<SocialProviderData> {
    const oauth2 = google.oauth2('v2')
    const OAuth2 = new google.auth.OAuth2()

    OAuth2.setCredentials({ access_token: accessToken })

    try {
      const profile = await oauth2.userinfo.get({ auth: OAuth2 })
      return {
        // uid: profile.data.id,
        email: profile.data.email,
        fullName: profile.data.name,
      }
    } catch (e) {
      throw new BadRequestException(e.errors[0].message)
    }
  }

  async logout(userId: number) {
    return this.userService.update(userId, { refresh_token: null })
  }

  async refreshToken(userId: number, refreshToken: string) {
    const user = await this.userService.getOne({
      where: {
        id: userId,
      },
      relations: {
        roles: true,
      },
    })

    if (!user || !user.refresh_token) {
      throw new ForbiddenException('Access Denied!')
    }
    if (user.refresh_token != refreshToken) {
      throw new ForbiddenException('Access Denied!')
    }

    const userData = plainToInstance(UserResponseDto, user)

    const payload: JwtPayload = {
      user: userData,
      sub: user.id,
    }

    const TokenRefresh = this.jwtService.sign(
      { id: user.id, email: user.email, full_name: user.full_name },
      {
        secret: this.configService.get<string>('JWT_SECRET_KEY_REFRESH'),
        expiresIn: '7d',
      },
    )

    await this.userService.update(user.id, { refresh_token: TokenRefresh })

    return {
      user: userData,
      access_token: this.jwtService.sign(payload),
      refresh_token: TokenRefresh,
    }
  }

  // async checkPatient(body) {
  //   const data = await this.patientService
  //     .getRepository()
  //     .createQueryBuilder('patient')
  //     .where('LOWER(patient.name) = LOWER(:name)', { name: body['name'] })
  //     .andWhere('patient.phone = :phone', { phone: body['phone'] })
  //     .leftJoinAndSelect('patient.users', 'userss')
  //     .getOne()

  //   return data
  // }

  // async loginPatient(id) {
  //   const user = await this.userService.getOne({
  //     where: {
  //       id: id,
  //     },
  //     relations: {
  //       corporates: true,
  //       hospital: true,
  //       roles: true,
  //       corporateEmp: true,
  //       clinicEmp: true,
  //       employe: true,
  //       patient: true,
  //     },
  //   })

  //   if (!user) {
  //     throw new BadRequestException('User not found!')
  //   }

  //   if (user.active_user == 1) {
  //     throw new BadRequestException('Not active!')
  //   }

  //   const userData = plainToInstance(UserResponseDto, user)

  //   const payload: JwtPayload = {
  //     user: userData,
  //     sub: user.id,
  //   }

  //   const TokenRefresh = this.jwtService.sign(
  //     { id: user.id, email: user.email, full_name: user.full_name },
  //     {
  //       secret: this.configService.get<string>('JWT_SECRET_KEY_REFRESH'),
  //       expiresIn: '7d',
  //     },
  //   )

  //   await this.userService.update(user.id, { refresh_token: TokenRefresh })

  //   return {
  //     user: userData,
  //     access_token: this.jwtService.sign(payload, {
  //       secret: this.configService.get<string>('JWT_SECRET_KEY'),
  //       expiresIn: '1d',
  //     }),
  //     refresh_token: TokenRefresh,
  //   }
  // }

  // async checkPatientData(data) {
  //   const test = await this.patientService.getOne({
  //     where: {
  //       name: data['name'],
  //       dob: data['dob'],
  //     },
  //   })

  //   return test
  // }
}
