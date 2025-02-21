import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { BaseEntityUuid } from '../../../base/Entity.Base'
import WellnessEventMember from '../WellnessEventMemberModules/WellnessEventMember.Entity'
import WellnessProgramItem from '../WellnessProgramItemModules/WellnessProgramItem.Entity'

@Entity('wellness_event_member_result_values')
export default class WellnessEventMemberResultValues extends BaseEntityUuid {
  @Column()
  wellness_event_member_id: number

  @Column()
  item_code: string

  @Column()
  item_value: string

  @Column({nullable: true})
  time_input: Date

  @Column({type: 'date', nullable: true})
  date: Date

}
