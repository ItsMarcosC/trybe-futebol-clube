import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
import Teams from '../database/models/TeamsMdl';

const mockedTeams = [
  {
    id: 1,
    teamName: "Avai/Kindermann"
  },
  {
    id: 2,
    teamName: "Bahia"
  },
  {
    id: 3,
    teamName: "Botafogo"
  },
  {
    id: 4,
    teamName: "Corinthians"
  },
  {
    id: 5,
    teamName: "Cruzeiro"
  },
  {
    id: 6,
    teamName: "Ferroviária"
  },
]

chai.use(chaiHttp);

const { expect } = chai;

describe('Route /teams tests', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Teams, "findAll")
      .resolves(mockedTeams as any);
  });

  after(()=>{
      (Teams.findAll as sinon.SinonStub).restore();
    })

    it('1- Checks if the return for /teams is an object and status is 200(OK)', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .get('/teams')
      expect(chaiHttpResponse).to.be.an('object');
      expect(chaiHttpResponse).to.have.status(200)
    })
})
