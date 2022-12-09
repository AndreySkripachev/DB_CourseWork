import { BuyerDto } from '../core/dtos';
import { buyerMapper } from '../core/mappers';
import { Buyer } from '../core/models';
import { ApiService } from './ApiService';

import http from './HttpService';

export default class BuyerService implements ApiService {
  /**
   * Fetches Buyers from API.
   */
  public static async get(): Promise<Buyer[]> {
    const response = await http.get<BuyerDto[]>('buyer');
    const buyersDto = response.data;

    return buyersDto.map(buyerMapper.fromDto);
  }
}
