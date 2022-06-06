import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';

const options: jwt.SignOptions = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const JWT_KEY = () => fs
  .readFileSync('./jwt.evaluation.key', { encoding: 'utf-8' })
  .trim();

export { options, JWT_KEY };
