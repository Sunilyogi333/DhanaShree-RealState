import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Address } from './address.entity'
import { Municipality } from './municipality.entity'
import { Province } from './province.entity'

@Entity('district')
export class District {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    name: 'district_title',
  })
  districtTitle: string

  @Column({
    name: 'district_title_nepali',
  })
  districtTitleNepali: string

  @Column({
    name: 'code',
  })
  code: number

  @ManyToOne((type) => Province, (province) => province.districts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'province_id' })
  province: Province

  @OneToMany((type) => Municipality, (municipality) => municipality.district)
  municipalities: Municipality[]

  @OneToMany(() => Address, (address) => address.district)
  address: Address[]
}
