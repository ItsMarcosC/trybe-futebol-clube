import { Model, DataTypes } from 'sequelize';
import db from '.';
import matches from './MatchesMdl';

export default class teams extends Model {
  id: number;
  teamName: string;
}

teams.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: DataTypes.STRING,
  },
}, {
  sequelize: db,
  underscored: true,
  modelName: 'teams',
  timestamps: false });

matches.belongsTo(teams, { foreignKey: 'id', as: 'teams_home_team' });
matches.belongsTo(teams, { foreignKey: 'id', as: 'teams_away_team' });

teams.hasMany(matches, { foreignKey: 'home_team', as: 'matches_home_team' });
teams.hasMany(matches, { foreignKey: 'away_team', as: 'matches_away_team' });
