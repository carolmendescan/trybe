import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import LeaderboardService from '../services/leaderboardService';
import { leaderboard } from './leaderboard.mock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Leaderboard Api tests', () => {
  const leaderboardService = new LeaderboardService();
  
  it('should return the championship leaderboard when GET method of /leaderboard endpoint is called', async function() {
    sinon.stub(leaderboardService, 'getStats').resolves(leaderboard as any);

    const { status } = await chai.request(app).get('/leaderboard').send();
    expect(status).to.eq(200);
  });

  it('should return the championship leaderboard with home matches filter when GET method of /leaderboard/home endpoint is called', async function() {
    sinon.stub(leaderboardService, 'getHomeStats').resolves(leaderboard as any);

    const { status } = await chai.request(app).get('/leaderboard/home').send();
    expect(status).to.eq(200);
  });

  it('should return the championship leaderboard with away matches filter when GET method of /leaderboard/away endpoint is called', async function() {
    sinon.stub(leaderboardService, 'getAwayStats').resolves(leaderboard as any);

    const { status } = await chai.request(app).get('/leaderboard/away').send();
    expect(status).to.eq(200);
  });

  afterEach(sinon.restore);
});