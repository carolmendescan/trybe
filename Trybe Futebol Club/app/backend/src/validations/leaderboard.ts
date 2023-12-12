import IMatches from '../Interfaces/matches';

export default class StatsBuilder {
  private matches: IMatches[];
  private teamId: number;

  constructor(matches: IMatches[], teamId: number) {
    this.matches = matches;
    this.teamId = teamId;
  }

  get totalPoints(): number {
    return this.matches.reduce((total, match) => {
      const isHomeMatch = match.homeTeamId === this.teamId;
      const isAwayMatch = match.awayTeamId === this.teamId;
      const hasWon = (isHomeMatch && match.homeTeamGoals > match.awayTeamGoals)
        || (isAwayMatch && match.awayTeamGoals > match.homeTeamGoals);
      const hasDrawn = (isHomeMatch || isAwayMatch) && match.homeTeamGoals === match.awayTeamGoals;

      if (hasWon) { return total + 3; }
      if (hasDrawn) { return total + 1; }

      return total;
    }, 0);
  }

  get totalVictories(): number {
    return this.matches.reduce((total, match) => {
      const isHomeMatch = match.homeTeamId === this.teamId
        && match.homeTeamGoals > match.awayTeamGoals;
      const isAwayMatch = match.awayTeamId === this.teamId
        && match.awayTeamGoals > match.homeTeamGoals;

      return total + (isHomeMatch || isAwayMatch ? 1 : 0);
    }, 0);
  }

  get totalDraws(): number {
    return this.matches.reduce((total, match) => {
      const isHomeMatch = match.homeTeamId === this.teamId
        && match.homeTeamGoals === match.awayTeamGoals;
      const isAwayMatch = match.awayTeamId === this.teamId
        && match.awayTeamGoals === match.homeTeamGoals;

      return total + (isHomeMatch || isAwayMatch ? 1 : 0);
    }, 0);
  }

  get totalLosses(): number {
    return this.matches.reduce((total, match) => {
      const isHomeMatch = match.homeTeamId === this.teamId
        && match.homeTeamGoals < match.awayTeamGoals;
      const isAwayMatch = match.awayTeamId === this.teamId
        && match.awayTeamGoals < match.homeTeamGoals;

      return total + (isHomeMatch || isAwayMatch ? 1 : 0);
    }, 0);
  }

  get goalsFavor(): number {
    return this.matches.reduce((total, match) => {
      const isHomeMatch = match.homeTeamId === this.teamId;
      const isAwayMatch = match.awayTeamId === this.teamId;

      if (isHomeMatch) { return total + match.homeTeamGoals; }
      if (isAwayMatch) { return total + match.awayTeamGoals; }

      return total;
    }, 0);
  }

  get goalsOwn(): number {
    return this.matches.reduce((total, match) => {
      const isHomeMatch = match.homeTeamId === this.teamId;
      const isAwayMatch = match.awayTeamId === this.teamId;

      if (isHomeMatch) { return total + match.awayTeamGoals; }
      if (isAwayMatch) { return total + match.homeTeamGoals; }

      return total;
    }, 0);
  }
}
