import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import mockProduct from '../../mocks/mockProduct';
import app from '../../../src/app';
import ProductModel from '../../../src/database/models/product.model'

chai.use(chaiHttp);

describe('POST /products', function () { 
  beforeEach(function () { sinon.restore(); });

  it('Recebe as informacoes e retorna os dados do produto', async function () {
    const mockBody = mockProduct.productValid;
    const mockModelProduct = ProductModel.build(mockProduct.responseValid);
    sinon.stub(ProductModel, 'create').resolves(mockModelProduct);

    const response = await chai.request(app).post('/products').send(mockBody);

    expect(response.status).to.equal(201);
    expect(response.body).to.be.deep.equal(mockProduct.responseValid);
  })

});
