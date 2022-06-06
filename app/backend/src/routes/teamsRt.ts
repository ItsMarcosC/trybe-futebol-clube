import * as express from 'express';
import { getAllTeams, getTeamByID } from '../controllers/teamCtl';

export default class Teams {
  constructor(public router: express.Router = express.Router()) {
    this.router = router;
    this.routes();
  }

  private routes(): void {
    this.router.get('/', getAllTeams);

    this.router.get('/:id', getTeamByID);
  }
}
