import productModel from '../database/models/product.model';
import { Product } from '../types/Product';
import { ServiceResponse } from '../types/ServiceResponse';

async function createProductService(product: Product): Promise<ServiceResponse<Product>> {
  const newProduct = await productModel.create(product);
  const response: ServiceResponse<Product> = {
    status: 'SUCCESS', data: newProduct.dataValues };
  return response;
} 

export default {
  createProductService,
};