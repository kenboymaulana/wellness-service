import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Exclude } from 'class-transformer'

export abstract class BaseEntityUuid {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    nullable: true,
    default: null,
  })
  @Exclude()
  created_by: string

  @Column({
    nullable: true,
    default: null,
  })
  @Exclude()
  updated_by: string

  @Column({
    nullable: true,
    default: null,
  })
  @Exclude()
  deleted_by: string

  @CreateDateColumn()
  @Exclude()
  created_at: Date

  @UpdateDateColumn({ onUpdate: 'CURRENT_TIMESTAMP(6)' })
  @Exclude()
  updated_at: Date

  @DeleteDateColumn()
  @Exclude()
  deleted_at: Date
}
