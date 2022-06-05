import { Model, DataTypes } from 'sequelize';
import db from '.';
import Matches from './MatchesMdl';

export default class Teams extends Model {
  id: number;
  teamName: string;
}
Teams.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  teamName: {
    type: DataTypes.STRING,
    field: 'team_name',
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'Teams',
  tableName: 'teams',
  timestamps: false,
  underscored: true,
});

Matches.belongsTo(Teams, { foreignKey: 'homeTeam', as: 'teamHome' });
Matches.belongsTo(Teams, { foreignKey: 'awayTeam', as: 'teamAway' });

Teams.hasMany(Matches, { foreignKey: 'homeTeam', as: 'teamHome' });
Teams.hasMany(Matches, { foreignKey: 'awayTeam', as: 'teamAway' });
