import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import OrderModel from '../../../src/database/models/order.model';
import app from '../../../src/app';
import mockOrder from '../../mocks/mockOrder';

chai.use(chaiHttp);

describe('GET /orders', function () { 
  beforeEach(function () { sinon.restore(); });

  it('retorna as ordens', async function () {
    const mockAllOrders = OrderModel.build(mockOrder.responseValid);
    sinon.stub(OrderModel, 'findAll').resolves([mockAllOrders]);

    const response = await chai.request(app).get('/orders');

    expect(response.status).to.equal(200);
    expect(response.body).to.be.deep.equal([mockOrder.responseValid]);
  })

});
