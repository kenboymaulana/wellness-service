import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { BaseEntityUuid } from '../../../base/Entity.Base'
import WellnessEventMember from '../WellnessEventMemberModules/WellnessEventMember.Entity'
import WellnessProgramItem from '../WellnessProgramItemModules/WellnessProgramItem.Entity'

@Entity('wellness_event_member_evaluate')
export default class WellnessEventMemberEvaluate extends BaseEntityUuid {
  @Column()
  wellness_event_member_id: number
  
  @Column()
  keluhan_saat_ini: string

  @Column()
  tingkat_keberhasilan: string

  @Column()
  motivasi: string

  @Column()
  evaluasi: string

  @ManyToOne(
    () => WellnessEventMember,
    (wellnessEventMember) => wellnessEventMember.wellnessEventMemberResult,
  )
  @JoinColumn({ name: 'wellness_event_member_id' })
  wellnessEventMember: WellnessEventMember

}
