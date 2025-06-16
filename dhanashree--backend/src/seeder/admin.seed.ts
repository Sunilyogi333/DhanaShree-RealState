import { admin } from '../constants/admin' //  import single admin object
import { AppDataSource } from '../config/database.config'
import Admin from '../entities/admin/admin.entity'
import { IAdmin } from '../interfaces/admin.interface'
import BcryptService from '../utils/bcrypt.utils'

const AdminRepo = AppDataSource.getRepository(Admin)

async function seedAdmin(admin: IAdmin) {
  try {
    const existingAdmin = await AdminRepo.createQueryBuilder('admin')
      .where('email = :email', { email: admin.email })
      .getOne()
    if (existingAdmin) {
      console.log(`Skipping ${admin.email} admin, already exists`)
      return
    }

    const newAdmin = AdminRepo.create(admin)
    newAdmin.password = await BcryptService.hash(admin.password)

    await AdminRepo.save(newAdmin)

    console.log(`Added ${admin.email} admin to database`)
  } catch (error) {
    console.log(`Failed to seed ${admin.email} admin 💣`)
    console.error(error)
  }
}

async function seed() {
  try {
    await AppDataSource.initialize()
    await seedAdmin(admin)
  } catch (error) {
    console.log('Failed to seed admin 💣')
    console.error(error)
  } finally {
    process.exit(0)
  }
}

const args = process.argv[2]
if (!args) {
  console.error('Please provide an argument')
  process.exit(1)
}

if (args === 'seed') {
  void seed()
} else {
  console.error('Invalid argument')
  process.exit(1)
}
