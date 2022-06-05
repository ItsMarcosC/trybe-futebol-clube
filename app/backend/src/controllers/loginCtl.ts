import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { generator } from '../helpers/jwtHelper';
import LoginSvc from '../services/LoginSvc';

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

export { login, getRole };
