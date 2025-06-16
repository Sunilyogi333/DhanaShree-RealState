import type { Router as IRouter } from 'express'
import Router from 'express'
import { ROLE } from '../constants/enum'
import propertyController from '../controllers/property/property.controller'
import { CreatePropertyDTO, UpdatePropertyDTO } from '../dto/property.dto'
import RequestValidator from '../middlewares/RequestValidator.middleware'
import authentication from '../middlewares/authentication.middleware'
import { catchAsync } from '../utils/catchAsync'

const router: IRouter = Router()

router.post(
  '/',
  authentication([ROLE.ADMIN]),
  RequestValidator.validate(CreatePropertyDTO),
  catchAsync(propertyController.create.bind(propertyController))
)

// Get all properties (public)
router.get('/', catchAsync(propertyController.getAll.bind(propertyController)))

// Get single property (public)
router.get('/:id', catchAsync(propertyController.getOne.bind(propertyController)))

router.patch(
  '/:id',
  authentication([ROLE.ADMIN]),
  RequestValidator.validate(UpdatePropertyDTO),
  catchAsync(propertyController.update.bind(propertyController))
)

// Delete property
router.delete(
  '/:id',
  authentication([ROLE.ADMIN]),
  catchAsync(propertyController.delete.bind(propertyController))
)

export default router
