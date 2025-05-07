import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Address } from './address.entity'
import { District } from './district.entity'

@Entity('province')
export class Province extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    name: 'province_title',
  })
  provinceTitle: string

  @Column({
    name: 'province_title_nepali',
  })
  provinceTitleNepali: string

  @Column()
  code: number

  // relationship between province and district
  @OneToMany((type) => District, (district) => district.province)
  districts: District[]

  @OneToMany(() => Address, (address) => address.district)
  address: Address[]
}
