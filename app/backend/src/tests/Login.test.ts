import * as chai from 'chai';
import * as sinon from 'sinon';
import { Response } from 'superagent';
import { app } from '../app';
import Users from '../database/models/UsersMdl';
// @ts-ignore
import chaiHttp = require('chai-http');

export const simulateUser = {
  id: 2,
  username: 'User',
  role: 'user',
  email: 'user@user.com',
  password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO', // secret_user
};

chai.use(chaiHttp);
const { expect } = chai;
describe('Test if the user with ID 2 can be found', () => {
  let chaiHttpResponse: Response;
  before(async () => {
    sinon
      .stub(Users, "findOne")
      .resolves(
        simulateUser as Users);
  });

  after(()=>{
    (Users.findOne as sinon.SinonStub).restore();
  })

  it('1- Tests if Status 401 is returned when invalid info is passed to the function', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({email: 'not@valid.com',
    password: 'invalidPassword'});
    expect(chaiHttpResponse).to.have.status(401);
  });
});