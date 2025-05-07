import { Request, Response } from 'express'
import { Message } from '../../constants/message'
import adminService from '../../services/admin/admin.service'

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
}
export default new AdminController()
