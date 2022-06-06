import * as express from 'express';
import { getMatches, updateById, finishMatch, insertMatches } from '../controllers/matchesCtl';

export default class Matches {
  constructor(public router: express.Router = express.Router()) {
    this.router = router;
    this.routesPost();
    this.routesFinish();
    this.routesById();
  }

  private routesFinish(): void {
    this.router.get('/', getMatches);
    this.router.patch('/:id/finish', finishMatch);
  }

  private routesById(): void {
    this.router.patch('/:id', updateById);
  }

  private routesPost(): void {
    this.router.post('/', insertMatches);
  }
}
