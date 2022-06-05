import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
import IUser from '../interfaces/IUser';

const JWT_SECRET = fs.readFileSync('jwt.evaluation.key', 'utf-8');

const generator = (user: IUser) => {
  const token = jwt.sign(user, JWT_SECRET, {
    expiresIn: '1d', algorithm: 'HS256',
  });
  return token;
};

const decoder = async (token: string) => {
  try {
    const decodedToken = await jwt.verify(token, JWT_SECRET);
    return decodedToken;
  } catch (error) {
    return false;
  }
};

export { generator, decoder };
