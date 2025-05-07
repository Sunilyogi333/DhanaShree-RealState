import { IAdmin } from '../interfaces/admin.interface'
import { EnvironmentConfiguration } from '../config/env.config'

export const admin: IAdmin = {
  email: EnvironmentConfiguration.ADMIN_EMAIL,
  password: EnvironmentConfiguration.ADMIN_PASSWORD,
}
