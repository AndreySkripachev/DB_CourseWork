import { ProductTypeDto } from '../core/dtos';
import { productTypeMapper } from '../core/mappers';
import { ProductType } from '../core/models';
import { ApiService } from './ApiService';

import http from './HttpService';

export default class ProductTypeService implements ApiService {
  /**
   * Fetches ProductTypes from API.
   */
  public static async get(): Promise<ProductType[]> {
    const response = await http.get<ProductTypeDto[]>('goods');
    const ProductTypesDto = response.data;

    return ProductTypesDto.map(productTypeMapper.fromDto);
  }
}
