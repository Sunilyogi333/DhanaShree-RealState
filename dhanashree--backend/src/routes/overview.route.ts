import type { Router as IRouter } from 'express'
import Router from 'express'
import { catchAsync } from '../utils/catchAsync'
import overviewController from '../controllers/overview/overview.controller'

const router: IRouter = Router()

router.get('/dashboard', catchAsync(overviewController.getDashboardStats.bind(overviewController)))

export default router
