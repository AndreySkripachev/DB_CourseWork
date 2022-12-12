import { ProductDto } from '../core/dtos';
import { productMapper } from '../core/mappers';
import { Product } from '../core/models';
import { ApiService } from './ApiService';

import http from './HttpService';

const URL = 'goods';

export default class ProductService implements ApiService {
  /**
   * Fetches products from API.
   */
  public static async get(): Promise<Product[]> {
    const response = await http.get<ProductDto[]>(URL);
    const productsDto = response.data;

    return productsDto.map(productMapper.fromDto);
  }

  public static async post(
    product: Pick<Product, 'cost' | 'name'> & {
      manufacturer: number;
      type: number;
    }
  ): Promise<void> {
    await http.get(
      `${URL}/${product.name}/${product.cost}/${product.type}/${product.manufacturer}`
    );
  }

  public static async delete(id: number): Promise<void> {
    await http.get(`${URL}/delete/${id}`);
  }

  public static async put(
    product: Pick<Product, 'cost' | 'name'> & {
      manufacturer: number;
      type: number;
    }
  ): Promise<void> {
    await http.get(
      `${URL}/update/${product.name}/${product.cost}/${product.type}/${product.manufacturer}`
    );
  }
}
