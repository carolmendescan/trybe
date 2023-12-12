import { Request, Response } from 'express';
import getProductService from '../services/getProductService';

async function getProductController(req: Request, res: Response): Promise<Response> {
  const response = await getProductService.getProductService();
  return res.status(200).json(response.data);
}

export default {
  getProductController,
};