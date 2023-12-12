import { expect } from 'chai';
import sinon from 'sinon';
import mockProduct from '../../mocks/mockProduct';
import ProductModel from '../../../src/database/models/product.model';
import productsPostService from '../../../src/services/productsPostService';
import getProductService from '../../../src/services/getProductService';

describe('ProductsService', function () {
  beforeEach(function () { sinon.restore(); });

  describe('testa a rota post /products', function () {
    it('recebe as informaçoes e retorna os dados do produto', async function () {
      const mockBody = mockProduct.productValid;
      const mockModelProduct = ProductModel.build(mockProduct.responseValid);
      sinon.stub(ProductModel, 'create').resolves(mockModelProduct);
  
      const response = await productsPostService.createProductService(mockBody);
  
      expect(response.status).to.eq('SUCCESS');
      expect(response.data).to.be.deep.equal(mockProduct.responseValid);
    });
  });
  describe('testa a rota get /products', function () {
    it('listagem de produtos', async function () {
      const mockAllProduct = ProductModel.build(mockProduct.responseValid);
      sinon.stub(ProductModel, 'findAll').resolves([mockAllProduct]);
  
      const response = await getProductService.getProductService();
  
      expect(response.status).to.eq('SUCCESS');
      expect(response.data).to.be.deep.equal([mockProduct.responseValid]);
    });
  });
});
