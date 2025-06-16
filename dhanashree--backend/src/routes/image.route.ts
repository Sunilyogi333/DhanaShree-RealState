// routes/image.routes.ts
import { Router } from 'express'
import authentication from '../middlewares/authentication.middleware'
import { ROLE } from '../constants/enum'
import upload from '../middlewares/multer.middleware'
import { catchAsync } from '../utils/catchAsync'
import imageController from '../controllers/property/image.controller'
import { validateImageBuffer } from '../middlewares/fileValidation'

const router = Router()

// Upload images
router.post(
  '/',
  authentication([ROLE.ADMIN]),
  upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'images', maxCount: 10 },
  ]),
  validateImageBuffer,
  catchAsync(imageController.upload.bind(imageController))
)

router.patch(
  '/:propertyId',
  authentication(ROLE.ADMIN),
  catchAsync(imageController.updateImages.bind(imageController))
)

export default router
