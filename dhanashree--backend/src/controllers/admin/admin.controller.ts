import { Request, Response } from 'express'
import { Message } from '../../constants/message'
import adminService from '../../services/admin/admin.service'
import { StatusCodes } from '../../constants/statusCodes'

class AdminController {
  async getMe(req: Request, res: Response) {
    const id = req?.user?.id as string
    const data = await adminService.getById(id)
    res.status(200).json({
      status: true,
      data,
      message: Message.fetched,
    })
  }
  async getDashboardStats(req: Request, res: Response) {
    const result = await adminService.getDashboardStats()
    res.status(StatusCodes.SUCCESS).json({ success: true, data: result, message: Message.fetched })
  }
}
export default new AdminController()
