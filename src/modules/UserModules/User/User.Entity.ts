import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
} from 'typeorm'
import { BaseEntityUuid } from '../../../base/Entity.Base'
import { UserType } from './User.Enum'
import Role from '../../RoleModules/Role/Role.Entity'
import Employee from 'src/modules/EmployeeModules/Employee.Entity'
import MedicalStaff from 'src/modules/MedicalStaffModules/MedicalStaff.Entity'

@Entity()
export default class User extends BaseEntityUuid {
  @Column()
  full_name: string

  @Column({
    nullable: true,
  })
  email: string

  @Column({
    nullable: true,
    default: null,
  })
  password: string

  @Column({
    default: false,
  })
  is_main: boolean

  @Column({
    default: false,
  })
  is_verified: boolean

  @Column({
    // enum: UserType,
    // nullable: false,
  })
  type: string

  @Column({
    default: 0,
  })
  active_user: number

  @Column({
    nullable: true,
  })
  refresh_token: string

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable()
  roles?: Role[]

  @ManyToMany(() => Employee, (el) => el.users)
  @JoinTable()
  employees?: Employee[]

  @ManyToMany(() => MedicalStaff, (el) => el.users)
  @JoinTable()
  medicalStaffs?: MedicalStaff[]
}
