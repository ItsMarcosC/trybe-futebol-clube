import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { decoder } from './jwtHelper';

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

export { loginChecker, checkToken };
