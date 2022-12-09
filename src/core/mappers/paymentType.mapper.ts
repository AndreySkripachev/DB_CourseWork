import { PaymentTypeDto } from '../dtos/paymentType.dto';
import { PaymentType } from '../models/paymentType';
import { MapperFromDto } from './mapper';

class PaymentTypeMapper implements MapperFromDto<PaymentTypeDto, PaymentType> {
  /** @inheritdoc */
  public fromDto(dto: PaymentTypeDto): PaymentType {
    return {
      ...dto,
    };
  }
}

export const paymentTypeMapper = new PaymentTypeMapper();
