const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;

const productsListService = require('../../../src/services/productList.service');
const productsList = require('../../../src/models/poductsList.model');
const productsListMock = require('../mocks/productsList.mock');

describe('Testes da camada services do productsList', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Testando o findAll', async function () {
      sinon.stub(productsList, 'findAll').resolves(productsListMock);
      const result = await productsListService.findAll();
      expect(result).to.be.deep.equal(productsListMock);
  });
  describe('Testando o findById na camada service', function () {
    afterEach(function () {
      sinon.restore();
    });
    it('Testando o findById com id inexistente', async function () {
        sinon.stub(productsList, 'findById').resolves(false);
        const result = await productsListService.findById(999);
        expect(result).to.be.equal(false);
    });
    it('Testando o findById com id existente', async function () {
        sinon.stub(productsList, 'findById').resolves(productsListMock[0]);
        const result = await productsListService.findById(1);
        expect(result).to.be.deep.equal(productsListMock[0]);
    });
    it('Testando o createProduct', async function () {
      sinon.stub(productsList, 'createProduct').resolves(
        { id: 7, name: 'Máscara do Hulk' },
        );
      const result = await productsListService.createProduct(
        { id: 7, name: 'Máscara do Hulk' },
        );
      expect(result).to.be.deep.equal({ id: 7, name: 'Máscara do Hulk' });
    });
  });
});