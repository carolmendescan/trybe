import IMatch from '../matches';
import ITeam from '../teams';

export default interface ILeaderboardData {
  matches: IMatch[];
  teams: ITeam[];
}
