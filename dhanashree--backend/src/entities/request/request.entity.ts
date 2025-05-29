import { Entity, Column, ManyToOne } from 'typeorm'
import Base from '../base/base.entity'
import { User } from '../user/user.entity'
import { RequestStatus } from '../../constants/enum/request'

@Entity()
export class RequestListing extends Base {
  @ManyToOne(() => User, { eager: true })
  user: User

  @Column({ type: 'timestamp' })
  date: Date

  @Column({ type: 'text', nullable: true })
  message?: string

  @Column({ default: false })
  isVerified: boolean

  @Column({ type: 'enum', enum: RequestStatus, default: RequestStatus.pending })
  status: RequestStatus

  @Column({ type: 'timestamp', nullable: true })
  adminConfirmedAt?: Date

  @Column({ type: 'timestamp', nullable: true })
  lastEmailSentAt?: Date

  @Column({ type: 'int', default: 0 })
  emailSentCount: number

  @Column()
  address: string
}
