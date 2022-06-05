import { Model, DataTypes } from 'sequelize';
import db from '.';

export default class users extends Model {
  id: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

users.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: DataTypes.STRING,
  role: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
}, {
  sequelize: db,
  modelName: 'users',
  timestamps: false,
  underscored: true,
});
