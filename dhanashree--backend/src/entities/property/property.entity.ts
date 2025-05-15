// property.entity.ts
import { Entity, Column, ManyToOne, OneToMany, OneToOne, JoinColumn } from 'typeorm'
import Base from '../base/base.entity'
import Admin from '../admin/admin.entity'
import { Image } from '../images/image.entity'
import { Address } from '../address/address.entity'
import { PropertyDetails } from '../../types/express/property.type'
import { PropertyStatus, PropertyType } from '../../constants/enum/property'

@Entity()
export class Property extends Base {
  @Column({ unique: true })
  propertyCode: string

  @Column({ nullable: true })
  price: number

  @Column({ type: 'enum', enum: PropertyType, default: PropertyType.land })
  type: PropertyType

  @Column({ type: 'enum', enum: PropertyStatus, default: PropertyStatus.emerging })
  status: PropertyStatus

  @Column({ nullable: true, type: 'jsonb' })
  propertyDetails: PropertyDetails

  @OneToOne(() => Address, (address) => address.property, { cascade: true })
  @JoinColumn()
  address: Address

  @ManyToOne(() => Admin, (admin) => admin.properties)
  admin: Admin

  @OneToMany(() => Image, (image) => image.property, { cascade: true })
  images: Image[]
}
