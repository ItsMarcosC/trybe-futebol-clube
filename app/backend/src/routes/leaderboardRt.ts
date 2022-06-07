import * as express from 'express';
import leaderboardCtl from '../controllers/leaderboardCtl';

export default class Leaderboard {
  constructor(public router: express.Router = express.Router()) {
    this.router = router;
    this.routes();
  }

  private routes(): void {
    this.router.get('/', leaderboardCtl);
  }
}
