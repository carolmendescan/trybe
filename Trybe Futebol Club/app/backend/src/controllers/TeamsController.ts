import { Request, Response } from 'express';
import TeamsService from '../services/teamsService';
import mapStatusHTTP from '../utils/mapStatusHttps';

export default class TeamsController {
  private readonly _teamsService: TeamsService;

  constructor() {
    this._teamsService = new TeamsService();
  }

  // eslint-disable-next-line class-methods-use-this
  async findAll(_req: Request, res: Response): Promise<Response> {
    const response = await this._teamsService.findAll();
    return response.status !== 'SUCCESS'
      ? res.status(mapStatusHTTP(response.status)).json(response.data)
      : res.status(200).json(response.data);
  }

  async findByPk(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const response = await this._teamsService.findByPk(parseInt(id, 10));
    return response.status !== 'SUCCESS'
      ? res.status(mapStatusHTTP(response.status)).json(response.data)
      : res.status(200).json(response.data);
  }
}
