import { ProductTypeDto } from '../dtos/productType.dto';
import { ProductType } from '../models/productType';
import { MapperFromDto } from './mapper';

class ProductTypeMapper implements MapperFromDto<ProductTypeDto, ProductType> {
  /** @inheritdoc */
  public fromDto(dto: ProductTypeDto): ProductType {
    return {
      ...dto,
    };
  }
}

export const productTypeMapper = new ProductTypeMapper();
