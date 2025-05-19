import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import Base from '../base/base.entity'
import { Property } from '../property/property.entity'

@Entity()
export class Image extends Base {
  @Column({ nullable: false })
  url: string

  @Column({ default: 'normal' })
  type: 'thumbnail' | 'normal'

  @ManyToOne(() => Property, (property) => property.images, { onDelete: 'CASCADE' })
  property: Property
}
