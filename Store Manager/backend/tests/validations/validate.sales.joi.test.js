const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const { expect } = chai;

chai.use(chaiHttp);

const saleMiddleware = require('../../src/middlewares/sales.validate.joi');

describe('testa o saleMiddleware', function () {
  afterEach(function () {
    sinon.restore();
  });
it('testa o next', async function () {
  const req = {};
  const res = {};
  let next = {};

  req.body = [{ productId: 1, quantity: 1 }];
  res.status = sinon.stub().returns(res);
  res.json = sinon.stub().returns();
  next = sinon.stub().returns();
  await saleMiddleware(req, res, next);
  expect(next).to.have.been.calledWith();
});

it('testa se nao passa quantity', async function () {
  const req = {};
  const res = {};
  let next = {};

  req.body = [{ productId: 1 }];
  res.status = sinon.stub().returns(res);
  res.json = sinon.stub().returns();
  next = sinon.stub().returns();
  await saleMiddleware(req, res, next);
  expect(res.status).to.have.been.calledWith(400);
});

it('testa se não passa product', async function () {
  const req = {};
  const res = {};
  let next = {};

  req.body = [{ quantity: 1 }];
  res.status = sinon.stub().returns(res);
  res.json = sinon.stub().returns();
  next = sinon.stub().returns();
  await saleMiddleware(req, res, next);
  expect(res.status).to.have.been.calledWith(400);
});
it('testa se a quantity é menor que 1', async function () {
  const req = {};
  const res = {};
  let next = {};

  req.body = [{ productId: 1, quantity: 'a' }];
  res.status = sinon.stub().returns(res);
  res.json = sinon.stub().returns();
  next = sinon.stub().returns();
  await saleMiddleware(req, res, next);
  expect(res.status).to.have.been.calledWith(422);
});
});