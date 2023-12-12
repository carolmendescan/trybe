const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const { expect } = chai;

chai.use(chaiHttp);

const validateName = require('../../../src/middlewares/validate.name');

describe('testa o validateName', function () {
  afterEach(function () {
    sinon.restore();
  });
it('testa se é passado um name', async function () {
  const req = {};
  const res = {};
  let next = {};

  req.body = { name: 'carolina' };
  res.status = sinon.stub().returns(res);
  res.json = sinon.stub().returns();
  next = sinon.stub().returns();
  await validateName(req, res, next);
  expect(next).to.have.been.calledWith();
      // expect(result.message).toBe('"name" is required');
});

it('testa se não é passado um name', async function () {
  const req = {};
  const res = {};
  let next = {};

  req.body = { name: '' };
  res.status = sinon.stub().returns(res);
  res.json = sinon.stub().returns();
  next = sinon.stub().returns();
  await validateName(req, res, next);
  expect(res.status).to.have.been.calledWith(400);
});

it('Testa se o length de "name" é menor que 5 caracteres', async function () {
    const req = {};
    const res = {};
    let next = {};
  
    req.body = { name: 'zé' };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    next = sinon.stub().returns();
    await validateName(req, res, next);
    expect(res.status).to.have.been.calledWith(422);
  });
});
