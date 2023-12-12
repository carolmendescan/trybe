const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const { expect } = chai;

chai.use(chaiHttp);

const validateSales = require('../../src/validations/salesValidate');
const productsList = require('../../src/models/poductsList.model');

describe('testa o validateSales', function () {
  afterEach(function () {
    sinon.restore();
  });
it('testa caso erro', async function () {
  sinon.stub(productsList, 'findById').resolves(false);

 const result = await validateSales.validateSales([{ productId: 1, quantity: 1 }]);
  expect(result).to.be.deep.equal({ type: 404, message: 'Product not found' });
});
it('testa caso sucesso', async function () {
  sinon.stub(productsList, 'findById').resolves(1);

 const result = await validateSales.validateSales([{ productId: 1, quantity: 1 }]);
  expect(result).to.be.deep.equal(null);
});
});