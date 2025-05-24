import { Router } from 'express'
import bookingController from '../controllers/booking/booking.controller'
import { ROLE } from '../constants/enum'
import { catchAsync } from '../utils/catchAsync'
import authentication from '../middlewares/authentication.middleware'

const router = Router()

router.post('/', catchAsync(bookingController.create))
router.get('/verify', catchAsync(bookingController.verify))
router.post('/resend', catchAsync(bookingController.resend))
router.get('/:id', authentication([ROLE.ADMIN]), catchAsync(bookingController.getOne))
router.patch('/:id', authentication([ROLE.ADMIN]), catchAsync(bookingController.update))

export default router
