import { ProductDto } from '../core/dtos';
import { productMapper } from '../core/mappers';
import { Product } from '../core/models';
import { ApiService } from './ApiService';

import http from './HttpService';

export default class ProductService implements ApiService {
  /**
   * Fetches products from API.
   */
  public static async get(): Promise<Product[]> {
    const response = await http.get<ProductDto[]>('goods');
    const productsDto = response.data;

    return productsDto.map(productMapper.fromDto);
  }
}
