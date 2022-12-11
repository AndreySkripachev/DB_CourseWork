import { BuyerDto } from '../core/dtos';
import { buyerMapper } from '../core/mappers';
import { Buyer } from '../core/models';
import { ApiService } from './ApiService';

import http from './HttpService';

const URL = 'buyer';

export default class BuyerService implements ApiService {
  /**
   * Fetches Buyers from API.
   */
  public static async get(): Promise<Buyer[]> {
    const response = await http.get<BuyerDto[]>(URL);
    const buyersDto = response.data;

    return buyersDto.map(buyerMapper.fromDto);
  }

  public static async post({
    address,
    email,
    name,
    phone,
  }: Omit<Buyer, 'id'>): Promise<void> {
    await http.get(`${URL}/${name}/${address}/${phone}/${email}`);
  }

  public static async delete(id: number): Promise<void> {
    await http.get(`${URL}/delete/${id}`);
  }

  public static async put({
    address,
    email,
    id,
    name,
    phone,
  }: Buyer): Promise<void> {
    await http.get(`${URL}/update/${id}/${name}/${address}/${phone}/${email}`);
  }
}
