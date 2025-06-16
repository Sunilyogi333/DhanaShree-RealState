import { Request, Response } from 'express'
import { StatusCodes } from '../../constants/statusCodes'
import { Message } from '../../constants/message'
import overviewService from '../../services/overview/overview.service'

class OverviewController {
  async getDashboardStats(req: Request, res: Response) {
    const data = await overviewService.getDashboardStats()
    return res.status(StatusCodes.SUCCESS).json({
      success: true,
      data,
      message: Message.fetched,
    })
  }
}

export default new OverviewController()
