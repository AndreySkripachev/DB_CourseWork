import { ManufacturerDto } from '../core/dtos';
import { manufacturerMapper } from '../core/mappers';
import { Manufacturer } from '../core/models';
import { ApiService } from './ApiService';

import http from './HttpService';

const URL = 'manufacturers';

export default class ManufacturerService implements ApiService {
  /**
   * Fetches Manufacturers from API.
   */
  public static async get(): Promise<Manufacturer[]> {
    const response = await http.get<ManufacturerDto[]>(URL);
    const ManufacturersDto = response.data;

    return ManufacturersDto.map(manufacturerMapper.fromDto);
  }

  public static async post({
    name,
    country,
  }: Omit<Manufacturer, 'id'>): Promise<void> {
    await http.get(`${URL}/${name}/${country}`);
  }

  public static async delete(id: number): Promise<void> {
    await http.get(`${URL}/delete/${id}`);
  }
}
