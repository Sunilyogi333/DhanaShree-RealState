import type { Router as IRouter } from 'express'
import Router from 'express'
import requestController from '../controllers/request/request.controller'
import { catchAsync } from '../utils/catchAsync'
import authentication from '../middlewares/authentication.middleware'
import { ROLE } from '../constants/enum'

const router: IRouter = Router()

router.post('/', catchAsync(requestController.create.bind(requestController)))
router.get('/verify', catchAsync(requestController.verify.bind(requestController)))
router.get('/', catchAsync(requestController.getAll.bind(requestController)))
router.post('/resend', catchAsync(requestController.resend.bind(requestController)))
router.get(
  '/:id',
  authentication(ROLE.ADMIN),
  catchAsync(requestController.getOne.bind(requestController))
)
router.patch(
  '/:id',
  authentication(ROLE.ADMIN),
  catchAsync(requestController.update.bind(requestController))
)

export default router
