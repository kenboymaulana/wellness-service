import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { BaseEntityUuid } from '../../../base/Entity.Base'
import WellnessEventMember from '../WellnessEventMemberModules/WellnessEventMember.Entity'
import WellnessProgramItem from '../WellnessProgramItemModules/WellnessProgramItem.Entity'

@Entity('wellness_event_member_result')
export default class WellnessEventMemberResult extends BaseEntityUuid {
  @Column()
  wellness_event_member_id: number
  
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

  @ManyToOne(
    () => WellnessEventMember,
    (wellnessEventMember) => wellnessEventMember.wellnessEventMemberResult,
  )
  @JoinColumn({ name: 'wellness_event_member_id' })
  wellnessEventMember: WellnessEventMember

}
