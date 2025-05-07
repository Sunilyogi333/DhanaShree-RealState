import { catchAsync } from '../utils/catchAsync'
import type { Router as IRouter } from 'express'
import Router from 'express'
import addressController from '../controllers/address.controller'

const router: IRouter = Router()

router.get('/province', catchAsync(addressController.getProvinces))
router.get('/district/:id', catchAsync(addressController.getDistricts))
router.get('/district', catchAsync(addressController.getAllDistrict))
router.get('/municipality/:id', catchAsync(addressController.getMunicipalities))
router.get('/ward/:id', catchAsync(addressController.getWards))

export default router
