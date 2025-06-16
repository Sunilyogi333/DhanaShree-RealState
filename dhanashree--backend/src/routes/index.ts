import { Request, Response, Router } from 'express'
import AuthRoute from './auth.route'
import AdminRoute from './admin.route'
import PropertyRoute from './property.route'
import AddressRoute from './address.route'
import ImageRoute from './image.route'
import BookingRoute from './booking.route'
import RequestRoute from './request.route'
import OverviewRoute from './overview.route'

export interface Route {
  path: string
  route: Router
}

const router = Router()

const routes: Route[] = [
  {
    path: '/auth',
    route: AuthRoute,
  },
  {
    path: '/admin',
    route: AdminRoute,
  },
  {
    path: '/address',
    route: AddressRoute,
  },
  {
    path: '/image',
    route: ImageRoute,
  },
  {
    path: '/property',
    route: PropertyRoute,
  },
  {
    path: '/booking',
    route: BookingRoute,
  },
  {
    path: '/request',
    route: RequestRoute,
  },
  {
    path: '/overview',
    route: OverviewRoute,
  },
]

routes.forEach((route) => {
  router.use(route.path, route.route)
})

router.get('/', (req: Request, res: Response) => {
  res.send({
    success: true,
    message: 'Welcome to Dhanashree API',
    data: [],
  })
})

export default router
