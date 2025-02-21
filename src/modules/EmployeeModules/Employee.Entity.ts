import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm'
import { BaseEntityUuid } from '../../base/Entity.Base'
import WellnessEventMember from '../WellnessModules/WellnessEventMemberModules/WellnessEventMember.Entity'
import User from '../UserModules/User/User.Entity'

@Entity('employee')
export default class Employee extends BaseEntityUuid {
  @Column()
  perusahaan_id: number

  @Column({ unique: true })
  nik: string

  @Column()
  name: string

  @Column({ type: 'date', default: null })
  dob: Date

  @Column()
  gender: string

  @Column()
  phone: string

  @Column()
  division: string

  @Column()
  position: string

  @Column()
  work: string

  @Column()
  address: string

  @OneToMany(
    () => WellnessEventMember,
    (wellnessEventMember) => wellnessEventMember.employee,
  )
  wellnessEventMember: WellnessEventMember

  @ManyToMany(() => User, (el) => el.employees)
  @JoinTable()
  users?: User[]
}
