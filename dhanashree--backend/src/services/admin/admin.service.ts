import { AppDataSource } from '../../config/database.config'
import { Message } from '../../constants/message'
import Admin from '../../entities/admin/admin.entity'
import HttpException from '../../utils/HttpException'
import { User } from '../../entities/user/user.entity'
import { Booking } from '../../entities/booking/booking.entity'
import { Property } from '../../entities/property/property.entity'
import { PropertyType } from '../../constants/enum/property'
import { startOfMonth, endOfMonth } from 'date-fns'
import { Between } from 'typeorm'
class AdminService {
  constructor(private readonly AdminRepo = AppDataSource.getRepository(Admin)) {}

  async getById(id: string) {
    const admin = await this.AdminRepo.findOne({
      where: { id },
    })

    if (!admin) throw HttpException.notFound(Message.notFound)

    return admin
  }

  async getDashboardStats() {
    const userRepo = AppDataSource.getRepository(User)
    const propertyRepo = AppDataSource.getRepository(Property)
    const bookingRepo = AppDataSource.getRepository(Booking)

    const [totalUsers, totalProperties, bookingsThisMonth] = await Promise.all([
      userRepo.count(),
      propertyRepo.count(),
      bookingRepo.count({
        where: {
          createdAt: Between(startOfMonth(new Date()), endOfMonth(new Date())),
        },
      }),
    ])
    const groupedByType = await propertyRepo
      .createQueryBuilder('property')
      .select('property.type', 'type')
      .addSelect('COUNT(*)', 'count')
      .groupBy('property.type')
      .getRawMany()

    const propertyByType = Object.values(PropertyType).reduce(
      (acc, type) => {
        const found = groupedByType.find((item) => item.type === type)
        acc[type] = Number(found?.count || 0)
        return acc
      },
      {} as Record<PropertyType, number>
    )

    return {
      totalUsers,
      totalProperties,
      bookingsThisMonth,
      propertyByType,
    }
  }
}

export default new AdminService()
