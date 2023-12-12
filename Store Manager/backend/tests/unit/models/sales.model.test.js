const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;

const connection = require('../../../src/models/connection');
const sales = require('../../../src/models/sales.model');
const salesMock = require('../mocks/sales.mock');

describe('Testes da camada model do sales', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Testando o findAll', async function () {
      sinon.stub(connection, 'execute').resolves([salesMock]);
      const result = await sales.findAll();
      expect(result).to.be.deep.equal(salesMock);
  });
  it('Testando o findById', async function () {
      sinon.stub(connection, 'execute').resolves([salesMock[0]]);
      const result = await sales.findById(1);
      expect(result).to.be.deep.equal(salesMock[0]);
  });
  it('Testando o createSalesProduct', async function () {
    sinon.stub(connection, 'execute').resolves(salesMock);
    const result = await sales.createSalesProduct(1, 1, 1);
    expect(result).to.be.deep.equal({
      productId: 1,
      quantity: 1,
    });
});
});