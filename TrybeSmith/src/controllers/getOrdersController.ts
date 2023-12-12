import { Request, Response } from 'express';
import getOrdersService from '../services/getOrdersService';

async function getOrdersController(req: Request, res: Response): Promise<Response> {
  const response = await getOrdersService.getOrdersService();
  return res.status(200).json(response.data);
}

export default {
  getOrdersController,
};