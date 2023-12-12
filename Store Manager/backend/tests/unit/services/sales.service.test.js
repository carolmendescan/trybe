const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;

const salesService = require('../../../src/services/sales.services');
const salesModel = require('../../../src/models/sales.model');
const salesMock = require('../mocks/sales.mock');
const validate = require('../../../src/validations/salesValidate');

describe('Testes da camada services do productsList', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Testando o findAll', async function () {
      sinon.stub(salesModel, 'findAll').resolves(salesMock);
      const result = await salesService.findAll();
      expect(result).to.be.deep.equal(salesMock);
  });
  describe('Testando o findById na camada service', function () {
    afterEach(function () {
      sinon.restore();
    });
    it('Testando o findById com id inexistente', async function () {
        sinon.stub(salesModel, 'findById').resolves(false);
        const result = await salesService.findById(999);
        expect(result).to.be.equal(false);
    });
    it('Testando o findById com id existente', async function () {
        sinon.stub(salesModel, 'findById').resolves(salesMock[0]);
        const result = await salesService.findById(1);
        expect(result).to.be.deep.equal(salesMock[0]);
    });
    it('Testando o createSales', async function () {
      sinon.stub(validate, 'validateSales').resolves(null);
      sinon.stub(salesModel, 'createSalesId').resolves(2);
      sinon.stub(salesModel, 'createSalesProduct').resolves({
        productId: 1,
        quantity: 1,
      });
      const result = await salesService.createSales(
        [
          {
            productId: 1,
            quantity: 1,
          },
        ],
        );
      expect(result).to.be.deep.equal({
        type: null,
        message: {
          id: 2,
          itemsSold: [
            {
              productId: 1,
              quantity: 1,
            },
          ],
        },
      });
    });
  });
});