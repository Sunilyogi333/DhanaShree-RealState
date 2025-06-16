// property.entity.ts
import { Entity, Column, OneToMany } from 'typeorm'
import Base from '../base/base.entity'
import { Booking } from '../booking/booking.entity'

@Entity()
export class User extends Base {
  @Column()
  fullName: string

  @Column({ unique: true })
  email: string

  @Column()
  phone: string

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: Booking[]
}
