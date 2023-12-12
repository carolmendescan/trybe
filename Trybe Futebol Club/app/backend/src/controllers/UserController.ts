import { Request, Response } from 'express';

import UserService from '../services/userService';

import { IUser } from '../Interfaces/user';

import mapStatusHTTP from '../utils/mapStatusHttps';

export default class UserController {
  private readonly _userService: UserService;

  constructor() {
    this._userService = new UserService();
  }

  // eslint-disable-next-line class-methods-use-this
  async login(req: Request, res: Response): Promise<Response> {
    const body = req.body as IUser;

    const response = await this._userService.login(body);
    return response.status !== 'SUCCESS'
      ? res.status(mapStatusHTTP(response.status)).json(response.data)
      : res.status(200).json({ token: response.data });
  }

  async role(_req: Request, res: Response): Promise<Response> {
    const decodedToken = res.locals.user;
    const response = await this._userService.role(decodedToken);
    return response.status !== 'SUCCESS'
      ? res.status(mapStatusHTTP(response.status)).json(response.data)
      : res.status(200).json({ role: decodedToken.role });
  }
}
