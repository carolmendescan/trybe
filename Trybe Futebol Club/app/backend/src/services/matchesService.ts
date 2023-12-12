import MatchesModel from '../models/matches.model';
import TeamsModel from '../models/team.model';

import { ServiceResponse } from '../Interfaces/services';
import IMatches, { IMatchesPatch } from '../Interfaces/matches';

export default class MatchesService {
  private _matchesModel: MatchesModel;
  private _teamsModel: TeamsModel;

  constructor() {
    this._matchesModel = new MatchesModel();
    this._teamsModel = new TeamsModel();
  }

  async findAll(): Promise<ServiceResponse<IMatches[]>> {
    const result = await this._matchesModel.findAll();

    if (!result) return { status: 'NOT_FOUND', data: result };

    return {
      status: 'SUCCESS',
      data: result,
    };
  }

  async findByProgress(inProgress?: boolean): Promise<ServiceResponse<IMatches[]>> {
    const matchesInProgress = await this._matchesModel.findByProgress(inProgress);
    return { status: 'SUCCESS', data: matchesInProgress };
  }

  async finishMatch(id: number): Promise<ServiceResponse<IMatchesPatch>> {
    const result = await this._matchesModel.update(id);

    if (!result) return { status: 'NOT_FOUND', data: { message: 'Something went wrong' } };

    return {
      status: 'SUCCESS',
      data: { message: 'Finished' },
    };
  }

  async updateMatch(id: number, body: Partial<IMatches>): Promise<ServiceResponse<IMatchesPatch>> {
    const result = await this._matchesModel.update(id, body);

    if (!result) return { status: 'NOT_FOUND', data: { message: 'Something went wrong' } };

    return {
      status: 'SUCCESS',
      data: { message: 'Updated' },
    };
  }

  async createMatch(body: IMatches): Promise<ServiceResponse<IMatches>> {
    const homeTeam = await this._teamsModel.findByPk(body.homeTeamId);
    const awatTeam = await this._teamsModel.findByPk(body.awayTeamId);

    if (!homeTeam || !awatTeam) {
      return {
        status: 'NOT_FOUND',
        data: { message: 'There is no team with such id!' },
      };
    }

    const result = await this._matchesModel.create(body);

    return {
      status: 'CREATED',
      data: result,
    };
  }
}
