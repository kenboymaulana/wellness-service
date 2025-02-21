import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm'
import { BaseEntityUuid } from '../../../base/Entity.Base'
import Permission from '../Permission/Permission.Entity'
import User from '../../UserModules/User/User.Entity'

@Entity('roles')
export default class Role extends BaseEntityUuid {
  @Column()
  name: string

  @Column()
  for_type: string

  @ManyToMany(() => User, (user) => user.roles)
  users?: User[]

  @ManyToMany(() => Permission, (permission) => permission.roles)
  @JoinTable()
  permissions?: Permission[]
}
