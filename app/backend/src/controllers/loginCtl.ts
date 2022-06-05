import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
import LoginSvc from '../services/LoginSvc';
import IUser from '../interfaces/IUser';

const errorCheck = (error: Error, req:Request, res: Response, next: NextFunction) => {
  if (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
  return next();
};

const JWT_SECRET = fs.readFileSync('jwt.evaluation.key', 'utf-8');

const generator = (user: IUser) => {
  const token = jwt.sign(user, JWT_SECRET, {
    expiresIn: '7d', algorithm: 'HS256',
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

const login = async (req: Request, res: Response) => {
  try {
    const strIncorrect = { message: 'Incorrect email or password' };
    const { email, password } = req.body;
    const data = await LoginSvc(email, password);
    const token = generator({ ...data });
    const result = {
      user: { ...data },
      token,
    };
    if (data) {
      return res.status(StatusCodes.OK).json(result);
    }
    return res.status(StatusCodes.UNAUTHORIZED).json(strIncorrect);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};

const getRole = (req: Request, res:Response) => {
  const { user: { role } } = req.body;
  return res.status(StatusCodes.OK).json(role);
};

const checkEmail = (email: string) => {
  if (!email.includes('@') || !email.endsWith('.com')) {
    throw Error('error');
  }
  return true;
};

const checkPassword = (password: string) => {
  if (password.length < 1) {
    throw Error();
  }
  return true;
};

const loginChecker = (req: Request, res: Response, next: NextFunction) => {
  const strIncorrect = { message: 'Incorrect email or password' };
  const strEmpty = { message: 'All fields must be filled' };
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json(strEmpty);
    }
    const emailOk = checkEmail(email);
    const passwordOk = checkPassword(password);

    if (emailOk && passwordOk) {
      return next();
    }
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).json(strIncorrect);
  }
};

const checkToken = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (authorization) {
    const user = await decoder(authorization);
    req.body = { user };
    return next();
  }
};
export { decoder, login, errorCheck, getRole, loginChecker, checkToken };
