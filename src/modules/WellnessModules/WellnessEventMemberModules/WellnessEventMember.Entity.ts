import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { BaseEntityUuid } from '../../../base/Entity.Base'
import WellnessEvent from '../WellnessEventModules/WellnessEvent.Entity'
import Employee from 'src/modules/EmployeeModules/Employee.Entity'
import WellnessEventMemberResult from '../WellnessEventMemberResultModules/WellnessEventMemberResult.Entity'

@Entity('wellness_event_member')
export default class WellnessEventMember extends BaseEntityUuid {
  @Column()
  wellness_event_id: number

  @Column()
  employee_id: number

  @Column({  default: null })
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

  @ManyToOne(
    () => WellnessEvent,
    (wellnessEvent) => wellnessEvent.wellnessEventMember,
  )
  @JoinColumn({ name: 'wellness_event_id' })
  wellnessEvent: WellnessEvent

  @OneToMany(
    () => WellnessEventMemberResult,
    (par) => par.wellnessEventMember
  )
  @JoinColumn()
  wellnessEventMemberResult: WellnessEventMemberResult

  @ManyToOne(
    () => Employee,
    (employee) => employee.wellnessEventMember,
  )
  @JoinColumn({ name: 'employee_id' })
  employee: Employee
}
