import TeamsModel from '../models/team.model';

import { ServiceResponse } from '../Interfaces/services';
import { ITeams } from '../Interfaces/teams';

export default class TeamsService {
  private _teamsModel: TeamsModel;

  constructor() {
    this._teamsModel = new TeamsModel();
  }

  async findAll(): Promise<ServiceResponse<ITeams[]>> {
    const result = await this._teamsModel.findAll();

    if (!result) return { status: 'NOT_FOUND', data: result };

    return {
      status: 'SUCCESS',
      data: result,
    };
  }

  async findByPk(id: number): Promise<ServiceResponse<ITeams>> {
    const result = await this._teamsModel.findByPk(id);

    if (!result) return { status: 'NOT_FOUND', data: { message: `Team ${id} not found` } };

    return {
      status: 'SUCCESS',
      data: result,
    };
  }
}
