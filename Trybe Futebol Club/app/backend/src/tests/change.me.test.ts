import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs'

import TeamsModelSequelize from '../database/models/teams';
import UserModelSequelize from '../database/models/user';
import MatchesModelSequelize from '../database/models/matches';

import IMatches, { IMatchesTest } from '../Interfaces/matches';

import * as userMock from './user.mock'
import * as teamsMock from './teams.mock'
import * as matchesMock from './matches.mock'

// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';

chai.use(chaiHttp);

const { expect } = chai;
const { app, start } = new App();

describe('App', function () {
  describe('Start', function () {
    it('existe', function () {
      expect(start).to.be.ok;
    })
    // it('invoca o método .listen do app', function () {
    //   expect(start).to.be.a('function').that.call(app.listen())
    // })
  })
  describe('Express', function () {
    const loginPrefix = '/login';
    const teamsPrefix = '/teams';
    const matchesPrefix = '/matches';

    beforeEach(function () {
      sinon.restore();
    })

    it('app existe', function () {
      expect(app).to.be.ok;
    })

    describe('Login', function () {
     afterEach(function() {
        sinon.restore();
      })

      it('Testa o findOne', async function () {
        sinon.stub(bcrypt, 'compareSync').returns(true);
        sinon.stub(UserModelSequelize, 'findOne').resolves(userMock.user1 as any);
        const response = await chai.request(app).post(loginPrefix).send(userMock.loginBody)
        expect(response).to.have.status(200);
        expect(response.body).to.haveOwnProperty('token');
      })

      it('Falha ao acessar com um email inválido', async function () {
        const response = await chai.request(app).post(loginPrefix).send(userMock.invalidLoginEmailBody)
        expect(response).to.have.status(401);
        expect(response.body).to.deep.equal({
          message: 'Invalid email or password'
        });
      })

      it('Falha ao acessar um com password inválido', async function () {
        const response = await chai.request(app).post(loginPrefix).send(userMock.invalidLoginPasswordBody)
        expect(response).to.have.status(401);
        expect(response.body).to.deep.equal({
          message: 'Invalid email or password'
        });
      })

      it('Testa o login/role', async function() {
        sinon.stub(UserModelSequelize, 'findOne').resolves(userMock.user2 as any);
        const tokenResponse = await chai.request(app).post(loginPrefix).send(userMock.loginBody)
  
        const { status, body } = await chai
          .request(app)
          .get(`${loginPrefix}/role`)
          .set('Authorization', 'Bearer ' + tokenResponse.body.token);

        expect(status).to.equal(200);
        expect(body).to.be.deep.equal({ role: 'ATACANTE' });
      });

      it('Testa o erro caso não passe um token', async function() {
        const { status, body } = await chai.request(app).get(`${loginPrefix}/role`);

        expect(status).to.equal(401);
        expect(body).to.be.deep.equal({ message: 'Token not found' });
      });
    });

    describe('Teams', function () {
      beforeEach(function () {
        sinon.restore();
      })

      it('Testa o findAll', async function () {
        sinon.stub(TeamsModelSequelize, 'findAll').resolves(teamsMock.teams as any);
        const response = await chai.request(app).get(teamsPrefix);
        expect(response).to.have.status(200);
        expect(response.body).to.be.deep.equal(teamsMock.teams);
      });
  
      it('Testa o findByPk', async function() {
        sinon.stub(TeamsModelSequelize, 'findByPk').resolves(teamsMock.team1 as any);
  
        const { status, body } = await chai.request(app).get(`${teamsPrefix}/1`)
        expect(status).to.equal(200);
        expect(body).not.to.be.deep.equal(teamsMock.team2);
        expect(body).to.be.deep.equal(teamsMock.team1);
      });

      it('Testa o erro caso passe um id inexistênte', async function() {
        sinon.stub(TeamsModelSequelize, 'findByPk').resolves(undefined as any);
  
        const { status, body } = await chai.request(app).get(`${teamsPrefix}/4`)

        expect(status).to.equal(404);
        expect(body).to.be.deep.equal({ message: 'Team 4 not found' });
      });
    })

    describe('Matches', function () {
      beforeEach(function () {
        sinon.restore();
      })

      it('Testa o findAll', async function () {
        sinon.stub(MatchesModelSequelize, 'findAll').resolves(matchesMock.allMatches as any);

        const response = await chai.request(app).get(matchesPrefix);
        
        expect(response).to.have.status(200);
        expect(response.body).to.be.deep.equal(matchesMock.allMatches);
      });

      it('Testa o findByProgress', async function () {
        sinon.stub(MatchesModelSequelize, 'findAll').resolves(matchesMock.inProgressMatches as any);

        const response = await chai.request(app).get(`${matchesPrefix}?inProgress=true`);
        
        expect(response).to.have.status(200);
        expect(response.body).to.be.deep.equal(matchesMock.inProgressMatches);
      });
  
      it('Testa o update', async function() {
        sinon.stub(UserModelSequelize, 'findOne').resolves(userMock.user1 as any);
        sinon.stub(MatchesModelSequelize, 'update').resolves(matchesMock.updated as any);

        const tokenResponse = await chai.request(app).post(loginPrefix).send(userMock.loginBody)
        
        const response = await chai
          .request(app)
          .patch(`${matchesPrefix}/1`)
          .set('Authorization', 'Bearer ' + tokenResponse.body.token)
          .send(matchesMock.request)
        
        expect(response).to.have.status(200);
        expect(response.body).to.be.deep.equal({ message: 'Updated' });
      });

      it('Testa o create', async function() {
        sinon.stub(UserModelSequelize, 'findOne').resolves(userMock.user1 as any);
        sinon.stub(MatchesModelSequelize, 'create').resolves({ ...matchesMock.createdMatch, inProgress: true } as any);

        const tokenResponse = await chai.request(app).post(loginPrefix).send(userMock.loginBody)
        
        const response = await chai
          .request(app)
          .post(matchesPrefix)
          .set('Authorization', 'Bearer ' + tokenResponse.body.token)
          .send(matchesMock.createdMatch)
        
        expect(response).to.have.status(201);
        expect(response.body).to.be.deep.equal({ ...matchesMock.createdMatch, inProgress: true });
      });
    })
  })

});
