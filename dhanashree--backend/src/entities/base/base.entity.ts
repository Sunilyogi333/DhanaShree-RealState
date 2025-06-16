import { fstat } from 'fs'
import {
  BaseEntity,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm'

export default abstract class Base extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @Column({ name: 'updated_at', nullable: true, select: false })
  updatedAt: Date

  @DeleteDateColumn({ name: 'deleted_at', select: false })
  deletedAt: Date

  @BeforeUpdate()
  async updateDate() {
    this.updatedAt = new Date(Date.now())
  }
}
