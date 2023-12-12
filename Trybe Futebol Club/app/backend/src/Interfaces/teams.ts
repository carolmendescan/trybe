import { IModelReader } from './crud';

export default interface ITeams {
  id: number,
  teamName: string,
}

type TypeTeamsModel = IModelReader<ITeams>;

export { TypeTeamsModel, ITeams };
