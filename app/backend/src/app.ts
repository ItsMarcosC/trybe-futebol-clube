import * as cors from 'cors';
import * as express from 'express';
import loginRt from './routes/loginRt';

class App {
  public app: express.Express;
  constructor() {
    this.app = express();
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
    this.app.use('/login', loginRt);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Ouvindo na Porta ${PORT}`));
  }
}

export { App };

export const { app } = new App();
