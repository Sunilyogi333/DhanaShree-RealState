import type { Router as IRouter } from 'express'
import Router from 'express'
import { ROLE } from '../constants/enum'
import propertyController from '../controllers/property/property.controller'
import { CreatePropertyDTO } from '../dto/property.dto'
import RequestValidator from '../middlewares/RequestValidator.middleware'
import authentication from '../middlewares/authentication.middleware'
import { catchAsync } from '../utils/catchAsync'
import upload from '../middlewares/multer.middleware'
import { validateImageBuffer } from '../middlewares//fileValidation'

const router: IRouter = Router()

// Create property
router.post(
  '/bac',
  authentication([ROLE.ADMIN]),
  upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'images', maxCount: 10 },
  ]),
  validateImageBuffer,
  RequestValidator.validate(CreatePropertyDTO),
  catchAsync(propertyController.bac.bind(propertyController))
)

// Save Property Meta Data
router.post(
  '/',
  authentication([ROLE.ADMIN]),
  RequestValidator.validate(CreatePropertyDTO),
  catchAsync(propertyController.create.bind(propertyController))
)


// Update property
router.patch(
  '/:id',
  authentication([ROLE.ADMIN]),
  upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'images', maxCount: 10 },
  ]),
  validateImageBuffer,
  catchAsync(propertyController.update.bind(propertyController))
)

// Get all properties (public)
router.get('/', catchAsync(propertyController.getAll.bind(propertyController)))

// Get single property (public)
router.get('/:id', catchAsync(propertyController.getOne.bind(propertyController)))

// Delete property
router.delete('/:id', authentication([ROLE.ADMIN]), catchAsync(propertyController.delete.bind(propertyController)))

export default router
