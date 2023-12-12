import ITeamStats from '../Interfaces/leaderboard/ITeamStats';
import { ITeams } from '../Interfaces/teams';
import IMatches from '../Interfaces/matches';

type TGames = {
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
};

export default class LeaderboardBuilder {
  private matches: IMatches[];

  constructor(matches: IMatches[]) {
    this.matches = matches;
  }

  private calculatePoints(teamId: number, side: 'home' | 'away'): number {
    return this.matches.reduce((totalPoints, match) => {
      if (
        (side === 'home' && match.homeTeamId === teamId)
        || (side === 'away' && match.awayTeamId === teamId)
      ) {
        const isMatchWon = (side === 'home' && match.homeTeamGoals > match.awayTeamGoals)
          || (side === 'away' && match.awayTeamGoals > match.homeTeamGoals);
        const isMatchDrawn = match.homeTeamGoals === match.awayTeamGoals;

        if (isMatchWon) { return totalPoints + 3; }
        if (isMatchDrawn) { return totalPoints + 1; }
      }

      return totalPoints;
    }, 0);
  }

  private calculateTeamGames(teamId: number): TGames {
    const teamMatches = this.matches.filter(
      (match) => match.homeTeamId === teamId || match.awayTeamId === teamId,
    );

    const totalGames = teamMatches.length;
    const totalVictories = teamMatches.reduce((total, match) => {
      const isMatchWon = (match.homeTeamId === teamId
          && match.homeTeamGoals > match.awayTeamGoals) || (match.awayTeamId === teamId
          && match.awayTeamGoals > match.homeTeamGoals);
      return total + (isMatchWon ? 1 : 0);
    }, 0);
    const totalDraws = teamMatches.reduce((total, match) => {
      const isMatchDrawn = match.homeTeamGoals === match.awayTeamGoals;
      return total + (isMatchDrawn ? 1 : 0);
    }, 0);
    const totalLosses = totalGames - totalVictories - totalDraws;

    return { totalGames, totalVictories, totalDraws, totalLosses };
  }

  private calculateTeamGoals(teamId: number): {
    goalsFavor: number;
    goalsOwn: number;
  } {
    const teamMatches = this.matches.filter(
      (match) => match.homeTeamId === teamId || match.awayTeamId === teamId,
    );

    const goalsFavor = teamMatches
      .reduce((total, match) => total + (match.homeTeamId === teamId
        ? match.homeTeamGoals : match.awayTeamGoals), 0);
    const goalsOwn = teamMatches
      .reduce((total, match) => total + (match.homeTeamId === teamId
        ? match.awayTeamGoals : match.homeTeamGoals), 0);

    return {
      goalsFavor,
      goalsOwn,
    };
  }

  public calculateTeamStats(teams: ITeams[]): ITeamStats[] {
    return teams.map((team) => {
      const { totalGames, totalVictories, totalDraws, totalLosses } = this.calculateTeamGames(
        team.id,
      );

      const { goalsFavor, goalsOwn } = this.calculateTeamGoals(team.id);

      return {
        name: team.teamName,
        totalPoints: this.calculatePoints(team.id, 'home') + this.calculatePoints(team.id, 'away'),
        totalGames,
        totalVictories,
        totalDraws,
        totalLosses,
        goalsFavor,
        goalsOwn,
        goalsBalance: goalsFavor - goalsOwn,
        efficiency: +(((totalVictories * 3 + totalDraws) / (totalGames * 3)) * 100).toFixed(2),
      };
    });
  }
}
