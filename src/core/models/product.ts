import { Manufacturer } from './manufacturer';
import { ProductType } from './productType';

export interface Product {
  readonly manufacturer: Manufacturer;
  readonly id: number;
  readonly name: string;
  readonly cost: number;
  readonly type: ProductType;
}
