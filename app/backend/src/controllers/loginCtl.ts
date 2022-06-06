import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import User from '../database/models/UsersMdl';
import { JWT_KEY, options } from '../helpers/jwtHelper';

const loginCtl = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const strErrorEmpty = { message: 'All fields must be filled' };
  const strWrongInfo = { message: 'Incorrect email or password' };
  if (!email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json(strErrorEmpty);
  }
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(StatusCodes.UNAUTHORIZED).json(strWrongInfo);
  }
  const info = { id: user?.id, email: user?.email, username: user?.username, role: user?.role };
  return res.status(StatusCodes.OK).json({
    user: { ...info },
    token: jwt.sign({ info }, JWT_KEY(), options),
  });
};

const roleCtl = (req: Request, res: Response) => {
  res.status(StatusCodes.OK).send('admin');
};

export { loginCtl, roleCtl };
