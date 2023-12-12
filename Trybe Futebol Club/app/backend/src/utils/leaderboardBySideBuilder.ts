import IMatches from '../Interfaces/matches';

export default class LeaderboardBySide {
  private matches: IMatches[];
  private teamId: number;
  private side: 'home' | 'away' | 'all';

  constructor(matches: IMatches[], teamId: number, side: 'home' | 'away' | 'all') {
    this.matches = matches;
    this.teamId = teamId;
    this.side = side;
  }

  private filterMatchesBySide(): IMatches[] {
    if (this.side === 'home') {
      return this.matches.filter((match) => match.homeTeamId === this.teamId);
    }
    if (this.side === 'away') {
      return this.matches.filter((match) => match.awayTeamId === this.teamId);
    }
    return this.matches.filter((match) => match.homeTeamId === this.teamId
      || match.awayTeamId === this.teamId);
  }

  get totalPoints(): number {
    const filteredMatches = this.filterMatchesBySide();

    return filteredMatches.reduce((total, match) => {
      const isMatchWon = (this.side === 'home' && match.homeTeamGoals > match.awayTeamGoals)
        || (this.side === 'away' && match.awayTeamGoals > match.homeTeamGoals);
      const isMatchDrawn = match.homeTeamGoals === match.awayTeamGoals;

      if (isMatchWon) {
        return total + 3;
      } if (isMatchDrawn) {
        return total + 1;
      }

      return total;
    }, 0);
  }

  get totalVictories(): number {
    const filteredMatches = this.filterMatchesBySide();

    return filteredMatches.reduce((total, match) => {
      const isMatchWon = (this.side === 'home' && match.homeTeamGoals > match.awayTeamGoals)
        || (this.side === 'away' && match.awayTeamGoals > match.homeTeamGoals);

      return total + (isMatchWon ? 1 : 0);
    }, 0);
  }

  get totalDraws(): number {
    const filteredMatches = this.filterMatchesBySide();

    return filteredMatches.reduce((total, match) => {
      const isMatchDrawn = match.homeTeamGoals === match.awayTeamGoals;

      return total + (isMatchDrawn ? 1 : 0);
    }, 0);
  }

  get totalLosses(): number {
    const filteredMatches = this.filterMatchesBySide();

    return filteredMatches.reduce((total, match) => {
      const isMatchLost = (this.side === 'home' && match.homeTeamGoals < match.awayTeamGoals)
        || (this.side === 'away' && match.awayTeamGoals < match.homeTeamGoals);

      return total + (isMatchLost ? 1 : 0);
    }, 0);
  }

  get goalsFavor(): number {
    const filteredMatches = this.filterMatchesBySide();

    return filteredMatches.reduce((total, match) => {
      if (this.side === 'home') {
        return total + match.homeTeamGoals;
      }
      return total + match.awayTeamGoals;
    }, 0);
  }

  get goalsOwn(): number {
    const filteredMatches = this.filterMatchesBySide();

    return filteredMatches.reduce((total, match) => {
      if (this.side === 'home') {
        return total + match.awayTeamGoals;
      }
      return total + match.homeTeamGoals;
    }, 0);
  }

  get goalsBalance(): number {
    return this.goalsFavor - this.goalsOwn;
  }

  get efficiency(): number {
    const filteredMatches = this.filterMatchesBySide();
    const maxPoints = filteredMatches.length * 3;
    const actualPoints = this.totalPoints;

    return +((100 / maxPoints) * actualPoints).toFixed(2);
  }
}
