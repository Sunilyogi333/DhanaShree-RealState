import { Entity, Column, ManyToOne, OneToMany, OneToOne, JoinColumn } from 'typeorm'
import Base from '../base/base.entity'
import Admin from '../admin/admin.entity'
import { Image } from '../images/image.entity'
import { Address } from '../address/address.entity'
import { Booking } from '../booking/booking.entity'
import { PropertyDetails } from '../../types/property.type'
import { PropertyStatus, PropertyType, Purpose } from '../../constants/enum/property'

@Entity()
export class Property extends Base {
  @Column({ unique: true })
  propertyCode: string

  @Column({ nullable: true })
  price: number

  @Column({ type: 'enum', enum: PropertyType })
  type: PropertyType

  @Column({ type: 'enum', enum: PropertyStatus })
  status: PropertyStatus

  @Column({ type: 'enum', enum: Purpose })
  purpose: Purpose

  @Column({ nullable: true, type: 'jsonb' })
  details: PropertyDetails

  @OneToOne(() => Address, (address) => address.property, { cascade: true })
  @JoinColumn()
  address: Address

  @ManyToOne(() => Admin, (admin) => admin.properties)
  admin: Admin

  @OneToMany(() => Image, (image) => image.property, { cascade: true })
  images: Image[]

  @OneToMany(() => Booking, (booking) => booking.property)
  bookings: Booking[]
}
