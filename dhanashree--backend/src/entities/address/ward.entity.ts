import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Address } from './address.entity'
import { Municipality } from './municipality.entity'

@Entity()
export class Ward extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    name: 'ward_number',
  })
  wardNumber: number

  @ManyToOne((type) => Municipality, (municipality) => municipality.wards, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'municipality_id' })
  municipality: Municipality

  @Column({
    name: 'ward_number_nepali',
  })
  wardNumberNepali: string

  @OneToMany(() => Address, (address) => address.district)
  address: Address[]
}
