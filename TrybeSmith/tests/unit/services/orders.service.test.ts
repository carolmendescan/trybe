import { expect } from 'chai';
import sinon from 'sinon';
import mockOrder from '../../mocks/mockOrder';
import getOrdersService from '../../../src/services/getOrdersService';
import OrderModel from '../../../src/database/models/order.model';

describe('OrdersService', function () {
  beforeEach(function () { sinon.restore(); });

describe('testa a rota get /orders', function () {
  it('testa a listagem de ordens', async function () {
    const mockAllOrders = OrderModel.build(mockOrder.responseValid);
    sinon.stub(OrderModel, 'findAll').resolves([mockAllOrders]);

    const response = await getOrdersService.getOrdersService();

    expect(response.status).to.eq('SUCCESS');
  })
})

});
