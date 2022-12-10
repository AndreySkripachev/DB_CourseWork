import { ProductTypeDto } from '../core/dtos';
import { productTypeMapper } from '../core/mappers';
import { ProductType } from '../core/models';
import { ApiService } from './ApiService';

import http from './HttpService';

const URL = 'goods-type';

export default class ProductTypeService implements ApiService {
  /**
   * Fetches ProductTypes from API.
   */
  public static async get(): Promise<ProductType[]> {
    const response = await http.get<ProductTypeDto[]>(URL);
    const ProductTypesDto = response.data;

    return ProductTypesDto.map(productTypeMapper.fromDto);
  }

  public static async post({ name }: Omit<ProductType, 'id'>): Promise<void> {
    await http.get(`${URL}/${name}`);
  }

  public static async delete(id: number): Promise<void> {
    await http.get(`${URL}/delete/${id}`);
  }
}
