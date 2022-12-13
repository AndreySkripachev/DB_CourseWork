import { SaleDto } from '../core/dtos';
import { saleMapper } from '../core/mappers';
import { Sale } from '../core/models';
import { ApiService } from './ApiService';

import http from './HttpService';

const URL = 'sales';

export default class SaleService implements ApiService {
  /**
   * Fetches Sales from API.
   */
  public static async get(): Promise<Sale[]> {
    const response = await http.get<SaleDto[]>(URL);
    const SalesDto = response.data;

    return SalesDto.map(saleMapper.fromDto);
  }

  public static async delete(id: number): Promise<void> {
    await http.get(`${URL}/delete/${id}`);
  }

  public static async put(employeeID: number): Promise<void> {
    await http.get(`${URL}/update/${employeeID}`);
  }
}
