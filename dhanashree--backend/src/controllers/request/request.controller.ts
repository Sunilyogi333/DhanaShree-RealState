import { Request, Response } from 'express'
import requestService from '../../services/request/request.service'
import { StatusCodes } from '../../constants/statusCodes'
import { RequestStatus } from '../../constants/enum/request'

class RequestController {
  async create(req: Request, res: Response) {
    const result = await requestService.create(req.body)
    res.status(StatusCodes.CREATED).json(result)
  }

  async verify(req: Request, res: Response) {
    const token = req.query.token as string
    const result = await requestService.verify(token)
    res.status(StatusCodes.SUCCESS).json(result)
  }

  async getAll(req: Request, res: Response) {
    const status = req.query.status as RequestStatus | undefined
    const email = (req.query.email as string | undefined)?.toLowerCase()
    const page = parseInt(req.query.page as string) || 1
    const size = parseInt(req.query.size as string) || 10

    const result = await requestService.getAll({ status, page, size, email })

    res.status(StatusCodes.SUCCESS).json({ success: true, data: result.requests, pagination: result.pagination })
  }

  async getOne(req: Request, res: Response) {
    const id = req.params.id
    const result = await requestService.getOne(id)
    res.status(StatusCodes.SUCCESS).json({ success: true, data: result })
  }

  async update(req: Request, res: Response) {
    const id = req.params.id
    const result = await requestService.update(id, req.body)
    res.status(StatusCodes.SUCCESS).json(result)
  }
}

export default new RequestController()
