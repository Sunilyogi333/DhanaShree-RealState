import { Column, Entity, ManyToOne, OneToOne, JoinColumn } from 'typeorm'
import Base from '../base/base.entity'
import { District } from './district.entity'
import { Municipality } from './municipality.entity'
import { Province } from './province.entity'
import { Ward } from './ward.entity'
import { Property } from '../property/property.entity'

@Entity({
  name: 'address',
})
export class Address extends Base {
  @ManyToOne(() => Province, (province) => province.address)
  province: Province

  @ManyToOne(() => District, (district) => district.address)
  district: District

  @ManyToOne(() => Municipality, (municipality) => municipality.address)
  municipality: Municipality

  @ManyToOne(() => Ward, (ward) => ward.address)
  ward: Ward

  @OneToOne(() => Property, (property) => property.address)
  @JoinColumn()
  property: Property
}
