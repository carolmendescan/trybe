const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
const { expect } = chai;

const productsListService = require('../../../src/services/productList.service');
const productsListController = require('../../../src/controllers/producstList.controller');
const productsListMock = require('../mocks/productsList.mock');

describe('Testes da camada controller do productsList', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Testando o findAll', async function () {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsListService, 'findAll').resolves(productsListMock);
      await productsListController.findAll(req, res);
      expect(res.status).to.be.calledWith(200);
      expect(res.json).to.be.calledWithExactly(productsListMock);
  });

  describe('Testando o findById da camada controller', function () {
    const req = {};
    const res = {};
    it('Testando o findById com id inexistente', async function () {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        req.params = { id: 999 };
        sinon.stub(productsListService, 'findById').resolves(false);
        await productsListController.findById(req, res);
        expect(res.status).to.be.calledWith(404);
        expect(res.json).to.be.calledWithExactly({ message: 'Product not found' });
    });
    it('Testando o findById com id existente', async function () {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        
        req.params = { id: 1 };
        sinon.stub(productsListService, 'findById').resolves(productsListMock[0]);
        await productsListController.findById(req, res);
        expect(res.status).to.be.calledWith(200);
        expect(res.json).to.be.calledWithExactly(productsListMock[0]);
    });
    it('Testando o createProduct', async function () {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        
        req.body = { id: 7, name: 'Máscara do Hulk' };
        sinon.stub(productsListService, 'createProduct')
        .resolves({ id: 7, name: 'Máscara do Hulk' });

        await productsListController.createProduct(req, res);
        
        expect(res.status).to.be.calledWith(201);
        expect(res.json).to.be.calledWith({ id: 7, name: 'Máscara do Hulk' });
    });
  });
});