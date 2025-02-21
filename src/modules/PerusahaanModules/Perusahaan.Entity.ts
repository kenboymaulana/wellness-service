import { Column, Entity, JoinColumn, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm'
import { BaseEntityUuid } from 'src/base/Entity.Base'

@Entity('perusahaan')
export default class WellnessPrograms extends BaseEntityUuid {
  @Column()
  npwp: string

  @Column()
  name: string

  @Column()
  contact: string

  @Column()
  address: string
}
