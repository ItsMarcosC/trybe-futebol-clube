import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';

const mockedMatches =[
  {
    "id": 1,
    "homeTeam": 16,
    "homeTeamGoals": 1,
    "awayTeam": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "teamHome": {
      "teamName": "São Paulo"
    },
    "teamAway": {
      "teamName": "Grêmio"
    }
  },
  {
    "id": 41,
    "homeTeam": 16,
    "homeTeamGoals": 2,
    "awayTeam": 9,
    "awayTeamGoals": 0,
    "inProgress": true,
    "teamHome": {
      "teamName": "São Paulo"
    },
    "teamAway": {
      "teamName": "Internacional"
    }
  }
]

chai.use(chaiHttp);
const { expect } = chai;

describe('Test route /matches', () => {

  let chaiHttpResponse: Response;

  it('1- Get All Matches and Return 200(OK)', async () => {;
    chaiHttpResponse = await chai
    .request(app)
    .get('/matches')
    expect(chaiHttpResponse.status).to.be.eql(200);
    expect(chaiHttpResponse.body[0]).to.be.eql(mockedMatches[0])
  });

  it('2- Get Match in Progress by query and Return 200(OK)', async () => {;
    chaiHttpResponse = await chai
    .request(app)
    .get('/matches?inProgress=true')
    expect(chaiHttpResponse.status).to.be.eql(200);
    expect(chaiHttpResponse.body[0]).to.be.eql(mockedMatches[1])
  });

  it('3- Get Match Finished by query and Return 200(OK)', async () => {;
    chaiHttpResponse = await chai
    .request(app)
    .get('/matches?inProgress=false')
    expect(chaiHttpResponse.status).to.be.eql(200);
    expect(chaiHttpResponse.body[0]).to.be.eql(mockedMatches[0])
  })

  it('4- Creates match', async () => {
    chaiHttpResponse = await chai
    .request(app)
       .post('/login')
       .send({
        "email": "admin@admin.com",
        "password": "secret_admin"
      })
    const { token } = chaiHttpResponse.body
    chaiHttpResponse = await chai
    .request(app)
    .post('/matches')
    .set('authorization', token)
    .send({
      "homeTeam": 4,
      "awayTeam": 16,
      "homeTeamGoals": 5,
      "awayTeamGoals": 2,
      "inProgress": true
    })
    expect(chaiHttpResponse.status).to.be.eql(201);
  })


  it('5- Creates invalid match and Return 401(Unauthorized)', async () => {;
    chaiHttpResponse = await chai
    .request(app)
    .post('/matches')
    .set('notValid', 'notValid')
    expect(chaiHttpResponse.status).to.be.eql(401);
  })

  it('6- Update match and Return 200(OK)', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .patch('/matches/1')
    expect(chaiHttpResponse.status).to.be.eql(200);
    expect(chaiHttpResponse.body).to.be.eql({ message: 'Match update successfully!' })
  })

  it('7- Match is finished and Return 200(OK)', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .patch('/matches/1/finish')
    expect(chaiHttpResponse.status).to.be.eql(200);
    expect(chaiHttpResponse.body).to.be.eql({ message: 'Finished'})
  })
})
