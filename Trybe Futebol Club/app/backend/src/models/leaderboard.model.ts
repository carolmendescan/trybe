import SequelizeTeams from '../database/models/teams';
import SequelizeMatches from '../database/models/matches';
import { ILeaderboard } from '../Interfaces/leaderboard/ILeaderboard';
import IMatches from '../Interfaces/matches';

export default class LeaderboardModel implements Omit<ILeaderboard, 'findById' | 'findAll'> {
  private model = SequelizeMatches;

  async getTeamStats(): Promise<IMatches[]> {
    return this.model.findAll({
      attributes: { exclude: ['home_team_id', 'away_team_id'] },
      include: [
        { model: SequelizeTeams, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: SequelizeTeams, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
      where: { inProgress: false },
    });
  }
}
