import { BuyerDto } from '../dtos/buyer.dto';
import { Buyer } from '../models/buyer';
import { MapperFromDto } from './mapper';

class BuyerMapper implements MapperFromDto<BuyerDto, Buyer> {
  /** @inheritdoc */
  public fromDto(dto: BuyerDto): Buyer {
    return {
      ...dto,
    };
  }
}

export const buyerMapper = new BuyerMapper();
