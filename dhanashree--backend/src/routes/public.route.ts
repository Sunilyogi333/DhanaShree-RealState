import type { Router as IRouter } from 'express'
import Router from 'express'
import { catchAsync } from '../utils/catchAsync'
import PublicController from '../controllers/public/public.controller'

const router: IRouter = Router()

router.get('/dashboard', catchAsync(PublicController.getDashboardStats.bind(PublicController)))

export default router
