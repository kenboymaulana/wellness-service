import { Column, Entity, JoinColumn, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm'
import { BaseEntityUuid } from '../../../base/Entity.Base'
import WellnessEvent from '../WellnessEventModules/WellnessEvent.Entity'
import MedicalStaff from 'src/modules/MedicalStaffModules/MedicalStaff.Entity'

@Entity('wellness_programs')
export default class WellnessPrograms extends BaseEntityUuid {
  @Column()
  code: string

  @Column()
  name: string

  // @ManyToMany(
  //   () => WellnessEvent,
  //   (wellnessEvent) => wellnessEvent.wellnessPrograms,
  // )
  // @JoinColumn({ name: 'code' })
  // wellnessEvent: WellnessEvent
  // @ManyToMany(() => WellnessEvent, (wellness_event) => wellness_event.wellness_programs)
  // @JoinTable()
  // wellness_events?: WellnessEvent[]
}
