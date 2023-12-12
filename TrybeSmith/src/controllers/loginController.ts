import { Request, Response } from 'express';
import mapStatus from '../utils/mapStatus';
import loginService from '../services/loginService';

async function loginController(req: Request, res: Response) {
  const loginResponse = await loginService.loginService(req.body);

  if (loginResponse.status !== 'SUCCESS') {
    return res.status(mapStatus(loginResponse.status)).json(loginResponse.data);
  }
  res.status(200).json(loginResponse.data);
}

export default {
  loginController,
};
