import { Sequelize } from 'sequelize';
import orderModel, { OrderSequelizeModel } from '../database/models/order.model';
import { ServiceResponse } from '../types/ServiceResponse';
import ProductModel from '../database/models/product.model';

async function getOrdersService(): Promise<ServiceResponse<OrderSequelizeModel[]>> {
  const orders = await orderModel.findAll({
    attributes: [
      'id',
      'userId',
      [Sequelize.literal('JSON_ARRAYAGG(productIds.id)'), 'productIds'],
    ],
    include: [{
      model: ProductModel,
      as: 'productIds',
      attributes: [],
    }],
    group: ['Order.id'],
    raw: true,
  });
  // const orders = await orderModel.findAll();
  const response: ServiceResponse<OrderSequelizeModel[]> = {
    // status: 'SUCCESS', data: orders.map((order) => order.dataValues) };
    status: 'SUCCESS', data: orders };
  return response;
} 

export default {
  getOrdersService,
};