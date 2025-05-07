import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Address } from './address.entity'
import { District } from './district.entity'
import { Ward } from './ward.entity'

@Entity()
export class Municipality {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    name: 'municipality_title',
  })
  municipalityTitle: string

  @Column({
    name: 'municipality_title_nepali',
  })
  municipalityTitleNepali: string

  @Column({
    name: 'code',
  })
  code: number

  // Relationship between municipality and ward
  @OneToMany((type) => Ward, (ward) => ward.municipality)
  wards: Ward[]

  @ManyToOne((type) => District, (district) => district.municipalities, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'district_id' })
  district: District

  // Relationship between municipality and address
  @OneToMany(() => Address, (address) => address.district)
  address: Address[]
}
