import { ProductDto } from '../core/dtos';
import { productMapper } from '../core/mappers';
import { Product } from '../core/models';

import http from './HttpService';

export default class DatabaseService {
  public static async fetchProducts(): Promise<Product[]> {
    const productsDto = await http.get<ProductDto[]>('products');

    return productsDto.data.map(productMapper.fromDto);
  }
}
