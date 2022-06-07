import * as express from 'express';
import { lebo, lebosort, lebohome, leboaway } from '../helpers/leaderboardHelper';
import Matches from '../database/models/MatchesMdl';
import Teams from '../database/models/TeamsMdl';

export default class Leaderboard {
  constructor(public router: express.Router = express.Router()) {
    this.router = router;
    this.routes();
  }

  private routes(): void {
    this.router.get('/', async (req, res) => res.status(200)
      .json(lebosort(lebo(await Teams.findAll(), await Matches.findAll()))));

    this.router.get('/home', async (req, res) => res.status(200)
      .json(lebosort(lebohome(await Teams.findAll(), await Matches.findAll()))));

    this.router.get('/away', async (req, res) => res.status(200)
      .json(lebosort(leboaway(await Teams.findAll(), await Matches.findAll()))));
  }
}
