import SequelizeTeamsModel from '../database/models/teams';
import IMatches from '../Interfaces/matches';
import SequelizeMatchesModel from '../database/models/matches';

export default class MatchesModel {
  private model = SequelizeMatchesModel;

  async findAll(): Promise<IMatches[]> {
    const Matches = await this.model.findAll({
      attributes: { exclude: ['home_team_id', 'away_team_id'] },
      include: [
        { model: SequelizeTeamsModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeamsModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return Matches;
  }

  async findByProgress(inProgress?: boolean): Promise<IMatches[]> {
    const Matches = await this.model.findAll({
      attributes: { exclude: ['home_team_id', 'away_team_id'] },
      include: [
        { model: SequelizeTeamsModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeamsModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
      where: { inProgress },
    });
    return Matches;
  }

  async update(id: number, body?: Partial<IMatches>): Promise<number[] | null> {
    const options = {
      homeTeamGoals: body?.homeTeamGoals,
      awayTeamGoals: body?.awayTeamGoals,
    };
    const result = !body
      ? await this.model.update({ inProgress: false }, { where: { id } })
      : await this.model.update({ ...options }, { where: { id } });
    return result;
  }

  async create(body: IMatches): Promise<IMatches> {
    const result = await this.model.create({ ...body, inProgress: true });
    return result;
  }
}
