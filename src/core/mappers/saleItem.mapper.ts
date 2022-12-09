import { SaleItemDto } from '../dtos/saleItem.dto';
import { SaleItem } from '../models/saleItem';
import { MapperFromDto } from './mapper';

class SaleItemMapper implements MapperFromDto<SaleItemDto, SaleItem> {
  /** @inheritdoc */
  public fromDto(dto: SaleItemDto): SaleItem {
    return {
      ...dto,
    };
  }
}

export const saleItemMapper = new SaleItemMapper();
