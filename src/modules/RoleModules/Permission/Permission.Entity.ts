import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { BaseEntityUuid } from '../../../base/Entity.Base'
import PermisionGroup from '../PermissionGroup/PermissionGroup.Entity'
import Role from '../Role/Role.Entity'

@Entity('permissions')
export default class Permission {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  description: string

  @Column({
    nullable: true,
  })
  icon: string

  @Column({
    nullable: true,
  })
  group_id: number

  @Column({
    nullable: true,
  })
  sort: number

  @Column({
    nullable: true,
  })
  path: string

  @Column({
    nullable: true,
  })
  type: string

  @Column({
    nullable: true,
  })
  name_be: string

  @ManyToMany(() => Role, (role) => role.permissions)
  roles?: Role[]

  @ManyToOne(
    () => PermisionGroup,
    (permisionGroup) => permisionGroup.permission,
  )
  @JoinColumn({ name: 'group_id' })
  permisionGroup: PermisionGroup

}
