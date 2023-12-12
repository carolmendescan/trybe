import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import db from '.';
import SequelizeTeamsModel from './teams';

class SequelizeMatchesModel extends Model<InferAttributes<SequelizeMatchesModel>,
InferCreationAttributes<SequelizeMatchesModel>> {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

SequelizeMatchesModel.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'home_team_id',
    references: {
      model: 'teams',
    },
  },
  homeTeamGoals: {
    type: DataTypes.NUMBER,
    allowNull: false,
    field: 'home_team_goals',
  },
  awayTeamId: {
    type: DataTypes.NUMBER,
    allowNull: false,
    field: 'away_team_id',
    references: {
      model: 'teams',
    },
  },
  awayTeamGoals: {
    type: DataTypes.NUMBER,
    allowNull: false,
    field: 'away_team_goals',
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    field: 'in_progress',
  },
}, {
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
  underscored: true,
});

SequelizeTeamsModel.hasMany(SequelizeMatchesModel, {
  foreignKey: 'home_team_id',
  as: 'homeTeam',
});

SequelizeTeamsModel.hasMany(SequelizeMatchesModel, {
  foreignKey: 'away_team_id',
  as: 'awayTeam',
});

SequelizeMatchesModel.belongsTo(SequelizeTeamsModel, {
  foreignKey: 'home_team_id',
  as: 'homeTeam',
});

SequelizeMatchesModel.belongsTo(SequelizeTeamsModel, {
  foreignKey: 'away_team_id',
  as: 'awayTeam',
});

export default SequelizeMatchesModel;
