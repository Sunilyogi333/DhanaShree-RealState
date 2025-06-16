import { Column, Entity, OneToMany } from 'typeorm'
import Base from '../base/base.entity'
import { Property } from '../property/property.entity'
import { ROLE } from '../../constants/enum'

@Entity()
export default class Admin extends Base {
  @Column({
    unique: true,
  })
  email: string

  @Column()
  password: string

  @Column({ default: ROLE.ADMIN })
  role: ROLE

  @Column({
    nullable: true,
  })
  phoneNumber: string

  @Column({ type: 'text', nullable: true })
  refreshToken: string | null

  @OneToMany(() => Property, (property) => property.admin)
  properties: Property[]
}
