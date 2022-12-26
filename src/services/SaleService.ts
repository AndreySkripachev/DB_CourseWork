import { SaleDto } from '../core/dtos';
import { saleMapper } from '../core/mappers';
import { Sale } from '../core/models';
import { ApiService } from './ApiService';

import http from './HttpService';

const URL = 'sales';

interface EditableSale {
  readonly id: number;
  readonly employee: number;
  readonly buyer: number;
  readonly saleDate: Date;
  readonly paymentType: number;
}

interface NewSale {
  readonly employee: number;
  readonly buyer: number;
  readonly paymentType: number;
}

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

  public static async put(sale: EditableSale): Promise<void> {
    const date = sale.saleDate.toLocaleDateString().split('.').map(Number);
    date[0] += 1;

    await http.get(
      `${URL}/update/${sale.id}/${sale.buyer}/${sale.employee}/${
        sale.paymentType
      }/${date.join('.')}`
    );
  }

  public static async post({
    buyer,
    employee,
    paymentType,
  }: NewSale): Promise<void> {
    await http.get(`${URL}/add/${buyer}/${employee}/${paymentType}`);
  }
}
