// property.entity.ts
import { Entity, Column, ManyToOne, OneToMany, OneToOne, JoinColumn } from 'typeorm'
import Base from '../base/base.entity'
import Admin from '../admin/admin.entity'
import { Image } from '../images/image.entity'
import { MultiLanguage } from '../../constants/global'
import { Address } from '../address/address.entity'
import { PropertyType, PropertyStatus, FurnishingType, PurposeType } from '../../constants/enum'
@Entity()
export class Property extends Base {
  @Column()
  name: string

  @Column({ unique: true })
  propertyCode: string

  @Column('decimal')
  price: number

  @Column()
  description: string


  @Column({ nullable: true })
  facing: string

  @Column({ nullable: true })
  bedrooms: number

  @Column({ nullable: true })
  bathrooms: number

  @Column({ nullable: true })
  kitchens: number

  @Column({ nullable: true })
  floors: number


  @Column({ nullable: true })
  livingRooms: number

  @Column('decimal', { nullable: true })
  landArea: number

  @Column('decimal', { nullable: true })
  builtInArea: number

  @Column({ nullable: true })
  builtYear: number

  @Column({ nullable: true })
  parking: number

  @Column({ nullable: true })
  road: string

  @OneToOne(() => Address, (address) => address.property, { cascade: true })
  @JoinColumn()
  address: Address

  @ManyToOne(() => Admin, (admin) => admin.properties)
  admin: Admin

  @OneToMany(() => Image, (image) => image.property, { cascade: true })
  images: Image[]
}
