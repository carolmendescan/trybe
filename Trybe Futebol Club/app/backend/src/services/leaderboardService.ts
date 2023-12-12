import LeaderboardBuilder from '../utils/leaderboardBuilder';
import ITeamStats from '../Interfaces/leaderboard/ITeamStats';
import { ServiceResponse } from '../Interfaces/services';
import LeaderboardModel from '../models/leaderboard.model';
import { ILeaderboard } from '../Interfaces/leaderboard/ILeaderboard';
import LeaderboardBySide from '../utils/leaderboardBySideBuilder';
import TeamsModel from '../models/team.model';
import ILeaderboardData from '../Interfaces/leaderboard/ILeaderboardData';

export default class LeaderboardService {
  constructor(private leaderboardModel
  : Omit<ILeaderboard, 'findById' | 'findAll'> = new LeaderboardModel()) {}

  private _leaderboard: ITeamStats[] = [];
  private _data = {} as ILeaderboardData;

  async getStats(): Promise<ServiceResponse<ITeamStats[]>> {
    this._leaderboard = await this.getLeaderboard();
    return { status: 'SUCCESS', data: this.sortTeams() };
  }

  async getHomeStats(): Promise<ServiceResponse<ITeamStats[]>> {
    this._leaderboard = await this.getHomeLeaderboard();
    return { status: 'SUCCESS', data: this.sortTeams() };
  }

  async getAwayStats(): Promise<ServiceResponse<ITeamStats[]>> {
    this._leaderboard = await this.getAwayLeaderboard();
    return { status: 'SUCCESS', data: this.sortTeams() };
  }

  private async getLeaderboard(): Promise<ITeamStats[]> {
    const { matches, teams } = await this.getData();

    const leaderboardBuilder = new LeaderboardBuilder(matches);
    return leaderboardBuilder.calculateTeamStats(teams);
  }

  private async getHomeLeaderboard(): Promise<ITeamStats[]> {
    const { matches, teams } = await this.getData();

    return teams.map((team) => {
      const homeStats = matches.filter((match) => team.id === match.homeTeamId);
      const leaderboardBuilder = new LeaderboardBySide(homeStats, team.id, 'home');
      return {
        name: team.teamName,
        totalPoints: leaderboardBuilder.totalPoints,
        totalGames: homeStats.length,
        totalVictories: leaderboardBuilder.totalVictories,
        totalDraws: leaderboardBuilder.totalDraws,
        totalLosses: leaderboardBuilder.totalLosses,
        goalsFavor: leaderboardBuilder.goalsFavor,
        goalsOwn: leaderboardBuilder.goalsOwn,
        goalsBalance: leaderboardBuilder.goalsBalance,
        efficiency: leaderboardBuilder.efficiency,
      };
    });
  }

  private async getAwayLeaderboard(): Promise<ITeamStats[]> {
    const { matches, teams } = await this.getData();

    return teams.map((team) => {
      const awayStats = matches.filter((match) => team.id === match.awayTeamId);
      const leaderboardBuilder = new LeaderboardBySide(awayStats, team.id, 'away');
      return {
        name: team.teamName,
        totalPoints: leaderboardBuilder.totalPoints,
        totalGames: awayStats.length,
        totalVictories: leaderboardBuilder.totalVictories,
        totalDraws: leaderboardBuilder.totalDraws,
        totalLosses: leaderboardBuilder.totalLosses,
        goalsFavor: leaderboardBuilder.goalsFavor,
        goalsOwn: leaderboardBuilder.goalsOwn,
        goalsBalance: leaderboardBuilder.goalsBalance,
        efficiency: leaderboardBuilder.efficiency,
      };
    });
  }

  private async getData(): Promise<ILeaderboardData> {
    this._data = {
      matches: await this.leaderboardModel.getTeamStats(),
      teams: await new TeamsModel().findAll(),
    };
    return this._data;
  }

  private sortTeams(): ITeamStats[] {
    const params: (keyof ITeamStats)[] = [
      'totalPoints', 'totalVictories', 'goalsBalance', 'goalsFavor',
    ];

    return this._leaderboard.sort((a, b) => {
      const sorted = params.find((param) => a[param] !== b[param]) as keyof ITeamStats;
      return +b[sorted] - +a[sorted];
    });
  }
}
