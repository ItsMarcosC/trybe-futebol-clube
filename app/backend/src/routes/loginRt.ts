import * as express from 'express';
import { loginCtl, roleCtl } from '../controllers/loginCtl';

export default class Login {
  constructor(public router: express.Router = express.Router()) {
    this.router = router;
    this.routes();
  }

  private routes(): void {
    this.router.post('/', loginCtl);

    this.router.get('/validate', roleCtl);
  }
}
