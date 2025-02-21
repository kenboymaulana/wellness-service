import { Column, Entity, JoinColumn, ManyToOne, OneToMany, ManyToMany } from 'typeorm'
import { BaseEntityUuid } from '../../../base/Entity.Base'
import WellnessEventMember from '../WellnessEventMemberModules/WellnessEventMember.Entity'
import MedicalStaff from 'src/modules/MedicalStaffModules/MedicalStaff.Entity'
import WellnessPrograms from '../WellnessProgramsModules/WellnessPrograms.Entity'

@Entity('wellness_event')
export default class WellnessEvent extends BaseEntityUuid {
  @Column()
  medical_staff_id: number

  @Column()
  name: string

  @Column()
  model_code: string

  @Column({ type: 'date' })
  start_date: Date

  @Column({ type: 'date' })
  end_date: Date

  @Column()
  description: string

  @Column()
  image: string

  @Column({ default: '0' })
  status: string

  @OneToMany(
    () => WellnessEventMember,
    (wellnessEventMember) => wellnessEventMember.wellnessEvent,
  )
  wellnessEventMember: WellnessEventMember

  @ManyToOne(
    () => MedicalStaff,
    (medicalStaff) => medicalStaff.wellnessEvent,
  )
  @JoinColumn({ name: 'medical_staff_id' })
  medicalStaff: MedicalStaff


  // @ManyToMany(() => WellnessPrograms, (e) => e.wellness_events)
  // wellness_programs?: WellnessPrograms[]
  // @ManyToMany(
  //   () => WellnessPrograms,
  //   (wellnessPrograms) => wellnessPrograms.wellnessEvent,
  // )
  // @JoinColumn({ name: 'model_code' })
  // wellnessPrograms: WellnessPrograms
}
