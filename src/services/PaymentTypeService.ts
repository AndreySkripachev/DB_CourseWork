import { PaymentTypeDto } from '../core/dtos';
import { paymentTypeMapper } from '../core/mappers';
import { PaymentType } from '../core/models';
import { ApiService } from './ApiService';

import http from './HttpService';

export default class PaymentTypeService implements ApiService {
  /**
   * Fetches PaymentTypes from API.
   */
  public static async get(): Promise<PaymentType[]> {
    const response = await http.get<PaymentTypeDto[]>('goods');
    const PaymentTypesDto = response.data;

    return PaymentTypesDto.map(paymentTypeMapper.fromDto);
  }
}
