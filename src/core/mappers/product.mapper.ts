import { ProductDto } from '../dtos/product.dto';
import { Product } from '../models/product';
import { MapperFromDto } from './mapper';

class ProductMapper implements MapperFromDto<ProductDto, Product> {
  /** @inheritdoc */
  public fromDto(dto: ProductDto): Product {
    return new Product({
      cost: dto.cost,
      id: dto.id,
      name: dto.name,
      type: dto.type,
      description: dto.description,
    });
  }
}

export const productMapper = new ProductMapper();
