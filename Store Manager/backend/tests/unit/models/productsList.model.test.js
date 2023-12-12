const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;

const connection = require('../../../src/models/connection');
const productsList = require('../../../src/models/poductsList.model');
const productsListMock = require('../mocks/productsList.mock');

describe('Testes da camada model do productsList', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Testando o findAll', async function () {
      sinon.stub(connection, 'execute').resolves([productsListMock]);
      const result = await productsList.findAll();
      expect(result).to.be.deep.equal(productsListMock);
  });
  it('Testando o findById', async function () {
      sinon.stub(connection, 'execute').resolves([[productsListMock[0]]]);
      const result = await productsList.findById(1);
      expect(result).to.be.deep.equal(productsListMock[0]);
  });
  it('Testando o createProduct', async function () {
      sinon.stub(connection, 'execute').resolves(productsListMock);
      const result = await productsList.createProduct({ name: 'Máscara do Batman' });
      expect(result.name).to.be.equal('Máscara do Batman');
  });
});