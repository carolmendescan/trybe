import { Request, Response } from 'express';
import createProductService from '../services/productsPostService';
import mapStatus from '../utils/mapStatus';

async function createProductController(req: Request, res: Response): Promise<Response> {
  const { name, price, orderId } = req.body;
  const response = await createProductService.createProductService({ name, price, orderId });

  if (response.status !== 'SUCCESS') {
    return res.status(mapStatus(response.status)).json(response.data);
  }
  return res.status(201).json(response.data);
}

export default {
  createProductController,
};