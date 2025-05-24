import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm'
import Base from '../base/base.entity'
import { Property } from '../property/property.entity'

@Entity()
export class Image extends Base {
  @Column({ nullable: false })
  url: string

  @Column({ default: 'normal' })
  type: 'thumbnail' | 'normal'

  @Column({ nullable: true })
  propertyId: string

  @ManyToOne(() => Property, (property) => property.images, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'propertyId' })
  property: Property
}
