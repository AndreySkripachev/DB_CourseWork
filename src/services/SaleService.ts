import { SaleDto } from '../core/dtos';
import { saleMapper } from '../core/mappers';
import { Sale } from '../core/models';
import { ApiService } from './ApiService';

import http from './HttpService';

export default class SaleService implements ApiService {
  /**
   * Fetches Sales from API.
   */
  public static async get(): Promise<Sale[]> {
    const response = await http.get<SaleDto[]>('goods');
    const SalesDto = response.data;

    return SalesDto.map(saleMapper.fromDto);
  }
}
