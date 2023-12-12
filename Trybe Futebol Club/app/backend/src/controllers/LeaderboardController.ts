import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboardService';
import mapStatus from '../utils/mapStatusHttps';

export default class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) {}

  async findLeaderboard(req: Request, res: Response) {
    const { status, data } = await this.leaderboardService.getStats();
    return res.status(mapStatus(status)).json(data);
  }

  async findHomeLeaderboard(req: Request, res: Response) {
    const { status, data } = await this.leaderboardService.getHomeStats();
    return res.status(mapStatus(status)).json(data);
  }

  async findAwayLeaderboard(req: Request, res: Response) {
    const { status, data } = await this.leaderboardService.getAwayStats();
    return res.status(mapStatus(status)).json(data);
  }
}
