import { Router } from 'express';
import loginCtl = require('../controllers/loginCtl');

const loginRt = Router();

loginRt.post('/', loginCtl.loginChecker, loginCtl.login);
loginRt.get('/validate', loginCtl.checkToken, loginCtl.getRole);
loginRt.use(loginCtl.errorCheck);

export default loginRt;
