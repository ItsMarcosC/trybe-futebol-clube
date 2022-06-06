import * as cors from 'cors';
import * as express from 'express';
import Login from './routes/loginRt';
import Teams from './routes/teamsRt';
import Matches from './routes/matchesRt';

class App {
  public app: express.Express;
  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.config();
    this.app.use(cors());
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };
    this.app.use(accessControl);
    this.app.use('/login', new Login().router);
    this.app.use('/teams', new Teams().router);
    this.app.use('/matches', new Matches().router);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Ouvindo na Porta ${PORT}`));
  }
}

export { App };

export const { app } = new App();
