import { HttpStatus, Injectable } from '@nestjs/common'
import {
  BadRequestException,
  ForbiddenException,
  HttpException,
} from '@nestjs/common/exceptions'
import { InjectRepository } from '@nestjs/typeorm'
import { Brackets, Repository } from 'typeorm'
import BaseService from '../../base/Service.Base'
import Role from '../RoleModules/Role/Role.Entity'
import IndUserSerivce from '../UserModules/User/IndUser.Service'

@Injectable()
export default class CheckPermissionService extends BaseService<Role> {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly indUserService: IndUserSerivce,
  ) {
    super(roleRepository)
  }

  async checkPermission(name: string, user: number, mode = 0) {
    const dataUser = await this.indUserService.getOne({
      where: {
        id: user,
      },
      relations: {
        roles: true,
      },
    })

    const data = await this.roleRepository
      .createQueryBuilder('role')
      .leftJoinAndSelect('role.permissions', 'permission')

    await data.andWhere('permission.name_be ilike :name_be', {
      name_be: `%${name}%`,
    })

    if (dataUser.roles.length > 0) {
      const result = await data
        .andWhere('role.id = :id', { id: dataUser.roles[0].id })
        .getMany()

      if (result.length > 0) {
        return true
      } else {
        if (mode == 1) {
          return false
        } else {
          throw new HttpException(
            {
              success: false,
              status_code: HttpStatus.FORBIDDEN,
              messages: [
                `Forbidden! You have no access to this resources ${name}!`,
              ],
            },
            HttpStatus.FORBIDDEN,
          )
        }
      }
    } else {
      throw new BadRequestException("you don't have roles!")
    }
  }

  async checkPermissionArray(name: string[], user: number, mode = 0) {
    const dataUser = await this.indUserService.getOne({
      where: {
        id: user,
      },
      relations: {
        roles: true,
      },
    })

    let result2 = 0
    const data = await this.roleRepository
      .createQueryBuilder('role')
      .leftJoinAndSelect('role.permissions', 'permission')

    await data.andWhere(
      new Brackets((qb) => {
        for (let i = 0; i < name.length; i++) {
          const par = 'par' + i
          const parJSON = {}
          parJSON[par] = `%${name[i]}%`
          qb.orWhere('permission.name_be like :' + par, parJSON)
        }
      }),
    )

    if (dataUser.roles.length > 0) {
      const result = await data
        .andWhere('role.id = :id', { id: dataUser.roles[0].id })
        .getMany()

      if (result.length > 0) {
        result2++
      }
    } else {
      throw new BadRequestException("you don't have roles!")
    }

    if (result2 > 0) {
      return true
    } else {
      if (mode == 1) {
        return false
      } else {
        throw new HttpException(
          {
            success: false,
            status_code: HttpStatus.FORBIDDEN,
            messages: [
              `Forbidden! You have no access to this resources ${name}!`,
            ],
          },
          HttpStatus.FORBIDDEN,
        )
      }
    }
  }
}
