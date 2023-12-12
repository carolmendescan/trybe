import IMatches, { IMatchesTest } from "../Interfaces/matches"

const match1: IMatches = {
  id: 1,
  homeTeamId: 1,
  homeTeamGoals: 1,
  awayTeamId: 2,
  awayTeamGoals: 0,
  inProgress: true
}

const match2: IMatches = {
  id: 2,
  homeTeamId: 3,
  homeTeamGoals: 0,
  awayTeamId: 4,
  awayTeamGoals: 2,
  inProgress: true
}

const createdMatch: Partial<IMatches> = {
  id: 10,
  homeTeamId: 10,
  homeTeamGoals: 0,
  awayTeamId: 11,
  awayTeamGoals: 0,
}

const finished1: IMatches = {
  id: 1,
  homeTeamId: 5,
  homeTeamGoals: 0,
  awayTeamId: 6,
  awayTeamGoals: 2,
  inProgress: false
}

const finished2: IMatches = {
  id: 2,
  homeTeamId: 3,
  homeTeamGoals: 3,
  awayTeamId: 1,
  awayTeamGoals: 2,
  inProgress: false
}

const updated: IMatches = {
  id: 1,
  homeTeamId: 1,
  homeTeamGoals: 1,
  awayTeamId: 2,
  awayTeamGoals: 1,
  inProgress: true
}

const request: Partial<IMatchesTest> = {
  homeTeamGoals: 1,
  awayTeamGoals: 1,
}

const response: IMatchesTest = {
  id: 1,
  homeTeamGoals: 10,
  awayTeamGoals: 0,
  homeTeam: { teamName: 'Packman' },
  awayTeam: { teamName: 'Karoline' },
  inProgress: true
}

const allMatches = [match1, match2, finished1, finished2];
const inProgressMatches = [match1, match2];
const finishedMatches = [finished1, finished2];

export {
  match1,
  match2,
  createdMatch,
  finished1,
  finished2,
  updated,
  request,
  response,
  allMatches,
  inProgressMatches,
  finishedMatches,
};