import * as express from 'express';
import { ctlAll, ctlHome, ctlAway } from '../controllers/leaderboardCtl';

export default class Leaderboard {
  constructor(public router: express.Router = express.Router()) {
    this.router = router;
    this.routes();
  }

  private routes(): void {
    this.router.get('/', ctlAll);

    this.router.get('/home', ctlHome);

    this.router.get('/away', ctlAway);
  }
}
