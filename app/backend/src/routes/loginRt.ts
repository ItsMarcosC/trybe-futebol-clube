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
import User from '../database/models/UsersMdl';

const options: jwt.SignOptions = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const jwtKey = () => fs
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

      if (!email || !password) {
        return res.status(400).json({ message: 'All fields must be filled' });
      }

      const u = await User.findOne({ where: { email } });

      if (!u) {
        return res.status(401).json({ message: 'Incorrect email or password' });
      }

      const us = { id: u?.id, email: u?.email, username: u?.username, role: u?.role };

      return res.status(200).json({
        user: { ...us },
        token: jwt.sign({ us }, jwtKey(), options),
      });
    });

    this.router.get('/validate', (req, res) => res.status(200).send('admin'));
  }
}
