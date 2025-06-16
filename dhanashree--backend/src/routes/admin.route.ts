import type { Router as IRouter } from 'express'
import Router from 'express'
import { ROLE } from '../constants/enum'
import adminController from '../controllers/admin/admin.controller'
import authentication from '../middlewares/authentication.middleware'
import { catchAsync } from '../utils/catchAsync'

const router: IRouter = Router()

router.get(
  '/me',
  authentication(ROLE.ADMIN),
  catchAsync(adminController.getMe.bind(adminController))
)
router.get(
  '/dashboard',
  authentication(ROLE.ADMIN),
  catchAsync(adminController.getDashboardStats.bind(adminController))
)

export default router
