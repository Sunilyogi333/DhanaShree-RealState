import type { Router as IRouter } from 'express'
import Router from 'express'
import bookingController from '../controllers/booking/booking.controller'
import { ROLE } from '../constants/enum'
import { catchAsync } from '../utils/catchAsync'
import authentication from '../middlewares/authentication.middleware'

const router: IRouter = Router()

router.post('/', catchAsync(bookingController.create.bind(bookingController)))
router.get('/', catchAsync(bookingController.getAll.bind(bookingController)))
router.get('/verify', catchAsync(bookingController.verify.bind(bookingController)))
router.post('/resend', catchAsync(bookingController.resend.bind(bookingController)))
router.get(
  '/:id',
  authentication(ROLE.ADMIN),
  catchAsync(bookingController.getOne.bind(bookingController))
)
router.patch(
  '/:id',
  authentication(ROLE.ADMIN),
  catchAsync(bookingController.update.bind(bookingController))
)

export default router
