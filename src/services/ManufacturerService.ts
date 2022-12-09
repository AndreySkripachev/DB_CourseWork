import { ManufacturerDto } from '../core/dtos';
import { manufacturerMapper } from '../core/mappers';
import { Manufacturer } from '../core/models';
import { ApiService } from './ApiService';

import http from './HttpService';

export default class ManufacturerService implements ApiService {
  /**
   * Fetches Manufacturers from API.
   */
  public static async get(): Promise<Manufacturer[]> {
    const response = await http.get<ManufacturerDto[]>('goods');
    const ManufacturersDto = response.data;

    return ManufacturersDto.map(manufacturerMapper.fromDto);
  }
}
