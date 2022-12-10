import { PaymentTypeDto } from '../core/dtos';
import { paymentTypeMapper } from '../core/mappers';
import { PaymentType } from '../core/models';
import { ApiService } from './ApiService';

import http from './HttpService';

const URL = 'payment-types';

export default class PaymentTypeService implements ApiService {
  /**
   * Fetches PaymentTypes from API.
   */
  public static async get(): Promise<PaymentType[]> {
    const response = await http.get<PaymentTypeDto[]>(URL);
    const PaymentTypesDto = response.data;

    return PaymentTypesDto.map(paymentTypeMapper.fromDto);
  }

  public static async post({ name }: Omit<PaymentType, 'id'>): Promise<void> {
    await http.get(`${URL}/${name}`);
  }
}
