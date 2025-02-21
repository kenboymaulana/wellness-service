import { Column, Entity, JoinTable, ManyToMany, OneToMany, OneToOne } from 'typeorm'
import { BaseEntityUuid } from '../../base/Entity.Base'
import WellnessEvent from '../WellnessModules/WellnessEventModules/WellnessEvent.Entity'
import User from '../UserModules/User/User.Entity'

@Entity('medical_staff')
export default class MedicalStaff extends BaseEntityUuid {
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
  email: string

  @Column()
  no_str: string

  @Column()
  no_sip: string

  @Column()
  address: string

  @Column()
  staff_type: string

  @Column()
  doctor_type: string
  
  @Column()
  poly_practice: string

  @Column({default: 1})
  status_active: number

  @Column()
  sign_image: string

  @OneToMany(
    () => WellnessEvent,
    (wellnessEvent) => wellnessEvent.medicalStaff,
  )
  wellnessEvent: WellnessEvent

  @ManyToMany(() => User, (el) => el.medicalStaffs)
  @JoinTable()
  users?: User[]
}
