import { IModelReader } from '../crud';
import IMatch from '../matches';
import IHomeLeaderboard from './ITeamStats';

export interface ILeaderboard extends IModelReader<IHomeLeaderboard> {
  getTeamStats(): Promise<IMatch[]>
}
