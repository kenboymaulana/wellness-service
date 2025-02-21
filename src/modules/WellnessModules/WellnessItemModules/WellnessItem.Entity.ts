import { Column, Entity, JoinColumn, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm'
import { BaseEntityUuid } from '../../../base/Entity.Base'
import WellnessEvent from '../WellnessEventModules/WellnessEvent.Entity'
import MedicalStaff from 'src/modules/MedicalStaffModules/MedicalStaff.Entity'

@Entity('wellness_item')
export default class WellnessItem extends BaseEntityUuid {
  @Column()
  main_id: string

  @Column()
  parent_id: string

  @Column()
  level: number

  @Column()
  sort: number

  @Column()
  header: number

  @Column()
  code: string

  @Column()
  name: string

  @Column()
  name_eng: string

  @Column()
  desc: string

  // @ManyToMany(
  //   () => WellnessEvent,
  //   (wellnessEvent) => wellnessEvent.wellnessItem,
  // )
  // @JoinColumn({ name: 'code' })
  // wellnessEvent: WellnessEvent
  // @ManyToMany(() => WellnessEvent, (wellness_event) => wellness_event.wellness_programs)
  // @JoinTable()
  // wellness_events?: WellnessEvent[]
}
