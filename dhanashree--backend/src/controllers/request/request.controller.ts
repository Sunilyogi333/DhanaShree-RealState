import { Request, Response } from 'express'
import requestService from '../../services/request/request.service'
import { StatusCodes } from '../../constants/statusCodes'
import { RequestStatus } from '../../constants/enum/request'
import { Message } from '../../constants/message'

class RequestController {
  async create(req: Request, res: Response) {
    const result = await requestService.create(req.body)
    return res
      .status(StatusCodes.CREATED)
      .json({ success: true, data: result, message: Message.requestVerificationEmailSent })
  }

  async resend(req: Request, res: Response) {
    const { requestId } = req.body
    const result = await requestService.resendVerificationEmail(requestId)
    return res
      .status(StatusCodes.SUCCESS)
      .json({ success: true, data: result, message: Message.requestVerificationEmailResent })
  }

  async verify(req: Request, res: Response) {
    const token = req.query.token as string
    const result = await requestService.verify(token)

    const message = result.alreadyVerified ? Message.alreadyVerified : Message.verified

    return res.status(StatusCodes.SUCCESS).json({
      success: true,
      data: result.request,
      message,
    })
  }

  async getAll(req: Request, res: Response) {
    const status = req.query.status as RequestStatus | undefined
    const email = (req.query.email as string) || undefined
    const page = parseInt(req.query.page as string) || 1
    const size = parseInt(req.query.size as string) || 10

    const result = await requestService.getAll({ status, page, size, email })

    return res
      .status(StatusCodes.SUCCESS)
      .json({ success: true, data: result, message: Message.fetched })
  }

  async getOne(req: Request, res: Response) {
    const id = req.params.id
    const result = await requestService.getOne(id)
    return res
      .status(StatusCodes.SUCCESS)
      .json({ success: true, data: result, message: Message.fetched })
  }

  async update(req: Request, res: Response) {
    const id = req.params.id
    const result = await requestService.update(id, req.body)
    return res
      .status(StatusCodes.SUCCESS)
      .json({ success: true, data: result, message: Message.updated })
  }
}

export default new RequestController()
