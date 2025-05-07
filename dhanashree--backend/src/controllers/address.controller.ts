import { Request, Response } from 'express'
import addressService from '../services/address.service'
import { Message } from '../constants/message'

class AddressController {
  async getProvinces(req: Request, res: Response) {
    const data = await addressService.getProvinces()
    res.status(200).json({
      status: true,
      data: {
        data,
      },
      message: Message.fetched,
    })
  }

  async getDistricts(req: Request, res: Response) {
    const id = req.params.id
    const data = await addressService.getDistricts(+id)
    res.status(200).json({
      status: true,
      data,
      message: Message.fetched,
    })
  }

  async getMunicipalities(req: Request, res: Response) {
    const id = req.params.id
    const data = await addressService.getMunicipalities(+id)
    res.status(200).json({
      status: true,
      data,
      message: Message.fetched,
    })
  }

  async getWards(req: Request, res: Response) {
    const id = req.params.id
    const data = await addressService.getWards(+id)
    res.status(200).json({
      status: true,
      data,
      message: Message.fetched,
    })
  }

  async getAllDistrict(req: Request, res: Response) {
    const data = await addressService.getAllDistrict()
    res.status(200).json({
      status: true,
      data,
      message: Message.fetched,
    })
  }
}
export default new AddressController()
