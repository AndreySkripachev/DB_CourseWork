import { ProductDto } from '../dtos/product.dto';
import { Product } from '../models/product';
import { MapperFromDto } from './mapper';

class ProductMapper implements MapperFromDto<ProductDto, Product> {
  /** @inheritdoc */
  public fromDto(dto: ProductDto): Product {
    return {
      ...dto,
    };
  }
}

export const productMapper = new ProductMapper();
