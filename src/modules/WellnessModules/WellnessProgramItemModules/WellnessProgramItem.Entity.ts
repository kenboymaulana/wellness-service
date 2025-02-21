import { Column, Entity, JoinColumn, ManyToOne, OneToMany, ManyToMany, JoinTable, OneToOne } from 'typeorm'
import { BaseEntityUuid } from '../../../base/Entity.Base'
import WellnessEvent from '../WellnessEventModules/WellnessEvent.Entity'
import MedicalStaff from 'src/modules/MedicalStaffModules/MedicalStaff.Entity'
import WellnessEventMemberResult from '../WellnessEventMemberResultModules/WellnessEventMemberResult.Entity'

@Entity('wellness_program_item')
export default class WellnessProgramItem extends BaseEntityUuid {
  @Column()
  wellness_program_id: number

  @Column()
  wellness_item_id: number
}
