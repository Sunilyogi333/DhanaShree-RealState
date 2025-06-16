import type { Router as IRouter } from 'express'
import Router from 'express'
import { ROLE } from '../constants/enum'
import authController from '../controllers/auth/auth.controller'
import { LoginDTO, ResetForgotPasswordInput, UpdatePasswordDTO } from '../dto/auth.dto'
import RequestValidator from '../middlewares/RequestValidator.middleware'
import authentication from '../middlewares/authentication.middleware'
import { catchAsync } from '../utils/catchAsync'

const router: IRouter = Router()

router.post(
  '/reset/password-reset-email',
  catchAsync(authController.sendPasswordResetEmail.bind(authController))
)

router.patch(
  '/reset/password-reset',
  RequestValidator.validate(ResetForgotPasswordInput),
  catchAsync(authController.resetPassword.bind(authController))
)

router.post(
  '/login',
  RequestValidator.validate(LoginDTO),
  catchAsync(authController.login.bind(authController))
)

router.patch(
  '/update-password',
  authentication(ROLE.ADMIN),
  RequestValidator.validate(UpdatePasswordDTO),
  catchAsync(authController.updatePassword.bind(authController))
)

router.post(
  '/logout',
  authentication(ROLE.ADMIN),
  catchAsync(authController.Logout.bind(authController))
)

export default router
