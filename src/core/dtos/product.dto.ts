import { ManufacturerDto } from './manufacturer.dto';
import { ProductTypeDto } from './productType.dto';

export interface ProductDto {
  readonly manufacturer: ManufacturerDto;
  readonly id: number;
  readonly name: string;
  readonly cost: number;
  readonly type: ProductTypeDto;
}
