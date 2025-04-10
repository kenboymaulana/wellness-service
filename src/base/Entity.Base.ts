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

  @CreateDateColumn({ nullable: true })
  @Exclude()
  created_at: Date

  @UpdateDateColumn({ nullable: true })
  @Exclude()
  updated_at: Date

  @DeleteDateColumn({ nullable: true })
  @Exclude()
  deleted_at: Date
}
