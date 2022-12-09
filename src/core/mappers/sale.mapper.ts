import { SaleDto } from '../dtos/sale.dto';
import { Sale } from '../models/sale';
import { MapperFromDto } from './mapper';

class SaleMapper implements MapperFromDto<SaleDto, Sale> {
  /** @inheritdoc */
  public fromDto(dto: SaleDto): Sale {
    return {
      ...dto,
    };
  }
}

export const saleMapper = new SaleMapper();
