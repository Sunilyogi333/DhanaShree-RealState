import { Request, Response } from 'express'
import bookingService from '../../services/booking/booking.service'
import { StatusCodes } from '../../constants/statusCodes'
import { BookingStatus } from '../../constants/enum/booking'

class BookingController {
  async create(req: Request, res: Response) {
    const result = await bookingService.create(req.body)
    return res.status(StatusCodes.CREATED).json(result)
  }

  async verify(req: Request, res: Response) {
    const token = req.query.token as string
    const result = await bookingService.verifyBooking(token)
    return res.status(StatusCodes.SUCCESS).json(result)
  }

  async resend(req: Request, res: Response) {
    const { propertyId, email } = req.body
    const result = await bookingService.resendVerificationEmail(propertyId, email)
    return res.status(StatusCodes.SUCCESS).json(result)
  }

  async update(req: Request, res: Response) {
    const bookingId = req.params.id
    const data = req.body
    const result = await bookingService.updateBooking(bookingId, data)
    res.status(StatusCodes.SUCCESS).json(result)
  }

  async getAll(req: Request, res: Response) {
    const status = req.query.status as BookingStatus | undefined
    const email = (req.query.email as string | undefined)?.toLowerCase()
    const page = parseInt(req.query.page as string) || 1
    const size = parseInt(req.query.size as string) || 10

    const result = await bookingService.getAllBookings({ status, page, size, email })

    res.status(200).json({
      success: true,
      data: result.bookings,
      pagination: result.pagination,
    })
  }

  async getOne(req: Request, res: Response) {
    const bookingId = req.params.id
    const booking = await bookingService.getOne(bookingId)

    res.status(StatusCodes.SUCCESS).json({ success: true, data: booking })
  }
}

export default new BookingController()
