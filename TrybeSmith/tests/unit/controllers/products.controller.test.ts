import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import mockProduct from '../../mocks/mockProduct';
import productsPostService from '../../../src/services/productsPostService';
import productPostController from '../../../src/controllers/productPostController';
import { ServiceResponse } from '../../../src/types/ServiceResponse';
import { Product } from '../../../src/types/Product'
import getProductService from '../../../src/services/getProductService'
import getProductController from '../../../src/controllers/getProductController'

chai.use(sinonChai);

describe('ProductsController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  describe('testa a rota post /products', function () {

    it('recebe informacoes e retorna dados do produto', async function () {
      req.body = mockProduct.productValid;
      const responseService: ServiceResponse<Product> = {
        status: 'SUCCESS',
        data: mockProduct.responseValid,
      }
      sinon.stub(productsPostService, 'createProductService').resolves(responseService);
      
      await productPostController.createProductController(req, res);
      
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(mockProduct.responseValid);
    });
  });

  describe('testa a rota get /products', function () {

    it('listagem de produtos', async function () {
      const responseService: ServiceResponse<Product[]> = {
        status: 'SUCCESS',
        data: [mockProduct.responseValid],
      }
      sinon.stub(getProductService, 'getProductService').resolves(responseService);
      
      await getProductController.getProductController(req, res);
      
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith([mockProduct.responseValid]);
    });
  });

});
