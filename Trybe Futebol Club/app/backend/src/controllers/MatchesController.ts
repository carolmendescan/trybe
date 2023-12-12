import { Request, Response } from 'express';
import MatchesService from '../services/matchesService';
import mapStatusHTTP from '../utils/mapStatusHttps';

export default class MatchesControllerController {
  private readonly _matchesService: MatchesService;

  constructor() {
    this._matchesService = new MatchesService();
  }

  // eslint-disable-next-line class-methods-use-this
  async matches(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;
    const inProgressCheck = !inProgress ? undefined : inProgress === 'true';
    if (inProgressCheck === undefined) {
      const response = await this._matchesService.findAll();
      return res.status(mapStatusHTTP(response.status)).json(response.data);
    }
    const matchesInProgress = await this._matchesService.findByProgress(inProgressCheck);
    return res.status(mapStatusHTTP(matchesInProgress.status)).json(matchesInProgress.data);
  }

  async finishMatch(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const response = await this._matchesService.finishMatch(parseInt(id, 10));
    return res.status(mapStatusHTTP(response.status)).json(response.data);
  }

  async updateMatch(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const response = await this._matchesService.updateMatch(parseInt(id, 10), req.body);
    return res.status(mapStatusHTTP(response.status)).json(response.data);
  }

  async createMatch(req: Request, res: Response): Promise<Response> {
    const response = await this._matchesService.createMatch(req.body);
    return res.status(mapStatusHTTP(response.status)).json(response.data);
  }
}
