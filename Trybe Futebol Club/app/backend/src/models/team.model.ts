import { ITeams, TypeTeamsModel } from '../Interfaces/teams';
import SequelizeTeamsModel from '../database/models/teams';

export default class TeamsModel implements TypeTeamsModel {
  private model = SequelizeTeamsModel;

  async findAll(): Promise<ITeams[]> {
    const teams = await this.model.findAll();
    return teams;
  }

  async findByPk(id: number): Promise<ITeams | null> {
    const team = await this.model.findByPk(id);
    return !team ? null : team;
  }
}
