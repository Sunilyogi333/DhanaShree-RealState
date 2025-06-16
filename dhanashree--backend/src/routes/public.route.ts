import type { Router as IRouter } from 'express'
import Router from 'express'
import { catchAsync } from '../utils/catchAsync'
import publicController from '../controllers/public/public.controller'

const router: IRouter = Router()

router.get('/dashboard', catchAsync(publicController.getDashboardStats.bind(publicController)))

export default router
