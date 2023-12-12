import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import { ServiceResponse } from '../../../src/types/ServiceResponse';
import { OrderSequelizeModel } from '../../../src/database/models/order.model';
import getOrdersService from '../../../src/services/getOrdersService';
import getOrdersController from '../../../src/controllers/getOrdersController';
import mockOrder from '../../mocks/mockOrder';

chai.use(sinonChai);

describe('OrdersController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  describe('testa a rota get /orders', function () {
    it('lista as ordens', async function () {
      const responseService: ServiceResponse<OrderSequelizeModel[]> = {
        status: 'SUCCESS',
        data: [mockOrder.responseValid] as any,
      }
      sinon.stub(getOrdersService, 'getOrdersService').resolves(responseService);
      
      await getOrdersController.getOrdersController(req, res);
      
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith([mockOrder.responseValid]);
    })
  })

});
