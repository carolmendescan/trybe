export default interface IMatches {
  id: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean
}

export interface IMatchesTest {
  id: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
  homeTeam: { teamName: string },
  awayTeam: { teamName: string },
  inProgress: boolean
}

export interface IMatchesLeaderboard {
  id: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
  homeTeam: { teamName: string },
  awayTeam: { teamName: string }
}

export interface IMatchesPatch {
  message: string
}
