import { Entity, Column, ManyToOne } from 'typeorm'
import Base from '../base/base.entity'
import { Property } from '../property/property.entity'
import { User } from '../user/user.entity'
import { BookingStatus } from '../../constants/enum/booking'

@Entity()
export class Booking extends Base {
  @Column()
  date: Date

  @Column({ nullable: true })
  message: string

  @Column({ default: false })
  isVerified: boolean

  @Column({ type: 'enum', enum: BookingStatus, default: BookingStatus.pending })
  status: BookingStatus

  @Column({ type: 'timestamp', nullable: true })
  adminConfirmedAt: Date

  @Column({ default: 0 })
  emailSentCount: number

  @Column({ type: 'timestamp', nullable: true })
  lastEmailSentAt: Date

  @ManyToOne(() => User, (user) => user.bookings)
  user: User

  @ManyToOne(() => Property, (property) => property.bookings, { onDelete: 'CASCADE' })
  property: Property
}
