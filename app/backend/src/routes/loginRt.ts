import { Router } from 'express';
import { loginChecker, checkToken } from '../helpers/validationHelper';
import errorCheck from '../helpers/errorHelper';
import { login, getRole } from '../controllers/loginCtl';

const loginRt = Router();

loginRt.post('/', loginChecker, login);
loginRt.get('/validate', checkToken, getRole);
loginRt.use(errorCheck);

export default loginRt;
