import { Model, DataTypes } from 'sequelize';
import db from '.';

export default class matches extends Model {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

matches.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    homeTeam: {
      type: DataTypes.INTEGER,
    },
    homeTeamGoals: {
      type: DataTypes.INTEGER,
    },
    awayTeam: {
      type: DataTypes.INTEGER,
    },
    awayTeamGoals: {
      type: DataTypes.INTEGER,
    },
    inProgress: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    timestamps: false,
    underscored: true,
    sequelize: db,
    tableName: 'matches',
  },
);
