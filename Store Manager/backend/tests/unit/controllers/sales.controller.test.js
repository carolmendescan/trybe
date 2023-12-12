const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
const { expect } = chai;

const salesService = require('../../../src/services/sales.services');
const salesController = require('../../../src/controllers/sales.controller');
const salesMock = require('../mocks/sales.mock');

describe('Testes da camada controller do productsList', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Testando o findAll', async function () {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'findAll').resolves(salesMock);
      await salesController.findAll(req, res);
      expect(res.status).to.be.calledWith(200);
      expect(res.json).to.be.calledWithExactly(salesMock);
  });

  describe('Testando o findById da camada controller', function () {
    const req = {};
    const res = {};
    it('Testando o findById com id inexistente', async function () {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        req.params = { id: 999 };
        sinon.stub(salesService, 'findById').resolves(false);
        await salesController.findById(req, res);
        expect(res.status).to.be.calledWith(404);
        expect(res.json).to.be.calledWithExactly({ message: 'Sale not found' });
    });
    it('Testando o findById com id existente', async function () {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        
        req.params = { id: 1 };
        sinon.stub(salesService, 'findById').resolves(salesMock[0]);
        await salesController.findById(req, res);
        expect(res.status).to.be.calledWith(200);
        expect(res.json).to.be.calledWithExactly(salesMock[0]);
    });
    it('Testando o createSales', async function () {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      
      req.body = [{
        productId: 1,
        quantity: 1, 
      }];
      sinon.stub(salesService, 'createSales')
      .resolves({ type: null,
        message: {
        id: 3,
        itemsSold: [
          {
            productId: 1,
            quantity: 1,
          },
        ],
      },
    });

      await salesController.createSales(req, res);
      
      expect(res.status).to.be.calledWith(201);
      expect(res.json).to.be.calledWith({
        id: 3,
        itemsSold: [
          {
            productId: 1,
            quantity: 1,
          },
        ],
      });
  });
  });
});