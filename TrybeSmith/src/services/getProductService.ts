import productModel from '../database/models/product.model';
import { Product } from '../types/Product';
import { ServiceResponse } from '../types/ServiceResponse';

async function getProductService(): Promise<ServiceResponse<Product[]>> {
  const products = await productModel.findAll();
  const response: ServiceResponse<Product[]> = {
    status: 'SUCCESS', data: products.map((product) => product.dataValues) };
  return response;
} 

export default {
  getProductService,
};