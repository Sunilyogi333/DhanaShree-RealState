import { AppDataSource } from '../../config/database.config'
import { Message } from '../../constants/message'
import Admin from '../../entities/admin/admin.entity'
import HttpException from '../../utils/HttpException'
import BcryptService from '../../utils/bcrypt.utils'

class AdminService {
  constructor(private readonly AdminRepo = AppDataSource.getRepository(Admin)) {}

  async getById(id: string) {
    const admin = await this.AdminRepo.findOne({
      where: { id },
    })

    if (!admin) throw HttpException.notFound(Message.notFound)

    return admin
  }
}

export default new AdminService()
