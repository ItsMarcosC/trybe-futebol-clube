// import { Router } from 'express';
// import { loginChecker, checkToken } from '../helpers/validationHelper';
// import errorCheck from '../helpers/errorHelper';
// import { login, getRole } from '../controllers/loginCtl';
// const loginRt = Router();
// loginRt.post('/', loginChecker, login);
// loginRt.get('/validate', checkToken, getRole);
// loginRt.use(errorCheck);
// export default loginRt;
import * as express from 'express';
import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import User from '../database/models/UsersMdl';

const options: jwt.SignOptions = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const JWT_KEY = () => fs
  .readFileSync('./jwt.evaluation.key', { encoding: 'utf-8' })
  .trim();

export default class Login {
  constructor(public router: express.Router = express.Router()) {
    this.router = router;
    this.routes();
  }

  private routes(): void {
    this.router.post('/', async (req, res) => {
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
    });

    this.router.get('/validate', (req, res) => res.status(StatusCodes.OK).send('admin'));
  }
}
