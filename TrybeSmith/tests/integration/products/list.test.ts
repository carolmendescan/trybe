import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import mockProduct from '../../mocks/mockProduct';
import ProductModel from '../../../src/database/models/product.model'
import app from '../../../src/app';

chai.use(chaiHttp);

describe('GET /products', function () { 
  beforeEach(function () { sinon.restore(); });

  it('listagem de produtos', async function () {
    const mockGetAllProducts = ProductModel.build(mockProduct.responseValid);
    sinon.stub(ProductModel, 'findAll').resolves([mockGetAllProducts]);

    const response = await chai.request(app).get('/products');

    expect(response.status).to.equal(200);
    expect(response.body).to.be.deep.equal([mockProduct.responseValid]);
  });
});
