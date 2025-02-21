import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import Permission from '../Permission/Permission.Entity'

@Entity('permission_groups')
export default class PermisionGroup {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({
    nullable: true,
  })
  icon: string

  @Column({
    nullable: true,
  })
  sort: number
  @OneToMany(() => Permission, (permission) => permission.permisionGroup)
  permission: Permission[]
}
